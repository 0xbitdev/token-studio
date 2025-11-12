import { NextResponse } from "next/server"

type ReqBody = {
  publicKey?: string
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ReqBody
    const publicKey = body?.publicKey
    if (!publicKey) {
      return NextResponse.json({ error: "Missing publicKey in request body" }, { status: 400 })
    }

    // Server-side RPC URL and optional API key
    const rpcUrl = process.env.SOLANA_RPC_URL || process.env.SOLANA_RPC || "https://api.mainnet-beta.solana.com"
    const rpcKey = process.env.SOLANA_RPC_KEY || process.env.SOLANA_API_KEY || null

    const headers: Record<string, string> = { "Content-Type": "application/json" }
    if (rpcKey) {
      // try Authorization Bearer first; many providers accept it. If your provider needs a different header,
      // set SOLANA_RPC_KEY and adapt here.
      headers["Authorization"] = `Bearer ${rpcKey}`
    }

    const rpcRes = await fetch(rpcUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "getBalance", params: [publicKey] }),
    })

    const text = await rpcRes.text()
    let data: any = null
    try {
      data = JSON.parse(text)
    } catch (e) {
      data = { raw: text }
    }

    if (!rpcRes.ok) {
      return NextResponse.json({ error: `RPC provider error: ${rpcRes.status}`, details: data }, { status: 502 })
    }

    return NextResponse.json({ ok: true, status: rpcRes.status, result: data })
  } catch (err: any) {
    console.error("/api/rpc/balance error", err)
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 })
  }
}
