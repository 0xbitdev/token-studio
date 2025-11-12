"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"

const chartData = {
  Realtime: [
    { time: "Now", reward: 0.25 },
    { time: "+1m", reward: 0.25 },
    { time: "+2m", reward: 0.26 },
    { time: "+3m", reward: 0.25 },
    { time: "+4m", reward: 0.27 },
    { time: "+5m", reward: 0.28 },
  ],
  "1H": [
    { time: "00m", reward: 0.05 },
    { time: "10m", reward: 0.07 },
    { time: "20m", reward: 0.11 },
    { time: "30m", reward: 0.15 },
    { time: "40m", reward: 0.19 },
    { time: "50m", reward: 0.23 },
    { time: "60m", reward: 0.25 },
  ],
  "4H": [
    { time: "0h", reward: 0.05 },
    { time: "1h", reward: 0.08 },
    { time: "2h", reward: 0.12 },
    { time: "3h", reward: 0.18 },
    { time: "4h", reward: 0.25 },
  ],
  "12H": [
    { time: "0h", reward: 0.05 },
    { time: "2h", reward: 0.07 },
    { time: "4h", reward: 0.11 },
    { time: "6h", reward: 0.14 },
    { time: "8h", reward: 0.18 },
    { time: "10h", reward: 0.22 },
    { time: "12h", reward: 0.25 },
  ],
  "1D": [
    { time: "00:00", reward: 0.05 },
    { time: "04:00", reward: 0.08 },
    { time: "08:00", reward: 0.12 },
    { time: "12:00", reward: 0.18 },
    { time: "16:00", reward: 0.22 },
    { time: "20:00", reward: 0.23 },
    { time: "24:00", reward: 0.25 },
  ],
  "7D": [
    { time: "Mon", reward: 0.05 },
    { time: "Tue", reward: 0.09 },
    { time: "Wed", reward: 0.14 },
    { time: "Thu", reward: 0.17 },
    { time: "Fri", reward: 0.2 },
    { time: "Sat", reward: 0.22 },
    { time: "Sun", reward: 0.25 },
  ],
  "30D": [
    { time: "Week 1", reward: 0.05 },
    { time: "Week 2", reward: 0.12 },
    { time: "Week 3", reward: 0.18 },
    { time: "Week 4", reward: 0.25 },
  ],
}

export default function RewardDetailPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [unclaimed, setUnclaimed] = useState(0.2343)
  const [activeTab, setActiveTab] = useState<"Realtime" | "1H" | "4H" | "12H" | "1D" | "7D" | "30D">("7D")

  const handleClaim = () => {
    setUnclaimed(0)
    toast({
      title: "✅ Reward claimed successfully",
      description: "Reward claimed to your wallet (demo only)",
    })
  }

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.push("/app/history")} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Reward $EXAMP
        </Button>

        {/* Reward Summary Card */}
        <Card className="bg-muted p-6 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">$324.45</div>
              <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">
                1.2343 SOL (Total Reward)
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">${(unclaimed * 147).toFixed(2)}</div>
              <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">
                {unclaimed.toFixed(4)} SOL (Unclaimed)
              </div>
            </div>
            <div className="flex items-center col-span-full sm:col-span-2 md:col-span-1">
              <Button
                onClick={handleClaim}
                disabled={unclaimed === 0}
                className="w-full rounded-full bg-primary hover:bg-[#22C55E]"
                size="lg"
              >
                {unclaimed === 0 ? "No Rewards to Claim" : "Claim Reward"}
              </Button>
            </div>
          </div>
        </Card>

        {/* Chart Card */}
        <Card className="p-6">
          <h3 className="text-lg md:text-xl font-bold mb-6 uppercase tracking-wide">REWARD OVER TIME</h3>

          <div className="h-64 md:h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData[activeTab]} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                <defs>
                  <linearGradient id="rewardGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#16A34A" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#16A34A" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="0"
                  stroke="hsl(var(--border))"
                  strokeOpacity={0.3}
                  vertical={false}
                  horizontal={true}
                />
                <XAxis
                  dataKey="time"
                  tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                  stroke="hsl(var(--border))"
                  strokeOpacity={0.3}
                  tickLine={false}
                  axisLine={{ strokeOpacity: 0.3 }}
                  dy={10}
                />
                <YAxis
                  tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                  stroke="hsl(var(--border))"
                  strokeOpacity={0.3}
                  tickLine={false}
                  axisLine={false}
                  dx={-10}
                  tickFormatter={(value) => `${value.toFixed(2)}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Area
                  type="monotone"
                  dataKey="reward"
                  stroke="#16A34A"
                  strokeWidth={2.5}
                  fill="url(#rewardGradient)"
                  dot={{
                    fill: "#000000",
                    strokeWidth: 0,
                    r: 4,
                  }}
                  activeDot={{
                    r: 6,
                    fill: "#16A34A",
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {(["Realtime", "1H", "4H", "12H", "1D", "7D", "30D"] as const).map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab(tab)}
                className="rounded-full"
              >
                {tab}
              </Button>
            ))}
          </div>
        </Card>

        {/* Token Details */}
        <Card className="p-6">
          <h3 className="text-lg md:text-xl font-bold mb-4 uppercase tracking-wide">TOKEN DETAILS</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Token Name</span>
              <span className="font-medium">Degen Cat Barista</span>
            </div>
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Symbol</span>
              <span className="font-medium">$EXAMP</span>
            </div>
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Market Cap</span>
              <span className="font-medium">$1.2M</span>
            </div>
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Status</span>
              <span className="font-medium text-primary">Active</span>
            </div>
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Created Date</span>
              <span className="font-medium">2024-01-15</span>
            </div>
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Bonded</span>
              <span className="font-medium text-primary">Yes</span>
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  )
}
