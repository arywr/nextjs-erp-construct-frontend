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
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function EditBarangPage() {
  const params = useParams()
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false)
  
  // Mock data - in real app, fetch based on params.id
  const [formData, setFormData] = React.useState({
    namaBarang: "Semen Portland",
    jenisBarang: "Material Bangunan",
    gudang: "Gudang Utama",
    stock: "500",
    satuan: "Sak",
    hargaBeli: "65000",
    hargaJual: "75000",
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
            <h1 className="text-sm font-medium">Barang</h1>
          </div>
        </header>
        <main className="flex flex-1 flex-col bg-background">
          <div className="flex-1 p-6">
            <div className="flex flex-col gap-6">
              {/* Page Header */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/master/barang/${params.id}`}>
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                  </Button>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-semibold tracking-tight">Edit Barang</h1>
                    <p className="text-sm text-muted-foreground">
                      Ubah informasi barang yang ada. Pastikan semua data yang diubah sudah benar sebelum menyimpan.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Form Container */}
              <div className="max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col gap-6">
                    {/* Nama Barang */}
                    <div className="space-y-2">
                      <Label htmlFor="namaBarang">
                        Nama Barang <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="namaBarang"
                        placeholder="Masukkan nama barang"
                        value={formData.namaBarang}
                        onChange={(e) => handleInputChange("namaBarang", e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>

                    {/* Jenis Barang */}
                    <div className="space-y-2">
                      <Label htmlFor="jenisBarang">
                        Jenis Barang <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.jenisBarang}
                        onValueChange={(value) => handleInputChange("jenisBarang", value)}
                        required
                      >
                        <SelectTrigger id="jenisBarang" className="w-full">
                          <SelectValue placeholder="Pilih jenis barang" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Material Bangunan">Material Bangunan</SelectItem>
                          <SelectItem value="Material Finishing">Material Finishing</SelectItem>
                          <SelectItem value="Material Atap">Material Atap</SelectItem>
                          <SelectItem value="Perkakas">Perkakas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Gudang */}
                    <div className="space-y-2">
                      <Label htmlFor="gudang">
                        Gudang <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.gudang}
                        onValueChange={(value) => handleInputChange("gudang", value)}
                        required
                      >
                        <SelectTrigger id="gudang" className="w-full">
                          <SelectValue placeholder="Pilih gudang" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Gudang Utama">Gudang Utama</SelectItem>
                          <SelectItem value="Gudang Cabang">Gudang Cabang</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Stock */}
                    <div className="space-y-2">
                      <Label htmlFor="stock">
                        Stock <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="stock"
                        type="number"
                        placeholder="Masukkan jumlah stock"
                        value={formData.stock}
                        onChange={(e) => handleInputChange("stock", e.target.value)}
                        className="w-full"
                        min="0"
                        required
                      />
                    </div>

                    {/* Satuan */}
                    <div className="space-y-2">
                      <Label htmlFor="satuan">
                        Satuan <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.satuan}
                        onValueChange={(value) => handleInputChange("satuan", value)}
                        required
                      >
                        <SelectTrigger id="satuan" className="w-full">
                          <SelectValue placeholder="Pilih satuan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Sak">Sak</SelectItem>
                          <SelectItem value="Batang">Batang</SelectItem>
                          <SelectItem value="M³">M³</SelectItem>
                          <SelectItem value="Box">Box</SelectItem>
                          <SelectItem value="Kaleng">Kaleng</SelectItem>
                          <SelectItem value="Kg">Kg</SelectItem>
                          <SelectItem value="Lembar">Lembar</SelectItem>
                          <SelectItem value="Buah">Buah</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Harga Beli */}
                    <div className="space-y-2">
                      <Label htmlFor="hargaBeli">
                        Harga Beli <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="hargaBeli"
                        type="number"
                        placeholder="Masukkan harga beli"
                        value={formData.hargaBeli}
                        onChange={(e) => handleInputChange("hargaBeli", e.target.value)}
                        className="w-full"
                        min="0"
                        required
                      />
                    </div>

                    {/* Harga Jual */}
                    <div className="space-y-2">
                      <Label htmlFor="hargaJual">
                        Harga Jual <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="hargaJual"
                        type="number"
                        placeholder="Masukkan harga jual"
                        value={formData.hargaJual}
                        onChange={(e) => handleInputChange("hargaJual", e.target.value)}
                        className="w-full"
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end gap-4 pt-4 border-t">
                    <Button type="button" variant="outline" asChild>
                      <Link href={`/master/barang/${params.id}`}>Batal</Link>
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
                Apakah Anda yakin ingin menyimpan perubahan pada data barang ini? Pastikan semua informasi sudah benar sebelum menyimpan.
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

