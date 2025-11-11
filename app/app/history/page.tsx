"use client"

import { AppShell } from "@/components/layout/app-shell"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Info, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const mockTokens = [
  {
    id: "examp",
    name: "Degen Cat Barista",
    symbol: "DCAT",
    createDate: "2024-01-15",
    mcap: "$1.2M",
    bonded: "Yes",
    reward: "1.23",
    status: "Active",
  },
  {
    id: "moon",
    name: "Moon Vibes",
    symbol: "MOON",
    createDate: "2024-01-10",
    mcap: "$850K",
    bonded: "Yes",
    reward: "0.89",
    status: "Active",
  },
  {
    id: "doge2",
    name: "Doge Sequel",
    symbol: "DOGE2",
    createDate: "2024-01-05",
    mcap: "$2.5M",
    bonded: "Yes",
    reward: "2.45",
    status: "Ended",
  },
]

export default function HistoryPage() {
  const router = useRouter()
  const totalReward = mockTokens.reduce((sum, token) => sum + Number.parseFloat(token.reward), 0)
  const totalUsd = (totalReward * 43.21).toFixed(2)

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">MY TOKENS</h1>
          <div className="text-right">
            <div className="text-sm text-muted-foreground uppercase tracking-wide mb-1">TOTAL CREATOR REWARD</div>
            <div className="text-2xl font-bold text-primary">
              {totalReward.toFixed(2)} SOL / ${totalUsd}
            </div>
          </div>
        </div>

        {/* Controls */}
        <Card className="p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Data below is sample only</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span>Sample data for demonstration</span>
            </div>
            <div className="w-full sm:w-auto">
              <Select defaultValue="latest">
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Sort by: Latest</SelectItem>
                  <SelectItem value="mcap">Highest MCAP</SelectItem>
                  <SelectItem value="reward">Highest Reward</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Desktop Table */}
        <div className="hidden lg:block">
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide">Name Tokens</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide">Symbol</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide">Create Date</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide">MCAP</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide">Bonded</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide">
                      Creator Reward (SOL)
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide">See</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {mockTokens.map((token) => (
                    <tr
                      key={token.id}
                      onClick={() => router.push(`/app/reward/${token.id}`)}
                      className="hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 font-medium">{token.name}</td>
                      <td className="px-6 py-4 text-muted-foreground">{token.symbol}</td>
                      <td className="px-6 py-4 text-muted-foreground">{token.createDate}</td>
                      <td className="px-6 py-4 font-medium">{token.mcap}</td>
                      <td className="px-6 py-4">
                        <span className={token.bonded === "Yes" ? "text-primary" : "text-muted-foreground"}>
                          {token.bonded}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-primary">{token.reward}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            token.status === "Active" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {token.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <ArrowRight className="w-5 h-5 text-muted-foreground" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {mockTokens.map((token) => (
            <Card
              key={token.id}
              onClick={() => router.push(`/app/reward/${token.id}`)}
              className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-lg">{token.name}</div>
                    <div className="text-sm text-muted-foreground">{token.symbol}</div>
                  </div>
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      token.status === "Active" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {token.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="text-muted-foreground">MCAP</div>
                    <div className="font-medium">{token.mcap}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Reward</div>
                    <div className="font-medium text-primary">{token.reward} SOL</div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="text-xs text-muted-foreground">{token.createDate}</div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
