"use client"

import { AccessControl } from "@/components/access-control"
import { AppShell } from "@/components/layout/app-shell"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Target, Zap, Clock, TrendingUp, Settings } from "lucide-react"
import { useState } from "react"

export default function SnipeDevPage() {
  const [isMonitoring, setIsMonitoring] = useState(false)

  return (
    <AppShell>
      <AccessControl pageName="devtools">
        <div className="max-w-[1600px] mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-3">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Snipe Dev</h1>
              <p className="text-muted-foreground mt-1">Monitor and snipe new token launches on Pump.fun</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Configuration */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-6">
                  <Settings className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">Snipe Configuration</h2>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="buy-amount">Buy Amount (SOL)</Label>
                      <Input id="buy-amount" type="number" placeholder="0.1" step="0.01" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slippage">Slippage (%)</Label>
                      <Input id="slippage" type="number" placeholder="10" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="min-liquidity">Min Liquidity (SOL)</Label>
                      <Input id="min-liquidity" type="number" placeholder="5" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-buy-tax">Max Buy Tax (%)</Label>
                      <Input id="max-buy-tax" type="number" placeholder="5" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="keywords">Filter Keywords (comma separated)</Label>
                    <Input id="keywords" placeholder="degen, moon, based" />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={() => setIsMonitoring(!isMonitoring)}
                      className={`flex-1 ${isMonitoring ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                    >
                      {isMonitoring ? (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          Stop Monitoring
                        </>
                      ) : (
                        <>
                          <Target className="w-4 h-4 mr-2" />
                          Start Monitoring
                        </>
                      )}
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Test Configuration
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Recent Snipes */}
              <Card className="p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-4">Recent Snipes</h2>
                <div className="space-y-3">
                  {[
                    { token: "DEGEN CAT", entry: "0.05 SOL", current: "0.12 SOL", pnl: "+140%", time: "2m ago" },
                    { token: "MOON SHOT", entry: "0.1 SOL", current: "0.18 SOL", pnl: "+80%", time: "15m ago" },
                    { token: "BASED TOKEN", entry: "0.08 SOL", current: "0.06 SOL", pnl: "-25%", time: "1h ago" },
                  ].map((snipe, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div>
                        <div className="font-semibold">{snipe.token}</div>
                        <div className="text-sm text-muted-foreground">{snipe.time}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-sm">
                          {snipe.entry} → {snipe.current}
                        </div>
                        <div
                          className={`text-sm font-semibold ${snipe.pnl.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                        >
                          {snipe.pnl}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Stats */}
            <div className="space-y-6">
              <Card className="p-6 shadow-lg">
                <h3 className="text-lg font-bold mb-4">Snipe Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total Snipes</span>
                    <span className="font-bold text-lg">23</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Success Rate</span>
                    <span className="font-bold text-lg text-green-600">78%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total Profit</span>
                    <span className="font-bold text-lg text-green-600">+12.5 SOL</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Avg ROI</span>
                    <span className="font-bold text-lg">+145%</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-green-500/20 p-2">
                    <Zap className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Auto-Snipe Active</h3>
                    <p className="text-sm text-muted-foreground">
                      Monitoring Pump.fun for new launches matching your criteria
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Running for 2h 34m</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-lg">
                <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View All Positions
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Target className="w-4 h-4 mr-2" />
                    Preset Configs
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
