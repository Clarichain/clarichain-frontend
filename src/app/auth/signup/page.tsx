"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Mail, Lock, User, Wallet } from "lucide-react"
import Link from "next/link"
import AuthFormLayout from "@/components/custom-ui/AuthForm"
import SignupForm from "@/components/custom-ui/SignInForm"

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle signup logic here
    console.log("Signup attempt:", formData)
    // Simulate successful signup and redirect
    window.location.href = "/dashboard"
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="max-w-[500px] mx-auto max-md:px-5 max-md:py-10">
      <AuthFormLayout
        title="Create a new account"
        subtitle={
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            Already have an account?{" "}
            <a
              href="/auth/login"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Sign In
            </a>
          </p>
        }
      >
        <SignupForm />
      </AuthFormLayout>
    </div>
  );
}
