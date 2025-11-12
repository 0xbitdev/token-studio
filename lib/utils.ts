import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type GetSolBalanceOptions = {
  rpcUrls?: string[]
  allowWalletPrompt?: boolean
}

/**
 * Fetch SOL balance (in SOL) for a given public key.
 * Tries multiple public RPC endpoints and optionally attempts to prompt the injected wallet provider for permission
 * before retrying when the RPC responds with 403.
 */
export async function getSolBalance(
  pubKey: string,
  rpcUrlOrOpts: string | GetSolBalanceOptions = 'https://api.mainnet-beta.solana.com'
): Promise<number> {
  if (!pubKey) throw new Error('public key is required')

  // Normalize options
  let rpcUrls: string[]
  let allowWalletPrompt = false
  if (typeof rpcUrlOrOpts === 'string') {
    rpcUrls = [rpcUrlOrOpts]
  } else {
    rpcUrls = rpcUrlOrOpts.rpcUrls ?? ['https://api.mainnet-beta.solana.com']
    allowWalletPrompt = !!rpcUrlOrOpts.allowWalletPrompt
  }

  const body = JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'getBalance', params: [pubKey] })

  // First attempt: use injected wallet provider as an RPC proxy (bypasses CORS/rate-limit issues)
  try {
    const provider = (window as any).solana || (window as any).solflare
    if (provider) {
      // Some providers expose a convenience method
      if (typeof provider.getBalance === 'function') {
        const lamports = await provider.getBalance(pubKey)
        if (typeof lamports === 'number') return lamports / 1e9
      }

      // Generic RPC proxy via provider.request (best-effort)
      if (typeof provider.request === 'function') {
        try {
          const resp = await provider.request({ method: 'getBalance', params: [pubKey] })
          // provider.request may return the raw RPC result or an object with result.value
          const lamports = typeof resp === 'number' ? resp : resp?.result ?? resp?.value
          if (typeof lamports === 'number') return lamports / 1e9
        } catch (err) {
          // ignore and fallthrough to direct RPC fetches
        }
      }
    }
  } catch (err) {
    // ignore provider errors and continue to public RPCs
  }

  // Second attempt: call our server-side proxy to mainnet RPC to avoid client 403/CORS
  try {
    // Only run in browser/edge where fetch to /api is allowed
    if (typeof window !== 'undefined') {
      const proxied = await fetch('/api/balance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pubKey }),
      })
      if (proxied.ok) {
        const d = await proxied.json()
        if (typeof d?.sol === 'number') return d.sol
      } else {
        // continue to fallback RPCs if proxy fails
      }
    }
  } catch (err) {
    // ignore and continue
  }

  // Helper to try a single RPC
  const tryRpc = async (url: string) => {
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body })
    return res
  }

  let lastError: any = null

  // Try each RPC URL in order
  for (const url of rpcUrls) {
    try {
      const res = await tryRpc(url)
      if (!res.ok) {
        // If 403 and we're allowed to prompt the wallet, attempt to request permission once and retry
        if (res.status === 403 && allowWalletPrompt) {
          try {
            const provider = (window as any).solana || (window as any).solflare
            if (provider && typeof provider.connect === 'function') {
              // This will prompt the wallet UI for permission if needed
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              await provider.connect()
              // After prompting, try provider.request again before retrying public RPC
              if (typeof provider.request === 'function') {
                try {
                  const resp = await provider.request({ method: 'getBalance', params: [pubKey] })
                  const lamports = typeof resp === 'number' ? resp : resp?.result ?? resp?.value
                  if (typeof lamports === 'number') return lamports / 1e9
                } catch (err) {
                  // fallthrough to retrying RPC
                }
              }
            }
          } catch (err) {
            // ignore provider connect errors but remember them
            lastError = err
          }

          // retry same URL once
          const retry = await tryRpc(url)
          if (!retry.ok) {
            lastError = new Error(`RPC request failed: ${retry.status} ${retry.statusText}`)
            continue
          }
          const data = await retry.json()
          const lamports = data?.result?.value
          if (typeof lamports !== 'number') throw new Error('Invalid RPC response: missing balance')
          return lamports / 1e9
        }

        lastError = new Error(`RPC request failed: ${res.status} ${res.statusText}`)
        continue
      }

      const data = await res.json()
      const lamports = data?.result?.value
      if (typeof lamports !== 'number') throw new Error('Invalid RPC response: missing balance')
      return lamports / 1e9
    } catch (err) {
      lastError = err
      continue
    }
  }

  throw lastError ?? new Error('Failed to fetch balance')
}
