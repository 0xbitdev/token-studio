import { NextResponse } from "next/server"

// Permissive CORS for cross-origin usage (allows any origin). This mirrors local dev behavior
// and is intentionally permissive so the API is accessible from your custom domain.
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function POST(req: Request) {
  try {
    const body = await req.text()
  if (!body) return NextResponse.json({ error: "Empty request body" }, { status: 400, headers: CORS_HEADERS })

    // Logging for debugging on server (Vercel logs). Keep logs concise.
    try {
      const preview = body.length > 1000 ? body.slice(0, 1000) + '...[truncated]' : body
      console.info(`/api/proxy request -> length=${body.length} preview=${preview}`)
    } catch (e) {
      console.info('/api/proxy request (failed to preview body)')
    }

    const rpcUrl = process.env.SOLANA_RPC_URL || process.env.SOLANA_RPC || "https://api.mainnet-beta.solana.com"
    const rpcKey = process.env.SOLANA_RPC_KEY || process.env.SOLANA_API_KEY || null

    const headers: Record<string, string> = { "Content-Type": "application/json" }
    if (rpcKey) headers["Authorization"] = `Bearer ${rpcKey}`

    const rpcRes = await fetch(rpcUrl, { method: "POST", headers, body })
    const text = await rpcRes.text()
    // Log upstream response status and short body for debugging
    try {
      const short = text.length > 1000 ? text.slice(0, 1000) + '... [truncated]' : text
      console.info(`/api/proxy -> upstream ${rpcUrl} status=${rpcRes.status} bodyPreview=${short}`)
    } catch (e) {
      console.info(`/api/proxy -> upstream ${rpcUrl} status=${rpcRes.status} (no preview)`) 
    }
    let data: any = null
    try {
      data = JSON.parse(text)
    } catch (e) {
      data = { raw: text }
    }

    if (!rpcRes.ok) {
      return NextResponse.json({ error: `RPC provider error: ${rpcRes.status}`, details: data }, { status: 502, headers: CORS_HEADERS })
    }

    return NextResponse.json({ ok: true, status: rpcRes.status, result: data }, { headers: CORS_HEADERS })
  } catch (err: any) {
    console.error("/api/proxy error", err)
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500, headers: CORS_HEADERS })
  }
}

export async function OPTIONS() {
  return new Response(null, { status: 200, headers: CORS_HEADERS })
}
