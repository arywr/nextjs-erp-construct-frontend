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

type POInfo = {
  idPO: string
  supplier: string
  total: number
}

type Rekening = {
  bankName: string
  accountNumber: string
  accountOwner: string
}

type PermintaanPayment = {
  id: string
  poInfo: POInfo
  rekeningSumber: Rekening
  rekeningTujuan: Rekening
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value)
}

export default function DetailPermintaanPaymentPage() {
  const params = useParams()
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)

  // Mock data - in real app, fetch based on params.id
  const [paymentData, setPaymentData] = React.useState<PermintaanPayment>({
    id: (params.id as string) || "PP-2024-001",
    poInfo: {
      idPO: "PO-2024-001",
      supplier: "PT Material Bangunan Sejahtera",
      total: 55000000,
    },
    rekeningSumber: {
      bankName: "Bank BCA",
      accountNumber: "1234567890",
      accountOwner: "PT Konstruksi Jaya",
    },
    rekeningTujuan: {
      bankName: "Bank Mandiri",
      accountNumber: "0987654321",
      accountOwner: "PT Material Bangunan Sejahtera",
    },
  })

  const handleDelete = () => {
    // Handle delete action here
    console.log("Deleting permintaan payment:", paymentData.id)
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
                    <Link href="/transaksi/permintaan-payment">
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                  </Button>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-semibold tracking-tight">Detail Permintaan Payment</h1>
                    <p className="text-sm text-muted-foreground">
                      Lihat informasi lengkap tentang permintaan payment ini. Anda dapat mengedit atau menghapus data permintaan payment dari halaman ini.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Detail Information */}
              <div className="max-w-2xl space-y-6">
                <div className="space-y-4">
                  {/* ID Permintaan Payment */}
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">ID Permintaan Payment</p>
                    <p className="text-sm font-medium">{paymentData.id}</p>
                  </div>

                  {/* Informasi PO */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Informasi PO</p>
                    <div className="rounded-lg border border-border bg-card p-4">
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground">ID PO</p>
                          <p className="text-sm font-medium">{paymentData.poInfo.idPO}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground">Supplier</p>
                          <p className="text-sm">{paymentData.poInfo.supplier}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground">Total</p>
                          <p className="text-sm font-medium text-primary">{formatCurrency(paymentData.poInfo.total)}</p>
                        </div>
                        <div className="pt-2 border-t">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/transaksi/purchase-order/${paymentData.poInfo.idPO}`}>
                              Lihat Detail PO
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rekening Sumber */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Rekening Sumber</p>
                    <div className="rounded-lg border border-border bg-card p-4">
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground">Nama Bank</p>
                          <p className="text-sm font-medium">{paymentData.rekeningSumber.bankName}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground">Nomor Rekening</p>
                          <p className="text-sm">{paymentData.rekeningSumber.accountNumber}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground">Nama Pemilik Rekening</p>
                          <p className="text-sm">{paymentData.rekeningSumber.accountOwner}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rekening Tujuan */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Rekening Tujuan</p>
                    <div className="rounded-lg border border-border bg-card p-4">
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground">Nama Bank</p>
                          <p className="text-sm font-medium">{paymentData.rekeningTujuan.bankName}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground">Nomor Rekening</p>
                          <p className="text-sm">{paymentData.rekeningTujuan.accountNumber}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground">Nama Pemilik Rekening</p>
                          <p className="text-sm">{paymentData.rekeningTujuan.accountOwner}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 pt-4">
                  <Button asChild>
                    <Link href={`/transaksi/permintaan-payment/${paymentData.id}/edit`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Permintaan Payment
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
                          Setelah menghapus permintaan payment, semua data terkait akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium">Hapus Permintaan Payment</p>
                          <p className="text-sm text-muted-foreground">
                            Hapus permintaan payment ini secara permanen dari sistem
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          onClick={() => setShowDeleteDialog(true)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Hapus Permintaan Payment
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
              <AlertDialogTitle>Hapus Permintaan Payment</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus permintaan payment <strong>{paymentData.id}</strong>? 
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
