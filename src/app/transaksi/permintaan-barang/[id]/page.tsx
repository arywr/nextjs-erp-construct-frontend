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

export default function DetailPermintaanBarangPage() {
  const params = useParams()
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)

  // Mock data - in real app, fetch based on params.id
  const [permintaanData, setPermintaanData] = React.useState({
    id: params.id as string || "PB-2024-001",
    tanggalPermintaan: "2024-01-15",
    gudang: "Gudang Utama",
    produksi: {
      nomorProduksi: "WO-2024-001",
      namaProduksi: "Pembuatan Beton Ready Mix untuk Proyek Gedung A",
    },
    namaBarang: "Semen Portland",
    jumlahBarang: 100,
    dimintaOleh: "John Doe",
  })

  const handleDelete = () => {
    // Handle delete action here
    console.log("Deleting permintaan barang:", permintaanData.id)
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
                    <Link href="/transaksi/permintaan-barang">
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                  </Button>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-semibold tracking-tight">Detail Permintaan Barang</h1>
                    <p className="text-sm text-muted-foreground">
                      Lihat informasi lengkap tentang permintaan barang ini. Anda dapat mengedit atau menghapus data permintaan dari halaman ini.
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
                      <p className="text-sm font-medium text-muted-foreground">ID Permintaan Barang</p>
                      <p className="text-sm font-medium">{permintaanData.id}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Tanggal Permintaan</p>
                      <p className="text-sm">{formatDate(permintaanData.tanggalPermintaan)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Gudang</p>
                      <p className="text-sm">{permintaanData.gudang}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Produksi</p>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {permintaanData.produksi.nomorProduksi}
                          </Badge>
                          <span className="text-sm">{permintaanData.produksi.namaProduksi}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Nama Barang</p>
                      <p className="text-sm">{permintaanData.namaBarang}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Jumlah Barang</p>
                      <p className="text-sm">{permintaanData.jumlahBarang.toLocaleString("id-ID")}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Diminta Oleh</p>
                      <p className="text-sm">{permintaanData.dimintaOleh}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 pt-4">
                  <Button asChild>
                    <Link href={`/transaksi/permintaan-barang/${permintaanData.id}/edit`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Permintaan Barang
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
                          Setelah menghapus permintaan barang, semua data terkait akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium">Hapus Permintaan</p>
                          <p className="text-sm text-muted-foreground">
                            Hapus permintaan barang ini secara permanen dari sistem
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          onClick={() => setShowDeleteDialog(true)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Hapus Permintaan
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
              <AlertDialogTitle>Hapus Permintaan Barang</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus permintaan <strong>{permintaanData.id}</strong>? 
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

