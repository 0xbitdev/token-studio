"use client"

import { Button } from "@/components/ui/button"
import { Menu, Wallet, LogOut, Copy, Check, Eye, EyeOff } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "./sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { useWallet } from "@/lib/wallet-context"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"
import { toast } from "sonner"
import Image from "next/image"

export function Topbar() {
  const { connected, publicKey, walletType, connecting, balance, connect, disconnect } = useWallet()
  const [showWalletDialog, setShowWalletDialog] = useState(false)
  const [showAccountDialog, setShowAccountDialog] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showBalance, setShowBalance] = useState(true)

  const handleCopyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey)
      setCopied(true)
      toast.success("Address copied to clipboard")
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDisconnect = () => {
    disconnect()
    setShowAccountDialog(false)
  }

  return (
    <>
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
            {connected && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted border border-border">
                <div className="w-5 h-5 rounded-full flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/design-mode/Solana_logo.png"
                    alt="Solana"
                    width={20}
                    height={20}
                    className="w-full h-full object-contain"
                  />
                </div>
                {showBalance ? (
                  <>
                    <span className="text-sm font-semibold">{balance.toFixed(4)}</span>
                    <span className="text-xs text-muted-foreground">SOL</span>
                  </>
                ) : (
                  <span className="text-sm font-semibold">••••</span>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowBalance(!showBalance)}
                  className="h-6 w-6 ml-1 hover:bg-background/50"
                >
                  {showBalance ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </Button>
              </div>
            )}
            <ThemeToggle />
            {/* Connect Wallet Button */}
            {connected ? (
              <Button
                onClick={() => setShowAccountDialog(true)}
                className="rounded-full bg-primary hover:bg-[#22C55E] text-xs sm:text-sm px-4 sm:px-6"
              >
                <Wallet className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">
                  {publicKey?.slice(0, 4)}...{publicKey?.slice(-4)}
                </span>
                <span className="sm:hidden">
                  {publicKey?.slice(0, 3)}...{publicKey?.slice(-3)}
                </span>
              </Button>
            ) : (
              <Button
                onClick={() => setShowWalletDialog(true)}
                disabled={connecting}
                className="rounded-full bg-primary hover:bg-[#22C55E] text-xs sm:text-sm px-4 sm:px-6"
              >
                <Wallet className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">{connecting ? "CONNECTING..." : "CONNECT WALLET"}</span>
                <span className="sm:hidden">{connecting ? "..." : "CONNECT"}</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Wallet Selection Dialog */}
      <Dialog open={showWalletDialog} onOpenChange={setShowWalletDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Connect Wallet</DialogTitle>
            <DialogDescription>Choose your preferred Solana wallet to continue</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <Button
              onClick={async () => {
                await connect("phantom")
                setShowWalletDialog(false)
              }}
              disabled={connecting}
              className="w-full justify-start h-auto py-4 px-4 bg-card hover:bg-accent border border-border"
              variant="outline"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src="/wallets/phantom.png"
                    alt="Phantom"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-foreground">Phantom</div>
                  <div className="text-xs text-muted-foreground">Connect with Phantom wallet</div>
                </div>
              </div>
            </Button>

            <Button
              onClick={async () => {
                await connect("solflare")
                setShowWalletDialog(false)
              }}
              disabled={connecting}
              className="w-full justify-start h-auto py-4 px-4 bg-card hover:bg-accent border border-border"
              variant="outline"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src="/wallets/solflare.png"
                    alt="Solflare"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-foreground">Solflare</div>
                  <div className="text-xs text-muted-foreground">Connect with Solflare wallet</div>
                </div>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Account Dialog */}
      <Dialog open={showAccountDialog} onOpenChange={setShowAccountDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Your Wallet</DialogTitle>
            <DialogDescription className="capitalize">{walletType} Wallet</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Balance</div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
                <div className="w-6 h-6 rounded-full flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/design-mode/Solana_logo(1).png"
                    alt="Solana"
                    width={24}
                    height={24}
                    className="w-full h-full object-contain"
                  />
                </div>
                {showBalance ? (
                  <span className="text-lg font-semibold">{balance.toFixed(4)} SOL</span>
                ) : (
                  <span className="text-lg font-semibold">•••• SOL</span>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowBalance(!showBalance)}
                  className="h-8 w-8 ml-auto hover:bg-background/50"
                >
                  {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Wallet Address</div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
                <code className="text-sm flex-1 break-all font-mono">{publicKey}</code>
                <Button variant="ghost" size="icon" onClick={handleCopyAddress} className="flex-shrink-0">
                  {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <Button
              onClick={handleDisconnect}
              variant="outline"
              className="w-full justify-center border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Disconnect Wallet
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
