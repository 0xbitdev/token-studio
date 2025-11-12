"use client"

import type React from "react"

import { useWallet } from "@/lib/wallet-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Wallet, AlertCircle, Info } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export function WalletGuard({ children }: { children: React.ReactNode }) {
  const { connected, connect, connecting } = useWallet()
  const [showWalletDialog, setShowWalletDialog] = useState(false)

  if (!connected) {
    return (
      <>
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
          <Card className="max-w-md w-full p-8 text-center space-y-6">
            <div className="flex justify-center">
              <div className="rounded-full bg-primary/10 p-4">
                <Wallet className="w-12 h-12 text-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Connect Your Wallet</h2>
              <p className="text-muted-foreground">
                Please connect your Solana wallet to access this feature and start creating tokens.
              </p>
            </div>
            <div className="space-y-3">
              <Button
                onClick={() => setShowWalletDialog(true)}
                className="w-full rounded-full bg-primary hover:bg-[#22C55E]"
                size="lg"
              >
                <Wallet className="w-5 h-5 mr-2" />
                Connect Wallet
              </Button>
              <Button asChild variant="outline" className="w-full rounded-full bg-transparent" size="lg">
                <Link href="/about">
                  <Info className="w-5 h-5 mr-2" />
                  About
                </Link>
              </Button>
            </div>
          </Card>
        </div>

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
                      src="/images/design-mode/phantom.png"
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
                      src="/images/design-mode/solflare.png"
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
            <div className="flex items-start gap-2 p-3 rounded-lg bg-muted">
              <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground">
                You'll be asked to sign a message to verify wallet ownership. This is free and doesn't involve any
                transactions.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  return <>{children}</>
}
