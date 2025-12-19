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

const sampleData: PermintaanPayment[] = [
  {
    id: "PP-2024-001",
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
  },
  {
    id: "PP-2024-002",
    poInfo: {
      idPO: "PO-2024-002",
      supplier: "CV Semen Nusantara",
      total: 5550000,
    },
    rekeningSumber: {
      bankName: "Bank BCA",
      accountNumber: "1234567890",
      accountOwner: "PT Konstruksi Jaya",
    },
    rekeningTujuan: {
      bankName: "Bank BNI",
      accountNumber: "1122334455",
      accountOwner: "CV Semen Nusantara",
    },
  },
  {
    id: "PP-2024-003",
    poInfo: {
      idPO: "PO-2024-003",
      supplier: "PT Bahan Bangunan Sejahtera",
      total: 18425000,
    },
    rekeningSumber: {
      bankName: "Bank BCA",
      accountNumber: "1234567890",
      accountOwner: "PT Konstruksi Jaya",
    },
    rekeningTujuan: {
      bankName: "Bank BRI",
      accountNumber: "5566778899",
      accountOwner: "PT Bahan Bangunan Sejahtera",
    },
  },
  {
    id: "PP-2024-004",
    poInfo: {
      idPO: "PO-2024-004",
      supplier: "PT Supplier Bangunan Jaya",
      total: 555000,
    },
    rekeningSumber: {
      bankName: "Bank BCA",
      accountNumber: "1234567890",
      accountOwner: "PT Konstruksi Jaya",
    },
    rekeningTujuan: {
      bankName: "Bank Mandiri",
      accountNumber: "2233445566",
      accountOwner: "PT Supplier Bangunan Jaya",
    },
  },
  {
    id: "PP-2024-005",
    poInfo: {
      idPO: "PO-2024-005",
      supplier: "CV Material Konstruksi",
      total: 45650000,
    },
    rekeningSumber: {
      bankName: "Bank BCA",
      accountNumber: "1234567890",
      accountOwner: "PT Konstruksi Jaya",
    },
    rekeningTujuan: {
      bankName: "Bank BNI",
      accountNumber: "3344556677",
      accountOwner: "CV Material Konstruksi",
    },
  },
  {
    id: "PP-2024-006",
    poInfo: {
      idPO: "PO-2024-006",
      supplier: "PT Bahan Bangunan Sejahtera",
      total: 6667500,
    },
    rekeningSumber: {
      bankName: "Bank BCA",
      accountNumber: "1234567890",
      accountOwner: "PT Konstruksi Jaya",
    },
    rekeningTujuan: {
      bankName: "Bank BRI",
      accountNumber: "4455667788",
      accountOwner: "PT Bahan Bangunan Sejahtera",
    },
  },
  {
    id: "PP-2024-007",
    poInfo: {
      idPO: "PO-2024-007",
      supplier: "PT Supplier Bangunan Jaya",
      total: 10406250,
    },
    rekeningSumber: {
      bankName: "Bank BCA",
      accountNumber: "1234567890",
      accountOwner: "PT Konstruksi Jaya",
    },
    rekeningTujuan: {
      bankName: "Bank Mandiri",
      accountNumber: "6677889900",
      accountOwner: "PT Supplier Bangunan Jaya",
    },
  },
  {
    id: "PP-2024-008",
    poInfo: {
      idPO: "PO-2024-008",
      supplier: "CV Material Konstruksi",
      total: 60750000,
    },
    rekeningSumber: {
      bankName: "Bank BCA",
      accountNumber: "1234567890",
      accountOwner: "PT Konstruksi Jaya",
    },
    rekeningTujuan: {
      bankName: "Bank BNI",
      accountNumber: "7788990011",
      accountOwner: "CV Material Konstruksi",
    },
  },
]

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value)
}

export default function PermintaanPaymentPage() {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [itemsPerPage, setItemsPerPage] = React.useState(5)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
  const [selectedPayment, setSelectedPayment] = React.useState<PermintaanPayment | null>(null)

  // Filter data based on search query
  const filteredData = sampleData.filter((payment) => {
    const query = searchQuery.toLowerCase()
    return (
      payment.id.toLowerCase().includes(query) ||
      payment.poInfo.idPO.toLowerCase().includes(query) ||
      payment.poInfo.supplier.toLowerCase().includes(query) ||
      payment.rekeningSumber.bankName.toLowerCase().includes(query) ||
      payment.rekeningSumber.accountNumber.toLowerCase().includes(query) ||
      payment.rekeningSumber.accountOwner.toLowerCase().includes(query) ||
      payment.rekeningTujuan.bankName.toLowerCase().includes(query) ||
      payment.rekeningTujuan.accountNumber.toLowerCase().includes(query) ||
      payment.rekeningTujuan.accountOwner.toLowerCase().includes(query)
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
  const handleDeleteClick = (payment: PermintaanPayment) => {
    setSelectedPayment(payment)
    setShowDeleteDialog(true)
  }

  const handleDeleteConfirm = () => {
    // Handle delete action here
    console.log("Deleting permintaan payment:", selectedPayment?.id)
    setShowDeleteDialog(false)
    setSelectedPayment(null)
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
                <h1 className="text-2xl font-semibold tracking-tight">Permintaan Payment</h1>
                <p className="text-sm text-muted-foreground">
                  Kelola permintaan pembayaran untuk purchase order. Catat semua permintaan pembayaran beserta informasi rekening sumber dan tujuan.
                </p>
              </div>

              {/* Actions Bar */}
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Cari permintaan payment..."
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
                    <Link href="/transaksi/permintaan-payment/create">
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
                      <TableHead>ID Permintaan Payment</TableHead>
                      <TableHead>Informasi PO</TableHead>
                      <TableHead>Rekening Sumber</TableHead>
                      <TableHead>Rekening Tujuan</TableHead>
                      <TableHead className="text-right w-[180px]">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.id}</TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <span className="font-medium">{payment.poInfo.idPO}</span>
                              <span className="text-sm text-muted-foreground">{payment.poInfo.supplier}</span>
                              <span className="text-sm font-medium text-primary">{formatCurrency(payment.poInfo.total)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <span className="font-medium">{payment.rekeningSumber.bankName}</span>
                              <span className="text-sm text-muted-foreground">{payment.rekeningSumber.accountNumber}</span>
                              <span className="text-sm text-muted-foreground">{payment.rekeningSumber.accountOwner}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <span className="font-medium">{payment.rekeningTujuan.bankName}</span>
                              <span className="text-sm text-muted-foreground">{payment.rekeningTujuan.accountNumber}</span>
                              <span className="text-sm text-muted-foreground">{payment.rekeningTujuan.accountOwner}</span>
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
                                <Link href={`/transaksi/permintaan-payment/${payment.id}`}>
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
                                <Link href={`/transaksi/permintaan-payment/${payment.id}/edit`}>
                                  <Edit className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                title="Hapus"
                                onClick={() => handleDeleteClick(payment)}
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
                          Tidak ada data permintaan payment
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
              <AlertDialogTitle>Hapus Permintaan Payment</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus permintaan payment <strong>{selectedPayment?.id}</strong>? 
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
