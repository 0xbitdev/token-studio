import { NextResponse } from "next/server"

// Force Node runtime on Vercel so Node-only modules (sharp, Buffer) work
export const runtime = "nodejs"

// No CORS handling — removed per request
// Do not import sharp at module load time to avoid crashes on platforms where
// the native libvips binary is missing (e.g. some serverless environments).
// We'll dynamically import it at runtime when needed and gracefully fallback
// if the import fails so the route doesn't crash during module evaluation.
let _sharp: any | false | null = null
async function maybeLoadSharp() {
  if (_sharp !== null) return _sharp
  try {
    const mod = await import("sharp")
    _sharp = mod.default || mod
    return _sharp
  } catch (err) {
    // Mark as false so we don't repeatedly attempt to import on each request
    console.warn("sharp not available; continuing without server-side resize", err)
    _sharp = false
    return null
  }
}

type ReqBody = {
  description: string
  style: string
  tone: string
  safeForWork?: boolean
  picturePrompt?: string
  coverPrompt?: string
}

async function callChatGenerate(body: ReqBody, apiKey: string) {
  const system = `You are a prompt engineering assistant that MUST output only valid JSON (no prose) with the following keys: tokenName, symbol, shortDescription, longDescription, picturePrompt, coverPrompt, suggestedXBio, suggestedFirstTweet.

Requirements for metadata:
- tokenName: 2-4 words, catchy, brand-like.
- symbol: 3-6 uppercase letters, no spaces or punctuation.
- shortDescription: 6-18 words summarizing the token concept and vibe.
- longDescription: 2-4 sentence lore paragraph; keep on-theme with the user's description.

Requirements for image prompts (picturePrompt and coverPrompt):
- Provide a single-line, highly descriptive image prompt optimized for modern image generation models.
- Include: subject (coin/token mascot or emblem), style (use the exact style provided: ${body.style}), mood/tone (${body.tone}), color palette suggestions, composition, focal point, lighting, camera/art direction (e.g., flat vector, cel-shaded, soft cinematic lighting, high contrast, neon rim light), aspect ratio (square for picture, 3:1 for cover), and any text/typography instructions (if needed for logo). Keep prompts SFW: ${body.safeForWork ? "yes" : "no"}.
- Example structure: "[subject], [style keyword], [mood/tone], [palette], [composition], [lighting], [material/texture], highly detailed, clean background, --ar 1:1" (for picture) or "--ar 3:1" (for cover).
- Avoid copyrighted characters and real-person likenesses.

Requirements for socials:
- suggestedXBio: single-line X/Twitter bio (<=140 chars) that highlights the token and invites interest.
- suggestedFirstTweet: 1-2 sentence energetic announcement tweet suitable for launch.

Follow the user's description exactly and do not invent unrelated facts. Output only valid JSON object.
`;

  const user = `Description: ${body.description}`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_CHAT_MODEL || "gpt-4o",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      max_tokens: 700,
      temperature: 0.8,
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Chat generation failed: ${res.status} ${text}`)
  }

  const json = await res.json()
  const content = json.choices?.[0]?.message?.content
  if (!content) throw new Error("No content from chat response")

  // Try to parse JSON directly. If not, try to extract JSON substring.
  try {
    return JSON.parse(content)
  } catch (e) {
    const start = content.indexOf("{")
    const end = content.lastIndexOf("}")
    if (start >= 0 && end > start) {
      const sub = content.substring(start, end + 1)
      return JSON.parse(sub)
    }
    throw new Error("Chat response was not valid JSON")
  }
}

async function generateImage(prompt: string, apiKey: string, size?: string) {
  // Some OpenAI image endpoints may not accept `response_format` — try safe defaults
  const bodyA: any = {
    model: process.env.OPENAI_IMAGE_MODEL || "gpt-image-1",
    prompt,
    n: 1,
  }
  // allow overriding size (e.g. cover banner). The OpenAI images endpoint
  // accepts a limited set of sizes; if an unsupported custom size is requested
  // we'll request a supported size from the API and then resize server-side.
  const supportedSizes = ["1024x1024", "1024x1536", "1536x1024", "auto"]

  // normalize incoming size like '1024X512' -> '1024x512'
  let requestedSize: string | undefined = undefined
  if (size) {
    const m = String(size).match(/(\d+)\D+(\d+)/)
    if (m) requestedSize = `${m[1]}x${m[2]}`
    else requestedSize = String(size).toLowerCase()
  }

  let apiSize = "1024x1024"
  // If the requested size is supported, use it; otherwise request a safe default
  if (requestedSize && supportedSizes.includes(requestedSize)) {
    apiSize = requestedSize
  }
  bodyA.size = apiSize

  let res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(bodyA),
  })

  // If first attempt failed due to unsupported params, bubble the error text for debugging
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Image generation failed: ${res.status} ${text}`)
  }

  const json = await res.json()

  // helper to convert buffer -> resized data URL
  const resizeTo = requestedSize

    const bufferToDataUrl = async (buffer: Buffer, contentType = "image/png") => {
    if (resizeTo) {
      // parse size like '1500x500'
      const match = String(resizeTo).match(/(\d+)x(\d+)/)
      if (match) {
        const w = parseInt(match[1], 10)
        const h = parseInt(match[2], 10)
        try {
          const s = await maybeLoadSharp()
          if (s) {
            buffer = await s(buffer).resize(w, h, { fit: "cover" }).png().toBuffer()
            contentType = "image/png"
          } else {
            // sharp unavailable: log once and continue with original buffer
            console.warn("sharp unavailable: skipping server-side resize")
          }
        } catch (err) {
          console.error("sharp resize error", err)
          // if sharp fails, continue with original buffer
        }
      }
    }
    const b64FromBuffer = Buffer.from(buffer).toString("base64")
    return `data:${contentType};base64,${b64FromBuffer}`
  }

  // Many image endpoints return base64 in data[0].b64_json
  const b64 = json.data?.[0]?.b64_json || json.data?.[0]?.b64 || null
  if (b64) {
    const buf = Buffer.from(b64, "base64")
    return await bufferToDataUrl(buf, "image/png")
  }

  // Some endpoints return a URL to the generated asset instead
  const url = json.data?.[0]?.url || json.data?.[0]?.image_url || null
  if (url) {
    // fetch the image and convert to base64 data URL so front-end can display it
    const imgRes = await fetch(url)
    if (!imgRes.ok) throw new Error(`Failed to fetch generated image from url: ${imgRes.status}`)
    const arr = await imgRes.arrayBuffer()
    const buffer = Buffer.from(arr)
    const contentType = imgRes.headers.get("content-type") || "image/png"
    return await bufferToDataUrl(buffer, contentType)
  }

  throw new Error("No image data returned from image generation API")
}

export async function POST(req: Request) {
  try {
    // lightweight diagnostics: log method and a short preview of headers so we can
    // confirm requests reach this function on hosting.
    try {
      console.info(`/api/generate POST invoked - headers: ${JSON.stringify(Object.fromEntries(req.headers.entries()))}`)
    } catch (e) {
      // ignore logging errors
    }

    const body = (await req.json()) as ReqBody

    // Quick ping path for remote testing: send { "ping": true } in the body to
    // receive an immediate JSON response. This helps determine whether the POST
    // reaches the deployed function (useful when debugging 405 from proxies).
    try {
      const anyBody: any = body as any
      if (anyBody?.ping === true) {
        return NextResponse.json({ ok: true, ping: true, timestamp: Date.now() })
      }
    } catch (e) {
      // ignore parse errors for ping
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 })

    // Support image-only requests (regenerate a single image) to avoid calling the chat model.
    const isImageOnly = (body as any).action === "image-only"

    let parsed: any = {}
    if (!isImageOnly) {
      // 1) Ask the chat model to produce metadata + image prompts
      parsed = await callChatGenerate(body, apiKey)
    }

    // Respect overrides if front-end provided a custom prompt, or use parsed prompts
    const finalPicturePrompt = body.picturePrompt?.trim() || parsed.picturePrompt || ""
    const finalCoverPrompt = body.coverPrompt?.trim() || parsed.coverPrompt || ""

    // 2) Generate images (may fail if account not enabled). Capture errors so UI can show friendly message.
    let pictureImage: string | null = null
    let coverImage: string | null = null
    let pictureError: string | null = null
    let coverError: string | null = null

    try {
      // If this is an image-only request and imageType specifies picture, only generate picture
      if (isImageOnly && (body as any).imageType === "cover") {
        // skip picture generation
        pictureImage = null
      } else {
        pictureImage = await generateImage(finalPicturePrompt || parsed.picturePrompt || body.description, apiKey)
      }
    } catch (e: any) {
      console.error("picture generation error", e)
      pictureImage = null
      pictureError = String(e?.message || e)
    }

    try {
      // request cover/banner at desired size (e.g. 1500x500). The image helper will map this to
      // a supported API size and resize server-side if needed.
      if (isImageOnly && (body as any).imageType === "picture") {
        // skip cover generation
        coverImage = null
      } else {
        coverImage = await generateImage(finalCoverPrompt || parsed.coverPrompt || body.description, apiKey, (body as any).size || "1500x500")
      }
    } catch (e: any) {
      console.error("cover generation error", e)
      coverImage = null
      coverError = String(e?.message || e)
    }

    // Provide sensible fallbacks for images when generation fails
    const pictureFallback = 
      
      "/degen-cat-barista-logo-circular-mascot.jpg"
    const coverFallback = "/cozy-coffee-shop-banner-degen-aesthetic.jpg"

    // normalize social fields and a few common variants so front-end can read them easily
    const suggestedXBio =
      parsed.suggestedXBio || parsed.suggested_x_bio || parsed.suggested_xbio || parsed.suggestedX || parsed.suggested_bio || ""
    const suggestedFirstTweet =
      parsed.suggestedFirstTweet || parsed.suggested_first_tweet || parsed.suggested_firstTweet || parsed.firstTweet || parsed.suggestedTweet || ""

    const resp = {
      tokenName: parsed.tokenName || parsed.name || "",
      symbol: parsed.symbol || parsed.ticker || "",
      shortDescription: parsed.shortDescription || parsed.short_description || "",
      longDescription: parsed.longDescription || parsed.long_description || "",
      // if image generation failed, return a local fallback so the UI still shows an image
      pictureImage: pictureImage || pictureFallback,
      coverImage: coverImage || coverFallback,
      // return the prompts so front-end can store/regenerate them
      picturePrompt: finalPicturePrompt || parsed.picturePrompt || "",
      coverPrompt: finalCoverPrompt || parsed.coverPrompt || "",
      pictureError,
      coverError,
      suggestedXBio,
      suggestedFirstTweet,
      rawParsed: parsed,
    }

    return NextResponse.json(resp)
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 })
  }
}

// Respond to preflight OPTIONS from browsers
export async function OPTIONS(req: Request) {
  return new Response(null, { status: 200 })
}
