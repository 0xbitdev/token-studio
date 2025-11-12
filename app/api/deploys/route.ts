import { NextResponse } from "next/server"

// Force Node runtime on Vercel for DB access via `pg`
export const runtime = "nodejs"

import { Client } from "pg"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const publicKey = searchParams.get("publicKey")

    if (!publicKey) {
      return NextResponse.json({ error: "Missing publicKey query parameter" }, { status: 400 })
    }

    // pagination & sorting
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "10", 10)))
    const offset = (page - 1) * limit
    const sortByRaw = (searchParams.get("sortBy") || "created_at").toLowerCase()
    const sortDir = (searchParams.get("sortDir") || "desc").toLowerCase() === "asc" ? "ASC" : "DESC"

    // whitelist sort columns: created_at, status, mint, name (payload->>'name')
    const allowedSort = new Set(["created_at", "status", "mint", "name"])
    const sortBy = allowedSort.has(sortByRaw) ? sortByRaw : "created_at"

    const DATABASE_URL = process.env.DATABASE_URL
    if (!DATABASE_URL) {
      return NextResponse.json({ error: "DATABASE_URL not configured on server" }, { status: 501 })
    }

    const client = new Client({ connectionString: DATABASE_URL })
    await client.connect()
    try {
      // total count
      const countRes = await client.query(`SELECT count(*) FROM pumpfun_deploys WHERE public_key = $1`, [publicKey])
      const total = parseInt(countRes.rows[0]?.count || "0", 10)

      // build order clause
      let orderClause = `ORDER BY created_at ${sortDir}`
      if (sortBy === "status") orderClause = `ORDER BY status ${sortDir}`
      else if (sortBy === "mint") orderClause = `ORDER BY mint ${sortDir}`
      else if (sortBy === "name") orderClause = `ORDER BY (payload->>'name') ${sortDir}`

      const q = `SELECT id, public_key, status, mint, txid, payload, created_at FROM pumpfun_deploys WHERE public_key = $1 ${orderClause} LIMIT $2 OFFSET $3`
      const res = await client.query(q, [publicKey, limit, offset])
      return NextResponse.json({ ok: true, rows: res.rows, total, page, limit })
    } finally {
      await client.end()
    }
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 })
  }
}
