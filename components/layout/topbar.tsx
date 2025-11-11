"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "./sidebar"
import { ThemeToggle } from "@/components/theme-toggle"

export function Topbar() {
  const [isConnected, setIsConnected] = useState(false)

  const handleConnect = () => {
    setIsConnected(!isConnected)
  }

  return (
    <div className="sticky top-0 z-40 bg-card/95 border-b border-border backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 sm:px-6 h-16 gap-3">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar />
          </SheetContent>
        </Sheet>

        {/* Center Text */}
        <div className="flex-1 text-xs sm:text-sm font-medium tracking-wide hidden sm:block text-left">
          AI FOR THE NEXT GENERATION OF CREATORS
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/* Connect Wallet Button */}
          <Button
            onClick={handleConnect}
            className="rounded-full bg-primary hover:bg-[#22C55E] text-xs sm:text-sm px-4 sm:px-6"
          >
            <span className="hidden sm:inline">{isConnected ? "CONNECTED: 7SD...9X" : "CONNECT WALLET"}</span>
            <span className="sm:hidden">{isConnected ? "7SD...9X" : "CONNECT"}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
