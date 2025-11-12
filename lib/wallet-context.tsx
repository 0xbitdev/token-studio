"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { toast } from "sonner"


interface WalletContextType {
  connected: boolean
  publicKey: string | null
  walletType: "phantom" | "solflare" | null
  connecting: boolean
  balance: number // Added SOL balance
  connect: (type: "phantom" | "solflare") => Promise<void>
  disconnect: () => void
  signMessage: (message: string) => Promise<string | null>
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false)
  const [publicKey, setPublicKey] = useState<string | null>(null)
  const [walletType, setWalletType] = useState<"phantom" | "solflare" | null>(null)
  const [connecting, setConnecting] = useState(false)
  const [balance, setBalance] = useState(0) // Added balance state

  useEffect(() => {
    // Check if already connected on mount
    const savedWallet = localStorage.getItem("walletType")
    const savedPublicKey = localStorage.getItem("walletPublicKey")
    if (savedWallet && savedPublicKey) {
      setWalletType(savedWallet as "phantom" | "solflare")
      setPublicKey(savedPublicKey)
      setConnected(true)
      fetchBalance(savedPublicKey) // Fetch balance on reconnect
    }
  }, [])

  const fetchBalance = async (pubKey: string) => {
    try {
      // First, try to ask the injected wallet provider (Phantom / Solflare) for balance
      // This reduces reliance on public RPC endpoints that may return 403.
      const provider = (window as any).solana || (window as any).solflare
      if (provider) {
        try {
          // Some providers may expose a helper like getBalance(pubKey)
          if (typeof provider.getBalance === "function") {
            const bal = await provider.getBalance(pubKey)
            if (typeof bal === "number") {
              setBalance(bal / 1e9)
              return
            }
            // If provider returned an object like { value: lamports }
            if (bal && typeof bal.value === "number") {
              setBalance(bal.value / 1e9)
              return
            }
          }

          // Many wallet providers implement a generic request proxy which will forward
          // JSON-RPC calls to their configured RPC node. Try that next.
          if (typeof provider.request === "function") {
            const provResp = await provider.request({ method: "getBalance", params: [pubKey] })
            // provResp might be number of lamports, or an object
            if (provResp != null) {
              // If provider returned JSON-RPC style { result: { value } }
              const value = provResp?.result?.value ?? provResp?.value ?? provResp
              if (typeof value === "number") {
                setBalance(value / 1e9)
                return
              }
            }
          }
        } catch (provErr) {
          console.warn("Wallet provider balance fetch failed, falling back to RPC:", provErr)
          // continue to fallback RPC below
        }
      }

      // Try server-side proxy first (avoids exposing API key and reduces public RPC 403 rates)
      try {
        const proxyRes = await fetch("/api/rpc/balance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ publicKey: pubKey }),
        })
        const proxyJson = await proxyRes.json()
        if (proxyRes.ok && proxyJson?.result) {
          // Our proxy returns { ok: true, status, result: <rpcResponse> }
          const rpcData = proxyJson.result
          const value = rpcData?.result?.value ?? rpcData?.value ?? rpcData?.raw?.result?.value ?? rpcData?.raw?.value
          if (typeof value === "number") {
            setBalance(value / 1e9)
            return
          }
        }
      } catch (proxyErr) {
        console.warn("Server proxy /api/rpc/balance failed, falling back to client RPC:", proxyErr)
        // continue to client RPC fallback
      }

      // Fallback: call a configurable RPC endpoint. Use NEXT_PUBLIC_SOLANA_RPC on client-side.
      // Public endpoints may be rate-limited or return 403; allow overriding.
      const rpcUrl = (process.env.NEXT_PUBLIC_SOLANA_RPC as string) || "https://api.mainnet-beta.solana.com"

      const response = await fetch(rpcUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "getBalance",
          params: [pubKey],
        }),
      })
      const data = await response.json()

      // Handle common JSON-RPC error responses (e.g. provider blocked / rate-limited)
      if (data?.error) {
        // If provider returns 403 / Access forbidden, inform the user and bail out
        if (data.error?.code === 403 || String(data.error?.message || "").toLowerCase().includes("forbidden")) {
          console.warn("Solana RPC access forbidden", data.error)
          toast.error("Solana RPC access forbidden or rate-limited; RPC provider blocked the request.", {
            description:
              "Try setting NEXT_PUBLIC_SOLANA_RPC to a working RPC endpoint (e.g. a QuickNode/Helius RPC) or connect your wallet to fetch balance.",
          })
          return
        }
        console.warn("Solana RPC returned an error", data.error)
        return
      }

      if (data.result?.value) {
        setBalance(data.result.value / 1e9) // Convert lamports to SOL
      }
    } catch (error) {
      console.error("Failed to fetch balance:", error)
    }
  }

  const connect = async (type: "phantom" | "solflare") => {
    setConnecting(true)
    try {
      const provider = type === "phantom" ? (window as any).solana : (window as any).solflare

      if (!provider) {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

        if (isMobile) {
          // On mobile, open the wallet app with deep link
          const currentUrl = encodeURIComponent(window.location.href)
          const deepLink =
            type === "phantom"
              ? `https://phantom.app/ul/browse/${currentUrl}?ref=${window.location.origin}`
              : `https://solflare.com/ul/v1/browse/${currentUrl}?ref=${window.location.origin}`

          toast.error(`${type === "phantom" ? "Phantom" : "Solflare"} wallet not detected`, {
            description: "Opening wallet app...",
          })
          window.location.href = deepLink
        } else {
          toast.error(`${type === "phantom" ? "Phantom" : "Solflare"} wallet not found`, {
            description: "Please install the wallet extension to continue",
          })
          window.open(type === "phantom" ? "https://phantom.app/download" : "https://solflare.com/download", "_blank")
        }
        setConnecting(false)
        return
      }

      // Show connecting toast
      toast.loading("Connecting wallet...", {
        description: "Please approve the connection in your wallet",
        id: "wallet-connect",
      })

      // Connect to wallet with timeout
      const connectPromise = provider.connect({ onlyIfTrusted: false })
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Connection timeout")), 60000),
      )

      const response = (await Promise.race([connectPromise, timeoutPromise])) as any
      const pubKey = response.publicKey.toString()

      // Request signature for authentication
      toast.loading("Waiting for signature...", {
        description: "Please sign the message in your wallet to verify ownership",
        id: "wallet-connect",
      })

      const message = `Sign this message to authenticate with Launch Token\n\nWallet: ${pubKey.slice(0, 8)}...${pubKey.slice(-8)}\nTimestamp: ${Date.now()}\n\nThis signature is free and will not send any transaction.`
      const encodedMessage = new TextEncoder().encode(message)

      const signPromise = provider.signMessage(encodedMessage, "utf8")
      const signTimeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Signature timeout")), 60000),
      )

      const signedMessage = await Promise.race([signPromise, signTimeoutPromise])

      if (signedMessage) {
        setPublicKey(pubKey)
        setWalletType(type)
        setConnected(true)
        localStorage.setItem("walletType", type)
        localStorage.setItem("walletPublicKey", pubKey)
        await fetchBalance(pubKey)

        toast.success("Wallet connected successfully!", {
          description: `${pubKey.slice(0, 4)}...${pubKey.slice(-4)}`,
          id: "wallet-connect",
        })
      }
    } catch (error: any) {
      console.error("Wallet connection error:", error)
      toast.dismiss("wallet-connect")

      if (error.code === 4001 || error.message?.includes("rejected")) {
        toast.error("Connection rejected", {
          description: "You rejected the connection request",
        })
      } else if (error.message?.includes("timeout")) {
        toast.error("Connection timeout", {
          description: "Please try again and approve the request in your wallet",
        })
      } else {
        toast.error("Failed to connect wallet", {
          description: error.message || "Please try again",
        })
      }
    } finally {
      setConnecting(false)
    }
  }

  const disconnect = () => {
    try {
      const provider = walletType === "phantom" ? (window as any).solana : (window as any).solflare
      if (provider) {
        provider.disconnect()
      }
      setConnected(false)
      setPublicKey(null)
      setWalletType(null)
      setBalance(0) // Reset balance on disconnect
      localStorage.removeItem("walletType")
      localStorage.removeItem("walletPublicKey")
      toast.success("Wallet disconnected")
    } catch (error) {
      console.error("Disconnect error:", error)
    }
  }

  const signMessage = async (message: string): Promise<string | null> => {
    try {
      const provider = walletType === "phantom" ? (window as any).solana : (window as any).solflare
      if (!provider) return null

      const encodedMessage = new TextEncoder().encode(message)
      const signedMessage = await provider.signMessage(encodedMessage, "utf8")
      return signedMessage.signature.toString()
    } catch (error) {
      console.error("Sign message error:", error)
      return null
    }
  }

  return (
    <WalletContext.Provider
      value={{
        connected,
        publicKey,
        walletType,
        connecting,
        balance, // Added balance to context
        connect,
        disconnect,
        signMessage,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
