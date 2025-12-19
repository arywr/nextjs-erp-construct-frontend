"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Package } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
  })
  const [isLoading, setIsLoading] = React.useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Handle login logic here
    console.log("Login attempt:", formData)
    
    // In real app, validate credentials and redirect
    // For now, just redirect to home
    router.push("/")
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary text-primary-foreground flex aspect-square size-16 items-center justify-center rounded-lg mb-4">
            <Package className="size-8" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">ERP Konstruksi</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Sistem Manajemen Konstruksi
          </p>
        </div>

        {/* Login Form */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Masuk ke Akun</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Masukkan username dan password Anda untuk melanjutkan
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username">
                Username <span className="text-destructive">*</span>
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Masukkan username"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className="w-full"
                required
                autoComplete="username"
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">
                Password <span className="text-destructive">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Masukkan password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="w-full"
                required
                autoComplete="current-password"
                disabled={isLoading}
              />
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Lupa password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Memproses..." : "Masuk"}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          © 2024 ERP Konstruksi. All rights reserved.
        </p>
      </div>
    </div>
  )
}
