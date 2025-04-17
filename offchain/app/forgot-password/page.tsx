"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate password reset request
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
      <div className="absolute left-4 top-4 md:left-8 md:top-8">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500">
            <span className="text-xl font-bold text-white">Z</span>
          </div>
          <span className="text-xl font-bold text-orange-500">Zplit</span>
        </div>
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center">
            <Link href="/login" className="mr-2">
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to login</span>
              </Button>
            </Link>
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
          </div>
          <CardDescription>
            {!isSubmitted
              ? "Enter your email address and we'll send you a link to reset your password."
              : "Check your email for a link to reset your password."}
          </CardDescription>
        </CardHeader>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="hello@zplit.com" required type="email" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-orange-500 hover:bg-orange-600" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending reset link...
                  </>
                ) : (
                  "Send reset link"
                )}
              </Button>
            </CardFooter>
          </form>
        ) : (
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-green-50 p-4 text-sm text-green-800">
              We've sent a password reset link to your email address. Please check your inbox.
            </div>
            <Button className="w-full" variant="outline" asChild>
              <Link href="/login">Back to login</Link>
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
