"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Lock, Unlock, AlertCircle } from "lucide-react"

interface AccessControlProps {
  children: React.ReactNode
  pageName: string
}

// Mock access codes - in production, this would be handled server-side
const VALID_ACCESS_CODES = {
  trending: "TREND2024",
  content: "CONTENT2024",
  devtools: "DEVTOOLS2024",
}

export function AccessControl({ children, pageName }: AccessControlProps) {
  const [accessCode, setAccessCode] = useState("")
  const [hasAccess, setHasAccess] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Check if user has access stored in localStorage
  useEffect(() => {
    const storedAccess = localStorage.getItem(`access_${pageName}`)
    if (storedAccess === "granted") {
      setHasAccess(true)
    }
  }, [pageName])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate validation delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Validate access code
    const validCode = VALID_ACCESS_CODES[pageName as keyof typeof VALID_ACCESS_CODES]
    if (accessCode === validCode) {
      setHasAccess(true)
      localStorage.setItem(`access_${pageName}`, "granted")
    } else {
      setError("Invalid access code. Please try again.")
    }

    setIsLoading(false)
  }

  // If user has access, render the protected content
  if (hasAccess) {
    return <>{children}</>
  }

  // Otherwise, show the access code input screen
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-full bg-orange-500/10 flex items-center justify-center">
            <Lock className="w-8 h-8 text-orange-500" />
          </div>
          <h2 className="text-2xl font-bold">Exclusive Access Required</h2>
          <p className="text-muted-foreground">This is a premium feature. Enter your access code to unlock.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="accessCode">Access Code</Label>
            <Input
              id="accessCode"
              type="text"
              placeholder="Enter your access code"
              value={accessCode}
              onChange={(e) => {
                setAccessCode(e.target.value.toUpperCase())
                setError("")
              }}
              className={error ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {error && (
              <div className="flex items-center gap-2 text-sm text-red-500">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading || !accessCode}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 gap-2"
          >
            {isLoading ? (
              "Validating..."
            ) : (
              <>
                <Unlock className="w-4 h-4" />
                Unlock Access
              </>
            )}
          </Button>
        </form>

        <div className="pt-4 border-t border-border space-y-3">
          <p className="text-sm text-muted-foreground text-center">Don't have an access code?</p>
          <div className="space-y-2 text-xs text-muted-foreground">
            <p>• Contact the team to get your exclusive access code</p>
            <p>��� Access codes are available for premium members only</p>
            <p>• Each code provides permanent access to this feature</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
