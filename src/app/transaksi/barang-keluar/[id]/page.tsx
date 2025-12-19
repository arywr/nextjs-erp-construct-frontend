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
import { Badge } from "@/components/ui/badge"
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
import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function DetailBarangKeluarPage() {
  const params = useParams()
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)

  // Mock data - in real app, fetch based on params.id
  const [barangKeluarData, setBarangKeluarData] = React.useState({
    id: params.id as string || "BK-2024-001",
    namaBarang: "Semen Portland",
    produksi: {
      nomorProduksi: "WO-2024-001",
      namaProduksi: "Pembuatan Beton Ready Mix untuk Proyek Gedung A",
    },
    jumlah: 50,
    keterangan: "Barang keluar untuk proyek gedung",
    tanggal: "2024-01-16",
  })

  const handleDelete = () => {
    // Handle delete action here
    console.log("Deleting barang keluar:", barangKeluarData.id)
    setShowDeleteDialog(false)
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
                    <Link href="/transaksi/barang-keluar">
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                  </Button>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-semibold tracking-tight">Detail Barang Keluar</h1>
                    <p className="text-sm text-muted-foreground">
                      Lihat informasi lengkap tentang transaksi barang keluar ini. Anda dapat mengedit atau menghapus data transaksi dari halaman ini.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Detail Information */}
              <div className="max-w-2xl space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">ID Transaksi Barang Keluar</p>
                      <p className="text-sm font-medium">{barangKeluarData.id}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Tanggal</p>
                      <p className="text-sm">{formatDate(barangKeluarData.tanggal)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Nama Barang</p>
                      <p className="text-sm">{barangKeluarData.namaBarang}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Produksi</p>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {barangKeluarData.produksi.nomorProduksi}
                          </Badge>
                          <span className="text-sm">{barangKeluarData.produksi.namaProduksi}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Jumlah</p>
                      <p className="text-sm">{barangKeluarData.jumlah.toLocaleString("id-ID")}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Keterangan</p>
                      <p className="text-sm">{barangKeluarData.keterangan || "-"}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 pt-4">
                  <Button asChild>
                    <Link href={`/transaksi/barang-keluar/${barangKeluarData.id}/edit`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Barang Keluar
                    </Link>
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Danger Zone */}
              <div className="max-w-2xl">
                <div className="rounded-lg border border-destructive/50 bg-card">
                  <div className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-destructive">Danger Zone</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Setelah menghapus transaksi barang keluar, semua data terkait akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium">Hapus Transaksi</p>
                          <p className="text-sm text-muted-foreground">
                            Hapus transaksi barang keluar ini secara permanen dari sistem
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          onClick={() => setShowDeleteDialog(true)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Hapus Transaksi
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Hapus Transaksi Barang Keluar</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus transaksi <strong>{barangKeluarData.id}</strong>? 
                Tindakan ini tidak dapat dibatalkan dan semua data terkait akan dihapus secara permanen.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SidebarInset>
    </SidebarProvider>
  )
}

