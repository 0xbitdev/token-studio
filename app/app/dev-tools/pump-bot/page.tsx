"use client"

import { AccessControl } from "@/components/access-control"
import { AppShell } from "@/components/layout/app-shell"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Rocket, Play, Square, TrendingUp, Settings, Zap, DollarSign } from "lucide-react"
import { useState } from "react"

export default function PumpBotPage() {
  const [isRunning, setIsRunning] = useState(false)

  return (
    <AppShell>
      <AccessControl pageName="devtools">
        <div className="max-w-[1600px] mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-3">
              <Rocket className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">PumpBot</h1>
              <p className="text-muted-foreground mt-1">Automated volume generation and price pumping</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Configuration */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-6">
                  <Settings className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">Pump Configuration</h2>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="token-address">Token Address</Label>
                    <Input id="token-address" placeholder="Enter your token address" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="buy-amount-min">Min Buy Amount (SOL)</Label>
                      <Input id="buy-amount-min" type="number" placeholder="0.01" step="0.001" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="buy-amount-max">Max Buy Amount (SOL)</Label>
                      <Input id="buy-amount-max" type="number" placeholder="0.05" step="0.001" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="trades-per-hour">Trades per Hour</Label>
                      <Input id="trades-per-hour" type="number" placeholder="10" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="target-mcap">Target Market Cap ($)</Label>
                      <Input id="target-mcap" type="number" placeholder="100000" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="wallets-count">Number of Wallets</Label>
                    <Input id="wallets-count" type="number" placeholder="5" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pump-budget">Pump Budget (SOL)</Label>
                    <Input id="pump-budget" type="number" placeholder="5.0" step="0.1" />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="auto-sell" className="rounded" />
                      <Label htmlFor="auto-sell" className="cursor-pointer">
                        Auto-sell on target (take profit)
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="organic-pattern" className="rounded" defaultChecked />
                      <Label htmlFor="organic-pattern" className="cursor-pointer">
                        Mimic organic trading patterns
                      </Label>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={() => setIsRunning(!isRunning)}
                      className={`flex-1 ${isRunning ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                    >
                      {isRunning ? (
                        <>
                          <Square className="w-4 h-4 mr-2" />
                          Stop PumpBot
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Start PumpBot
                        </>
                      )}
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Preview Strategy
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Recent Activity */}
              <Card className="p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                <div className="space-y-3">
                  {[
                    { type: "BUY", wallet: "Wallet 3", amount: "0.023 SOL", price: "$0.0045", time: "1m ago" },
                    { type: "BUY", wallet: "Wallet 1", amount: "0.037 SOL", price: "$0.0043", time: "4m ago" },
                    { type: "SELL", wallet: "Wallet 5", amount: "0.015 SOL", price: "$0.0044", time: "7m ago" },
                    { type: "BUY", wallet: "Wallet 2", amount: "0.042 SOL", price: "$0.0042", time: "11m ago" },
                  ].map((activity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold ${
                            activity.type === "BUY" ? "bg-green-500/20 text-green-600" : "bg-red-500/20 text-red-600"
                          }`}
                        >
                          {activity.type}
                        </span>
                        <div>
                          <div className="font-semibold">{activity.wallet}</div>
                          <div className="text-sm text-muted-foreground">{activity.time}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-sm font-semibold">{activity.amount}</div>
                        <div className="text-xs text-muted-foreground">{activity.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Stats */}
            <div className="space-y-6">
              <Card className="p-6 shadow-lg">
                <h3 className="text-lg font-bold mb-4">Pump Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Current Price</span>
                    <span className="font-bold text-lg">$0.0045</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Price Change</span>
                    <span className="font-bold text-lg text-green-600">+28.5%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Market Cap</span>
                    <span className="font-bold text-lg">$87.2K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total Trades</span>
                    <span className="font-bold text-lg">243</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Volume 24h</span>
                    <span className="font-bold text-lg">$12.4K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Budget Used</span>
                    <span className="font-bold text-lg">2.8 / 5.0 SOL</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-green-500/20 p-2">
                    <Rocket className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">PumpBot Active</h3>
                    <p className="text-sm text-muted-foreground">Actively pumping your token with organic patterns</p>
                    <div className="mt-3 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Next trade in 2m 15s</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-lg">
                <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Chart
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Emergency Sell All
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
