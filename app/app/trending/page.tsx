"use client"

import { AppShell } from "@/components/layout/app-shell"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Flame, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

const trendingNarratives = [
  {
    id: 1,
    title: "AI Agents Revolution",
    description:
      "AI-powered autonomous agents are taking over crypto. Tokens built around AI assistants, chatbots, and automated traders are exploding. The narrative centers on utility and real-world applications.",
    category: "AI & Tech",
    trendScore: 95,
    engagement: "12.5K",
    duration: "7 days",
    tags: ["AI", "Automation", "Utility", "Web3"],
    color: "from-purple-500 to-pink-500",
    status: "Hot",
  },
  {
    id: 2,
    title: "Degen Cat Culture",
    description:
      "The cozy degen aesthetic is trending hard. Cat-themed tokens with coffee, late-night coding, and overworked freelancer vibes are resonating with the builder community. Wholesome + degen = winning combo.",
    category: "Meme & Culture",
    trendScore: 88,
    engagement: "9.8K",
    duration: "5 days",
    tags: ["Cats", "Degen", "Community", "Wholesome"],
    color: "from-orange-500 to-yellow-500",
    status: "Rising",
  },
  {
    id: 3,
    title: "Solana DeFi Summer",
    description:
      "Solana's DeFi ecosystem is heating up with new protocols and yield opportunities. Tokens focusing on liquid staking, lending, and novel DeFi primitives are gaining massive traction.",
    category: "DeFi",
    trendScore: 92,
    engagement: "15.2K",
    duration: "10 days",
    tags: ["DeFi", "Solana", "Yield", "Staking"],
    color: "from-blue-500 to-cyan-500",
    status: "Hot",
  },
  {
    id: 4,
    title: "Gaming NFT Comeback",
    description:
      "Gaming tokens are making a comeback with actual playable games. The focus has shifted from speculation to fun gameplay, real economies, and community-driven development.",
    category: "Gaming",
    trendScore: 76,
    engagement: "6.4K",
    duration: "12 days",
    tags: ["Gaming", "NFT", "Play-to-Earn", "Community"],
    color: "from-green-500 to-emerald-500",
    status: "Steady",
  },
  {
    id: 5,
    title: "Eco & Social Impact",
    description:
      "Tokens with charitable missions and environmental focus are gaining mindshare. Real-world impact, transparency, and community-driven giving are the key themes driving this narrative.",
    category: "Social Good",
    trendScore: 71,
    engagement: "4.9K",
    duration: "15 days",
    tags: ["Charity", "Environment", "Impact", "Transparency"],
    color: "from-teal-500 to-green-500",
    status: "Growing",
  },
  {
    id: 6,
    title: "Mysterious & ARG Tokens",
    description:
      "Tokens wrapped in mystery, alternate reality games (ARG), and cryptic storytelling are creating cult followings. The narrative thrives on discovery, puzzles, and community investigation.",
    category: "Experimental",
    trendScore: 68,
    engagement: "3.7K",
    duration: "8 days",
    tags: ["Mystery", "ARG", "Community", "Storytelling"],
    color: "from-indigo-500 to-purple-500",
    status: "Emerging",
  },
]

const statusColors = {
  Hot: "bg-red-500 text-white",
  Rising: "bg-orange-500 text-white",
  Steady: "bg-blue-500 text-white",
  Growing: "bg-green-500 text-white",
  Emerging: "bg-purple-500 text-white",
}

export default function TrendingPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
              <Flame className="w-8 h-8 text-orange-500" />
              Trending Narratives
            </h1>
            <p className="text-muted-foreground mt-2">
              Discover viral narratives and trending themes in the crypto space
            </p>
          </div>
        </div>

        {/* Trending Cards */}
        <div className="space-y-6">
          {trendingNarratives.map((narrative, index) => (
            <Card key={narrative.id} className="p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-xl md:text-2xl font-bold">{narrative.title}</h3>
                      <Badge className={`${statusColors[narrative.status as keyof typeof statusColors]} text-xs`}>
                        {narrative.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{narrative.category}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-3xl font-bold text-primary">{narrative.trendScore}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">Trend Score</div>
                  </div>
                </div>

                {/* Gradient Bar */}
                <div className="h-2 rounded-full bg-gradient-to-r overflow-hidden opacity-20">
                  <div
                    className={`h-full bg-gradient-to-r ${narrative.color}`}
                    style={{ width: `${narrative.trendScore}%` }}
                  />
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">{narrative.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {narrative.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-4 md:gap-6 pt-2 border-t border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold">{narrative.engagement}</span>
                    <span className="text-muted-foreground">engagement</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Trending for {narrative.duration}</span>
                  </div>
                  <div className="ml-auto">
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <TrendingUp className="w-4 h-4" />
                      Use This Narrative
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Info Card */}
        <Card className="p-6 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-primary/10 p-3 flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-lg">How to Use Trending Narratives</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Use these trending narratives to align your token creation with current market sentiment. Click "Use
                This Narrative" to pre-fill the generate page with relevant themes, or simply use these insights to
                craft your own unique angle on trending topics.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  )
}
