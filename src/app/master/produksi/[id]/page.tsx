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
import { Progress } from "@/components/ui/progress"
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
import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function getStatusBadgeVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "Completed":
      return "default"
    case "In Progress":
      return "secondary"
    case "On Hold":
      return "destructive"
    case "Planning":
      return "outline"
    default:
      return "outline"
  }
}

function getPrioritasBadgeVariant(prioritas: string): "default" | "secondary" | "destructive" | "outline" {
  switch (prioritas) {
    case "Tinggi":
      return "destructive"
    case "Sedang":
      return "default"
    case "Rendah":
      return "outline"
    default:
      return "outline"
  }
}

export default function DetailProduksiPage() {
  const params = useParams()
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
  const [showStatusDialog, setShowStatusDialog] = React.useState(false)
  const [showProgressDialog, setShowProgressDialog] = React.useState(false)
  const [newStatus, setNewStatus] = React.useState("")
  const [newProgress, setNewProgress] = React.useState("")

  // Mock data - in real app, fetch based on params.id
  const [produksiData, setProduksiData] = React.useState({
    id: params.id as string || "PRD001",
    nomorWO: "WO-2024-001",
    deskripsi: "Pembuatan Beton Ready Mix untuk Proyek Gedung A",
    status: "In Progress",
    tanggalMulai: "2024-01-15",
    tanggalSelesai: "2024-02-15",
    progress: 65,
    prioritas: "Tinggi",
  })

  const handleStatusChange = () => {
    if (newStatus) {
      setProduksiData((prev) => ({
        ...prev,
        status: newStatus,
      }))
      setShowStatusDialog(false)
      setNewStatus("")
    }
  }

  const handleProgressChange = () => {
    if (newProgress) {
      setProduksiData((prev) => ({
        ...prev,
        progress: Number(newProgress),
      }))
      setShowProgressDialog(false)
      setNewProgress("")
    }
  }

  const handleDelete = () => {
    // Handle delete action here
    console.log("Deleting produksi:", produksiData.id)
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
                    <Link href="/master/produksi">
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                  </Button>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-semibold tracking-tight">Detail Produksi</h1>
                    <p className="text-sm text-muted-foreground">
                      Lihat informasi lengkap tentang work order ini. Anda dapat mengedit, mengubah status, atau menghapus data produksi dari halaman ini.
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
                      <p className="text-sm font-medium text-muted-foreground">ID Produksi</p>
                      <p className="text-sm">{produksiData.id}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Nomor Work Order</p>
                      <p className="text-sm font-medium">{produksiData.nomorWO}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Deskripsi</p>
                      <p className="text-sm">{produksiData.deskripsi}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Status</p>
                      <Badge variant={getStatusBadgeVariant(produksiData.status)}>
                        {produksiData.status}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Prioritas</p>
                      <Badge variant={getPrioritasBadgeVariant(produksiData.prioritas)}>
                        {produksiData.prioritas}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Tanggal Mulai</p>
                      <p className="text-sm">{formatDate(produksiData.tanggalMulai)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Tanggal Selesai</p>
                      <p className="text-sm">{formatDate(produksiData.tanggalSelesai)}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-muted-foreground">Progress</p>
                        <p className="text-sm font-medium">{produksiData.progress}%</p>
                      </div>
                      <Progress value={produksiData.progress} className="h-2" />
                    </div>
                  </div>
                </div>

                {/* Status Management */}
                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold mb-2">Status Management</h3>
                      <p className="text-xs text-muted-foreground mb-4">
                        Ubah status work order untuk memperbarui progress produksi.
                      </p>
                    </div>
                    <div className="flex items-end gap-4">
                      <div className="flex-1 space-y-2">
                        <Label htmlFor="statusSelect">Status Baru</Label>
                        <Select
                          value={newStatus}
                          onValueChange={setNewStatus}
                        >
                          <SelectTrigger id="statusSelect">
                            <SelectValue placeholder="Pilih status baru" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Planning">Planning</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="On Hold">On Hold</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        onClick={() => setShowStatusDialog(true)}
                        disabled={!newStatus || newStatus === produksiData.status}
                      >
                        Ubah Status
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Progress Tracking */}
                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold mb-2">Progress Tracking</h3>
                      <p className="text-xs text-muted-foreground mb-4">
                        Perbarui progress work order untuk melacak penyelesaian produksi.
                      </p>
                    </div>
                    <div className="flex items-end gap-4">
                      <div className="flex-1 space-y-2">
                        <Label htmlFor="progressInput">Progress Baru (%)</Label>
                        <Input
                          id="progressInput"
                          type="number"
                          min="0"
                          max="100"
                          placeholder="Masukkan progress (0-100)"
                          value={newProgress}
                          onChange={(e) => setNewProgress(e.target.value)}
                        />
                      </div>
                      <Button
                        onClick={() => setShowProgressDialog(true)}
                        disabled={!newProgress || Number(newProgress) === produksiData.progress}
                      >
                        Update Progress
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 pt-4">
                  <Button asChild>
                    <Link href={`/master/produksi/${produksiData.id}/edit`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Produksi
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
                          Setelah menghapus produksi, semua data terkait akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium">Hapus Produksi</p>
                          <p className="text-sm text-muted-foreground">
                            Hapus work order ini secara permanen dari sistem
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          onClick={() => setShowDeleteDialog(true)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Hapus Produksi
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Status Change Confirmation Dialog */}
        <AlertDialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Konfirmasi Ubah Status</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin mengubah status work order <strong>{produksiData.nomorWO}</strong> menjadi <strong>{newStatus}</strong>?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={handleStatusChange}>
                Ubah Status
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Progress Update Confirmation Dialog */}
        <AlertDialog open={showProgressDialog} onOpenChange={setShowProgressDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Konfirmasi Update Progress</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin mengubah progress work order <strong>{produksiData.nomorWO}</strong> menjadi <strong>{newProgress}%</strong>?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={handleProgressChange}>
                Update Progress
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Hapus Produksi</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus work order <strong>{produksiData.nomorWO}</strong>? 
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

