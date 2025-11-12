import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { pubKey } = await request.json()
    if (!pubKey) return NextResponse.json({ error: 'pubKey required' }, { status: 400 })

    const rpcRes = await fetch('https://api.mainnet-beta.solana.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'getBalance', params: [pubKey] }),
    })

    if (!rpcRes.ok) {
      const text = await rpcRes.text()
      return NextResponse.json({ error: `Upstream RPC error: ${rpcRes.status} ${rpcRes.statusText}`, details: text }, { status: 502 })
    }

    const data = await rpcRes.json()
    const lamports = data?.result?.value
    if (typeof lamports !== 'number') {
      return NextResponse.json({ error: 'Invalid RPC response' }, { status: 502 })
    }

    return NextResponse.json({ sol: lamports / 1e9 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 })
  }
}
