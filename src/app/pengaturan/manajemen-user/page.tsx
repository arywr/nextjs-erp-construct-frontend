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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

type User = {
  id: string
  nama: string
  jabatan: string
  photo: string
  username: string
  password: string
  lokasiGudang: string[]
}

const sampleData: User[] = [
  {
    id: "USR001",
    nama: "John Doe",
    jabatan: "Administrator",
    photo: "",
    username: "john.doe",
    password: "••••••••",
    lokasiGudang: ["Gudang Utama", "Gudang Cabang"],
  },
  {
    id: "USR002",
    nama: "Jane Smith",
    jabatan: "Manager Gudang",
    photo: "",
    username: "jane.smith",
    password: "••••••••",
    lokasiGudang: ["Gudang Utama"],
  },
  {
    id: "USR003",
    nama: "Budi Santoso",
    jabatan: "Staff Gudang",
    photo: "",
    username: "budi.santoso",
    password: "••••••••",
    lokasiGudang: ["Gudang Cabang"],
  },
  {
    id: "USR004",
    nama: "Siti Nurhaliza",
    jabatan: "Supervisor",
    photo: "",
    username: "siti.nurhaliza",
    password: "••••••••",
    lokasiGudang: ["Gudang Utama", "Gudang Cabang", "Gudang Pusat"],
  },
  {
    id: "USR005",
    nama: "Ahmad Fauzi",
    jabatan: "Staff Gudang",
    photo: "",
    username: "ahmad.fauzi",
    password: "••••••••",
    lokasiGudang: ["Gudang Pusat"],
  },
  {
    id: "USR006",
    nama: "Maria Garcia",
    jabatan: "Manager Gudang",
    photo: "",
    username: "maria.garcia",
    password: "••••••••",
    lokasiGudang: ["Gudang Cabang"],
  },
  {
    id: "USR007",
    nama: "Rizki Pratama",
    jabatan: "Staff Gudang",
    photo: "",
    username: "rizki.pratama",
    password: "••••••••",
    lokasiGudang: ["Gudang Utama"],
  },
  {
    id: "USR008",
    nama: "Lisa Anderson",
    jabatan: "Administrator",
    photo: "",
    username: "lisa.anderson",
    password: "••••••••",
    lokasiGudang: ["Gudang Utama", "Gudang Cabang", "Gudang Pusat"],
  },
]

export default function ManajemenUserPage() {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [itemsPerPage, setItemsPerPage] = React.useState(5)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null)

  // Filter data based on search query
  const filteredData = sampleData.filter((user) => {
    const query = searchQuery.toLowerCase()
    return (
      user.id.toLowerCase().includes(query) ||
      user.nama.toLowerCase().includes(query) ||
      user.jabatan.toLowerCase().includes(query)
    )
  })

  // Calculate pagination
  const totalItems = filteredData.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = filteredData.slice(startIndex, endIndex)

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Handle items per page change
  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value))
    setCurrentPage(1) // Reset to first page when changing items per page
  }

  // Handle delete
  const handleDeleteClick = (user: User) => {
    setSelectedUser(user)
    setShowDeleteDialog(true)
  }

  const handleDeleteConfirm = () => {
    // Handle delete action here
    console.log("Deleting user:", selectedUser?.id)
    setShowDeleteDialog(false)
    setSelectedUser(null)
    // You can add navigation or success message here
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (currentPage <= 3) {
        // Near the start
        for (let i = 2; i <= 4; i++) {
          pages.push(i)
        }
        pages.push("ellipsis")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pages.push("ellipsis")
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // In the middle
        pages.push("ellipsis")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push("ellipsis")
        pages.push(totalPages)
      }
    }

    return pages
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
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
                <h1 className="text-2xl font-semibold tracking-tight">Manajemen User</h1>
                <p className="text-sm text-muted-foreground">
                  Kelola data pengguna dalam sistem. Anda dapat menambah, mengedit, dan menghapus informasi pengguna serta mengatur akses dan lokasi gudang yang ditugaskan.
                </p>
              </div>

              {/* Actions Bar */}
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Cari user..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setCurrentPage(1) // Reset to first page when searching
                    }}
                    className="pl-9"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button asChild>
                    <Link href="/pengaturan/manajemen-user/create">
                      <Plus className="mr-2 h-4 w-4" />
                      Tambah User
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Table Container */}
              <div className="rounded-lg border border-border bg-card">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama</TableHead>
                      <TableHead>Jabatan</TableHead>
                      <TableHead>Photo</TableHead>
                      <TableHead>Lokasi Gudang</TableHead>
                      <TableHead className="text-right w-[180px]">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.nama}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{user.jabatan}</Badge>
                          </TableCell>
                          <TableCell>
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.photo} alt={user.nama} />
                              <AvatarFallback>{getInitials(user.nama)}</AvatarFallback>
                            </Avatar>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {user.lokasiGudang.map((lokasi, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {lokasi}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                title="Detail"
                                asChild
                              >
                                <Link href={`/pengaturan/manajemen-user/${user.id}`}>
                                  <Eye className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                title="Edit"
                                asChild
                              >
                                <Link href={`/pengaturan/manajemen-user/${user.id}/edit`}>
                                  <Edit className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                title="Hapus"
                                onClick={() => handleDeleteClick(user)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                          Tidak ada data user
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Tampilkan</span>
                  <Select
                    value={itemsPerPage.toString()}
                    onValueChange={handleItemsPerPageChange}
                  >
                    <SelectTrigger className="w-[70px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-muted-foreground">
                    dari {totalItems} data
                  </span>
                </div>

                <Pagination className="mx-0 w-auto">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPage > 1) {
                            handlePageChange(currentPage - 1)
                          }
                        }}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                    {getPageNumbers().map((page, index) => {
                      if (page === "ellipsis") {
                        return (
                          <PaginationItem key={`ellipsis-${index}`}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )
                      }
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              handlePageChange(page as number)
                            }}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    })}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPage < totalPages) {
                            handlePageChange(currentPage + 1)
                          }
                        }}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
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
                Apakah Anda yakin ingin menghapus user <strong>{selectedUser?.nama}</strong>? 
                Tindakan ini tidak dapat dibatalkan dan semua data terkait akan dihapus secara permanen.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
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

