"use client"

import { AppShell } from "@/components/layout/app-shell"
import { Card } from "@/components/ui/card"
import { TrendingUp, Coins, Sparkles, Users, ArrowUpRight, ArrowDownRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { WalletGuard } from "@/components/wallet-guard"

const stats = [
  {
    title: "Total Created",
    value: "42",
    change: "+12",
    trend: "up",
    icon: Coins,
  },
  {
    title: "Total Deploy",
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

const launchpads = [
  { name: "Pump.fun", logo: "/launchpads/pumpfun.png", url: "https://pump.fun", available: true },
  { name: "Moonit", logo: "/launchpads/moonit.png", url: "https://moonshot.com", available: false },
  { name: "Bonk", logo: "/launchpads/bonk.png", url: "https://bonk.com", available: false },
  { name: "Heaven", logo: "/launchpads/heaven.png", url: "https://heaven.com", available: false },
  { name: "Believe", logo: "/launchpads/belive.png", url: "https://believe.com", available: false },
  { name: "Boop", logo: "/launchpads/boop.png", url: "https://boop.com", available: false },
  { name: "Bags", logo: "/launchpads/bags.png", url: "https://bags.com", available: false },
  { name: "Jupiter", logo: "/launchpads/jup.png", url: "https://jup.ag", available: false },
]

export default function DashboardPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("Pump.fun")

  return (
    <WalletGuard>
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
                    <p className="font-medium text-muted-foreground uppercase tracking-wide text-xs">{stat.title}</p>
                    <p className="font-bold text-2xl">{stat.value}</p>
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
                  <div className="rounded-xl bg-primary/10 p-3 px-1.5 py-1.5">
                    <stat.icon className="text-primary w-3.5 h-3.5" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card className="p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mx-0">
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

            <div className="border-t border-border pt-0 mb-4 mt-2.5">
              <h3 className="text-lg font-bold mb-4 mt-2">Start Launch to Platform</h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                {launchpads.map((launchpad) => (
                  <button
                    key={launchpad.name}
                    onClick={() => {
                      if (launchpad.available) {
                        setSelectedPlatform(launchpad.name)
                      }
                    }}
                    disabled={!launchpad.available}
                    className={`flex flex-col items-center gap-2 group relative ${
                      !launchpad.available ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    title={launchpad.available ? launchpad.name : `${launchpad.name} - Coming Soon`}
                  >
                    <div
                      className={`w-14 h-14 rounded-full overflow-hidden transition-all shadow-md relative ${
                        selectedPlatform === launchpad.name
                          ? "ring-4 ring-green-500 scale-110"
                          : launchpad.available
                            ? "group-hover:scale-110 bg-muted"
                            : "grayscale opacity-40 bg-muted"
                      }`}
                    >
                      <Image
                        src={launchpad.logo || "/placeholder.svg"}
                        alt={launchpad.name}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span
                      className={`text-xs text-center transition-colors ${
                        selectedPlatform === launchpad.name
                          ? "text-green-600 font-semibold"
                          : launchpad.available
                            ? "text-muted-foreground group-hover:text-foreground"
                            : "text-muted-foreground/50"
                      }`}
                    >
                      {launchpad.name}
                    </span>
                    {!launchpad.available && (
                      <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground/70 whitespace-nowrap">
                        Coming Soon
                      </span>
                    )}
                  </button>
                ))}
              </div>
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
    </WalletGuard>
  )
}
