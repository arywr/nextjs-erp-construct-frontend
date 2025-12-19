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
import { Checkbox } from "@/components/ui/checkbox"
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
import { cn } from "@/lib/utils"

type TabValue = "pajak" | "rekening" | "tanda-tangan"

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

export default function PengaturanPerusahaanPage() {
  const [activeTab, setActiveTab] = React.useState<TabValue>("pajak")
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false)
  
  // Pajak form state
  const [pajakData, setPajakData] = React.useState({
    namaPajak: "Pajak Pertambahan Nilai (PPN)",
    nilaiPajak: "11",
  })

  // Rekening form state
  const [rekeningData, setRekeningData] = React.useState({
    namaPemilikRekening: "PT Konstruksi Jaya",
    nomorRekening: "1234567890",
    bank: "Bank BCA",
  })

  // Tanda Tangan form state
  const [tandaTanganData, setTandaTanganData] = React.useState({
    username: true,
  })

  const tabs = [
    { id: "pajak" as TabValue, label: "Pajak" },
    { id: "rekening" as TabValue, label: "Rekening" },
    { id: "tanda-tangan" as TabValue, label: "Konfigurasi Tanda Tangan" },
  ]

  const handlePajakChange = (field: string, value: string) => {
    setPajakData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleRekeningChange = (field: string, value: string) => {
    setRekeningData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleTandaTanganChange = (field: string, checked: boolean) => {
    setTandaTanganData((prev) => ({
      ...prev,
      [field]: checked,
    }))
  }

  const handleSave = () => {
    setShowConfirmDialog(true)
  }

  const handleConfirmSave = () => {
    // Handle save action here
    console.log("Saving settings:", {
      pajak: pajakData,
      rekening: rekeningData,
      tandaTangan: tandaTanganData,
    })
    setShowConfirmDialog(false)
    // You can add success message here
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
                <h1 className="text-2xl font-semibold tracking-tight">Pengaturan Perusahaan</h1>
                <p className="text-sm text-muted-foreground">
                  Kelola pengaturan perusahaan termasuk konfigurasi pajak, rekening, dan tanda tangan untuk dokumen perusahaan.
                </p>
              </div>

              {/* Sub Navigation */}
              <div className="border-b border-border">
                <nav className="flex gap-2 -mb-px">
                  {tabs.map((tab) => (
                    <Button
                      key={tab.id}
                      variant="ghost"
                      className={cn(
                        "rounded-none border-b-2 border-transparent px-4 py-2 text-sm font-medium transition-colors hover:border-muted-foreground/50 hover:text-foreground",
                        activeTab === tab.id
                          ? "border-primary text-foreground"
                          : "text-muted-foreground"
                      )}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.label}
                    </Button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="mt-6">
                {/* Pajak Tab */}
                {activeTab === "pajak" && (
                  <div className="rounded-lg border border-border bg-card p-6">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg font-semibold mb-4">Pengaturan Pajak</h2>
                        <p className="text-sm text-muted-foreground mb-6">
                          Konfigurasi informasi pajak yang digunakan dalam sistem.
                        </p>
                      </div>

                      <div className="space-y-4 max-w-2xl">
                        <div className="space-y-2">
                          <Label htmlFor="namaPajak">
                            Nama Pajak <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="namaPajak"
                            placeholder="Masukkan nama pajak"
                            value={pajakData.namaPajak}
                            onChange={(e) => handlePajakChange("namaPajak", e.target.value)}
                            className="w-full"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="nilaiPajak">
                            Nilai Pajak (%) <span className="text-destructive">*</span>
                          </Label>
                          <div className="relative">
                            <Input
                              id="nilaiPajak"
                              type="number"
                              min="0"
                              max="100"
                              step="0.01"
                              placeholder="Masukkan nilai pajak dalam persen"
                              value={pajakData.nilaiPajak}
                              onChange={(e) => handlePajakChange("nilaiPajak", e.target.value)}
                              className="w-full pr-8"
                              required
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end pt-4 border-t">
                        <Button onClick={handleSave}>Simpan Perubahan</Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Rekening Tab */}
                {activeTab === "rekening" && (
                  <div className="rounded-lg border border-border bg-card p-6">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg font-semibold mb-4">Pengaturan Rekening</h2>
                        <p className="text-sm text-muted-foreground mb-6">
                          Konfigurasi informasi rekening bank perusahaan.
                        </p>
                      </div>

                      <div className="space-y-4 max-w-2xl">
                        <div className="space-y-2">
                          <Label htmlFor="namaPemilikRekening">
                            Nama Pemilik Rekening <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="namaPemilikRekening"
                            placeholder="Masukkan nama pemilik rekening"
                            value={rekeningData.namaPemilikRekening}
                            onChange={(e) => handleRekeningChange("namaPemilikRekening", e.target.value)}
                            className="w-full"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="nomorRekening">
                            Nomor Rekening <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="nomorRekening"
                            placeholder="Masukkan nomor rekening"
                            value={rekeningData.nomorRekening}
                            onChange={(e) => handleRekeningChange("nomorRekening", e.target.value)}
                            className="w-full"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bank">
                            Bank <span className="text-destructive">*</span>
                          </Label>
                          <Select
                            value={rekeningData.bank}
                            onValueChange={(value) => handleRekeningChange("bank", value)}
                            required
                          >
                            <SelectTrigger id="bank" className="w-full">
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
                      </div>

                      <div className="flex justify-end pt-4 border-t">
                        <Button onClick={handleSave}>Simpan Perubahan</Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tanda Tangan Tab */}
                {activeTab === "tanda-tangan" && (
                  <div className="rounded-lg border border-border bg-card p-6">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg font-semibold mb-4">Konfigurasi Tanda Tangan</h2>
                        <p className="text-sm text-muted-foreground mb-6">
                          Pilih metode tanda tangan yang tersedia untuk dokumen perusahaan.
                        </p>
                      </div>

                      <div className="space-y-4 max-w-2xl">
                        <div className="space-y-3">
                          <Label>Metode Tanda Tangan</Label>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="username"
                                checked={tandaTanganData.username}
                                onCheckedChange={(checked) => handleTandaTanganChange("username", checked as boolean)}
                              />
                              <Label htmlFor="username" className="cursor-pointer font-normal">
                                Username
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end pt-4 border-t">
                        <Button onClick={handleSave}>Simpan Perubahan</Button>
                      </div>
                    </div>
                  </div>
                )}
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
                Apakah Anda yakin ingin menyimpan perubahan pengaturan perusahaan ini? Pastikan semua informasi sudah benar sebelum menyimpan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmSave}>
                Simpan Perubahan
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SidebarInset>
    </SidebarProvider>
  )
}
