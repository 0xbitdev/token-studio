"use client"
import React, { useEffect, useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/lib/wallet-context"
import { toast } from "sonner"
import { ExternalLink } from "lucide-react"

type DeployRow = {
  id: number
  public_key: string | null
  status: string | null
  mint: string | null
  txid: string | null
  payload: any
  created_at: string
}

export default function DeploysPage() {
  const wallet = useWallet()
  const [rows, setRows] = useState<DeployRow[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [total, setTotal] = useState(0)
  const [sortBy, setSortBy] = useState("created_at")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")

  useEffect(() => {
    if (!wallet.connected || !wallet.publicKey) return
    const pk = wallet.publicKey
    setLoading(true)
    const params = new URLSearchParams()
    params.set("publicKey", pk)
    params.set("page", String(page))
    params.set("limit", String(limit))
    params.set("sortBy", sortBy)
    params.set("sortDir", sortDir)

    fetch(`/api/deploys?${params.toString()}`)
      .then(async (res) => {
        const json = await res.json()
        if (!res.ok) throw new Error(json?.error || "Failed to load deploys")
        setRows(json.rows || [])
        setTotal(json.total || 0)
      })
      .catch((err) => {
        console.error(err)
        toast.error("Failed to load deploys", { description: String(err?.message || err) })
      })
      .finally(() => setLoading(false))
  }, [wallet.connected, wallet.publicKey, page, limit, sortBy, sortDir])

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Deploys</h1>
          <div className="text-sm text-muted-foreground">Showing deploys for connected wallet</div>
        </div>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-4 gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm text-muted-foreground">Sort</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-2 py-1 rounded border">
                <option value="created_at">Created</option>
                <option value="name">Name</option>
                <option value="status">Status</option>
                <option value="mint">Mint</option>
              </select>
              <button
                className="px-2 py-1 rounded border ml-2"
                onClick={() => setSortDir((s) => (s === "asc" ? "desc" : "asc"))}
              >
                {sortDir === "asc" ? "↑" : "↓"}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-muted-foreground">Page size</label>
              <select value={limit} onChange={(e) => { setLimit(Number(e.target.value)); setPage(1) }} className="px-2 py-1 rounded border">
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : rows.length === 0 ? (
            <div className="text-sm text-muted-foreground">No deploys found for your wallet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-bold uppercase">Created</th>
                    <th className="px-4 py-2 text-left text-xs font-bold uppercase">Logo</th>
                    <th className="px-4 py-2 text-left text-xs font-bold uppercase">Mint / Address</th>
                    <th className="px-4 py-2 text-left text-xs font-bold uppercase">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-bold uppercase">Tx</th>
                    <th className="px-4 py-2 text-left text-xs font-bold uppercase">Name</th>
                    <th className="px-4 py-2 text-left text-xs font-bold uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {rows.map((r) => {
                    const logo = r.payload?.images?.logo || r.payload?.logo || r.payload?.image
                    const isDataUrl = typeof logo === "string" && logo.startsWith("data:")
                    return (
                      <tr key={r.id}>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{new Date(r.created_at).toLocaleString()}</td>
                        <td className="px-4 py-3">
                          {isDataUrl ? (
                            <img src={logo} alt="logo" className="w-10 h-10 rounded-full object-cover" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground">No</div>
                          )}
                        </td>
                        <td className="px-4 py-3 font-mono text-sm break-all">{r.mint || "-"}</td>
                        <td className="px-4 py-3">{r.status || "-"}</td>
                        <td className="px-4 py-3 font-mono text-sm break-all">{r.txid || "-"}</td>
                        <td className="px-4 py-3">{r.payload?.name || r.payload?.tokenName || "-"}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            {r.mint ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(`https://pump.fun/coin/${r.mint}`, "_blank")}
                              >
                                <div className="flex items-center gap-2">
                                  <ExternalLink className="w-4 h-4" />
                                  View
                                </div>
                              </Button>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination controls */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">Showing {(page-1)*limit + 1} - {Math.min(page*limit, total)} of {total}</div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 rounded border" onClick={() => setPage((p) => Math.max(1, p-1))} disabled={page <= 1}>
                Prev
              </button>
              <div className="px-3 py-1">Page {page}</div>
              <button className="px-3 py-1 rounded border" onClick={() => setPage((p) => p+1)} disabled={page*limit >= total}>
                Next
              </button>
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  )
}
