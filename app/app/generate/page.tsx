"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Info, RefreshCw, Upload, Loader2, ExternalLink, CheckCircle2, AlertCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function GeneratePage() {
  const [description, setDescription] = useState("")
  const [style, setStyle] = useState("meme")
  const [tone, setTone] = useState("degen")
  const [safeForWork, setSafeForWork] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [showDevBuyDialog, setShowDevBuyDialog] = useState(false)
  const [wantDevBuy, setWantDevBuy] = useState<boolean | null>(null)
  const [devBuyAmount, setDevBuyAmount] = useState("")
  const [isDeploying, setIsDeploying] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [deployedTokenAddress, setDeployedTokenAddress] = useState("")
  const [showAmountError, setShowAmountError] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setShowPreview(true)
    }, 2000)
  }

  const handleDeployClick = () => {
    setShowDevBuyDialog(true)
    setWantDevBuy(null)
    setDevBuyAmount("")
    setShowAmountError(false)
  }

  const handleDevBuyConfirm = () => {
    if (wantDevBuy && !devBuyAmount) {
      setShowAmountError(true)
      setTimeout(() => setShowAmountError(false), 3000)
      return
    }

    setIsDeploying(true)

    setTimeout(() => {
      setIsDeploying(false)
      setShowDevBuyDialog(false)

      const mockTokenAddress = "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
      setDeployedTokenAddress(mockTokenAddress)
      setShowSuccessDialog(true)
    }, 2000)
  }

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Describe Token Section */}
        <Card className="p-4 md:p-6 shadow-lg">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">DESCRIBE TOKEN</h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Tell AI about your meme, narrative, utility, audience, vibes.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <Textarea
              placeholder="Example: A cozy degen cat barista token about overworked freelancers sipping degen coffee on Solana..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[160px] resize-none"
            />

            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">STYLE</Label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meme">Meme</SelectItem>
                    <SelectItem value="utility">Utility</SelectItem>
                    <SelectItem value="waifu">Waifu</SelectItem>
                    <SelectItem value="experimental">Experimental</SelectItem>
                    <SelectItem value="art">Art / Creative</SelectItem>
                    <SelectItem value="gaming">Gaming</SelectItem>
                    <SelectItem value="defi">DeFi / Finance</SelectItem>
                    <SelectItem value="nft">NFT Collection</SelectItem>
                    <SelectItem value="community">Community Driven</SelectItem>
                    <SelectItem value="ai">AI / Tech</SelectItem>
                    <SelectItem value="culture">Culture / Movement</SelectItem>
                    <SelectItem value="charity">Charity / Social Good</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">TONE</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {[
                    "chill",
                    "degen",
                    "serious",
                    "ironic",
                    "hype",
                    "wholesome",
                    "edgy",
                    "mysterious",
                    "professional",
                    "playful",
                    "bullish",
                    "zen",
                  ].map((t) => (
                    <Button
                      key={t}
                      variant={tone === t ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTone(t)}
                      className="capitalize"
                    >
                      {t}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="sfw"
                  checked={safeForWork}
                  onCheckedChange={(checked) => setSafeForWork(checked as boolean)}
                />
                <Label htmlFor="sfw" className="text-sm cursor-pointer">
                  Safe for work only
                </Label>
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!description || isGenerating}
              className="w-full rounded-full bg-primary hover:bg-[#22C55E] px-8"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate & Create"
              )}
            </Button>
          </div>
        </Card>

        {/* AI Result Preview */}
        {showPreview && (
          <Card className="p-4 md:p-6 shadow-lg">
            <div className="space-y-6 md:space-y-8">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">GENERATE & CREATE</h2>

              {/* Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label className="text-sm font-bold uppercase tracking-wide">PICTURES</Label>
                  <div className="aspect-square w-full max-w-[500px] mx-auto rounded-xl bg-gradient-to-br from-primary to-[#22C55E] flex items-center justify-center">
                    <img
                      src="/degen-cat-barista-logo-circular-mascot.jpg"
                      alt="Logo"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Regenerate
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-bold uppercase tracking-wide">COVER</Label>
                  <div className="aspect-[3/1] w-full max-w-[500px] mx-auto rounded-xl bg-gradient-to-r from-primary/20 to-[#22C55E]/20 flex items-center justify-center overflow-hidden">
                    <img
                      src="/cozy-coffee-shop-banner-degen-aesthetic.jpg"
                      alt="Banner"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Regenerate
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                </div>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="token-name">Token Name</Label>
                  <Input id="token-name" defaultValue="Degen Cat Barista" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="symbol">Symbol</Label>
                  <Input id="symbol" defaultValue="DCAT" />
                </div>
                <div className="col-span-full space-y-2">
                  <Label htmlFor="short-desc">Short Description</Label>
                  <Input id="short-desc" defaultValue="The coziest degen token on Solana" />
                </div>
                <div className="col-span-full space-y-2">
                  <Label htmlFor="long-desc">Long Description / Lore</Label>
                  <Textarea
                    id="long-desc"
                    defaultValue="Meet Degen Cat, your favorite barista on Solana. Born in the depths of a coffee shop during a 48-hour hackathon, this token represents every overworked freelancer, developer, and creator who runs on pure caffeine and degen energy."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2 col-span-full sm:col-span-1">
                  <Label htmlFor="website">Website Link</Label>
                  <Input id="website" placeholder="https://degencat.sol" />
                </div>
                <div className="space-y-2 col-span-full sm:col-span-1">
                  <Label htmlFor="x-link">X Link</Label>
                  <Input id="x-link" placeholder="https://x.com/degencat" />
                </div>
                <div className="space-y-2 col-span-full sm:col-span-1">
                  <Label htmlFor="telegram">Telegram Link</Label>
                  <Input id="telegram" placeholder="https://t.me/degencat" />
                </div>
              </div>

              {/* Social Pack Preview */}
              <Card className="bg-muted p-4 md:p-6">
                <h3 className="font-bold mb-4 uppercase tracking-wide text-sm md:text-base">SOCIAL PACK PREVIEW</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-2">Suggested X Bio</div>
                    <p className="text-sm text-muted-foreground">
                      ☕ Degen Cat Barista | Brewing gains on Solana | For the overworked & caffeinated | Not financial
                      advice, just vibes
                    </p>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-2">Suggested First Tweet</div>
                    <p className="text-sm text-muted-foreground">
                      gm ☕ Degen Cat Barista is now live on @pumpdotfun! 🚀 We're here for every freelancer, dev, and
                      creator running on coffee and dreams. Join the coziest degen community on Solana. LFG! 🐱💚
                    </p>
                  </div>
                </div>
              </Card>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-end">
                <Button variant="outline" className="w-full sm:w-auto rounded-full bg-transparent">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerate All
                </Button>
                <Button
                  onClick={handleDeployClick}
                  className="w-full sm:w-auto rounded-full bg-primary hover:bg-[#22C55E] px-8"
                >
                  Deploy Tokens
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Dev Buy Dialog */}
      <Dialog open={showDevBuyDialog} onOpenChange={setShowDevBuyDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Dev Buy</DialogTitle>
            <DialogDescription>Do you want to purchase tokens during deployment?</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <Label className="text-base font-semibold">Would you like to do a dev buy?</Label>
              <div className="flex gap-3">
                <Button
                  variant={wantDevBuy === true ? "default" : "outline"}
                  onClick={() => setWantDevBuy(true)}
                  className="flex-1"
                >
                  Yes
                </Button>
                <Button
                  variant={wantDevBuy === false ? "default" : "outline"}
                  onClick={() => setWantDevBuy(false)}
                  className="flex-1"
                >
                  No
                </Button>
              </div>
            </div>

            {wantDevBuy === true && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <Label htmlFor="dev-buy-amount">Purchase Amount (SOL)</Label>
                <div className="relative">
                  <Input
                    id="dev-buy-amount"
                    type="number"
                    placeholder="Enter amount in SOL"
                    value={devBuyAmount}
                    onChange={(e) => {
                      setDevBuyAmount(e.target.value)
                      setShowAmountError(false)
                    }}
                    min="0"
                    step="0.1"
                    className={showAmountError ? "border-red-500 focus-visible:ring-red-500" : ""}
                  />
                  {showAmountError && (
                    <div className="absolute -bottom-8 left-0 right-0 animate-in fade-in slide-in-from-top-1 duration-200">
                      <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded-lg border border-red-200 dark:border-red-900">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span className="font-medium">Please enter purchase amount</span>
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Enter the amount of SOL you want to use to purchase tokens
                </p>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowDevBuyDialog(false)} disabled={isDeploying}>
              Cancel
            </Button>
            <Button
              onClick={handleDevBuyConfirm}
              disabled={wantDevBuy === null || isDeploying}
              className="bg-primary hover:bg-[#22C55E]"
            >
              {isDeploying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deploying...
                </>
              ) : (
                "Confirm & Deploy"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="rounded-full bg-primary/10 p-3">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <DialogTitle className="text-2xl font-bold">Token Deployed Successfully!</DialogTitle>
            </div>
            <DialogDescription>Your token has been deployed to Pump.fun on Solana blockchain.</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-3">
              <Label className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Token Address
              </Label>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
                <code className="text-sm flex-1 break-all font-mono">{deployedTokenAddress}</code>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Quick Links</Label>
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  className="w-full justify-start h-auto py-3 px-4 bg-transparent"
                  onClick={() =>
                    window.open(`https://pump.fun/coin/${deployedTokenAddress}`, "_blank", "noopener,noreferrer")
                  }
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="rounded-full bg-primary/10 p-2">
                      <ExternalLink className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold">View on Pump.fun</div>
                      <div className="text-xs text-muted-foreground">Trade and manage your token</div>
                    </div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start h-auto py-3 px-4 bg-transparent"
                  onClick={() =>
                    window.open(`https://solscan.io/token/${deployedTokenAddress}`, "_blank", "noopener,noreferrer")
                  }
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="rounded-full bg-primary/10 p-2">
                      <ExternalLink className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold">View on Solscan</div>
                      <div className="text-xs text-muted-foreground">View blockchain details</div>
                    </div>
                  </div>
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setShowSuccessDialog(false)} className="w-full bg-primary hover:bg-[#22C55E]">
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  )
}
