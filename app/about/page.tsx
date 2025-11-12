import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Sparkles, Rocket, Shield, Zap, TrendingUp, Lock } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold tracking-tight">LAUNCH TOKEN</div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link
                href="#how-it-works"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:inline"
              >
                HOW IT WORKS
              </Link>
              <Link
                href="#features"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:inline"
              >
                FEATURES
              </Link>
              <Button asChild className="rounded-full bg-primary hover:bg-[#22C55E]">
                <Link href="/app">GO TO APP</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                Launch Token for Pump.fun Creators
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground text-pretty leading-relaxed">
                Describe your idea. Get instant name, ticker, lore, logo, banner, and one-click deploy to Pump.fun.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="rounded-full bg-primary hover:bg-[#22C55E] text-base">
                  <Link href="/app">
                    Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full text-base bg-transparent">
                  <Link href="#how-it-works">How It Works</Link>
                </Button>
              </div>
            </div>

            <Card className="p-6 shadow-xl border-2">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-[#22C55E] flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-xl">DEGEN CAT</div>
                    <div className="text-sm text-muted-foreground">$DCAT</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A cozy degen cat barista token for overworked freelancers sipping coffee on Solana. Join the community
                  of caffeine-fueled builders.
                </p>
                <div className="flex gap-2">
                  <div className="text-xs bg-muted px-3 py-1 rounded-full">MEME</div>
                  <div className="text-xs bg-muted px-3 py-1 rounded-full">CHILL</div>
                </div>
                <Button className="w-full rounded-full bg-primary hover:bg-[#22C55E]">Deploy to Pump.fun</Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 sm:py-24 px-4 bg-card">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 tracking-tight">HOW IT WORKS</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center space-y-4 shadow-lg">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Describe Your Token Idea</h3>
              <p className="text-muted-foreground leading-relaxed">
                Tell our AI about your meme, narrative, utility, audience, and vibes in natural language.
              </p>
            </Card>
            <Card className="p-8 text-center space-y-4 shadow-lg">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">AI Generates Branding</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get instant name, ticker, lore, description, logo, banner, and social pack suggestions.
              </p>
            </Card>
            <Card className="p-8 text-center space-y-4 shadow-lg">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Rocket className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Deploy in One Click</h3>
              <p className="text-muted-foreground leading-relaxed">
                Launch to Pump.fun with your wallet. Track rewards and watch your token grow.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 sm:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 tracking-tight">KEY FEATURES</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 space-y-3">
              <Sparkles className="w-8 h-8 text-primary" />
              <h3 className="font-bold text-lg">AI Name & Ticker Suggestions</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Get creative, memorable names and tickers that match your vision.
              </p>
            </Card>
            <Card className="p-6 space-y-3">
              <Shield className="w-8 h-8 text-primary" />
              <h3 className="font-bold text-lg">Lore, Description & Social Pack</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Complete narrative and social media content generated automatically.
              </p>
            </Card>
            <Card className="p-6 space-y-3">
              <Zap className="w-8 h-8 text-primary" />
              <h3 className="font-bold text-lg">Logo & Banner Prompts</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                AI-generated image prompts or upload your own custom designs.
              </p>
            </Card>
            <Card className="p-6 space-y-3">
              <Rocket className="w-8 h-8 text-primary" />
              <h3 className="font-bold text-lg">One-Click Deploy Flow</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Seamless deployment to Pump.fun with wallet signature.
              </p>
            </Card>
            <Card className="p-6 space-y-3">
              <TrendingUp className="w-8 h-8 text-primary" />
              <h3 className="font-bold text-lg">Creator Rewards Tracking</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Monitor your earnings and claim rewards directly from the dashboard.
              </p>
            </Card>
            <Card className="p-6 space-y-3">
              <Lock className="w-8 h-8 text-primary" />
              <h3 className="font-bold text-lg">No Private Keys Custody</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                You always control your wallet. We never store private keys.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* For Creators */}
      <section className="py-16 sm:py-24 px-4 bg-muted">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">FOR CREATORS</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Launch Token is a helper tool designed to accelerate your creative process. You always sign transactions
            with your own wallet, maintaining complete control over your assets. This platform is not financial
            advice—create responsibly and have fun building the next generation of tokens on Solana.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">
            Ready to Launch Your Next Degen Masterpiece?
          </h2>
          <Button asChild size="lg" className="rounded-full bg-primary hover:bg-[#22C55E] text-lg px-8">
            <Link href="/app">
              Open Dashboard <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">© 2025 Launch Token. Not financial advice.</div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                X
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                TELEGRAM
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                DOCS
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
