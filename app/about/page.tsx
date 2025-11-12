"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowRight,
  Sparkles,
  Rocket,
  Shield,
  Zap,
  TrendingUp,
  Lock,
  Target,
  Code2,
  BarChart3,
  Bot,
  Copy,
  CheckCircle2,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState } from "react"

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
                href="#features"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:inline"
              >
                FEATURES
              </Link>
              <Link
                href="#roadmap"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:inline"
              >
                ROADMAP
              </Link>
              <Button asChild className="rounded-full bg-primary hover:bg-[#22C55E]">
                <Link href="/app">GO TO APP</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Tagline */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <div className="inline-block">
              <div className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">Launch Token</div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                From Idea to Launch in Minutes
              </h1>
            </div>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Create, brand, and deploy tokens on Launchpad Solana with AI assistance.
            </p>
          </div>

          {/* Project Description */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card className="p-8 space-y-4 shadow-xl border-2">
              <h2 className="text-2xl font-bold tracking-tight">About Launch Token</h2>
              <p className="text-muted-foreground leading-relaxed">
                Launch Token revolutionizes token creation on Solana's Launchpad ecosystem. We empower creators,
                developers, and entrepreneurs to transform their ideas into fully-branded tokens ready for
                deployment—all within minutes, not days.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Powered by advanced AI, our platform handles everything from intelligent name and ticker generation to
                complete visual branding and social media content creation. Simply describe your vision, and watch as AI
                crafts a compelling token identity complete with logo, banner, description, and launch strategy. Deploy
                directly to Pump.fun with confidence, knowing you have professional-grade branding and dev tools at your
                fingertips.
              </p>
              <div className="flex flex-wrap gap-2 pt-4">
                <div className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                  AI-Powered
                </div>
                <div className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                  Solana Launchpad
                </div>
                <div className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                  Minutes to Deploy
                </div>
                <div className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                  Creator First
                </div>
              </div>
            </Card>
          </div>

          {/* Contract Address Section */}
          <ContractAddressSection />
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
              <h3 className="text-xl font-bold">1. Describe Your Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                Share your token concept with our AI—describe the narrative, target audience, tone, and visual style you
                envision.
              </p>
            </Card>
            <Card className="p-8 text-center space-y-4 shadow-lg">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">2. AI Creates Your Brand</h3>
              <p className="text-muted-foreground leading-relaxed">
                Receive instant professional branding including name, ticker, description, logo, banner, and complete
                social media pack.
              </p>
            </Card>
            <Card className="p-8 text-center space-y-4 shadow-lg">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Rocket className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">3. Deploy to Launchpad</h3>
              <p className="text-muted-foreground leading-relaxed">
                Launch your fully-branded token to Pump.fun on Solana in one click. Track performance and collect
                creator rewards.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features - Enhanced */}
      <section id="features" className="py-16 sm:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">COMPREHENSIVE FEATURES</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create, launch, and grow your token project
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 space-y-3 hover:shadow-lg transition-shadow">
              <Sparkles className="w-8 h-8 text-primary" />
              <h3 className="font-bold text-lg">AI Token Generation</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Intelligent name, ticker, lore generation with multiple style and tone options for perfect branding.
              </p>
            </Card>
            <Card className="p-6 space-y-3 hover:shadow-lg transition-shadow">
              <Shield className="w-8 h-8 text-primary" />
              <h3 className="font-bold text-lg">Complete Brand Package</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Logo, banner, description, and social media content generated automatically for your token.
              </p>
            </Card>
            <Card className="p-6 space-y-3 hover:shadow-lg transition-shadow">
              <Zap className="w-8 h-8 text-primary" />
              <h3 className="font-bold text-lg">Pump.fun Integration</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Seamless deployment to Pump.fun with one-click launch and dev buy options.
              </p>
            </Card>
            <Card className="p-6 space-y-3 hover:shadow-lg transition-shadow">
              <Target className="w-8 h-8 text-primary" />
              <h3 className="font-bold text-lg">Content Generation</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                AI-powered social media content with images and captions ready to share on X (Twitter).
              </p>
            </Card>
            <Card className="p-6 space-y-3 hover:shadow-lg transition-shadow">
              <TrendingUp className="w-8 h-8 text-primary" />
              <h3 className="font-bold text-lg">Trending Narratives</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Access viral trends and popular narratives to align your token with current market sentiment.
              </p>
            </Card>
            <Card className="p-6 space-y-3 hover:shadow-lg transition-shadow">
              <BarChart3 className="w-8 h-8 text-primary" />
              <h3 className="font-bold text-lg">Analytics Dashboard</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Track your token performance, creator rewards, and engagement metrics in real-time.
              </p>
            </Card>
            <Card className="p-6 space-y-3 hover:shadow-lg transition-shadow">
              <Bot className="w-8 h-8 text-primary" />
              <h3 className="font-bold text-lg">Dev Tools Suite</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Advanced tools including Snipe Bot, DCA, Market Maker, Bump Bot, and Pump Bot for token management.
              </p>
            </Card>
            <Card className="p-6 space-y-3 hover:shadow-lg transition-shadow">
              <Lock className="w-8 h-8 text-primary" />
              <h3 className="font-bold text-lg">Secure & Non-Custodial</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                You always control your wallet. We never store private keys or have access to your funds.
              </p>
            </Card>
            <Card className="p-6 space-y-3 hover:shadow-lg transition-shadow">
              <Code2 className="w-8 h-8 text-primary" />
              <h3 className="font-bold text-lg">Multi-Wallet Support</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Connect multiple Solana wallets for advanced token management and trading strategies.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-16 sm:py-24 px-4 bg-muted">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">ROADMAP</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our vision for the future of token launching
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* November 2025 */}
            <Card className="p-8 border-l-4 border-l-primary shadow-lg">
              <div className="flex items-start gap-6">
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold text-sm shrink-0">
                  NOV 2025
                </div>
                <div className="space-y-4 flex-1">
                  <h3 className="text-xl font-bold">Platform Launch & Core Features</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>AI-powered token generation with multiple styles and tones</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>One-click deployment to Pump.fun on Solana</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>Complete brand package generation (logo, banner, description)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>Creator rewards tracking and claiming system</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* December 2025 */}
            <Card className="p-8 border-l-4 border-l-primary/60 shadow-lg">
              <div className="flex items-start gap-6">
                <div className="bg-primary/60 text-primary-foreground px-4 py-2 rounded-lg font-bold text-sm shrink-0">
                  DEC 2025
                </div>
                <div className="space-y-4 flex-1">
                  <h3 className="text-xl font-bold">Social Media & Content Generation</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full border-2 border-primary shrink-0 mt-0.5" />
                      <span>AI-powered social media content with images and captions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full border-2 border-primary shrink-0 mt-0.5" />
                      <span>Direct sharing to X (Twitter) integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full border-2 border-primary shrink-0 mt-0.5" />
                      <span>Trending narratives discovery and analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full border-2 border-primary shrink-0 mt-0.5" />
                      <span>Multi-wallet support for advanced users</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* January 2026 */}
            <Card className="p-8 border-l-4 border-l-muted-foreground/30 shadow-lg">
              <div className="flex items-start gap-6">
                <div className="bg-muted-foreground/30 text-foreground px-4 py-2 rounded-lg font-bold text-sm shrink-0">
                  JAN 2026
                </div>
                <div className="space-y-4 flex-1">
                  <h3 className="text-xl font-bold">Advanced Dev Tools Suite</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30 shrink-0 mt-0.5" />
                      <span>Snipe Bot for new token launch automation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30 shrink-0 mt-0.5" />
                      <span>DCA (Dollar Cost Averaging) trading strategies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30 shrink-0 mt-0.5" />
                      <span>Market Maker tools for liquidity management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30 shrink-0 mt-0.5" />
                      <span>Bump Bot and Pump Bot features for visibility</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* February 2026 */}
            <Card className="p-8 border-l-4 border-l-muted-foreground/30 shadow-lg">
              <div className="flex items-start gap-6">
                <div className="bg-muted-foreground/30 text-foreground px-4 py-2 rounded-lg font-bold text-sm shrink-0">
                  FEB 2026
                </div>
                <div className="space-y-4 flex-1">
                  <h3 className="text-xl font-bold">Analytics & Ecosystem Growth</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30 shrink-0 mt-0.5" />
                      <span>Advanced analytics dashboard with real-time insights</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30 shrink-0 mt-0.5" />
                      <span>Token performance benchmarking and comparisons</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30 shrink-0 mt-0.5" />
                      <span>Custom API access for developers and integrations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30 shrink-0 mt-0.5" />
                      <span>Community features and governance tools</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* For Creators */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">FOR CREATORS</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Launch Token accelerates your creative process, transforming ideas into launch-ready tokens in minutes. You
            maintain complete control—all transactions are signed with your own wallet, and we never access your funds
            or private keys. This platform is a creative tool, not financial advice. Create responsibly, launch with
            confidence, and build the future of Solana tokens.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 px-4 bg-gradient-to-b from-background to-muted">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">Go From Idea to Launch Today</h2>
          <p className="text-lg text-muted-foreground">
            Join creators transforming their visions into live tokens on Solana Launchpad
          </p>
          <Button asChild size="lg" className="rounded-full bg-primary hover:bg-[#22C55E] text-lg px-8">
            <Link href="/app">
              Start Creating <ArrowRight className="ml-2 h-5 w-5" />
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

function ContractAddressSection() {
  const [copied, setCopied] = useState(false)
  const contractAddress = "xxxxxxxxxxxxxxxxxxxxpump"

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8 space-y-4 shadow-xl border-2 border-primary/20">
        <div className="flex items-center gap-3 mb-2">
          <Code2 className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">Contract Address</h2>
        </div>
        <p className="text-sm text-muted-foreground">Official Launch Token smart contract on Solana blockchain</p>
        <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
          <code className="flex-1 text-sm font-mono break-all">{contractAddress}</code>
          <Button variant="outline" size="sm" onClick={copyToClipboard} className="shrink-0 bg-transparent">
            {copied ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </>
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Always verify the contract address before any transactions. Never trust third-party sources.
        </p>
      </Card>
    </div>
  )
}
