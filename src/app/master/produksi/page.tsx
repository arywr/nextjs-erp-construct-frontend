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
import { Badge } from "@/components/ui/badge"
import { Search, Eye, Edit, Trash2, Plus } from "lucide-react"
import Link from "next/link"

type Produksi = {
  id: string
  nomorWO: string
  deskripsi: string
  status: string
  tanggalMulai: string
  tanggalSelesai: string
  progress: number
  prioritas: string
}

const sampleData: Produksi[] = [
  {
    id: "PRD001",
    nomorWO: "WO-2024-001",
    deskripsi: "Pembuatan Beton Ready Mix untuk Proyek Gedung A",
    status: "In Progress",
    tanggalMulai: "2024-01-15",
    tanggalSelesai: "2024-02-15",
    progress: 65,
    prioritas: "Tinggi",
  },
  {
    id: "PRD002",
    nomorWO: "WO-2024-002",
    deskripsi: "Produksi Paving Block untuk Area Parkir",
    status: "Completed",
    tanggalMulai: "2024-01-10",
    tanggalSelesai: "2024-01-25",
    progress: 100,
    prioritas: "Sedang",
  },
  {
    id: "PRD003",
    nomorWO: "WO-2024-003",
    deskripsi: "Pembuatan Panel Beton Precast",
    status: "Planning",
    tanggalMulai: "2024-02-01",
    tanggalSelesai: "2024-03-01",
    progress: 0,
    prioritas: "Tinggi",
  },
  {
    id: "PRD004",
    nomorWO: "WO-2024-004",
    deskripsi: "Produksi Bata Merah untuk Proyek Perumahan",
    status: "In Progress",
    tanggalMulai: "2024-01-20",
    tanggalSelesai: "2024-03-20",
    progress: 40,
    prioritas: "Sedang",
  },
  {
    id: "PRD005",
    nomorWO: "WO-2024-005",
    deskripsi: "Pembuatan Genteng Beton",
    status: "On Hold",
    tanggalMulai: "2024-02-10",
    tanggalSelesai: "2024-03-10",
    progress: 20,
    prioritas: "Rendah",
  },
  {
    id: "PRD006",
    nomorWO: "WO-2024-006",
    deskripsi: "Produksi U-Ditch untuk Drainase",
    status: "In Progress",
    tanggalMulai: "2024-01-25",
    tanggalSelesai: "2024-02-25",
    progress: 75,
    prioritas: "Tinggi",
  },
  {
    id: "PRD007",
    nomorWO: "WO-2024-007",
    deskripsi: "Pembuatan Kanstin Beton",
    status: "Completed",
    tanggalMulai: "2024-01-05",
    tanggalSelesai: "2024-01-20",
    progress: 100,
    prioritas: "Sedang",
  },
  {
    id: "PRD008",
    nomorWO: "WO-2024-008",
    deskripsi: "Produksi Tiang Pancang Beton",
    status: "Planning",
    tanggalMulai: "2024-02-15",
    tanggalSelesai: "2024-04-15",
    progress: 0,
    prioritas: "Tinggi",
  },
]

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
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

export default function ProduksiPage() {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [itemsPerPage, setItemsPerPage] = React.useState(5)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
  const [selectedProduksi, setSelectedProduksi] = React.useState<Produksi | null>(null)

  // Filter data based on search query
  const filteredData = sampleData.filter((produksi) => {
    const query = searchQuery.toLowerCase()
    return (
      produksi.id.toLowerCase().includes(query) ||
      produksi.nomorWO.toLowerCase().includes(query) ||
      produksi.deskripsi.toLowerCase().includes(query) ||
      produksi.status.toLowerCase().includes(query)
    )
  })

  // Calculate pagination
  const totalItems = filteredData.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = filteredData.slice(startIndex, endIndex)

  // Handle delete
  const handleDeleteClick = (produksi: Produksi) => {
    setSelectedProduksi(produksi)
    setShowDeleteDialog(true)
  }

  const handleDeleteConfirm = () => {
    // Handle delete action here
    console.log("Deleting produksi:", selectedProduksi?.id)
    setShowDeleteDialog(false)
    setSelectedProduksi(null)
    // You can add navigation or success message here
  }

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
            <h1 className="text-sm font-medium">Produksi</h1>
          </div>
        </header>
        <main className="flex flex-1 flex-col bg-background">
          <div className="flex-1 p-6">
            <div className="flex flex-col gap-6">
              {/* Page Header */}
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold tracking-tight">Produksi</h1>
                <p className="text-sm text-muted-foreground">
                  Kelola data produksi dan work order dalam sistem. Pantau progress produksi, kelola jadwal kerja, dan kelola sumber daya yang diperlukan untuk setiap work order.
                </p>
              </div>

              {/* Actions Bar */}
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Cari produksi..."
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
                    <Link href="/master/produksi/create">
                      <Plus className="mr-2 h-4 w-4" />
                      Tambah Work Order
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Table Container */}
              <div className="rounded-lg border border-border bg-card">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Nomor WO</TableHead>
                      <TableHead>Deskripsi</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Tanggal Mulai</TableHead>
                      <TableHead>Tanggal Selesai</TableHead>
                      <TableHead className="text-right">Progress</TableHead>
                      <TableHead>Prioritas</TableHead>
                      <TableHead className="text-right w-[180px]">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((produksi) => (
                        <TableRow key={produksi.id}>
                          <TableCell className="font-medium">{produksi.id}</TableCell>
                          <TableCell>{produksi.nomorWO}</TableCell>
                          <TableCell>{produksi.deskripsi}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadgeVariant(produksi.status)}>
                              {produksi.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(produksi.tanggalMulai)}</TableCell>
                          <TableCell>{formatDate(produksi.tanggalSelesai)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <span className="text-sm">{produksi.progress}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getPrioritasBadgeVariant(produksi.prioritas)}>
                              {produksi.prioritas}
                            </Badge>
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
                                <Link href={`/master/produksi/${produksi.id}`}>
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
                                <Link href={`/master/produksi/${produksi.id}/edit`}>
                                  <Edit className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                title="Hapus"
                                onClick={() => handleDeleteClick(produksi)}
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
                          Tidak ada data produksi
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
              <AlertDialogTitle>Hapus Produksi</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus work order <strong>{selectedProduksi?.nomorWO}</strong>? 
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

