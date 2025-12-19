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

// Mock data - in real app, fetch from API
const availablePO = [
  {
    idPO: "PO-2024-001",
    supplier: "PT Material Bangunan Sejahtera",
    total: 55000000,
  },
  {
    idPO: "PO-2024-002",
    supplier: "CV Semen Nusantara",
    total: 5550000,
  },
  {
    idPO: "PO-2024-003",
    supplier: "PT Bahan Bangunan Sejahtera",
    total: 18425000,
  },
  {
    idPO: "PO-2024-004",
    supplier: "PT Supplier Bangunan Jaya",
    total: 555000,
  },
  {
    idPO: "PO-2024-005",
    supplier: "CV Material Konstruksi",
    total: 45650000,
  },
]

const availableBanks = [
  "Bank BCA",
  "Bank Mandiri",
  "Bank BNI",
  "Bank BRI",
  "Bank CIMB Niaga",
  "Bank Permata",
  "Bank Danamon",
  "Bank OCBC NISP",
]

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value)
}

export default function EditPermintaanPaymentPage() {
  const params = useParams()
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false)
  
  // Mock data - in real app, fetch based on params.id
  const [formData, setFormData] = React.useState({
    idPermintaanPayment: (params.id as string) || "PP-2024-001",
    po: "PO-2024-001",
    rekeningSumberBankName: "Bank BCA",
    rekeningSumberAccountNumber: "1234567890",
    rekeningSumberAccountOwner: "PT Konstruksi Jaya",
    rekeningTujuanBankName: "Bank Mandiri",
    rekeningTujuanAccountNumber: "0987654321",
    rekeningTujuanAccountOwner: "PT Material Bangunan Sejahtera",
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

  const selectedPO = availablePO.find((po) => po.idPO === formData.po)

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
                    <Link href={`/transaksi/permintaan-payment/${params.id}`}>
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                  </Button>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-semibold tracking-tight">Edit Permintaan Payment</h1>
                    <p className="text-sm text-muted-foreground">
                      Ubah informasi permintaan payment yang ada. Pastikan semua data yang diubah sudah benar sebelum menyimpan.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Form Container */}
              <div className="max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col gap-6">
                    {/* ID Permintaan Payment */}
                    <div className="space-y-2">
                      <Label htmlFor="idPermintaanPayment">
                        ID Permintaan Payment <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="idPermintaanPayment"
                        placeholder="Masukkan ID Permintaan Payment (contoh: PP-2024-001)"
                        value={formData.idPermintaanPayment}
                        onChange={(e) => handleInputChange("idPermintaanPayment", e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>

                    {/* Purchase Order Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="po">
                        Purchase Order <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.po}
                        onValueChange={(value) => handleInputChange("po", value)}
                        required
                      >
                        <SelectTrigger id="po" className="w-full">
                          <SelectValue placeholder="Pilih purchase order" />
                        </SelectTrigger>
                        <SelectContent>
                          {availablePO.map((po) => (
                            <SelectItem key={po.idPO} value={po.idPO}>
                              <div className="flex flex-col">
                                <span className="font-medium">{po.idPO}</span>
                                <span className="text-xs text-muted-foreground">
                                  {po.supplier} - {formatCurrency(po.total)}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {selectedPO && (
                        <p className="text-sm text-muted-foreground mt-1">
                          <span className="font-medium">PO:</span> {selectedPO.idPO} |{" "}
                          <span className="font-medium">Supplier:</span> {selectedPO.supplier} |{" "}
                          <span className="font-medium">Total:</span> {formatCurrency(selectedPO.total)}
                        </p>
                      )}
                    </div>

                    {/* Rekening Sumber Section */}
                    <div className="space-y-4 rounded-lg border border-border bg-card p-4">
                      <h3 className="text-sm font-semibold">Rekening Sumber</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="rekeningSumberBankName">
                          Nama Bank <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={formData.rekeningSumberBankName}
                          onValueChange={(value) => handleInputChange("rekeningSumberBankName", value)}
                          required
                        >
                          <SelectTrigger id="rekeningSumberBankName" className="w-full">
                            <SelectValue placeholder="Pilih bank" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableBanks.map((bank) => (
                              <SelectItem key={bank} value={bank}>
                                {bank}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="rekeningSumberAccountNumber">
                          Nomor Rekening <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="rekeningSumberAccountNumber"
                          placeholder="Masukkan nomor rekening"
                          value={formData.rekeningSumberAccountNumber}
                          onChange={(e) => handleInputChange("rekeningSumberAccountNumber", e.target.value)}
                          className="w-full"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="rekeningSumberAccountOwner">
                          Nama Pemilik Rekening <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="rekeningSumberAccountOwner"
                          placeholder="Masukkan nama pemilik rekening"
                          value={formData.rekeningSumberAccountOwner}
                          onChange={(e) => handleInputChange("rekeningSumberAccountOwner", e.target.value)}
                          className="w-full"
                          required
                        />
                      </div>
                    </div>

                    {/* Rekening Tujuan Section */}
                    <div className="space-y-4 rounded-lg border border-border bg-card p-4">
                      <h3 className="text-sm font-semibold">Rekening Tujuan</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="rekeningTujuanBankName">
                          Nama Bank <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={formData.rekeningTujuanBankName}
                          onValueChange={(value) => handleInputChange("rekeningTujuanBankName", value)}
                          required
                        >
                          <SelectTrigger id="rekeningTujuanBankName" className="w-full">
                            <SelectValue placeholder="Pilih bank" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableBanks.map((bank) => (
                              <SelectItem key={bank} value={bank}>
                                {bank}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="rekeningTujuanAccountNumber">
                          Nomor Rekening <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="rekeningTujuanAccountNumber"
                          placeholder="Masukkan nomor rekening"
                          value={formData.rekeningTujuanAccountNumber}
                          onChange={(e) => handleInputChange("rekeningTujuanAccountNumber", e.target.value)}
                          className="w-full"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="rekeningTujuanAccountOwner">
                          Nama Pemilik Rekening <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="rekeningTujuanAccountOwner"
                          placeholder="Masukkan nama pemilik rekening"
                          value={formData.rekeningTujuanAccountOwner}
                          onChange={(e) => handleInputChange("rekeningTujuanAccountOwner", e.target.value)}
                          className="w-full"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end gap-4 pt-4 border-t">
                    <Button type="button" variant="outline" asChild>
                      <Link href={`/transaksi/permintaan-payment/${params.id}`}>Batal</Link>
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
                Apakah Anda yakin ingin menyimpan perubahan data permintaan payment ini? Pastikan semua informasi sudah benar sebelum menyimpan.
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
