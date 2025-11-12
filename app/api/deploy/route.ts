import { NextResponse } from "next/server"

// Permissive CORS to allow cross-origin requests from your custom domain
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}
import FormData from "form-data"
import { Client } from "pg"
import nacl from "tweetnacl"
import bs58 from "bs58"

type ReqBody = {
  tokenName: string
  symbol: string
  shortDescription: string
  longDescription: string
  pictureImage?: string // data URL
  coverImage?: string // data URL
  suggestedXBio?: string
  suggestedFirstTweet?: string
  publicKey?: string
  signature?: string
  signedMessage?: string
  privateKey?: string
  devBuyAmount?: string
}

// Helper to validate required fields
function validate(body: ReqBody) {
  const missing: string[] = []
  if (!body.tokenName) missing.push("tokenName")
  if (!body.symbol) missing.push("symbol")
  if (!body.longDescription) missing.push("longDescription")
  if (!body.pictureImage) missing.push("pictureImage")
  if (!body.coverImage) missing.push("coverImage")
  // If a privateKey is provided, we allow server-side deploy without wallet signature
  if (!body.privateKey) {
    if (!body.publicKey) missing.push("publicKey")
    if (!body.signature) missing.push("signature")
    if (!body.signedMessage) missing.push("signedMessage")
  }
  return missing
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ReqBody

    const missing = validate(body)
    if (missing.length > 0) {
      return NextResponse.json({ error: `Missing required fields: ${missing.join(", ")}` }, { status: 400, headers: CORS_HEADERS })
    }

  // Pump.fun API configuration
  const PUMP_FUN_API_URL = process.env.PUMP_FUN_API_URL || process.env.PUMPFUN_API_URL || "https://api.pumpfunapi.org/pumpfun/create/token"
    const PUMP_FUN_API_KEY = process.env.PUMP_FUN_API_KEY

    // If client provided signature + signedMessage (and did NOT provide privateKey), verify it here.
    let verificationResult: { ok: boolean; message: string } | null = null
  if (!body.privateKey) {
      try {
        const sigB64 = body.signature as string
        const signedMessage = body.signedMessage as string
        const pubKeyBase58 = body.publicKey as string
        if (!sigB64 || !signedMessage || !pubKeyBase58) throw new Error("Missing signature data for verification")

        // decode signature and public key
        const sigBuf = Buffer.from(sigB64, "base64")
        const pubKeyBuf = bs58.decode(pubKeyBase58)
        const msgBuf = Buffer.from(signedMessage, "utf8")

        const verified = nacl.sign.detached.verify(new Uint8Array(msgBuf), new Uint8Array(sigBuf), new Uint8Array(pubKeyBuf))
        if (!verified) {
          return NextResponse.json({ error: "Signature verification failed" }, { status: 401, headers: CORS_HEADERS })
        }
        verificationResult = { ok: true, message: "Signature verified" }
      } catch (e: any) {
        console.error("signature verification error", e)
  return NextResponse.json({ error: "Signature verification error: " + String(e?.message || e) }, { status: 401, headers: CORS_HEADERS })
      }
    } else {
      verificationResult = { ok: true, message: "Private key provided; skipped signature verification" }
    }

    // Build the Pump.fun request body according to their create-token docs.
    // Note: adapt fields as required by the API; here we send a typical payload
    // with metadata and owner authentication (publicKey + signature).
    const pumpBody: any = {
      name: body.tokenName,
      symbol: body.symbol,
      short_description: body.shortDescription,
      long_description: body.longDescription,
      images: {
        logo: body.pictureImage,
        banner: body.coverImage,
      },
      socials: {
        x_bio: body.suggestedXBio,
        first_tweet: body.suggestedFirstTweet,
      },
      owner_public_key: body.publicKey,
      owner_signature: body.signature,
      dev_buy_amount: body.devBuyAmount || undefined,
    }

    // Build multipart form data to match the Pump.fun example (private_key, amount, name, symbol, description, website, twitter, telegram, image)
    const form = new FormData()

    // If a private key was provided by the client, include it (note: exposing private keys to the server is insecure—use with caution)
    if (body.privateKey) {
      form.append("private_key", body.privateKey)
    }

    if (body.devBuyAmount) form.append("amount", String(body.devBuyAmount))
    form.append("name", body.tokenName)
    form.append("symbol", body.symbol)
    if (body.shortDescription) form.append("description", body.shortDescription)
    if (body.shortDescription) form.append("description", body.shortDescription)
    if (body.suggestedFirstTweet) form.append("twitter", body.suggestedFirstTweet)
    if (body.suggestedXBio) form.append("telegram", body.suggestedXBio)
    // optional website field
    if ((body as any).website) form.append("website", (body as any).website)

    // Attach image if provided (pictureImage is expected to be a data URL)
    if (body.pictureImage && body.pictureImage.startsWith("data:")) {
      const match = body.pictureImage.match(/^data:(.+);base64,(.+)$/)
      if (match) {
        const contentType = match[1]
        const base64 = match[2]
        const buffer = Buffer.from(base64, "base64")
        form.append("image", buffer, { filename: "logo.png", contentType })
      }
    }

    // If coverImage available, attach as 'banner'
    if (body.coverImage && body.coverImage.startsWith("data:")) {
      const match = body.coverImage.match(/^data:(.+);base64,(.+)$/)
      if (match) {
        const contentType = match[1]
        const base64 = match[2]
        const buffer = Buffer.from(base64, "base64")
        form.append("banner", buffer, { filename: "banner.png", contentType })
      }
    }

    // If the server has an API key, add it to headers; otherwise call without Authorization
    const headers: any = form.getHeaders()
    if (PUMP_FUN_API_KEY) headers["Authorization"] = `Bearer ${PUMP_FUN_API_KEY}`

    const res = await fetch(PUMP_FUN_API_URL, {
      method: "POST",
      headers,
      body: form as any,
    })

    const text = await res.text()
    if (!res.ok) {
      return NextResponse.json({ error: `Pump.fun API error: ${res.status} ${text}` }, { status: 502, headers: CORS_HEADERS })
    }

    // try to parse json
    let json: any = null
    try {
      json = JSON.parse(text)
    } catch (e) {
      // return raw text if not JSON
      json = { raw: text }
    }

    // Extract status, mint, txid from the response if present
    const status = json.status || json.result?.status || json.raw?.status || ""
    const mint = json.mint || json.result?.mint || json.result?.address || json.raw?.mint || ""
    const txid = json.txid || json.result?.txid || json.result?.tx_hash || json.raw?.txid || ""

    // Save to Postgres if DATABASE_URL is configured
    const DATABASE_URL = process.env.DATABASE_URL
    if (DATABASE_URL) {
      const client = new Client({ connectionString: DATABASE_URL })
      try {
        await client.connect()
        await client.query(`
          CREATE TABLE IF NOT EXISTS pumpfun_deploys (
            id SERIAL PRIMARY KEY,
            public_key TEXT,
            status TEXT,
            mint TEXT,
            txid TEXT,
            payload JSONB,
            created_at TIMESTAMP DEFAULT now()
          )
        `)

        await client.query(
          `INSERT INTO pumpfun_deploys(public_key, status, mint, txid, payload) VALUES($1, $2, $3, $4, $5)`,
          [(body.publicKey as string) || null, status, mint, txid, pumpBody]
        )
      } catch (pgErr) {
        console.error("Postgres save error", pgErr)
      } finally {
        await client.end()
      }
    }

    return NextResponse.json({ ok: true, result: json, recorded: { status, mint, txid }, verification: verificationResult }, { headers: CORS_HEADERS })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500, headers: CORS_HEADERS })
  }
}

// Allow preflight OPTIONS so browsers don't get 405 Method Not Allowed
export async function OPTIONS(req: Request) {
  return new Response(null, { status: 200, headers: CORS_HEADERS })
}
