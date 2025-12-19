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
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, User, FileText, Trash2, Plus, Edit } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

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

function formatDateTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
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
      return <Plus className="h-4 w-4" />
    case "UPDATE":
      return <Edit className="h-4 w-4" />
    case "DELETE":
      return <Trash2 className="h-4 w-4" />
    case "VIEW":
      return <FileText className="h-4 w-4" />
    case "LOGIN":
      return <User className="h-4 w-4" />
    case "LOGOUT":
      return <User className="h-4 w-4" />
    default:
      return <FileText className="h-4 w-4" />
  }
}

export default function DetailMonitoringPage() {
  const params = useParams()

  // Mock data - in real app, fetch based on params.id
  const [activityData, setActivityData] = React.useState<Activity>({
    id: (params.id as string) || "ACT-2024-001",
    timestamp: "2024-01-22T14:30:25",
    user: "John Doe",
    action: "CREATE",
    module: "Barang",
    entityId: "BRG001",
    description: "Membuat barang baru: Semen Portland",
    ipAddress: "192.168.1.100",
  })

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
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="/monitoring">
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                  </Button>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-semibold tracking-tight">Detail Aktivitas</h1>
                    <p className="text-sm text-muted-foreground">
                      Lihat informasi lengkap tentang aktivitas yang tercatat dalam sistem. Detail ini mencakup semua informasi audit trail untuk aktivitas tersebut.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Detail Information */}
              <div className="max-w-2xl space-y-6">
                <div className="space-y-4">
                  {/* ID Aktivitas */}
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">ID Aktivitas</p>
                    <p className="text-sm font-medium font-mono">{activityData.id}</p>
                  </div>

                  {/* Waktu */}
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Waktu</p>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">{formatDateTime(activityData.timestamp)}</p>
                    </div>
                  </div>

                  {/* User */}
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">User</p>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm font-medium">{activityData.user}</p>
                    </div>
                  </div>

                  {/* Aksi */}
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Aksi</p>
                    <Badge variant={getActionBadgeVariant(activityData.action)} className="flex items-center gap-1 w-fit">
                      {getActionIcon(activityData.action)}
                      {activityData.action}
                    </Badge>
                  </div>

                  {/* Module */}
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Module</p>
                    <Badge variant="outline">{activityData.module}</Badge>
                  </div>

                  {/* ID Entity */}
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">ID Entity</p>
                    <p className="text-sm font-mono">{activityData.entityId}</p>
                  </div>

                  {/* Deskripsi */}
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Deskripsi</p>
                    <div className="rounded-lg border border-border bg-card p-4">
                      <p className="text-sm whitespace-pre-wrap">{activityData.description}</p>
                    </div>
                  </div>

                  {/* IP Address */}
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">IP Address</p>
                    <p className="text-sm font-mono text-muted-foreground">{activityData.ipAddress}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
