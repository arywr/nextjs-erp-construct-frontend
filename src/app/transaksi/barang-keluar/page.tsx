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

type BarangKeluar = {
  id: string
  namaBarang: string
  produksi: ProduksiInfo
  jumlah: number
  keterangan: string
  tanggal: string
}

const sampleData: BarangKeluar[] = [
  {
    id: "BK-2024-001",
    namaBarang: "Semen Portland",
    produksi: {
      nomorProduksi: "WO-2024-001",
      namaProduksi: "Pembuatan Beton Ready Mix untuk Proyek Gedung A",
    },
    jumlah: 50,
    keterangan: "Barang keluar untuk proyek gedung",
    tanggal: "2024-01-16",
  },
  {
    id: "BK-2024-002",
    namaBarang: "Besi Beton 10mm",
    produksi: {
      nomorProduksi: "WO-2024-001",
      namaProduksi: "Pembuatan Beton Ready Mix untuk Proyek Gedung A",
    },
    jumlah: 200,
    keterangan: "Besi beton untuk struktur",
    tanggal: "2024-01-17",
  },
  {
    id: "BK-2024-003",
    namaBarang: "Pasir Kasar",
    produksi: {
      nomorProduksi: "WO-2024-002",
      namaProduksi: "Produksi Paving Block untuk Area Parkir",
    },
    jumlah: 10,
    keterangan: "Pasir untuk paving block",
    tanggal: "2024-01-18",
  },
  {
    id: "BK-2024-004",
    namaBarang: "Keramik 30x30",
    produksi: {
      nomorProduksi: "WO-2024-005",
      namaProduksi: "Pembuatan Genteng Beton",
    },
    jumlah: 100,
    keterangan: "Keramik untuk finishing",
    tanggal: "2024-01-19",
  },
  {
    id: "BK-2024-005",
    namaBarang: "Cat Tembok Putih",
    produksi: {
      nomorProduksi: "WO-2024-006",
      namaProduksi: "Produksi U-Ditch untuk Drainase",
    },
    jumlah: 25,
    keterangan: "Cat untuk finishing dinding",
    tanggal: "2024-01-20",
  },
  {
    id: "BK-2024-006",
    namaBarang: "Batu Bata Merah",
    produksi: {
      nomorProduksi: "WO-2024-004",
      namaProduksi: "Produksi Bata Merah untuk Proyek Perumahan",
    },
    jumlah: 500,
    keterangan: "Bata merah untuk dinding",
    tanggal: "2024-01-21",
  },
  {
    id: "BK-2024-007",
    namaBarang: "Semen Portland",
    produksi: {
      nomorProduksi: "WO-2024-008",
      namaProduksi: "Produksi Tiang Pancang Beton",
    },
    jumlah: 75,
    keterangan: "Semen untuk tiang pancang",
    tanggal: "2024-01-22",
  },
  {
    id: "BK-2024-008",
    namaBarang: "Besi Beton 12mm",
    produksi: {
      nomorProduksi: "WO-2024-003",
      namaProduksi: "Pembuatan Panel Beton Precast",
    },
    jumlah: 150,
    keterangan: "Besi beton untuk panel precast",
    tanggal: "2024-01-23",
  },
]

export default function BarangKeluarPage() {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [itemsPerPage, setItemsPerPage] = React.useState(5)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
  const [selectedBarangKeluar, setSelectedBarangKeluar] = React.useState<BarangKeluar | null>(null)

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
  const filteredData = sampleData.filter((barangKeluar) => {
    const query = searchQuery.toLowerCase()
    return (
      barangKeluar.id.toLowerCase().includes(query) ||
      barangKeluar.namaBarang.toLowerCase().includes(query) ||
      barangKeluar.produksi.nomorProduksi.toLowerCase().includes(query) ||
      barangKeluar.produksi.namaProduksi.toLowerCase().includes(query) ||
      formatDate(barangKeluar.tanggal).toLowerCase().includes(query)
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
  const handleDeleteClick = (barangKeluar: BarangKeluar) => {
    setSelectedBarangKeluar(barangKeluar)
    setShowDeleteDialog(true)
  }

  const handleDeleteConfirm = () => {
    // Handle delete action here
    console.log("Deleting barang keluar:", selectedBarangKeluar?.id)
    setShowDeleteDialog(false)
    setSelectedBarangKeluar(null)
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
                <h1 className="text-2xl font-semibold tracking-tight">Barang Keluar</h1>
                <p className="text-sm text-muted-foreground">
                  Kelola transaksi barang keluar dari gudang. Catat semua barang yang keluar dan kaitkan dengan produksi terkait.
                </p>
              </div>

              {/* Actions Bar */}
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Cari transaksi..."
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
                    <Link href="/transaksi/barang-keluar/create">
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
                      <TableHead>ID Transaksi Barang Keluar</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Nama Barang</TableHead>
                      <TableHead>Produksi</TableHead>
                      <TableHead className="text-right">Jumlah</TableHead>
                      <TableHead>Keterangan</TableHead>
                      <TableHead className="text-right w-[180px]">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((barangKeluar) => (
                        <TableRow key={barangKeluar.id}>
                          <TableCell className="font-medium">{barangKeluar.id}</TableCell>
                          <TableCell>{formatDate(barangKeluar.tanggal)}</TableCell>
                          <TableCell>{barangKeluar.namaBarang}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {barangKeluar.produksi.nomorProduksi}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {barangKeluar.produksi.namaProduksi}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            {barangKeluar.jumlah.toLocaleString("id-ID")}
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate">
                            {barangKeluar.keterangan}
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
                                <Link href={`/transaksi/barang-keluar/${barangKeluar.id}`}>
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
                                <Link href={`/transaksi/barang-keluar/${barangKeluar.id}/edit`}>
                                  <Edit className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                title="Hapus"
                                onClick={() => handleDeleteClick(barangKeluar)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                          Tidak ada data transaksi barang keluar
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
              <AlertDialogTitle>Hapus Transaksi Barang Keluar</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus transaksi <strong>{selectedBarangKeluar?.id}</strong>? 
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

