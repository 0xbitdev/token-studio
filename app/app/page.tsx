"use client"

import { AppShell } from "@/components/layout/app-shell"
import { Card } from "@/components/ui/card"
import { TrendingUp, Coins, Sparkles, Users, ArrowUpRight, ArrowDownRight } from "lucide-react"

const stats = [
  {
    title: "Total Tokens Created",
    value: "42",
    change: "+12",
    trend: "up",
    icon: Coins,
  },
  {
    title: "Total Deploy Value",
    value: "124.5 SOL",
    change: "+23.4 SOL",
    trend: "up",
    icon: TrendingUp,
  },
  {
    title: "Active Tokens",
    value: "38",
    change: "+5",
    trend: "up",
    icon: Sparkles,
  },
  {
    title: "Total Reach",
    value: "15.2K",
    change: "-2.1K",
    trend: "down",
    icon: Users,
  },
]

const recentTokens = [
  { name: "Degen Cat Barista", symbol: "DCAT", value: "12.5 SOL", status: "Active", change: "+45%" },
  { name: "Moon Vibes", symbol: "MOON", value: "8.2 SOL", status: "Active", change: "+32%" },
  { name: "Doge Sequel", symbol: "DOGE2", value: "15.7 SOL", status: "Active", change: "+78%" },
  { name: "AI Prophet", symbol: "AIPR", value: "6.3 SOL", status: "Active", change: "+21%" },
  { name: "Solana Wizard", symbol: "SWIZ", value: "9.8 SOL", status: "Active", change: "+56%" },
]

const quickActions = [
  { name: "Generate New Token", href: "/app/generate", color: "bg-green-500" },
  { name: "View Token History", href: "/app/history", color: "bg-blue-500" },
  { name: "Create Content", href: "/app/content", color: "bg-purple-500" },
  { name: "Trending Narratives", href: "/app/trending", color: "bg-orange-500" },
]

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back! Here's your token creation overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="p-6 shadow-lg">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <div className="flex items-center gap-1">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-600" />
                    )}
                    <span
                      className={`text-sm font-semibold ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="rounded-xl bg-primary/10 p-3">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {quickActions.map((action) => (
              <a
                key={action.name}
                href={action.href}
                className={`${action.color} text-white rounded-xl p-4 hover:opacity-90 transition-opacity text-center font-semibold`}
              >
                {action.name}
              </a>
            ))}
          </div>
        </Card>

        {/* Recent Tokens Table */}
        <Card className="p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Recent Tokens</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Token
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide hidden sm:table-cell">
                    Symbol
                  </th>
                  <th className="text-right py-3 px-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Value
                  </th>
                  <th className="text-right py-3 px-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell">
                    Status
                  </th>
                  <th className="text-right py-3 px-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Change
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentTokens.map((token) => (
                  <tr key={token.symbol} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-2">
                      <div className="font-semibold">{token.name}</div>
                      <div className="text-sm text-muted-foreground sm:hidden">{token.symbol}</div>
                    </td>
                    <td className="py-4 px-2 text-muted-foreground hidden sm:table-cell">{token.symbol}</td>
                    <td className="py-4 px-2 text-right font-mono">{token.value}</td>
                    <td className="py-4 px-2 text-right hidden md:table-cell">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        {token.status}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <span className="text-green-600 font-semibold">{token.change}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AppShell>
  )
}
