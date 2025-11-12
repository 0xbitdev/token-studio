"use client"

import { AccessControl } from "@/components/access-control"
import { AppShell } from "@/components/layout/app-shell"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TrendingUp, Calendar, BarChart3, Play, Pause } from "lucide-react"
import { useState } from "react"

export default function DCAPage() {
  const [isActive, setIsActive] = useState(false)

  return (
    <AppShell>
      <AccessControl pageName="devtools">
        <div className="max-w-[1600px] mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-3">
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">DCA (Dollar Cost Average)</h1>
              <p className="text-muted-foreground mt-1">Automate your token purchases with scheduled buys</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Configuration */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">DCA Strategy Setup</h2>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="token-address">Token Address</Label>
                    <Input id="token-address" placeholder="Enter token contract address" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount per Buy (SOL)</Label>
                      <Input id="amount" type="number" placeholder="0.5" step="0.01" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="interval">Interval</Label>
                      <select
                        id="interval"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option>Every 15 minutes</option>
                        <option>Every 30 minutes</option>
                        <option>Every 1 hour</option>
                        <option>Every 4 hours</option>
                        <option>Every 12 hours</option>
                        <option>Every 24 hours</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="total-budget">Total Budget (SOL)</Label>
                      <Input id="total-budget" type="number" placeholder="10" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slippage-dca">Slippage (%)</Label>
                      <Input id="slippage-dca" type="number" placeholder="5" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stop-loss">Stop Loss (%)</Label>
                    <Input id="stop-loss" type="number" placeholder="20" />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={() => setIsActive(!isActive)}
                      className={`flex-1 ${isActive ? "bg-orange-600 hover:bg-orange-700" : "bg-green-600 hover:bg-green-700"}`}
                    >
                      {isActive ? (
                        <>
                          <Pause className="w-4 h-4 mr-2" />
                          Pause DCA
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Start DCA
                        </>
                      )}
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Save as Template
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Active DCA Strategies */}
              <Card className="p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-4">Active DCA Strategies</h2>
                <div className="space-y-3">
                  {[
                    { token: "BONK", bought: "3/10", spent: "1.5 SOL", avg: "0.00012", next: "4h 23m" },
                    { token: "WIF", bought: "7/20", spent: "3.5 SOL", avg: "0.0045", next: "1h 12m" },
                    { token: "POPCAT", bought: "5/15", spent: "2.5 SOL", avg: "0.0089", next: "2h 45m" },
                  ].map((strategy, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-bold text-lg">{strategy.token}</div>
                        <div className="text-sm px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          Active
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <div>
                          <div className="text-muted-foreground">Progress</div>
                          <div className="font-semibold">{strategy.bought}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Spent</div>
                          <div className="font-semibold">{strategy.spent}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Avg Price</div>
                          <div className="font-semibold font-mono">{strategy.avg}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Next Buy</div>
                          <div className="font-semibold">{strategy.next}</div>
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
                <h3 className="text-lg font-bold mb-4">DCA Performance</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Active Strategies</span>
                    <span className="font-bold text-lg">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total Invested</span>
                    <span className="font-bold text-lg">7.5 SOL</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Current Value</span>
                    <span className="font-bold text-lg">9.2 SOL</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total P/L</span>
                    <span className="font-bold text-lg text-green-600">+1.7 SOL</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-blue-500/20 p-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">DCA Benefits</h3>
                    <p className="text-sm text-muted-foreground">
                      Reduce timing risk by spreading purchases over time and averaging your entry price
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-lg">
                <h3 className="text-lg font-bold mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-green-500/10">
                    <div className="text-sm text-muted-foreground">Best Performer</div>
                    <div className="font-bold">WIF (+45%)</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="text-sm text-muted-foreground">Total Buys</div>
                    <div className="font-bold">15</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="text-sm text-muted-foreground">Next Buy In</div>
                    <div className="font-bold">1h 12m</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </AccessControl>
    </AppShell>
  )
}
