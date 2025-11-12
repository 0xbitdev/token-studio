"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { toast } from "sonner"
import { getSolBalance } from "./utils"

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
      // allowWalletPrompt will try to prompt the injected wallet provider if RPC returns 403
      const sol = await getSolBalance(pubKey, { allowWalletPrompt: true })
      setBalance(sol)
    } catch (error) {
      console.error("Failed to fetch balance:", error)
    }
  }

  const connect = async (type: "phantom" | "solflare") => {
    setConnecting(true)
    try {
      const provider = type === "phantom" ? (window as any).solana : (window as any).solflare

      if (!provider) {
        toast.error(`${type === "phantom" ? "Phantom" : "Solflare"} wallet not found`, {
          description: "Please install the wallet extension to continue",
        })
        window.open(type === "phantom" ? "https://phantom.app/download" : "https://solflare.com/download", "_blank")
        setConnecting(false)
        return
      }

      // Connect to wallet
      const response = await provider.connect()
      const pubKey = response.publicKey.toString()

      // Request signature for authentication
      const message = `Sign this message to authenticate with Launch Token\n\nTimestamp: ${Date.now()}`
      const encodedMessage = new TextEncoder().encode(message)
      const signedMessage = await provider.signMessage(encodedMessage, "utf8")

      if (signedMessage) {
        setPublicKey(pubKey)
        setWalletType(type)
        setConnected(true)
        localStorage.setItem("walletType", type)
        localStorage.setItem("walletPublicKey", pubKey)
        fetchBalance(pubKey) // Fetch balance after connection
        toast.success("Wallet connected successfully!", {
          description: `Connected to ${pubKey.slice(0, 4)}...${pubKey.slice(-4)}`,
        })
      }
    } catch (error: any) {
      console.error("Wallet connection error:", error)
      if (error.code === 4001) {
        toast.error("Connection rejected", {
          description: "You rejected the connection request",
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
