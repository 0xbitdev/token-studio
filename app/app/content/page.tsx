"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Share2, Copy, CheckCircle2, Sparkles, RefreshCw } from "lucide-react"

// Mock token data matching the history page
const mockTokens = [
  {
    id: "examp",
    name: "Degen Cat Barista",
    symbol: "DCAT",
    image: "/degen-cat-barista-logo-circular-mascot.jpg",
    mcap: "$1.2M",
    status: "Active",
  },
  {
    id: "moon",
    name: "Moon Vibes",
    symbol: "MOON",
    image: "/moon-vibes-token-logo.jpg",
    mcap: "$850K",
    status: "Active",
  },
  {
    id: "doge2",
    name: "Doge Sequel",
    symbol: "DOGE2",
    image: "/doge-sequel-token-logo.jpg",
    mcap: "$2.5M",
    status: "Ended",
  },
]

// Mock content suggestions for each token
const contentSuggestions = {
  examp: [
    {
      id: 1,
      type: "Launch Announcement",
      caption:
        "gm ☕ Degen Cat Barista is now live on @pumpdotfun! 🚀\n\nWe're here for every freelancer, dev, and creator running on coffee and dreams. Join the coziest degen community on Solana.\n\nLFG! 🐱💚\n\n#Solana #DeFi #MemeToken",
    },
    {
      id: 2,
      type: "Community Engagement",
      caption:
        "What's your go-to degen drink? 🧋\n\nDrop a ☕ if you're team coffee\nDrop a 🫖 if you're team tea\nDrop a 🥤 if you're team energy drinks\n\nDegen Cat is serving all vibes today! 🐱\n\n#DCAT #SolanaCommunity",
    },
    {
      id: 3,
      type: "Market Update",
      caption:
        "📊 DCAT UPDATE:\n\nMarket Cap: $1.2M 🚀\nHolders: Growing daily 📈\nVibes: Immaculate ✨\n\nThe barista never stops brewing gains. Who's ready for the next cup? ☕💚\n\n#DegenCat #Solana",
    },
    {
      id: 4,
      type: "Meme Content",
      caption:
        'When the market dips but you\'re still vibing with your $DCAT:\n\n*sips coffee calmly* 😎☕\n\n"This is fine"\n\nDegen Cat holders know: every dip is just a buying opportunity. 🐱💎\n\n#HODL #DegenLife',
    },
  ],
  moon: [
    {
      id: 1,
      type: "Launch Announcement",
      caption:
        "🌙 MOON is live!\n\nYour ticket to lunar gains on Solana. \n\nJoin us as we shoot for the stars! 🚀✨\n\n#MOON #Solana #ToTheMoon",
    },
    {
      id: 2,
      type: "Community Engagement",
      caption:
        "Moon fam, where are you watching from? 🌍\n\nDrop your location and let's see how global our community is!\n\n🌙 MOON is worldwide 🌙\n\n#MOONCommunity #Solana",
    },
  ],
  doge2: [
    {
      id: 1,
      type: "Launch Announcement",
      caption:
        "🐕 The sequel you've been waiting for!\n\nDOGE2 is here and ready to make history on Solana.\n\nMuch wow. Very sequel. 🚀\n\n#DOGE2 #Solana #DogeSequel",
    },
    {
      id: 2,
      type: "Nostalgia Post",
      caption:
        "Remember when DOGE started as just a meme?\n\nNow DOGE2 is bringing that same energy to Solana! 🐕⚡\n\n#DOGE2 #CryptoHistory #Memes",
    },
  ],
}

export default function GenerateContentPage() {
  const [selectedToken, setSelectedToken] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [isCreatingContent, setIsCreatingContent] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [contentPrompt, setContentPrompt] = useState("")
  const [generatedImage, setGeneratedImage] = useState("")
  const [generatedCaption, setGeneratedCaption] = useState("")

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleShareToX = (caption: string) => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}`
    window.open(twitterUrl, "_blank", "noopener,noreferrer")
  }

  const handleGenerateContent = async () => {
    setIsGenerating(true)

    // Simulate AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock generated content
    const mockImages = [
      "/crypto-token-social-media-post-modern-design.jpg",
      "/defi-meme-coin-announcement-colorful.jpg",
      "/solana-token-launch-professional-banner.jpg",
    ]

    const mockCaptions = [
      `🚀 ${selectedTokenData?.name} is taking off!\n\nJoin the community and be part of something special on Solana.\n\n${contentPrompt || "Let's build together!"}\n\n#${selectedTokenData?.symbol} #Solana #Crypto`,
      `gm ☀️\n\n${selectedTokenData?.name} holders are the best! \n\n${contentPrompt || "Who's ready for the journey?"}\n\nDrop a 🔥 if you're holding strong!\n\n#${selectedTokenData?.symbol} #DeFi`,
      `📊 ${selectedTokenData?.symbol} UPDATE:\n\nCommunity: Growing 📈\nVibes: Immaculate ✨\nFuture: Bright 🌟\n\n${contentPrompt || "This is just the beginning!"}\n\n#${selectedTokenData?.name} #Solana`,
    ]

    setGeneratedImage(mockImages[Math.floor(Math.random() * mockImages.length)])
    setGeneratedCaption(mockCaptions[Math.floor(Math.random() * mockCaptions.length)])
    setIsGenerating(false)
  }

  const handleRegenerate = () => {
    setGeneratedImage("")
    setGeneratedCaption("")
    handleGenerateContent()
  }

  const selectedTokenData = mockTokens.find((t) => t.id === selectedToken)
  const contents = selectedToken ? contentSuggestions[selectedToken as keyof typeof contentSuggestions] || [] : []

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">GENERATE CONTENT</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-2">
            Create engaging social media content for your launched tokens
          </p>
        </div>

        {!selectedToken ? (
          <>
            {/* Token Selection Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockTokens.map((token) => (
                <Card
                  key={token.id}
                  onClick={() => setSelectedToken(token.id)}
                  className="p-6 cursor-pointer hover:shadow-lg hover:border-primary transition-all duration-200 group"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <img
                          src={token.image || "/placeholder.svg"}
                          alt={token.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Badge
                        variant={token.status === "Active" ? "default" : "secondary"}
                        className="absolute -top-2 -right-2"
                      >
                        {token.status}
                      </Badge>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{token.name}</h3>
                      <p className="text-sm text-muted-foreground">{token.symbol}</p>
                    </div>
                    <div className="text-sm font-semibold text-primary">{token.mcap}</div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Selected Token Content View */}
            <Button variant="ghost" onClick={() => setSelectedToken(null)} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Tokens
            </Button>

            {/* Token Header */}
            <Card className="p-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-green-500/20 flex items-center justify-center flex-shrink-0">
                  <img
                    src={selectedTokenData?.image || "/placeholder.svg"}
                    alt={selectedTokenData?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold">{selectedTokenData?.name}</h2>
                    <Badge variant={selectedTokenData?.status === "Active" ? "default" : "secondary"}>
                      {selectedTokenData?.status}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-muted-foreground">
                    <span>Symbol: {selectedTokenData?.symbol}</span>
                    <Separator orientation="vertical" className="h-4 hidden sm:block" />
                    <span>Market Cap: {selectedTokenData?.mcap}</span>
                  </div>
                </div>
                <Button
                  onClick={() => setIsCreatingContent(true)}
                  className="bg-primary hover:bg-green-600 gap-2 w-full sm:w-auto"
                >
                  <Sparkles className="w-4 h-4" />
                  Create Content
                </Button>
              </div>
            </Card>

            {/* Content Suggestions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Content Suggestions</h3>
              {contents.map((content) => (
                <Card key={content.id} className="p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                    <Badge variant="outline" className="text-xs">
                      {content.type}
                    </Badge>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm whitespace-pre-line leading-relaxed">{content.caption}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      onClick={() => handleShareToX(content.caption)}
                      className="flex-1 bg-primary hover:bg-green-600 gap-2"
                    >
                      <Share2 className="w-4 h-4" />
                      Share to X
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleCopy(content.caption, content.id)}
                      className="flex-1 gap-2"
                    >
                      {copiedId === content.id ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy Caption
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>

      <Dialog open={isCreatingContent} onOpenChange={setIsCreatingContent}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Create AI Content for {selectedTokenData?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Input Section */}
            <div className="space-y-3">
              <Label htmlFor="prompt">Content Direction (Optional)</Label>
              <Textarea
                id="prompt"
                placeholder="E.g., 'Create a post about our new milestone' or 'Make it funny and relatable' or leave empty for AI to decide"
                value={contentPrompt}
                onChange={(e) => setContentPrompt(e.target.value)}
                rows={3}
                className="resize-none"
              />
            </div>

            {/* Generate Button */}
            {!generatedImage && !generatedCaption && (
              <Button
                onClick={handleGenerateContent}
                disabled={isGenerating}
                className="w-full bg-primary hover:bg-green-600 gap-2"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Content
                  </>
                )}
              </Button>
            )}

            {/* Generated Content Display */}
            {(generatedImage || generatedCaption) && (
              <div className="space-y-4">
                <Separator />

                {/* Generated Image */}
                {generatedImage && (
                  <div className="space-y-2">
                    <Label>Generated Image</Label>
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                      <img
                        src={generatedImage || "/placeholder.svg"}
                        alt="Generated content"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Generated Caption */}
                {generatedCaption && (
                  <div className="space-y-2">
                    <Label>Generated Caption</Label>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm whitespace-pre-line leading-relaxed">{generatedCaption}</p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    onClick={() => handleShareToX(generatedCaption)}
                    className="flex-1 bg-primary hover:bg-green-600 gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share to X
                  </Button>
                  <Button variant="outline" onClick={() => handleCopy(generatedCaption, -1)} className="flex-1 gap-2">
                    {copiedId === -1 ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Caption
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={handleRegenerate} className="flex-1 gap-2 bg-transparent">
                    <RefreshCw className="w-4 h-4" />
                    Regenerate
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </AppShell>
  )
}
