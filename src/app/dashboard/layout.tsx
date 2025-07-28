import type React from "react"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { auth } from "@/auth"
import { notFound } from "next/navigation"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
  }) {
  const session = await auth()
  if(!session?.user) return notFound()
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#F9FAFB]">
        <AppSidebar session={session}/>
        <div className="flex-1 flex flex-col w-full">
          <DashboardHeader session={session} />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
