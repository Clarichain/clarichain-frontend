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
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Users,
  BookOpen,
  Coins,
  Settings,
  Upload,
  PenTool,
} from "lucide-react";
import Link from "next/link";
import UploadBtnSheet from "./custom-ui/UploadBtnSheet";
import { LogoWithText } from "./custom-ui/hero-section";
import { auth } from "@/auth";
import ProfileAvatar from "./custom-ui/ProfileAvatar";
import { notFound } from "next/navigation";

const menuItems = [
  {
    title: "My Documents",
    url: "/dashboard",
    icon: FileText,
    badge: "12",
  },
  {
    title: "Co-signing Requests",
    url: "/dashboard/co-signing",
    icon: Users,
    badge: "3",
  },
  {
    title: "Saved Summaries",
    url: "/dashboard/summaries",
    icon: BookOpen,
  },
  {
    title: "NFT Vault",
    url: "/dashboard/nft-vault",
    icon: Coins,
    badge: "8",
  },
];

const quickActions = [
  {
    title: "Upload Document",
    url: "/dashboard/upload",
    icon: Upload,
  },
  {
    title: "Invite Signers",
    url: "/dashboard/invite",
    icon: PenTool,
  },
];

export async function AppSidebar() {
  const session = await auth()

  if(!session?.user) return notFound()
  return (
    <Sidebar className="border-r border-[#E2E8F0]">
      <SidebarHeader className="p-4">
        <Link
          href="/dashboard"
          className="flex items-center space-x-2"
        >
          <LogoWithText
            variant="blue"
            logoClassName="size-8"
            textClassName="text-xl font-bold text-[#1E293B]"
          />
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#64748B] text-xs font-medium uppercase tracking-wider">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="w-full justify-between"
                  >
                    <Link
                      href={item.url}
                      className="flex items-center"
                    >
                      <div className="flex items-center">
                        <item.icon className="w-4 h-4 mr-3" />
                        <span>{item.title}</span>
                      </div>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className="ml-auto bg-[#2453CC]/10 text-[#2453CC] text-xs px-2 py-0.5 rounded-full"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-4" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-[#64748B] text-xs font-medium uppercase tracking-wider">
            Quick Actions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {quickActions.map((item) => {
                if (item.title === "Upload Document") {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <UploadBtnSheet>
                        <SidebarMenuButton>
                          <div className="flex items-center">
                            <item.icon className="w-4 h-4 mr-3" />
                            <span>{item.title}</span>
                          </div>
                        </SidebarMenuButton>
                      </UploadBtnSheet>
                    </SidebarMenuItem>
                  );
                } else {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.url}
                          className="flex items-center"
                        >
                          <item.icon className="w-4 h-4 mr-3" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/dashboard/settings"
                className="flex items-center"
              >
                <Settings className="w-4 h-4 mr-3" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="mt-4 p-3 bg-[#F8FAFC] rounded-lg border">
          <div className="flex items-center space-x-3">
            <ProfileAvatar image={session?.user?.image || ""} name={session?.user?.name || ""} className="size-10 rounded-full border" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#1E293B] truncate">
               {session.user?.name || "User Name"}
              </p>
              <p className="text-xs text-[#64748B] truncate">
                {session.user?.email}
              </p>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
