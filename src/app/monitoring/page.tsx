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
import { Search, Clock, User, FileText, Trash2, Plus, Edit, Eye } from "lucide-react"
import Link from "next/link"

type ActivityType = "CREATE" | "UPDATE" | "DELETE" | "VIEW" | "LOGIN" | "LOGOUT"

type Activity = {
  id: string
  timestamp: string
  user: string
  action: ActivityType
  module: string
  entityId: string
  description: string
  ipAddress: string
}

const sampleData: Activity[] = [
  {
    id: "ACT-2024-001",
    timestamp: "2024-01-22T14:30:25",
    user: "John Doe",
    action: "CREATE",
    module: "Barang",
    entityId: "BRG001",
    description: "Membuat barang baru: Semen Portland",
    ipAddress: "192.168.1.100",
  },
  {
    id: "ACT-2024-002",
    timestamp: "2024-01-22T14:25:10",
    user: "Jane Smith",
    action: "UPDATE",
    module: "Purchase Order",
    entityId: "PO-2024-001",
    description: "Mengupdate purchase order: Mengubah total menjadi Rp 55.000.000",
    ipAddress: "192.168.1.101",
  },
  {
    id: "ACT-2024-003",
    timestamp: "2024-01-22T14:20:45",
    user: "Budi Santoso",
    action: "DELETE",
    module: "Permintaan Barang",
    entityId: "PB-2024-003",
    description: "Menghapus permintaan barang: PB-2024-003",
    ipAddress: "192.168.1.102",
  },
  {
    id: "ACT-2024-004",
    timestamp: "2024-01-22T14:15:30",
    user: "Siti Nurhaliza",
    action: "CREATE",
    module: "Permintaan Payment",
    entityId: "PP-2024-001",
    description: "Membuat permintaan payment baru untuk PO-2024-001",
    ipAddress: "192.168.1.103",
  },
  {
    id: "ACT-2024-005",
    timestamp: "2024-01-22T14:10:15",
    user: "Ahmad Fauzi",
    action: "UPDATE",
    module: "Barang Masuk",
    entityId: "BM-2024-001",
    description: "Mengupdate barang masuk: Menambah jumlah menjadi 150 unit",
    ipAddress: "192.168.1.104",
  },
  {
    id: "ACT-2024-006",
    timestamp: "2024-01-22T14:05:00",
    user: "Maria Garcia",
    action: "VIEW",
    module: "Laporan Stok",
    entityId: "RPT-STK-001",
    description: "Melihat laporan stok barang",
    ipAddress: "192.168.1.105",
  },
  {
    id: "ACT-2024-007",
    timestamp: "2024-01-22T14:00:20",
    user: "Rizki Pratama",
    action: "LOGIN",
    module: "Authentication",
    entityId: "-",
    description: "User berhasil login ke sistem",
    ipAddress: "192.168.1.106",
  },
  {
    id: "ACT-2024-008",
    timestamp: "2024-01-22T13:55:10",
    user: "Lisa Anderson",
    action: "CREATE",
    module: "Supplier",
    entityId: "SUP001",
    description: "Membuat supplier baru: PT Material Bangunan Sejahtera",
    ipAddress: "192.168.1.107",
  },
  {
    id: "ACT-2024-009",
    timestamp: "2024-01-22T13:50:45",
    user: "John Doe",
    action: "UPDATE",
    module: "Pengaturan Perusahaan",
    entityId: "SET-001",
    description: "Mengupdate pengaturan pajak menjadi 11%",
    ipAddress: "192.168.1.100",
  },
  {
    id: "ACT-2024-010",
    timestamp: "2024-01-22T13:45:30",
    user: "Jane Smith",
    action: "DELETE",
    module: "Barang Keluar",
    entityId: "BK-2024-002",
    description: "Menghapus barang keluar: BK-2024-002",
    ipAddress: "192.168.1.101",
  },
  {
    id: "ACT-2024-011",
    timestamp: "2024-01-22T13:40:15",
    user: "Budi Santoso",
    action: "CREATE",
    module: "Produksi",
    entityId: "PRD001",
    description: "Membuat produksi baru: WO-2024-001",
    ipAddress: "192.168.1.102",
  },
  {
    id: "ACT-2024-012",
    timestamp: "2024-01-22T13:35:00",
    user: "Siti Nurhaliza",
    action: "LOGOUT",
    module: "Authentication",
    entityId: "-",
    description: "User berhasil logout dari sistem",
    ipAddress: "192.168.1.103",
  },
]

function formatDateTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleString("id-ID", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
}

function getActionBadgeVariant(action: ActivityType): "default" | "secondary" | "destructive" | "outline" {
  switch (action) {
    case "CREATE":
      return "default"
    case "UPDATE":
      return "secondary"
    case "DELETE":
      return "destructive"
    case "VIEW":
      return "outline"
    case "LOGIN":
      return "default"
    case "LOGOUT":
      return "outline"
    default:
      return "outline"
  }
}

function getActionIcon(action: ActivityType) {
  switch (action) {
    case "CREATE":
      return <Plus className="h-3 w-3" />
    case "UPDATE":
      return <Edit className="h-3 w-3" />
    case "DELETE":
      return <Trash2 className="h-3 w-3" />
    case "VIEW":
      return <FileText className="h-3 w-3" />
    case "LOGIN":
      return <User className="h-3 w-3" />
    case "LOGOUT":
      return <User className="h-3 w-3" />
    default:
      return <FileText className="h-3 w-3" />
  }
}

export default function MonitoringPage() {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [itemsPerPage, setItemsPerPage] = React.useState(10)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filterAction, setFilterAction] = React.useState<string>("all")

  // Filter data based on search query and action filter
  const filteredData = sampleData.filter((activity) => {
    const query = searchQuery.toLowerCase()
    const matchesSearch =
      activity.id.toLowerCase().includes(query) ||
      activity.user.toLowerCase().includes(query) ||
      activity.module.toLowerCase().includes(query) ||
      formatDateTime(activity.timestamp).toLowerCase().includes(query)

    const matchesAction = filterAction === "all" || activity.action === filterAction

    return matchesSearch && matchesAction
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
            <h1 className="text-sm font-medium">Monitoring</h1>
          </div>
        </header>
        <main className="flex flex-1 flex-col bg-background">
          <div className="flex-1 p-6">
            <div className="flex flex-col gap-6">
              {/* Page Header */}
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold tracking-tight">Monitoring</h1>
                <p className="text-sm text-muted-foreground">
                  Pantau semua aktivitas yang terjadi dalam sistem. Halaman ini mencatat semua aktivitas seperti pembuatan, pembaruan, penghapusan, dan aktivitas lainnya sebagai audit trail.
                </p>
              </div>

              {/* Actions Bar */}
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Cari aktivitas..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setCurrentPage(1) // Reset to first page when searching
                    }}
                    className="pl-9"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    value={filterAction}
                    onValueChange={(value) => {
                      setFilterAction(value)
                      setCurrentPage(1) // Reset to first page when filtering
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter aksi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Aksi</SelectItem>
                      <SelectItem value="CREATE">Create</SelectItem>
                      <SelectItem value="UPDATE">Update</SelectItem>
                      <SelectItem value="DELETE">Delete</SelectItem>
                      <SelectItem value="VIEW">View</SelectItem>
                      <SelectItem value="LOGIN">Login</SelectItem>
                      <SelectItem value="LOGOUT">Logout</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Table Container */}
              <div className="rounded-lg border border-border bg-card">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">Waktu</TableHead>
                      <TableHead className="w-[150px]">User</TableHead>
                      <TableHead className="w-[120px]">Aksi</TableHead>
                      <TableHead className="w-[150px]">Module</TableHead>
                      <TableHead className="text-right w-[100px]">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((activity) => (
                        <TableRow key={activity.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{formatDateTime(activity.timestamp)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{activity.user}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getActionBadgeVariant(activity.action)} className="flex items-center gap-1 w-fit">
                              {getActionIcon(activity.action)}
                              {activity.action}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{activity.module}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              title="Detail"
                              asChild
                            >
                              <Link href={`/monitoring/${activity.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                          Tidak ada data aktivitas
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
                      <SelectItem value="100">100</SelectItem>
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
