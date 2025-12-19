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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export default function DetailUserPage() {
  const params = useParams()
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)

  // Mock data - in real app, fetch based on params.id
  const [userData, setUserData] = React.useState({
    id: params.id as string || "USR001",
    nama: "John Doe",
    jabatan: "Administrator",
    photo: "",
    lokasiGudang: ["Gudang Utama", "Gudang Cabang"],
  })

  const handleDelete = () => {
    // Handle delete action here
    console.log("Deleting user:", userData.id)
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
            <h1 className="text-sm font-medium">Pengaturan</h1>
          </div>
        </header>
        <main className="flex flex-1 flex-col bg-background">
          <div className="flex-1 p-6">
            <div className="flex flex-col gap-6">
              {/* Page Header */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="/pengaturan/manajemen-user">
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                  </Button>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-semibold tracking-tight">Detail User</h1>
                    <p className="text-sm text-muted-foreground">
                      Lihat informasi lengkap tentang user ini. Anda dapat mengedit atau menghapus data user dari halaman ini.
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
                      <p className="text-sm font-medium text-muted-foreground">ID User</p>
                      <p className="text-sm">{userData.id}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Nama</p>
                      <p className="text-sm font-medium">{userData.nama}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Jabatan</p>
                      <Badge variant="outline">{userData.jabatan}</Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Photo</p>
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={userData.photo} alt={userData.nama} />
                        <AvatarFallback>{getInitials(userData.nama)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Lokasi Gudang</p>
                      <div className="flex flex-wrap gap-2">
                        {userData.lokasiGudang.map((lokasi, index) => (
                          <Badge key={index} variant="secondary">
                            {lokasi}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 pt-4">
                  <Button asChild>
                    <Link href={`/pengaturan/manajemen-user/${userData.id}/edit`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit User
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
                          Setelah menghapus user, semua data terkait akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium">Hapus User</p>
                          <p className="text-sm text-muted-foreground">
                            Hapus user ini secara permanen dari sistem
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          onClick={() => setShowDeleteDialog(true)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Hapus User
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
              <AlertDialogTitle>Hapus User</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus user <strong>{userData.nama}</strong>? 
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

