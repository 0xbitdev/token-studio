"use client"

import { AccessControl } from "@/components/access-control"
import { AppShell } from "@/components/layout/app-shell"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Activity, Zap, BarChart3, Settings2, Play, Pause } from "lucide-react"
import { useState } from "react"

export default function MarketMakerPage() {
  const [isRunning, setIsRunning] = useState(false)

  return (
    <AppShell>
      <AccessControl pageName="devtools">
        <div className="max-w-[1600px] mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-3">
              <Activity className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Market Maker</h1>
              <p className="text-muted-foreground mt-1">Provide liquidity and maintain healthy trading volume</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Configuration */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-6">
                  <Settings2 className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">Market Making Configuration</h2>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="mm-token">Token Address</Label>
                    <Input id="mm-token" placeholder="Enter token contract address" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="buy-budget">Buy Budget (SOL)</Label>
                      <Input id="buy-budget" type="number" placeholder="5" step="0.1" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sell-budget">Sell Budget (Tokens)</Label>
                      <Input id="sell-budget" type="number" placeholder="1000000" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="spread">Spread (%)</Label>
                      <Input id="spread" type="number" placeholder="2" step="0.1" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="trade-size">Trade Size (SOL)</Label>
                      <Input id="trade-size" type="number" placeholder="0.1" step="0.01" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="min-delay">Min Delay (seconds)</Label>
                      <Input id="min-delay" type="number" placeholder="30" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-delay">Max Delay (seconds)</Label>
                      <Input id="max-delay" type="number" placeholder="180" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max-position">Max Position Size (SOL)</Label>
                    <Input id="max-position" type="number" placeholder="10" />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={() => setIsRunning(!isRunning)}
                      className={`flex-1 ${isRunning ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                    >
                      {isRunning ? (
                        <>
                          <Pause className="w-4 h-4 mr-2" />
                          Stop Market Making
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Start Market Making
                        </>
                      )}
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Simulate Strategy
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Recent Trades */}
              <Card className="p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-4">Recent Market Making Trades</h2>
                <div className="space-y-3">
                  {[
                    { type: "BUY", amount: "0.15 SOL", price: "0.00045", tokens: "333,333", time: "1m ago" },
                    { type: "SELL", amount: "0.18 SOL", price: "0.00048", tokens: "375,000", time: "3m ago" },
                    { type: "BUY", amount: "0.12 SOL", price: "0.00043", tokens: "279,069", time: "7m ago" },
                    { type: "SELL", amount: "0.14 SOL", price: "0.00047", tokens: "297,872", time: "12m ago" },
                  ].map((trade, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                      <div className="flex items-center gap-4">
                        <div
                          className={`px-3 py-1 rounded-lg font-bold text-sm ${
                            trade.type === "BUY"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {trade.type}
                        </div>
                        <div>
                          <div className="font-semibold">{trade.amount}</div>
                          <div className="text-sm text-muted-foreground">{trade.tokens} tokens</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-sm">{trade.price}</div>
                        <div className="text-sm text-muted-foreground">{trade.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Stats */}
            <div className="space-y-6">
              <Card className="p-6 shadow-lg">
                <h3 className="text-lg font-bold mb-4">Market Making Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total Trades</span>
                    <span className="font-bold text-lg">127</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Volume Generated</span>
                    <span className="font-bold text-lg">45.8 SOL</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Profit from Spread</span>
                    <span className="font-bold text-lg text-green-600">+2.3 SOL</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Avg Spread</span>
                    <span className="font-bold text-lg">1.8%</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-purple-500/20 p-2">
                    <Zap className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Bot Active</h3>
                    <p className="text-sm text-muted-foreground">
                      Automatically placing buy and sell orders to maintain liquidity
                    </p>
                    <div className="mt-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Uptime</span>
                        <span className="font-semibold">5h 47m</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-lg">
                <h3 className="text-lg font-bold mb-4">Position Overview</h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="text-sm text-muted-foreground">SOL Balance</div>
                    <div className="font-bold text-lg">3.4 SOL</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="text-sm text-muted-foreground">Token Balance</div>
                    <div className="font-bold text-lg">1.2M tokens</div>
                  </div>
                  <div className="p-3 rounded-lg bg-green-500/10">
                    <div className="text-sm text-muted-foreground">Net P/L</div>
                    <div className="font-bold text-lg text-green-600">+2.3 SOL</div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-lg">
                <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Trading History
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Settings2 className="w-4 h-4 mr-2" />
                    Strategy Presets
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
