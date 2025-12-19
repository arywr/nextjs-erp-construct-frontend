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
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { useParams } from "next/navigation"

export default function EditProduksiPage() {
  const params = useParams()
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false)
  
  // Mock data - in real app, fetch based on params.id
  const [formData, setFormData] = React.useState({
    nomorWO: "WO-2024-001",
    deskripsi: "Pembuatan Beton Ready Mix untuk Proyek Gedung A",
    status: "In Progress",
    tanggalMulai: "2024-01-15",
    tanggalSelesai: "2024-02-15",
    progress: "65",
    prioritas: "Tinggi",
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
            <h1 className="text-sm font-medium">Produksi</h1>
          </div>
        </header>
        <main className="flex flex-1 flex-col bg-background">
          <div className="flex-1 p-6">
            <div className="flex flex-col gap-6">
              {/* Page Header */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/master/produksi/${params.id}`}>
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                  </Button>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-semibold tracking-tight">Edit Produksi</h1>
                    <p className="text-sm text-muted-foreground">
                      Ubah informasi work order yang ada. Pastikan semua data yang diubah sudah benar sebelum menyimpan.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Form Container */}
              <div className="max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col gap-6">
                    {/* Nomor WO */}
                    <div className="space-y-2">
                      <Label htmlFor="nomorWO">
                        Nomor Work Order <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="nomorWO"
                        placeholder="Masukkan nomor work order (contoh: WO-2024-001)"
                        value={formData.nomorWO}
                        onChange={(e) => handleInputChange("nomorWO", e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>

                    {/* Deskripsi */}
                    <div className="space-y-2">
                      <Label htmlFor="deskripsi">
                        Deskripsi <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="deskripsi"
                        placeholder="Masukkan deskripsi work order"
                        value={formData.deskripsi}
                        onChange={(e) => handleInputChange("deskripsi", e.target.value)}
                        className="w-full min-h-[100px]"
                        required
                      />
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                      <Label htmlFor="status">
                        Status <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) => handleInputChange("status", value)}
                        required
                      >
                        <SelectTrigger id="status" className="w-full">
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Planning">Planning</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="On Hold">On Hold</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Prioritas */}
                    <div className="space-y-2">
                      <Label htmlFor="prioritas">
                        Prioritas <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.prioritas}
                        onValueChange={(value) => handleInputChange("prioritas", value)}
                        required
                      >
                        <SelectTrigger id="prioritas" className="w-full">
                          <SelectValue placeholder="Pilih prioritas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Tinggi">Tinggi</SelectItem>
                          <SelectItem value="Sedang">Sedang</SelectItem>
                          <SelectItem value="Rendah">Rendah</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Tanggal Mulai */}
                    <div className="space-y-2">
                      <Label htmlFor="tanggalMulai">
                        Tanggal Mulai <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="tanggalMulai"
                        type="date"
                        value={formData.tanggalMulai}
                        onChange={(e) => handleInputChange("tanggalMulai", e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>

                    {/* Tanggal Selesai */}
                    <div className="space-y-2">
                      <Label htmlFor="tanggalSelesai">
                        Tanggal Selesai <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="tanggalSelesai"
                        type="date"
                        value={formData.tanggalSelesai}
                        onChange={(e) => handleInputChange("tanggalSelesai", e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                      <Label htmlFor="progress">
                        Progress (%) <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="progress"
                        type="number"
                        min="0"
                        max="100"
                        placeholder="Masukkan progress (0-100)"
                        value={formData.progress}
                        onChange={(e) => handleInputChange("progress", e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end gap-4 pt-4 border-t">
                    <Button type="button" variant="outline" asChild>
                      <Link href={`/master/produksi/${params.id}`}>Batal</Link>
                    </Button>
                    <Button type="submit">Simpan Perubahan</Button>
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
              <AlertDialogTitle>Konfirmasi Simpan Perubahan</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menyimpan perubahan data produksi ini? Pastikan semua informasi sudah benar sebelum menyimpan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirm}>
                Simpan Perubahan
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SidebarInset>
    </SidebarProvider>
  )
}

