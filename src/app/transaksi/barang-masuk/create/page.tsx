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
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock data - in real app, fetch from API
const availableBarang = [
  { id: "BRG001", nama: "Semen Portland" },
  { id: "BRG002", nama: "Besi Beton 10mm" },
  { id: "BRG003", nama: "Pasir Kasar" },
  { id: "BRG004", nama: "Keramik 30x30" },
  { id: "BRG005", nama: "Cat Tembok Putih" },
]

const availableProduksi = [
  { nomorProduksi: "WO-2024-001", namaProduksi: "Pembuatan Beton Ready Mix untuk Proyek Gedung A" },
  { nomorProduksi: "WO-2024-002", namaProduksi: "Produksi Paving Block untuk Area Parkir" },
  { nomorProduksi: "WO-2024-003", namaProduksi: "Pembuatan Panel Beton Precast" },
  { nomorProduksi: "WO-2024-004", namaProduksi: "Produksi Bata Merah untuk Proyek Perumahan" },
  { nomorProduksi: "WO-2024-005", namaProduksi: "Pembuatan Genteng Beton" },
  { nomorProduksi: "WO-2024-006", namaProduksi: "Produksi U-Ditch untuk Drainase" },
  { nomorProduksi: "WO-2024-007", namaProduksi: "Pembuatan Kanstin Beton" },
  { nomorProduksi: "WO-2024-008", namaProduksi: "Produksi Tiang Pancang Beton" },
]

export default function CreateBarangMasukPage() {
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false)
  const [formData, setFormData] = React.useState({
    namaBarang: "",
    nomorProduksi: "",
    jumlah: "",
    keterangan: "",
    tanggal: "",
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

  const selectedProduksi = availableProduksi.find(
    (p) => p.nomorProduksi === formData.nomorProduksi
  )

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
            <h1 className="text-sm font-medium">Transaksi</h1>
          </div>
        </header>
        <main className="flex flex-1 flex-col bg-background">
          <div className="flex-1 p-6">
            <div className="flex flex-col gap-6">
              {/* Page Header */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="/transaksi/barang-masuk">
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                  </Button>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-semibold tracking-tight">Tambah Barang Masuk</h1>
                    <p className="text-sm text-muted-foreground">
                      Buat transaksi barang masuk baru. Lengkapi semua informasi yang diperlukan untuk mencatat barang masuk ke gudang.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Form Container */}
              <div className="max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col gap-6">
                    {/* Tanggal */}
                    <div className="space-y-2">
                      <Label htmlFor="tanggal">
                        Tanggal <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="tanggal"
                        type="date"
                        value={formData.tanggal}
                        onChange={(e) => handleInputChange("tanggal", e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>

                    {/* Nama Barang */}
                    <div className="space-y-2">
                      <Label htmlFor="namaBarang">
                        Nama Barang <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.namaBarang}
                        onValueChange={(value) => handleInputChange("namaBarang", value)}
                        required
                      >
                        <SelectTrigger id="namaBarang" className="w-full">
                          <SelectValue placeholder="Pilih barang" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableBarang.map((barang) => (
                            <SelectItem key={barang.id} value={barang.id}>
                              {barang.nama}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Produksi */}
                    <div className="space-y-2">
                      <Label htmlFor="nomorProduksi">
                        Produksi <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.nomorProduksi}
                        onValueChange={(value) => handleInputChange("nomorProduksi", value)}
                        required
                      >
                        <SelectTrigger id="nomorProduksi" className="w-full">
                          <SelectValue placeholder="Pilih produksi" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableProduksi.map((prod) => (
                            <SelectItem key={prod.nomorProduksi} value={prod.nomorProduksi}>
                              <div className="flex flex-col">
                                <span className="font-medium">{prod.nomorProduksi}</span>
                                <span className="text-xs text-muted-foreground">{prod.namaProduksi}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {selectedProduksi && (
                        <p className="text-sm text-muted-foreground mt-1">
                          <span className="font-medium">Nomor Produksi:</span> {selectedProduksi.nomorProduksi} |{" "}
                          <span className="font-medium">Nama Produksi:</span> {selectedProduksi.namaProduksi}
                        </p>
                      )}
                    </div>

                    {/* Jumlah */}
                    <div className="space-y-2">
                      <Label htmlFor="jumlah">
                        Jumlah <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="jumlah"
                        type="number"
                        min="1"
                        placeholder="Masukkan jumlah barang"
                        value={formData.jumlah}
                        onChange={(e) => handleInputChange("jumlah", e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>

                    {/* Keterangan */}
                    <div className="space-y-2">
                      <Label htmlFor="keterangan">
                        Keterangan
                      </Label>
                      <Textarea
                        id="keterangan"
                        placeholder="Masukkan keterangan (opsional)"
                        value={formData.keterangan}
                        onChange={(e) => handleInputChange("keterangan", e.target.value)}
                        className="w-full min-h-[100px]"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end gap-4 pt-4 border-t">
                    <Button type="button" variant="outline" asChild>
                      <Link href="/transaksi/barang-masuk">Batal</Link>
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
                Apakah Anda yakin ingin menyimpan data transaksi barang masuk ini? Pastikan semua informasi sudah benar sebelum menyimpan.
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

