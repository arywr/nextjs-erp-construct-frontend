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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
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
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"

const availableJabatan = [
  "Administrator",
  "Manager Gudang",
  "Supervisor",
  "Staff Gudang",
]

const availableLokasiGudang = [
  "Gudang Utama",
  "Gudang Cabang",
  "Gudang Pusat",
]

export default function CreateUserPage() {
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false)
  const [formData, setFormData] = React.useState({
    nama: "",
    jabatan: "",
    photo: "",
    lokasiGudang: [] as string[],
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleLokasiGudangChange = (lokasi: string, checked: boolean) => {
    setFormData((prev) => {
      if (checked) {
        return {
          ...prev,
          lokasiGudang: [...prev.lokasiGudang, lokasi],
        }
      } else {
        return {
          ...prev,
          lokasiGudang: prev.lokasiGudang.filter((l) => l !== lokasi),
        }
      }
    })
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload the file and get the URL
      // For now, we'll just store the file name
      setFormData((prev) => ({
        ...prev,
        photo: file.name,
      }))
    }
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
            <h1 className="text-sm font-medium">Pengaturan</h1>
          </div>
        </header>
        <main className="flex flex-1 flex-col bg-background">
          <div className="flex-1 p-6">
            <div className="flex flex-col gap-6">
              {/* Page Header */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="/pengaturan/manajemen-user">
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                  </Button>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-semibold tracking-tight">Tambah User Baru</h1>
                    <p className="text-sm text-muted-foreground">
                      Buat user baru untuk sistem. Lengkapi semua informasi yang diperlukan untuk membuat user.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Form Container */}
              <div className="max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col gap-6">
                    {/* Nama */}
                    <div className="space-y-2">
                      <Label htmlFor="nama">
                        Nama <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="nama"
                        placeholder="Masukkan nama lengkap"
                        value={formData.nama}
                        onChange={(e) => handleInputChange("nama", e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>

                    {/* Jabatan */}
                    <div className="space-y-2">
                      <Label htmlFor="jabatan">
                        Jabatan <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.jabatan}
                        onValueChange={(value) => handleInputChange("jabatan", value)}
                        required
                      >
                        <SelectTrigger id="jabatan" className="w-full">
                          <SelectValue placeholder="Pilih jabatan" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableJabatan.map((jabatan) => (
                            <SelectItem key={jabatan} value={jabatan}>
                              {jabatan}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Photo */}
                    <div className="space-y-2">
                      <Label htmlFor="photo">
                        Photo
                      </Label>
                      <div className="flex items-center gap-4">
                        <Input
                          id="photo"
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="w-full"
                        />
                      </div>
                      {formData.photo && (
                        <p className="text-sm text-muted-foreground">
                          File dipilih: {formData.photo}
                        </p>
                      )}
                    </div>

                    {/* Lokasi Gudang */}
                    <div className="space-y-2">
                      <Label>
                        Lokasi Gudang <span className="text-destructive">*</span>
                      </Label>
                      <div className="space-y-3 rounded-md border border-border p-4">
                        {availableLokasiGudang.map((lokasi) => (
                          <div key={lokasi} className="flex items-center space-x-2">
                            <Checkbox
                              id={`lokasi-${lokasi}`}
                              checked={formData.lokasiGudang.includes(lokasi)}
                              onCheckedChange={(checked) =>
                                handleLokasiGudangChange(lokasi, checked as boolean)
                              }
                            />
                            <label
                              htmlFor={`lokasi-${lokasi}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              {lokasi}
                            </label>
                          </div>
                        ))}
                      </div>
                      {formData.lokasiGudang.length === 0 && (
                        <p className="text-sm text-destructive">
                          Pilih minimal satu lokasi gudang
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end gap-4 pt-4 border-t">
                    <Button type="button" variant="outline" asChild>
                      <Link href="/pengaturan/manajemen-user">Batal</Link>
                    </Button>
                    <Button
                      type="submit"
                      disabled={formData.lokasiGudang.length === 0}
                    >
                      Simpan
                    </Button>
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
                Apakah Anda yakin ingin menyimpan data user ini? Pastikan semua informasi sudah benar sebelum menyimpan.
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

