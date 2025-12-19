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

type ProduksiInfo = {
  nomorProduksi: string
  namaProduksi: string
}

type PermintaanBarang = {
  id: string
  tanggalPermintaan: string
  gudang: string
  produksi: ProduksiInfo
  namaBarang: string
  jumlahBarang: number
  dimintaOleh: string
}

const sampleData: PermintaanBarang[] = [
  {
    id: "PB-2024-001",
    tanggalPermintaan: "2024-01-15",
    gudang: "Gudang Utama",
    produksi: {
      nomorProduksi: "WO-2024-001",
      namaProduksi: "Pembuatan Beton Ready Mix untuk Proyek Gedung A",
    },
    namaBarang: "Semen Portland",
    jumlahBarang: 100,
    dimintaOleh: "John Doe",
  },
  {
    id: "PB-2024-002",
    tanggalPermintaan: "2024-01-16",
    gudang: "Gudang Utama",
    produksi: {
      nomorProduksi: "WO-2024-001",
      namaProduksi: "Pembuatan Beton Ready Mix untuk Proyek Gedung A",
    },
    namaBarang: "Besi Beton 10mm",
    jumlahBarang: 500,
    dimintaOleh: "Jane Smith",
  },
  {
    id: "PB-2024-003",
    tanggalPermintaan: "2024-01-17",
    gudang: "Gudang Cabang",
    produksi: {
      nomorProduksi: "WO-2024-002",
      namaProduksi: "Produksi Paving Block untuk Area Parkir",
    },
    namaBarang: "Pasir Kasar",
    jumlahBarang: 20,
    dimintaOleh: "Budi Santoso",
  },
  {
    id: "PB-2024-004",
    tanggalPermintaan: "2024-01-18",
    gudang: "Gudang Utama",
    produksi: {
      nomorProduksi: "WO-2024-005",
      namaProduksi: "Pembuatan Genteng Beton",
    },
    namaBarang: "Keramik 30x30",
    jumlahBarang: 200,
    dimintaOleh: "Siti Nurhaliza",
  },
  {
    id: "PB-2024-005",
    tanggalPermintaan: "2024-01-19",
    gudang: "Gudang Cabang",
    produksi: {
      nomorProduksi: "WO-2024-006",
      namaProduksi: "Produksi U-Ditch untuk Drainase",
    },
    namaBarang: "Cat Tembok Putih",
    jumlahBarang: 50,
    dimintaOleh: "Ahmad Fauzi",
  },
  {
    id: "PB-2024-006",
    tanggalPermintaan: "2024-01-20",
    gudang: "Gudang Pusat",
    produksi: {
      nomorProduksi: "WO-2024-004",
      namaProduksi: "Produksi Bata Merah untuk Proyek Perumahan",
    },
    namaBarang: "Batu Bata Merah",
    jumlahBarang: 1000,
    dimintaOleh: "Maria Garcia",
  },
  {
    id: "PB-2024-007",
    tanggalPermintaan: "2024-01-21",
    gudang: "Gudang Utama",
    produksi: {
      nomorProduksi: "WO-2024-008",
      namaProduksi: "Produksi Tiang Pancang Beton",
    },
    namaBarang: "Semen Portland",
    jumlahBarang: 150,
    dimintaOleh: "Rizki Pratama",
  },
  {
    id: "PB-2024-008",
    tanggalPermintaan: "2024-01-22",
    gudang: "Gudang Cabang",
    produksi: {
      nomorProduksi: "WO-2024-003",
      namaProduksi: "Pembuatan Panel Beton Precast",
    },
    namaBarang: "Besi Beton 12mm",
    jumlahBarang: 300,
    dimintaOleh: "Lisa Anderson",
  },
]

export default function PermintaanBarangPage() {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [itemsPerPage, setItemsPerPage] = React.useState(5)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
  const [selectedPermintaan, setSelectedPermintaan] = React.useState<PermintaanBarang | null>(null)

  // Format date helper
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Filter data based on search query
  const filteredData = sampleData.filter((permintaan) => {
    const query = searchQuery.toLowerCase()
    return (
      permintaan.id.toLowerCase().includes(query) ||
      permintaan.namaBarang.toLowerCase().includes(query) ||
      permintaan.gudang.toLowerCase().includes(query) ||
      permintaan.dimintaOleh.toLowerCase().includes(query) ||
      permintaan.produksi.nomorProduksi.toLowerCase().includes(query) ||
      permintaan.produksi.namaProduksi.toLowerCase().includes(query) ||
      formatDate(permintaan.tanggalPermintaan).toLowerCase().includes(query)
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
  const handleDeleteClick = (permintaan: PermintaanBarang) => {
    setSelectedPermintaan(permintaan)
    setShowDeleteDialog(true)
  }

  const handleDeleteConfirm = () => {
    // Handle delete action here
    console.log("Deleting permintaan barang:", selectedPermintaan?.id)
    setShowDeleteDialog(false)
    setSelectedPermintaan(null)
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
                <h1 className="text-2xl font-semibold tracking-tight">Permintaan Barang</h1>
                <p className="text-sm text-muted-foreground">
                  Kelola permintaan barang dari berbagai gudang. Catat semua permintaan barang dan kaitkan dengan produksi terkait.
                </p>
              </div>

              {/* Actions Bar */}
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Cari permintaan..."
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
                    <Link href="/transaksi/permintaan-barang/create">
                      <Plus className="mr-2 h-4 w-4" />
                      Tambah
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Table Container */}
              <div className="rounded-lg border border-border bg-card">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID Permintaan Barang</TableHead>
                      <TableHead>Tanggal Permintaan</TableHead>
                      <TableHead>Gudang</TableHead>
                      <TableHead>Produksi</TableHead>
                      <TableHead>Nama Barang</TableHead>
                      <TableHead className="text-right">Jumlah Barang</TableHead>
                      <TableHead>Diminta Oleh</TableHead>
                      <TableHead className="text-right w-[180px]">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((permintaan) => (
                        <TableRow key={permintaan.id}>
                          <TableCell className="font-medium">{permintaan.id}</TableCell>
                          <TableCell>{formatDate(permintaan.tanggalPermintaan)}</TableCell>
                          <TableCell>{permintaan.gudang}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {permintaan.produksi.nomorProduksi}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {permintaan.produksi.namaProduksi}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{permintaan.namaBarang}</TableCell>
                          <TableCell className="text-right">
                            {permintaan.jumlahBarang.toLocaleString("id-ID")}
                          </TableCell>
                          <TableCell>{permintaan.dimintaOleh}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                title="Detail"
                                asChild
                              >
                                <Link href={`/transaksi/permintaan-barang/${permintaan.id}`}>
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
                                <Link href={`/transaksi/permintaan-barang/${permintaan.id}/edit`}>
                                  <Edit className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                title="Hapus"
                                onClick={() => handleDeleteClick(permintaan)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                          Tidak ada data permintaan barang
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
              <AlertDialogTitle>Hapus Permintaan Barang</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus permintaan <strong>{selectedPermintaan?.id}</strong>? 
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

