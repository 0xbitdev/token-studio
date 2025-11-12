"use client"

import { AppShell } from "@/components/layout/app-shell"
import {
  Book,
  Rocket,
  Code,
  Zap,
  Shield,
  ArrowRight,
  Wallet,
  SparklesIcon,
  MessageSquare,
  TrendingUpIcon,
  WrenchIcon,
} from "lucide-react"

export default function DocsPage() {
  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
              <Book className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-foreground">Documentation</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Complete guide to Launch Token - the AI-powered platform for creating and deploying tokens on Solana
            Launchpad. From idea to launch in minutes.
          </p>
        </div>

        {/* Quick Start Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <a
            href="#getting-started"
            className="group p-6 rounded-xl border border-border bg-card hover:bg-accent transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-center justify-between mb-3">
              <Rocket className="w-8 h-8 text-green-500" />
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="font-bold text-lg mb-2">Quick Start</h3>
            <p className="text-sm text-muted-foreground">Get started in 5 minutes</p>
          </a>

          <a
            href="#features"
            className="group p-6 rounded-xl border border-border bg-card hover:bg-accent transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-center justify-between mb-3">
              <Zap className="w-8 h-8 text-yellow-500" />
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="font-bold text-lg mb-2">Features Guide</h3>
            <p className="text-sm text-muted-foreground">Explore all capabilities</p>
          </a>

          <a
            href="#dev-tools"
            className="group p-6 rounded-xl border border-border bg-card hover:bg-accent transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-center justify-between mb-3">
              <Code className="w-8 h-8 text-blue-500" />
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="font-bold text-lg mb-2">Dev Tools</h3>
            <p className="text-sm text-muted-foreground">Advanced features</p>
          </a>
        </div>

        {/* Getting Started Section */}
        <div id="getting-started" className="rounded-xl border border-border bg-card p-6 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Rocket className="w-5 h-5 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold">Getting Started</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-sm font-bold">
                  1
                </span>
                Connect Your Wallet
              </h3>
              <p className="text-muted-foreground mb-3">
                Launch Token supports Phantom and Solflare wallets. Click the "Connect" button in the top right corner
                and choose your wallet provider.
              </p>
              <div className="bg-muted/50 rounded-lg p-4 border border-border">
                <p className="text-sm">
                  <strong>Supported Wallets:</strong>
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground mt-2">
                  <li>Phantom - Most popular Solana wallet</li>
                  <li>Solflare - Feature-rich Solana wallet</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-sm font-bold">
                  2
                </span>
                Generate Your Token
              </h3>
              <p className="text-muted-foreground mb-3">
                Navigate to "Generate Tokens" and describe your token concept. Our AI will create branding, images, and
                metadata for you.
              </p>
              <div className="bg-muted/50 rounded-lg p-4 border border-border">
                <p className="text-sm">
                  <strong>What You'll Get:</strong>
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground mt-2">
                  <li>AI-generated token name and symbol</li>
                  <li>Custom logo (500x500px) and cover image (1500x500px)</li>
                  <li>Professional description and tagline</li>
                  <li>Social media pack with links</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-sm font-bold">
                  3
                </span>
                Deploy to Pump.fun
              </h3>
              <p className="text-muted-foreground mb-3">
                Review your token, optionally add a dev buy, and deploy to Pump.fun on Solana blockchain with one click.
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="rounded-xl border border-border bg-card p-6 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-yellow-500" />
            </div>
            <h2 className="text-2xl font-bold">Core Features</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-lg border border-border bg-muted/30">
              <div className="flex items-center gap-3 mb-3">
                <SparklesIcon className="w-6 h-6 text-green-500" />
                <h3 className="font-semibold text-lg">AI Token Generation</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Describe your token idea and let AI handle the creative work. Choose from 12 styles and 12 tones to
                match your vision.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Multiple art styles (Meme, Utility, Gaming, NFT, etc.)</li>
                <li>• Customizable tone (Hype, Professional, Mysterious, etc.)</li>
                <li>• Regenerate until perfect</li>
                <li>• Custom prompt support</li>
              </ul>
            </div>

            <div className="p-5 rounded-lg border border-border bg-muted/30">
              <div className="flex items-center gap-3 mb-3">
                <MessageSquare className="w-6 h-6 text-purple-500" />
                <h3 className="font-semibold text-lg">Generate Content</h3>
                <span className="px-2 py-1 text-xs font-bold bg-orange-500 text-white rounded-md">EXCLUSIVE</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Create engaging social media content for your tokens with AI-powered captions and images.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• AI-generated social media posts</li>
                <li>• Custom images and captions</li>
                <li>• One-click share to X (Twitter)</li>
                <li>• Unlimited content creation</li>
              </ul>
            </div>

            <div className="p-5 rounded-lg border border-border bg-muted/30">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUpIcon className="w-6 h-6 text-orange-500" />
                <h3 className="font-semibold text-lg">Trending Narratives</h3>
                <span className="px-2 py-1 text-xs font-bold bg-orange-500 text-white rounded-md">EXCLUSIVE</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Track viral narratives and trending topics in the Solana ecosystem to stay ahead of the curve.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Real-time trend tracking</li>
                <li>• Engagement metrics</li>
                <li>• Hot, trending, and emerging tags</li>
                <li>• Daily updates</li>
              </ul>
            </div>

            <div className="p-5 rounded-lg border border-border bg-muted/30">
              <div className="flex items-center gap-3 mb-3">
                <Wallet className="w-6 h-6 text-blue-500" />
                <h3 className="font-semibold text-lg">History & Rewards</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Track all your deployed tokens, monitor performance, and claim rewards from successful launches.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Complete token history</li>
                <li>• Real-time market cap tracking</li>
                <li>• Reward charts and analytics</li>
                <li>• Quick links to Pump.fun and Solscan</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Dev Tools Section */}
        <div id="dev-tools" className="rounded-xl border border-border bg-card p-6 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <WrenchIcon className="w-5 h-5 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold">Dev Tools</h2>
            <span className="px-3 py-1 text-sm font-bold bg-orange-500 text-white rounded-md">EXCLUSIVE</span>
          </div>

          <p className="text-muted-foreground mb-6">
            Advanced tools for serious token creators and traders. Automate your trading strategies and market making
            operations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
              <h3 className="font-semibold mb-2">Snipe Dev</h3>
              <p className="text-sm text-muted-foreground">
                Monitor and snipe new token launches with configurable filters and auto-buy functionality.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
              <h3 className="font-semibold mb-2">DCA Bot</h3>
              <p className="text-sm text-muted-foreground">
                Dollar-cost average into tokens automatically with customizable schedules and amounts.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
              <h3 className="font-semibold mb-2">Market Maker</h3>
              <p className="text-sm text-muted-foreground">
                Provide liquidity and maintain healthy trading volume for your tokens.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
              <h3 className="font-semibold mb-2">BumpBot</h3>
              <p className="text-sm text-muted-foreground">
                Automatically bump your token to maintain visibility on launchpad platforms.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
              <h3 className="font-semibold mb-2">PumpBot</h3>
              <p className="text-sm text-muted-foreground">
                Generate organic-looking volume and pump token price with multi-wallet trading patterns.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="rounded-xl border border-border bg-card p-6 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-500" />
            </div>
            <h2 className="text-2xl font-bold">Plans & Access</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg border-2 border-border bg-muted/30">
              <h3 className="text-xl font-bold mb-3">Free Tier</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ 1 Wallet</li>
                <li>✓ 3 Generate / Day</li>
                <li>✓ Pump.fun Integrated</li>
                <li>✓ 1x Regenerate</li>
              </ul>
            </div>

            <div className="p-6 rounded-lg border-2 border-orange-500 bg-orange-500/5">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xl font-bold">Exclusive Tier</h3>
                <span className="px-2 py-1 text-xs font-bold bg-orange-500 text-white rounded-md">ACCESS CODE</span>
              </div>
              <ul className="space-y-2 text-sm">
                <li>✓ Multi Wallet</li>
                <li>✓ 20 Generate / Day</li>
                <li>✓ Pump.fun Integrated</li>
                <li>✓ Unlimited Regenerate</li>
                <li>✓ Custom API</li>
                <li>✓ Trending Narrative Access</li>
                <li>✓ All Dev Tools (Sniper, DCA, Market Maker, BumpBot, PumpBot)</li>
                <li className="text-muted-foreground">• Copytrade (Coming Soon)</li>
                <li className="text-muted-foreground">• DCA Trade (Coming Soon)</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
            <p className="text-sm">
              <strong>Note:</strong> Exclusive features require an access code. Contact the team on Telegram for access.
            </p>
          </div>
        </div>

        {/* Security Section */}
        <div id="security" className="rounded-xl border border-border bg-card p-6 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold">Security Best Practices</h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Wallet Safety</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Never share your private key or seed phrase</li>
                <li>Always verify transaction details before signing</li>
                <li>Use hardware wallets for large amounts</li>
                <li>Keep your wallet software up to date</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Token Creation</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Review all token metadata before deployment</li>
                <li>Verify contract addresses on Solscan</li>
                <li>Test with small amounts first</li>
                <li>Understand tokenomics and supply</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Dev Tools Usage</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Start with conservative settings</li>
                <li>Monitor bot activity regularly</li>
                <li>Set appropriate stop-loss limits</li>
                <li>Never invest more than you can afford to lose</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="rounded-xl border border-border bg-card p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">How much does it cost to create a token?</h3>
              <p className="text-sm text-muted-foreground">
                The platform is free to use. You only pay Solana network fees and Pump.fun deployment costs (typically
                around 0.02-0.05 SOL).
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Can I edit my token after deployment?</h3>
              <p className="text-sm text-muted-foreground">
                Once deployed to the blockchain, token metadata is immutable. Make sure to review everything carefully
                before deploying.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">How do I get an Exclusive access code?</h3>
              <p className="text-sm text-muted-foreground">
                Contact the team on Telegram (@launchtokendev) to inquire about Exclusive tier access codes.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Which launchpads are supported?</h3>
              <p className="text-sm text-muted-foreground">
                Currently, Pump.fun is fully integrated. More launchpads (Moonit, Bonk, Heaven, Believe, Boop, Bags,
                Jupiter) are coming soon.
              </p>
            </div>
          </div>
        </div>

        {/* Community Help Section */}
        <div className="mt-12 p-8 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-3">Need More Help?</h2>
            <p className="text-muted-foreground mb-6">
              Join our community for support, updates, and to connect with other token creators.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://t.me/launchtokendev"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition-colors"
              >
                Join Telegram
              </a>
              <a
                href="https://x.com/launchtokendev"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg border border-border bg-card hover:bg-accent font-medium transition-colors"
              >
                Follow on X
              </a>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
