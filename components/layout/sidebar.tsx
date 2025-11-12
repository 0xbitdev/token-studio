"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Sparkles,
  History,
  MessageCircle,
  BookOpen,
  FileText,
  LayoutDashboard,
  TrendingUp,
  Crown,
  Wrench,
  ChevronDown,
} from "lucide-react"
import { useState } from "react"

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
)

const navigation = [
  { name: "Dashboard", href: "/app", icon: LayoutDashboard },
  { name: "Trending Narratives", href: "/app/trending", icon: TrendingUp, isPro: true },
  { name: "Generate Tokens", href: "/app/generate", icon: Sparkles },
  { name: "Generate Content", href: "/app/content", icon: FileText, isPro: true },
  { name: "History & Rewards", href: "/app/history", icon: History },
]

const devToolsMenu = {
  name: "Dev Tools",
  icon: Wrench,
  isPro: true,
  subItems: [
    { name: "Snipe Dev", href: "/app/dev-tools/snipe" },
    { name: "DCA", href: "/app/dev-tools/dca" },
    { name: "Market Maker", href: "/app/dev-tools/market-maker" },
    { name: "BumpBot", href: "/app/dev-tools/bump-bot" },
    { name: "PumpBot", href: "/app/dev-tools/pump-bot" },
  ],
}

const socialLinks = [
  { name: "X", href: "https://twitter.com", icon: XIcon },
  { name: "Telegram", href: "https://telegram.org", icon: MessageCircle },
  { name: "Discord", href: "https://discord.com", icon: DiscordIcon },
  { name: "Docs", href: "#", icon: BookOpen },
]

export function Sidebar() {
  const pathname = usePathname()
  const userPlan = "Free" // or "Exclusive"
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false)

  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-green-500 flex items-center justify-center shadow-sm">
            <Sparkles className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-lg font-bold tracking-tight text-foreground">AI Token</div>
            <div className="text-xs font-medium tracking-wider text-green-600 uppercase">Studio</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <div key={item.name} className="relative">
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all duration-200 group",
                  isActive
                    ? "bg-green-500 text-white shadow-md"
                    : "text-muted-foreground hover:bg-green-500/10 hover:text-foreground dark:hover:bg-green-500/20",
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5",
                    isActive ? "text-white" : "text-muted-foreground group-hover:text-green-600",
                  )}
                  strokeWidth={2}
                />
                <span className="flex-1">{item.name}</span>
              </Link>
              {item.isPro && (
                <span className="absolute -top-1 -right-1 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-md shadow-lg">
                  EXCLUSIVE
                </span>
              )}
            </div>
          )
        })}

        {/* Dev Tools menu with collapsible submenu */}
        <div className="relative">
          <button
            onClick={() => setIsDevToolsOpen(!isDevToolsOpen)}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all duration-200 group text-muted-foreground hover:bg-green-500/10 hover:text-foreground dark:hover:bg-green-500/20"
          >
            <devToolsMenu.icon className="w-5 h-5 text-muted-foreground group-hover:text-green-600" strokeWidth={2} />
            <span className="flex-1 text-left">{devToolsMenu.name}</span>
            <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isDevToolsOpen && "rotate-180")} />
          </button>

          {devToolsMenu.isPro && (
            <span className="absolute -top-1 -right-1 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-md shadow-lg">
              EXCLUSIVE
            </span>
          )}

          {/* Submenu */}
          {isDevToolsOpen && (
            <div className="mt-1 ml-4 space-y-1 border-l-2 border-muted pl-4">
              {devToolsMenu.subItems.map((subItem) => {
                const isActive = pathname === subItem.href
                return (
                  <Link
                    key={subItem.name}
                    href={subItem.href}
                    className={cn(
                      "block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-green-500 text-white shadow-sm"
                        : "text-muted-foreground hover:bg-green-500/10 hover:text-foreground dark:hover:bg-green-500/20",
                    )}
                  >
                    {subItem.name}
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </nav>

      {/* Footer Links */}
      <div className="p-6 border-t border-border space-y-4">
        <div className="flex items-center justify-between mb-4 px-3 py-2.5 rounded-lg bg-muted/50">
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-medium">{userPlan} Plan</span>
          </div>
        </div>

        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Connect</div>
        <div className="flex items-center gap-2">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-lg text-muted-foreground hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-500/20 transition-all duration-200"
              title={link.name}
            >
              <link.icon className="w-5 h-5" strokeWidth={2} />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
