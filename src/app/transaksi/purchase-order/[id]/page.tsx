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
import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

type BarangItem = {
  namaBarang: string
  jumlah: number
  harga: number
}

type PermintaanBarangData = {
  nomorPB: string
  namaBarang: string
  jumlahBarang: number
}

type DataBarang = {
  type: "Permintaan Barang" | "Data Barang"
  permintaanBarang?: PermintaanBarangData
  dataBarang?: BarangItem[]
}

type PurchaseOrder = {
  id: string
  tanggalPO: string
  supplier: {
    id: string
    namaSupplier: string
    alamat: string
  }
  data: DataBarang
  includePPh: boolean
  catatanPembayaran: string
  catatan: string
  subtotal: number
  pph: number
  total: number
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value)
}

export default function DetailPurchaseOrderPage() {
  const params = useParams()
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)

  // Mock data - in real app, fetch based on params.id
  const [poData, setPoData] = React.useState<PurchaseOrder>({
    id: (params.id as string) || "PO-2024-001",
    tanggalPO: "2024-01-15",
    supplier: {
      id: "SUP001",
      namaSupplier: "PT Material Bangunan Sejahtera",
      alamat: "Jl. Industri Raya No. 100, Jakarta",
    },
    data: {
      type: "Permintaan Barang",
      permintaanBarang: {
        nomorPB: "PB-2024-001",
        namaBarang: "Semen Portland",
        jumlahBarang: 100,
      },
    },
    includePPh: true,
    catatanPembayaran: "Pembayaran dilakukan melalui transfer bank dengan tempo 30 hari",
    catatan: "Barang harus dalam kondisi baik dan sesuai dengan spesifikasi yang diminta",
    subtotal: 6500000,
    pph: 130000,
    total: 6630000,
  })

  const handleDelete = () => {
    // Handle delete action here
    console.log("Deleting purchase order:", poData.id)
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
                    <Link href="/transaksi/purchase-order">
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                  </Button>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-semibold tracking-tight">Detail Purchase Order</h1>
                    <p className="text-sm text-muted-foreground">
                      Lihat informasi lengkap tentang purchase order ini. Anda dapat mengedit atau menghapus data purchase order dari halaman ini.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Detail Information */}
              <div className="max-w-4xl space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">ID Purchase Order</p>
                      <p className="text-sm font-medium">{poData.id}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Tanggal PO</p>
                      <p className="text-sm">{formatDate(poData.tanggalPO)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Supplier</p>
                      <p className="text-sm font-medium">{poData.supplier.namaSupplier}</p>
                      <p className="text-sm text-muted-foreground">{poData.supplier.alamat}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Tipe Data</p>
                      <Badge variant="outline">{poData.data.type}</Badge>
                    </div>
                  </div>

                  {/* Permintaan Barang or Data Barang */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Detail Barang</p>
                    {poData.data.type === "Permintaan Barang" && poData.data.permintaanBarang ? (
                      <div className="rounded-lg border border-border bg-card p-4">
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-muted-foreground">Nomor PB</p>
                            <p className="text-sm font-medium">{poData.data.permintaanBarang.nomorPB}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-muted-foreground">Nama Barang</p>
                            <p className="text-sm">{poData.data.permintaanBarang.namaBarang}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-muted-foreground">Jumlah Barang</p>
                            <p className="text-sm">{poData.data.permintaanBarang.jumlahBarang.toLocaleString("id-ID")}</p>
                          </div>
                          <div className="pt-2 border-t">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/transaksi/permintaan-barang/${poData.data.permintaanBarang.nomorPB}`}>
                                Lihat Detail PB
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : poData.data.type === "Data Barang" && poData.data.dataBarang ? (
                      <div className="rounded-lg border border-border bg-card">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Barang</TableHead>
                              <TableHead className="text-right">Jumlah</TableHead>
                              <TableHead className="text-right">Harga</TableHead>
                              <TableHead className="text-right">Subtotal</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {poData.data.dataBarang.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">{item.namaBarang}</TableCell>
                                <TableCell className="text-right">{item.jumlah.toLocaleString("id-ID")}</TableCell>
                                <TableCell className="text-right">{formatCurrency(item.harga)}</TableCell>
                                <TableCell className="text-right">{formatCurrency(item.jumlah * item.harga)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : null}
                  </div>

                  {/* PPh Status */}
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Include PPh</p>
                    <Badge variant={poData.includePPh ? "default" : "outline"}>
                      {poData.includePPh ? "Ya (2%)" : "Tidak"}
                    </Badge>
                  </div>

                  {/* Catatan */}
                  {poData.catatanPembayaran && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Catatan (Sistem Pembayaran)</p>
                      <p className="text-sm whitespace-pre-wrap">{poData.catatanPembayaran}</p>
                    </div>
                  )}

                  {poData.catatan && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Catatan (Note)</p>
                      <p className="text-sm whitespace-pre-wrap">{poData.catatan}</p>
                    </div>
                  )}

                  {/* Total Section - Invoice Style */}
                  <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-6 space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Subtotal:</span>
                      <span className="font-medium">{formatCurrency(poData.subtotal)}</span>
                    </div>
                    {poData.includePPh && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">PPh (2%):</span>
                        <span className="font-medium">{formatCurrency(poData.pph)}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total:</span>
                      <span className="text-2xl font-bold text-primary">{formatCurrency(poData.total)}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 pt-4">
                  <Button asChild>
                    <Link href={`/transaksi/purchase-order/${poData.id}/edit`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Purchase Order
                    </Link>
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Danger Zone */}
              <div className="max-w-4xl">
                <div className="rounded-lg border border-destructive/50 bg-card">
                  <div className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-destructive">Danger Zone</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Setelah menghapus purchase order, semua data terkait akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium">Hapus Purchase Order</p>
                          <p className="text-sm text-muted-foreground">
                            Hapus purchase order ini secara permanen dari sistem
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          onClick={() => setShowDeleteDialog(true)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Hapus Purchase Order
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
              <AlertDialogTitle>Hapus Purchase Order</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus purchase order <strong>{poData.id}</strong>? 
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
