"use client"

import { AccessControl } from "@/components/access-control"
import { AppShell } from "@/components/layout/app-shell"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowUp, Play, Square, TrendingUp, Settings, Clock } from "lucide-react"
import { useState } from "react"

export default function BumpBotPage() {
  const [isRunning, setIsRunning] = useState(false)

  return (
    <AppShell>
      <AccessControl pageName="devtools">
        <div className="max-w-[1600px] mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-3">
              <ArrowUp className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">BumpBot</h1>
              <p className="text-muted-foreground mt-1">Automatically bump your token to maintain visibility</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Configuration */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-6">
                  <Settings className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">Bump Configuration</h2>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="token-address">Token Address</Label>
                    <Input id="token-address" placeholder="Enter your token address" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bump-amount">Bump Amount (SOL)</Label>
                      <Input id="bump-amount" type="number" placeholder="0.01" step="0.001" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="interval">Bump Interval (minutes)</Label>
                      <Input id="interval" type="number" placeholder="5" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="min-interval">Min Interval (minutes)</Label>
                      <Input id="min-interval" type="number" placeholder="3" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-interval">Max Interval (minutes)</Label>
                      <Input id="max-interval" type="number" placeholder="7" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="daily-budget">Daily Budget (SOL)</Label>
                    <Input id="daily-budget" type="number" placeholder="1.0" step="0.1" />
                  </div>

                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="randomize" className="rounded" />
                    <Label htmlFor="randomize" className="cursor-pointer">
                      Randomize bump amounts (±20%)
                    </Label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={() => setIsRunning(!isRunning)}
                      className={`flex-1 ${isRunning ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                    >
                      {isRunning ? (
                        <>
                          <Square className="w-4 h-4 mr-2" />
                          Stop BumpBot
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Start BumpBot
                        </>
                      )}
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Save Configuration
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Recent Bumps */}
              <Card className="p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-4">Recent Bumps</h2>
                <div className="space-y-3">
                  {[
                    { time: "2m ago", amount: "0.012 SOL", rank: "#12 → #8", tx: "4x...7k9" },
                    { time: "7m ago", amount: "0.009 SOL", rank: "#15 → #12", tx: "3k...2m1" },
                    { time: "12m ago", amount: "0.011 SOL", rank: "#18 → #15", tx: "9j...5n3" },
                    { time: "17m ago", amount: "0.010 SOL", rank: "#21 → #18", tx: "2h...8p7" },
                  ].map((bump, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div>
                        <div className="font-semibold text-green-600">{bump.rank}</div>
                        <div className="text-sm text-muted-foreground">{bump.time}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-sm font-semibold">{bump.amount}</div>
                        <div className="text-xs text-muted-foreground">{bump.tx}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Stats */}
            <div className="space-y-6">
              <Card className="p-6 shadow-lg">
                <h3 className="text-lg font-bold mb-4">Bump Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Current Rank</span>
                    <span className="font-bold text-lg text-green-600">#8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total Bumps</span>
                    <span className="font-bold text-lg">147</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total Spent</span>
                    <span className="font-bold text-lg">1.52 SOL</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Avg Rank</span>
                    <span className="font-bold text-lg">#12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Budget Used Today</span>
                    <span className="font-bold text-lg">0.34 / 1.0 SOL</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-green-500/20 p-2">
                    <ArrowUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">BumpBot Active</h3>
                    <p className="text-sm text-muted-foreground">Automatically maintaining your token's visibility</p>
                    <div className="mt-3 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Next bump in 3m 42s</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-lg">
                <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Rankings
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <ArrowUp className="w-4 h-4 mr-2" />
                    Manual Bump
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </AccessControl>
    </AppShell>
  )
}
