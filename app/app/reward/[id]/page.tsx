"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function RewardDetailPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [unclaimed, setUnclaimed] = useState(0.2343)
  const [activeTab, setActiveTab] = useState("7D")

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

          {/* Chart Placeholder */}
          <div className="h-48 md:h-64 bg-muted rounded-xl flex items-center justify-center mb-6">
            <div className="text-center text-muted-foreground">
              <div className="text-sm">Chart visualization</div>
              <div className="text-xs mt-2">Rewards accumulated over time</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 justify-center">
            {["1D", "7D", "30D"].map((tab) => (
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
