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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
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
  type: "Permintaan Barang" | "Barang"
  permintaanBarang?: PermintaanBarangData
  dataBarang?: BarangItem[]
}

type PurchaseOrder = {
  id: string
  tanggalPO: string
  namaSupplier: string
  alamatSupplier: string
  data: DataBarang
  ppn: number
  total: number
}

const sampleData: PurchaseOrder[] = [
  {
    id: "PO-2024-001",
    tanggalPO: "2024-01-15",
    namaSupplier: "PT Supplier Bangunan Jaya",
    alamatSupplier: "Jl. Raya Industri No. 123, Jakarta",
    data: {
      type: "Permintaan Barang",
      permintaanBarang: {
        nomorPB: "PB-2024-001",
        namaBarang: "Semen Portland",
        jumlahBarang: 100,
      },
    },
    ppn: 11,
    total: 55000000,
  },
  {
    id: "PO-2024-002",
    tanggalPO: "2024-01-16",
    namaSupplier: "CV Material Konstruksi",
    alamatSupplier: "Jl. Gatot Subroto No. 45, Bandung",
    data: {
      type: "Barang",
      dataBarang: [
        { namaBarang: "Pasir Kasar", jumlah: 20, harga: 250000 },
      ],
    },
    ppn: 11,
    total: 5550000,
  },
  {
    id: "PO-2024-003",
    tanggalPO: "2024-01-17",
    namaSupplier: "PT Bahan Bangunan Sejahtera",
    alamatSupplier: "Jl. Sudirman No. 78, Surabaya",
    data: {
      type: "Permintaan Barang",
      permintaanBarang: {
        nomorPB: "PB-2024-003",
        namaBarang: "Keramik 30x30",
        jumlahBarang: 200,
      },
    },
    ppn: 11,
    total: 18425000,
  },
  {
    id: "PO-2024-004",
    tanggalPO: "2024-01-18",
    namaSupplier: "PT Supplier Bangunan Jaya",
    alamatSupplier: "Jl. Raya Industri No. 123, Jakarta",
    data: {
      type: "Barang",
      dataBarang: [
        { namaBarang: "Batu Bata Merah", jumlah: 1000, harga: 500 },
      ],
    },
    ppn: 11,
    total: 555000,
  },
  {
    id: "PO-2024-005",
    tanggalPO: "2024-01-19",
    namaSupplier: "CV Material Konstruksi",
    alamatSupplier: "Jl. Gatot Subroto No. 45, Bandung",
    data: {
      type: "Permintaan Barang",
      permintaanBarang: {
        nomorPB: "PB-2024-005",
        namaBarang: "Semen Portland",
        jumlahBarang: 150,
      },
    },
    ppn: 11,
    total: 45650000,
  },
  {
    id: "PO-2024-006",
    tanggalPO: "2024-01-20",
    namaSupplier: "PT Bahan Bangunan Sejahtera",
    alamatSupplier: "Jl. Sudirman No. 78, Surabaya",
    data: {
      type: "Barang",
      dataBarang: [
        { namaBarang: "Pasir Kasar", jumlah: 15, harga: 250000 },
        { namaBarang: "Keramik 30x30", jumlah: 150, harga: 45000 },
      ],
    },
    ppn: 11,
    total: 6667500,
  },
  {
    id: "PO-2024-007",
    tanggalPO: "2024-01-21",
    namaSupplier: "PT Supplier Bangunan Jaya",
    alamatSupplier: "Jl. Raya Industri No. 123, Jakarta",
    data: {
      type: "Permintaan Barang",
      permintaanBarang: {
        nomorPB: "PB-2024-007",
        namaBarang: "Cat Tembok Putih",
        jumlahBarang: 75,
      },
    },
    ppn: 11,
    total: 10406250,
  },
  {
    id: "PO-2024-008",
    tanggalPO: "2024-01-22",
    namaSupplier: "CV Material Konstruksi",
    alamatSupplier: "Jl. Gatot Subroto No. 45, Bandung",
    data: {
      type: "Barang",
      dataBarang: [
        { namaBarang: "Besi Beton 10mm", jumlah: 400, harga: 85000 },
        { namaBarang: "Besi Beton 12mm", jumlah: 250, harga: 95000 },
      ],
    },
    ppn: 11,
    total: 60750000,
  },
]

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value)
}

export default function PurchaseOrderPage() {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [itemsPerPage, setItemsPerPage] = React.useState(5)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
  const [selectedPO, setSelectedPO] = React.useState<PurchaseOrder | null>(null)

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
  const filteredData = sampleData.filter((po) => {
    const query = searchQuery.toLowerCase()
    const hasBarangMatch = po.data.type === "Barang" 
      ? po.data.dataBarang?.some((barang) =>
          barang.namaBarang.toLowerCase().includes(query)
        )
      : po.data.permintaanBarang?.namaBarang.toLowerCase().includes(query) ||
        po.data.permintaanBarang?.nomorPB.toLowerCase().includes(query)
    
    return (
      po.id.toLowerCase().includes(query) ||
      po.namaSupplier.toLowerCase().includes(query) ||
      po.alamatSupplier.toLowerCase().includes(query) ||
      hasBarangMatch ||
      formatDate(po.tanggalPO).toLowerCase().includes(query)
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
  const handleDeleteClick = (po: PurchaseOrder) => {
    setSelectedPO(po)
    setShowDeleteDialog(true)
  }

  const handleDeleteConfirm = () => {
    // Handle delete action here
    console.log("Deleting purchase order:", selectedPO?.id)
    setShowDeleteDialog(false)
    setSelectedPO(null)
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
                <h1 className="text-2xl font-semibold tracking-tight">Purchase Order</h1>
                <p className="text-sm text-muted-foreground">
                  Kelola purchase order untuk pembelian barang dari supplier. Catat semua purchase order dan kelola data barang yang dipesan.
                </p>
              </div>

              {/* Actions Bar */}
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Cari purchase order..."
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
                    <Link href="/transaksi/purchase-order/create">
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
                      <TableHead>ID Purchase Order</TableHead>
                      <TableHead>Tanggal PO</TableHead>
                      <TableHead>Nama Supplier</TableHead>
                      <TableHead>Alamat Supplier</TableHead>
                      <TableHead>Permintaan Barang / Data Barang</TableHead>
                      <TableHead className="text-right">PPn (%)</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right w-[180px]">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((po) => (
                        <TableRow key={po.id}>
                          <TableCell className="font-medium">{po.id}</TableCell>
                          <TableCell>{formatDate(po.tanggalPO)}</TableCell>
                          <TableCell>{po.namaSupplier}</TableCell>
                          <TableCell className="max-w-[200px] truncate">
                            {po.alamatSupplier}
                          </TableCell>
                          <TableCell>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="outline" size="sm" className="h-8">
                                  <Eye className="mr-2 h-4 w-4" />
                                  {po.data.type}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-80" align="start">
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="font-semibold text-sm mb-2">Tipe: {po.data.type}</h4>
                                  </div>
                                  {po.data.type === "Permintaan Barang" && po.data.permintaanBarang ? (
                                    <div className="space-y-3">
                                      <div className="space-y-1">
                                        <p className="text-xs font-medium text-muted-foreground">Nomor PB</p>
                                        <p className="text-sm font-medium">{po.data.permintaanBarang.nomorPB}</p>
                                      </div>
                                      <div className="space-y-1">
                                        <p className="text-xs font-medium text-muted-foreground">Nama Barang</p>
                                        <p className="text-sm">{po.data.permintaanBarang.namaBarang}</p>
                                      </div>
                                      <div className="space-y-1">
                                        <p className="text-xs font-medium text-muted-foreground">Jumlah Barang</p>
                                        <p className="text-sm">{po.data.permintaanBarang.jumlahBarang.toLocaleString("id-ID")}</p>
                                      </div>
                                      <div className="pt-2 border-t">
                                        <Button variant="outline" size="sm" asChild className="w-full">
                                          <Link href={`/transaksi/permintaan-barang/${po.data.permintaanBarang.nomorPB}`}>
                                            <Eye className="mr-2 h-4 w-4" />
                                            Lihat Detail PB
                                          </Link>
                                        </Button>
                                      </div>
                                    </div>
                                  ) : po.data.type === "Barang" && po.data.dataBarang ? (
                                    <div className="space-y-2">
                                      <p className="text-xs font-medium text-muted-foreground mb-2">Data Barang</p>
                                      {po.data.dataBarang.map((barang, index) => (
                                        <div key={index} className="text-sm space-y-1 pb-2 border-b last:border-0 last:pb-0">
                                          <p className="font-medium">{barang.namaBarang}</p>
                                          <p className="text-muted-foreground">
                                            Jumlah: {barang.jumlah.toLocaleString("id-ID")} x {formatCurrency(barang.harga)}
                                          </p>
                                          <p className="text-muted-foreground">
                                            Subtotal: {formatCurrency(barang.jumlah * barang.harga)}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  ) : null}
                                </div>
                              </PopoverContent>
                            </Popover>
                          </TableCell>
                          <TableCell className="text-right">
                            {po.ppn}%
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {formatCurrency(po.total)}
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
                                <Link href={`/transaksi/purchase-order/${po.id}`}>
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
                                <Link href={`/transaksi/purchase-order/${po.id}/edit`}>
                                  <Edit className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                title="Hapus"
                                onClick={() => handleDeleteClick(po)}
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
                          Tidak ada data purchase order
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

