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
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

// Mock data - in real app, fetch from API
const availableSuppliers = [
  { id: "SUP001", namaSupplier: "PT Material Bangunan Sejahtera", alamat: "Jl. Industri Raya No. 100, Jakarta" },
  { id: "SUP002", namaSupplier: "CV Semen Nusantara", alamat: "Jl. Perintis Kemerdekaan No. 200, Bandung" },
  { id: "SUP003", namaSupplier: "PT Besi Beton Indonesia", alamat: "Jl. Gatot Subroto No. 300, Jakarta" },
  { id: "SUP004", namaSupplier: "UD Perkakas Jaya", alamat: "Jl. Ahmad Yani No. 400, Surabaya" },
  { id: "SUP005", namaSupplier: "PT Cat Tembok Nusantara", alamat: "Jl. Soekarno Hatta No. 500, Yogyakarta" },
]

const availablePermintaanBarang = [
  { id: "PB-2024-001", namaBarang: "Semen Portland", jumlahBarang: 100 },
  { id: "PB-2024-002", namaBarang: "Besi Beton 10mm", jumlahBarang: 500 },
  { id: "PB-2024-003", namaBarang: "Pasir Kasar", jumlahBarang: 20 },
  { id: "PB-2024-004", namaBarang: "Keramik 30x30", jumlahBarang: 200 },
  { id: "PB-2024-005", namaBarang: "Cat Tembok Putih", jumlahBarang: 50 },
]

const availableBarang = [
  { id: "BRG001", namaBarang: "Semen Portland", hargaBeli: 65000 },
  { id: "BRG002", namaBarang: "Besi Beton 10mm", hargaBeli: 85000 },
  { id: "BRG003", namaBarang: "Pasir Kasar", hargaBeli: 250000 },
  { id: "BRG004", namaBarang: "Keramik 30x30", hargaBeli: 45000 },
  { id: "BRG005", namaBarang: "Cat Tembok Putih", hargaBeli: 125000 },
  { id: "BRG006", namaBarang: "Paku Beton 3 inch", hargaBeli: 18000 },
  { id: "BRG007", namaBarang: "Genteng Metal", hargaBeli: 45000 },
  { id: "BRG008", namaBarang: "Batu Bata Merah", hargaBeli: 500 },
]

type BarangItem = {
  id: string
  namaBarang: string
  jumlah: number
  harga: number
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value)
}

export default function CreatePurchaseOrderPage() {
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false)
  const [formData, setFormData] = React.useState({
    idPO: "",
    tanggalPO: "",
    supplier: "",
    dataType: "" as "Permintaan Barang" | "Data Barang" | "",
    permintaanBarang: "",
    dataBarang: [] as BarangItem[],
    includePPh: false,
    catatanPembayaran: "",
    catatan: "",
  })

  const [newBarangItem, setNewBarangItem] = React.useState({
    barang: "",
    jumlah: "",
    harga: "",
  })

  const handleInputChange = (field: string, value: string | boolean | BarangItem[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddBarang = () => {
    if (!newBarangItem.barang || !newBarangItem.jumlah || !newBarangItem.harga) {
      return
    }

    const selectedBarang = availableBarang.find((b) => b.id === newBarangItem.barang)
    if (!selectedBarang) return

    const newItem: BarangItem = {
      id: selectedBarang.id,
      namaBarang: selectedBarang.namaBarang,
      jumlah: Number(newBarangItem.jumlah),
      harga: Number(newBarangItem.harga),
    }

    setFormData((prev) => ({
      ...prev,
      dataBarang: [...prev.dataBarang, newItem],
    }))

    setNewBarangItem({
      barang: "",
      jumlah: "",
      harga: "",
    })
  }

  const handleRemoveBarang = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      dataBarang: prev.dataBarang.filter((_, i) => i !== index),
    }))
  }

  // Calculate subtotal
  const calculateSubtotal = (): number => {
    if (formData.dataType === "Permintaan Barang" && formData.permintaanBarang) {
      const pb = availablePermintaanBarang.find((p) => p.id === formData.permintaanBarang)
      if (pb) {
        // Mock price calculation - in real app, fetch from API
        const mockPrice = availableBarang.find((b) => b.namaBarang === pb.namaBarang)?.hargaBeli || 0
        return pb.jumlahBarang * mockPrice
      }
    } else if (formData.dataType === "Data Barang") {
      return formData.dataBarang.reduce((sum, item) => sum + item.jumlah * item.harga, 0)
    }
    return 0
  }

  // Calculate PPh (2% of subtotal)
  const calculatePPh = (): number => {
    if (!formData.includePPh) return 0
    return calculateSubtotal() * 0.02
  }

  // Calculate total
  const calculateTotal = (): number => {
    return calculateSubtotal() + calculatePPh()
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

  const selectedSupplier = availableSuppliers.find((s) => s.id === formData.supplier)
  const selectedPB = availablePermintaanBarang.find((p) => p.id === formData.permintaanBarang)
  const subtotal = calculateSubtotal()
  const pph = calculatePPh()
  const total = calculateTotal()

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
                    <Link href="/transaksi/purchase-order">
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                  </Button>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-semibold tracking-tight">Tambah Purchase Order</h1>
                    <p className="text-sm text-muted-foreground">
                      Buat purchase order baru. Lengkapi semua informasi yang diperlukan untuk mencatat purchase order dari supplier.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Form Container */}
              <div className="max-w-4xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col gap-6">
                    {/* ID PO */}
                    <div className="space-y-2">
                      <Label htmlFor="idPO">
                        ID PO <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="idPO"
                        placeholder="Masukkan ID PO (contoh: PO-2024-001)"
                        value={formData.idPO}
                        onChange={(e) => handleInputChange("idPO", e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>

                    {/* Tanggal PO */}
                    <div className="space-y-2">
                      <Label htmlFor="tanggalPO">
                        Tanggal PO <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="tanggalPO"
                        type="date"
                        value={formData.tanggalPO}
                        onChange={(e) => handleInputChange("tanggalPO", e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>

                    {/* Supplier */}
                    <div className="space-y-2">
                      <Label htmlFor="supplier">
                        Supplier <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.supplier}
                        onValueChange={(value) => handleInputChange("supplier", value)}
                        required
                      >
                        <SelectTrigger id="supplier" className="w-full">
                          <SelectValue placeholder="Pilih supplier" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableSuppliers.map((supplier) => (
                            <SelectItem key={supplier.id} value={supplier.id}>
                              <div className="flex flex-col">
                                <span className="font-medium">{supplier.namaSupplier}</span>
                                <span className="text-xs text-muted-foreground">{supplier.alamat}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {selectedSupplier && (
                        <p className="text-sm text-muted-foreground mt-1">
                          <span className="font-medium">Supplier:</span> {selectedSupplier.namaSupplier} |{" "}
                          <span className="font-medium">Alamat:</span> {selectedSupplier.alamat}
                        </p>
                      )}
                    </div>

                    {/* Data Type Selection */}
                    <div className="space-y-2">
                      <Label>
                        Pilih Tipe Data <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.dataType}
                        onValueChange={(value) => {
                          handleInputChange("dataType", value)
                          // Reset related fields when changing type
                          if (value === "Permintaan Barang") {
                            handleInputChange("dataBarang", [])
                          } else {
                            handleInputChange("permintaanBarang", "")
                          }
                        }}
                        required
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih tipe data" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Permintaan Barang">Permintaan Barang</SelectItem>
                          <SelectItem value="Data Barang">Data Barang</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Permintaan Barang Selection */}
                    {formData.dataType === "Permintaan Barang" && (
                      <div className="space-y-2">
                        <Label htmlFor="permintaanBarang">
                          Permintaan Barang <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={formData.permintaanBarang}
                          onValueChange={(value) => handleInputChange("permintaanBarang", value)}
                          required
                        >
                          <SelectTrigger id="permintaanBarang" className="w-full">
                            <SelectValue placeholder="Pilih permintaan barang" />
                          </SelectTrigger>
                          <SelectContent>
                            {availablePermintaanBarang.map((pb) => (
                              <SelectItem key={pb.id} value={pb.id}>
                                <div className="flex flex-col">
                                  <span className="font-medium">{pb.id}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {pb.namaBarang} - {pb.jumlahBarang.toLocaleString("id-ID")} unit
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {selectedPB && (
                          <p className="text-sm text-muted-foreground mt-1">
                            <span className="font-medium">PB:</span> {selectedPB.id} |{" "}
                            <span className="font-medium">Barang:</span> {selectedPB.namaBarang} |{" "}
                            <span className="font-medium">Jumlah:</span> {selectedPB.jumlahBarang.toLocaleString("id-ID")}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Data Barang Section */}
                    {formData.dataType === "Data Barang" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Data Barang</Label>
                          <div className="rounded-lg border border-border bg-card p-4">
                            <div className="grid grid-cols-12 gap-4 mb-4">
                              <div className="col-span-5">
                                <Label htmlFor="newBarang" className="text-xs">Barang</Label>
                                <Select
                                  value={newBarangItem.barang}
                                  onValueChange={(value) => {
                                    const selectedBarang = availableBarang.find((b) => b.id === value)
                                    setNewBarangItem((prev) => ({
                                      ...prev,
                                      barang: value,
                                      harga: selectedBarang?.hargaBeli.toString() || "",
                                    }))
                                  }}
                                >
                                  <SelectTrigger id="newBarang" className="w-full">
                                    <SelectValue placeholder="Pilih barang" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {availableBarang.map((barang) => (
                                      <SelectItem key={barang.id} value={barang.id}>
                                        {barang.namaBarang}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="col-span-3">
                                <Label htmlFor="newJumlah" className="text-xs">Jumlah</Label>
                                <Input
                                  id="newJumlah"
                                  type="number"
                                  min="1"
                                  placeholder="Jumlah"
                                  value={newBarangItem.jumlah}
                                  onChange={(e) => setNewBarangItem((prev) => ({ ...prev, jumlah: e.target.value }))}
                                />
                              </div>
                              <div className="col-span-3">
                                <Label htmlFor="newHarga" className="text-xs">Harga</Label>
                                <Input
                                  id="newHarga"
                                  type="number"
                                  min="0"
                                  placeholder="Harga"
                                  value={newBarangItem.harga}
                                  onChange={(e) => setNewBarangItem((prev) => ({ ...prev, harga: e.target.value }))}
                                />
                              </div>
                              <div className="col-span-1 flex items-end">
                                <Button
                                  type="button"
                                  size="sm"
                                  onClick={handleAddBarang}
                                  disabled={!newBarangItem.barang || !newBarangItem.jumlah || !newBarangItem.harga}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            {formData.dataBarang.length > 0 && (
                              <div className="rounded-md border">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Barang</TableHead>
                                      <TableHead className="text-right">Jumlah</TableHead>
                                      <TableHead className="text-right">Harga</TableHead>
                                      <TableHead className="text-right">Subtotal</TableHead>
                                      <TableHead className="w-[100px]">Aksi</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {formData.dataBarang.map((item, index) => (
                                      <TableRow key={index}>
                                        <TableCell className="font-medium">{item.namaBarang}</TableCell>
                                        <TableCell className="text-right">{item.jumlah.toLocaleString("id-ID")}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(item.harga)}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(item.jumlah * item.harga)}</TableCell>
                                        <TableCell>
                                          <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleRemoveBarang(index)}
                                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                          >
                                            <Trash2 className="h-4 w-4" />
                                          </Button>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Include PPh Checkbox */}
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="includePPh"
                        checked={formData.includePPh}
                        onCheckedChange={(checked) => handleInputChange("includePPh", checked as boolean)}
                      />
                      <Label htmlFor="includePPh" className="cursor-pointer">
                        Include PPh (2%)
                      </Label>
                    </div>

                    {/* Catatan Sistem Pembayaran */}
                    <div className="space-y-2">
                      <Label htmlFor="catatanPembayaran">
                        Catatan (Sistem Pembayaran)
                      </Label>
                      <Textarea
                        id="catatanPembayaran"
                        placeholder="Masukkan catatan sistem pembayaran..."
                        value={formData.catatanPembayaran}
                        onChange={(e) => handleInputChange("catatanPembayaran", e.target.value)}
                        className="w-full min-h-[100px]"
                      />
                    </div>

                    {/* Catatan */}
                    <div className="space-y-2">
                      <Label htmlFor="catatan">
                        Catatan (Note)
                      </Label>
                      <Textarea
                        id="catatan"
                        placeholder="Masukkan catatan tambahan..."
                        value={formData.catatan}
                        onChange={(e) => handleInputChange("catatan", e.target.value)}
                        className="w-full min-h-[100px]"
                      />
                    </div>

                    {/* Total Section - Invoice Style */}
                    <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-6 space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Subtotal:</span>
                        <span className="font-medium">{formatCurrency(subtotal)}</span>
                      </div>
                      {formData.includePPh && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">PPh (2%):</span>
                          <span className="font-medium">{formatCurrency(pph)}</span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Total:</span>
                        <span className="text-2xl font-bold text-primary">{formatCurrency(total)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end gap-4 pt-4 border-t">
                    <Button type="button" variant="outline" asChild>
                      <Link href="/transaksi/purchase-order">Batal</Link>
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
                Apakah Anda yakin ingin menyimpan data purchase order ini? Pastikan semua informasi sudah benar sebelum menyimpan.
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
