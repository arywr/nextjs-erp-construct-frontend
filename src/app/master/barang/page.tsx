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
import { Search, Plus, Eye, Pencil, Trash2, Printer, Upload, Download } from "lucide-react"
import Link from "next/link"

type Barang = {
  id: string
  namaBarang: string
  jenisBarang: string
  gudang: string
  stock: number
  satuan: string
  hargaBeli: number
  hargaJual: number
}

const sampleData: Barang[] = [
  {
    id: "BRG001",
    namaBarang: "Semen Portland",
    jenisBarang: "Material Bangunan",
    gudang: "Gudang Utama",
    stock: 500,
    satuan: "Sak",
    hargaBeli: 65000,
    hargaJual: 75000,
  },
  {
    id: "BRG002",
    namaBarang: "Besi Beton 10mm",
    jenisBarang: "Material Bangunan",
    gudang: "Gudang Utama",
    stock: 1200,
    satuan: "Batang",
    hargaBeli: 85000,
    hargaJual: 95000,
  },
  {
    id: "BRG003",
    namaBarang: "Pasir Kasar",
    jenisBarang: "Material Bangunan",
    gudang: "Gudang Cabang",
    stock: 50,
    satuan: "M³",
    hargaBeli: 250000,
    hargaJual: 300000,
  },
  {
    id: "BRG004",
    namaBarang: "Keramik 30x30",
    jenisBarang: "Material Finishing",
    gudang: "Gudang Utama",
    stock: 800,
    satuan: "Box",
    hargaBeli: 45000,
    hargaJual: 55000,
  },
  {
    id: "BRG005",
    namaBarang: "Cat Tembok Putih",
    jenisBarang: "Material Finishing",
    gudang: "Gudang Cabang",
    stock: 150,
    satuan: "Kaleng",
    hargaBeli: 125000,
    hargaJual: 150000,
  },
  {
    id: "BRG006",
    namaBarang: "Paku Beton 3 inch",
    jenisBarang: "Perkakas",
    gudang: "Gudang Utama",
    stock: 2000,
    satuan: "Kg",
    hargaBeli: 18000,
    hargaJual: 22000,
  },
  {
    id: "BRG007",
    namaBarang: "Genteng Metal",
    jenisBarang: "Material Atap",
    gudang: "Gudang Utama",
    stock: 300,
    satuan: "Lembar",
    hargaBeli: 45000,
    hargaJual: 55000,
  },
  {
    id: "BRG008",
    namaBarang: "Batu Bata Merah",
    jenisBarang: "Material Bangunan",
    gudang: "Gudang Cabang",
    stock: 10000,
    satuan: "Buah",
    hargaBeli: 500,
    hargaJual: 650,
  },
]

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value)
}

export default function BarangPage() {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [itemsPerPage, setItemsPerPage] = React.useState(5)

  // Calculate pagination
  const totalItems = sampleData.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = sampleData.slice(startIndex, endIndex)

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Handle items per page change
  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value))
    setCurrentPage(1) // Reset to first page when changing items per page
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
            <h1 className="text-sm font-medium">Barang</h1>
          </div>
        </header>
        <main className="flex flex-1 flex-col bg-background">
          <div className="flex-1 p-6">
            <div className="flex flex-col gap-6">
              {/* Page Header */}
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold tracking-tight">Barang</h1>
                <p className="text-sm text-muted-foreground">
                  Kelola data barang yang tersedia dalam sistem. Anda dapat menambah, mengedit, dan menghapus informasi barang.
                </p>
              </div>

              {/* Actions Bar */}
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Cari barang..."
                    className="pl-9"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button asChild>
                    <Link href="/master/barang/create">
                      <Plus className="mr-2 h-4 w-4" />
                      Tambah Barang
                    </Link>
                  </Button>
                  <Button variant="outline">
                    <Printer className="mr-2 h-4 w-4" />
                    Cetak Barcode
                  </Button>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Import Excel
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export Excel
                  </Button>
                </div>
              </div>

              {/* Table Container */}
              <div className="rounded-lg border border-border bg-card">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID Barang</TableHead>
                      <TableHead>Nama Barang</TableHead>
                      <TableHead>Jenis Barang</TableHead>
                      <TableHead>Gudang</TableHead>
                      <TableHead className="text-right">Stock</TableHead>
                      <TableHead>Satuan</TableHead>
                      <TableHead className="text-right">Harga Beli</TableHead>
                      <TableHead className="text-right">Harga Jual</TableHead>
                      <TableHead className="text-right w-[180px]">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((barang) => (
                        <TableRow key={barang.id}>
                          <TableCell className="font-medium">{barang.id}</TableCell>
                          <TableCell>{barang.namaBarang}</TableCell>
                          <TableCell>{barang.jenisBarang}</TableCell>
                          <TableCell>{barang.gudang}</TableCell>
                          <TableCell className="text-right">{barang.stock.toLocaleString("id-ID")}</TableCell>
                          <TableCell>{barang.satuan}</TableCell>
                          <TableCell className="text-right">{formatCurrency(barang.hargaBeli)}</TableCell>
                          <TableCell className="text-right">{formatCurrency(barang.hargaJual)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                title="Detail"
                                asChild
                              >
                                <Link href={`/master/barang/${barang.id}`}>
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
                                <Link href={`/master/barang/${barang.id}/edit`}>
                                  <Pencil className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">
                          Tidak ada data barang
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
      </SidebarInset>
    </SidebarProvider>
  )
}

