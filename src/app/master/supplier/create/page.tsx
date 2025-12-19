"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CreateSupplierPage() {
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false)
  const [formData, setFormData] = React.useState({
    namaSupplier: "",
    kontak: "",
    alamat: "",
    kota: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowConfirmDialog(true)
  }

  const handleConfirm = () => {
    // Handle form submission here
    console.log("Form submitted:", formData)
    setShowConfirmDialog(false)
    // You can add navigation or success message here
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 h-4"
          />
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-medium">Supplier</h1>
          </div>
        </header>
        <main className="flex flex-1 flex-col bg-background">
          <div className="flex-1 p-6">
            <div className="flex flex-col gap-6">
              {/* Page Header */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="/master/supplier">
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                  </Button>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-semibold tracking-tight">Tambah Supplier Baru</h1>
                    <p className="text-sm text-muted-foreground">
                      Tambahkan data supplier baru ke dalam sistem. Lengkapi semua informasi yang diperlukan untuk menambahkan supplier.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Form Container */}
              <div className="max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col gap-6">
                    {/* Nama Supplier */}
                    <div className="space-y-2">
                      <Label htmlFor="namaSupplier">
                        Nama Supplier <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="namaSupplier"
                        placeholder="Masukkan nama supplier"
                        value={formData.namaSupplier}
                        onChange={(e) => handleInputChange("namaSupplier", e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>

                    {/* Kontak */}
                    <div className="space-y-2">
                      <Label htmlFor="kontak">
                        Kontak <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="kontak"
                        type="tel"
                        placeholder="Masukkan nomor kontak"
                        value={formData.kontak}
                        onChange={(e) => handleInputChange("kontak", e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>

                    {/* Alamat */}
                    <div className="space-y-2">
                      <Label htmlFor="alamat">
                        Alamat <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="alamat"
                        placeholder="Masukkan alamat supplier"
                        value={formData.alamat}
                        onChange={(e) => handleInputChange("alamat", e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>

                    {/* Kota */}
                    <div className="space-y-2">
                      <Label htmlFor="kota">
                        Kota <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="kota"
                        placeholder="Masukkan kota"
                        value={formData.kota}
                        onChange={(e) => handleInputChange("kota", e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end gap-4 pt-4 border-t">
                    <Button type="button" variant="outline" asChild>
                      <Link href="/master/supplier">Batal</Link>
                    </Button>
                    <Button type="submit">Simpan</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>

        {/* Confirmation Dialog */}
        <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Konfirmasi Simpan Data</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menyimpan data supplier ini? Pastikan semua informasi sudah benar sebelum menyimpan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirm}>
                Simpan
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SidebarInset>
    </SidebarProvider>
  )
}

