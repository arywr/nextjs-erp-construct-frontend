"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Package, ArrowLeft } from "lucide-react"
import Link from "next/link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Handle forgot password logic here
    console.log("Forgot password request for:", email)
    
    setIsLoading(false)
    setShowSuccessDialog(true)
  }

  const handleDialogClose = () => {
    setShowSuccessDialog(false)
    // Redirect to login page
    window.location.href = "/login"
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

        {/* Forgot Password Form */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                <Link href="/login">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <h2 className="text-xl font-semibold">Lupa Password</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Masukkan username atau email Anda. Kami akan mengirimkan instruksi untuk mereset password Anda.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username/Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                Username atau Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="text"
                placeholder="Masukkan username atau email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
                autoComplete="username"
                disabled={isLoading}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Mengirim..." : "Kirim Instruksi Reset Password"}
            </Button>

            {/* Back to Login */}
            <div className="text-center">
              <Link
                href="/login"
                className="text-sm text-primary hover:underline"
              >
                Kembali ke halaman login
              </Link>
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          © 2024 ERP Konstruksi. All rights reserved.
        </p>
      </div>

      {/* Success Dialog */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Instruksi Dikirim</AlertDialogTitle>
            <AlertDialogDescription>
              Kami telah mengirimkan instruksi untuk mereset password Anda ke email yang terdaftar. 
              Silakan periksa kotak masuk email Anda dan ikuti langkah-langkah yang diberikan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleDialogClose}>
              Kembali ke Login
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
