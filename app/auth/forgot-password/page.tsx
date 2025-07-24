"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle forgot password logic here
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <img src="/clarichain-logo.png" alt="ClariChain" className="w-10 h-10" />
            <span className="text-2xl font-bold text-[#1E293B]">ClariChain</span>
          </Link>
        </div>

        <Card className="border-0 shadow-xl bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-[#1E293B]">
              {isSubmitted ? "Check Your Email" : "Reset Password"}
            </CardTitle>
            <CardDescription className="text-[#64748B]">
              {isSubmitted
                ? "We've sent a password reset link to your email"
                : "Enter your email to receive a password reset link"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isSubmitted ? (
              <>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#1E293B]">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-[#64748B]" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-[#2453CC] hover:bg-[#1e42a4] text-white">
                    Send Reset Link
                  </Button>
                </form>

                <div className="text-center">
                  <Link href="/auth/login" className="inline-flex items-center text-sm text-[#2453CC] hover:underline">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Sign In
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-[#38B26C]/10 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-[#38B26C]" />
                </div>
                <p className="text-[#64748B]">
                  If an account with <strong>{email}</strong> exists, you'll receive a password reset link shortly.
                </p>
                <Link href="/auth/login">
                  <Button className="w-full bg-[#2453CC] hover:bg-[#1e42a4] text-white">Return to Sign In</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
