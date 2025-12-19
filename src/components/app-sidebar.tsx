"use client"

import * as React from "react"
import {
  Building2,
  Package,
  Tags,
  Hash,
  MapPin,
  Truck,
  Factory,
  ArrowDown,
  ArrowUp,
  ClipboardList,
  FileText,
  FileCheck,
  ShoppingCart,
  BarChart3,
  TrendingDown,
  TrendingUp,
  DollarSign,
  Activity,
  Users,
  HelpCircle,
  User,
  LogOut,
  Settings,
  ChevronsUpDown,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navigation = [
  {
    title: "Master",
    items: [
      {
        title: "Barang",
        url: "/master/barang",
        icon: Package,
      },
      {
        title: "Jenis Barang",
        url: "/master/jenis-barang",
        icon: Tags,
      },
      {
        title: "Satuan",
        url: "/master/satuan",
        icon: Hash,
      },
      {
        title: "Lokasi",
        url: "/master/lokasi",
        icon: MapPin,
      },
      {
        title: "Supplier",
        url: "/master/supplier",
        icon: Truck,
      },
      {
        title: "Produksi",
        url: "/master/produksi",
        icon: Factory,
      },
    ],
  },
  {
    title: "Transaksi",
    items: [
      {
        title: "Barang Masuk",
        url: "/transaksi/barang-masuk",
        icon: ArrowDown,
      },
      {
        title: "Barang Keluar",
        url: "/transaksi/barang-keluar",
        icon: ArrowUp,
      },
      {
        title: "Permintaan Barang (PB)",
        url: "/transaksi/permintaan-barang",
        icon: ClipboardList,
      },
      {
        title: "Purchase Order",
        url: "/transaksi/purchase-order",
        icon: ShoppingCart,
      },
      {
        title: "Permintaan Payment (PP)",
        url: "/transaksi/permintaan-payment",
        icon: FileText,
      },
      {
        title: "Approved Payment (AP)",
        url: "/transaksi/approved-payment",
        icon: FileCheck,
      },
    ],
  },
  {
    title: "Laporan",
    items: [
      {
        title: "Laporan Stok",
        url: "/laporan/stok",
        icon: BarChart3,
      },
      {
        title: "Laporan Barang Masuk",
        url: "/laporan/barang-masuk",
        icon: TrendingDown,
      },
      {
        title: "Laporan Barang Keluar",
        url: "/laporan/barang-keluar",
        icon: TrendingUp,
      },
      {
        title: "Laporan Keuangan",
        url: "/laporan/keuangan",
        icon: DollarSign,
      },
    ],
  },
  {
    title: "Aktivitas",
    items: [
      {
        title: "Monitoring",
        url: "/monitoring",
        icon: Activity,
      },
    ],
  },
  {
    title: "Pengaturan",
    items: [
      {
        title: "Manajemen User",
        url: "/pengaturan/manajemen-user",
        icon: Users,
      },
      {
        title: "Pengaturan Perusahaan",
        url: "/pengaturan/perusahaan",
        icon: Building2,
      },
    ],
  },
  {
    title: "Bantuan",
    items: [
      {
        title: "Tentang Aplikasi",
        url: "/bantuan/tentang",
        icon: HelpCircle,
      },
    ],
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <Package className="size-4" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold text-sm">ERP Konstruksi</span>
            <span className="text-xs text-sidebar-foreground/70">
              Sistem Manajemen
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {navigation.map((group, groupIndex) => (
          <SidebarGroup key={group.title || `group-${groupIndex}`}>
            {group.title && <SidebarGroupLabel>{group.title}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.url
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link href={item.url}>
                          <Icon className="size-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="" alt="User" />
                    <AvatarFallback className="rounded-lg">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">John Doe</span>
                    <span className="truncate text-xs text-sidebar-foreground/70">
                      Administrator
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src="" alt="User" />
                      <AvatarFallback className="rounded-lg">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">John Doe</span>
                      <span className="truncate text-xs text-muted-foreground">
                        john.doe@company.com
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profil</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/pengaturan/perusahaan" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Pengaturan</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Keluar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

