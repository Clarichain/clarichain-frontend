import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Plus, Search } from "lucide-react";
import { Session } from "next-auth";
import ProfileAvatarWithDropdownMenu from "./custom-ui/ProfileAvatarWithDropdownMenu";
import UploadBtnSheet from "./custom-ui/UploadBtnSheet";

export function DashboardHeader({session}: {session: Session}) {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Left: Sidebar trigger and Search */}
        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <SidebarTrigger />

          {/* Responsive Search */}
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search documents..."
              className="pl-10 bg-[#F8FAFC] border-[#E2E8F0] text-sm"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4 ml-2">
          {/* Upload Button (Hide label on small screens) */}
          <UploadBtnSheet>
            <Button
              className="bg-[#2453CC] hover:bg-[#1e42a4] text-white px-3"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Upload Document</span>
            </Button>
          </UploadBtnSheet>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
              >
                <Bell className="w-5 h-5 text-muted-foreground" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80"
            >
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start p-4">
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium text-[#1E293B]">
                    Document Signed
                  </span>
                  <Badge className="bg-[#38B26C]/10 text-[#38B26C] text-xs">
                    New
                  </Badge>
                </div>
                <p className="text-sm text-[#64748B] mt-1">
                  Sarah Chen signed the NDA agreement
                </p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start p-4">
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium text-[#1E293B]">
                    Co-signer Invited
                  </span>
                  <Badge className="bg-[#F9FAFB] text-[#64748B] text-xs">
                    Pending
                  </Badge>
                </div>
                <p className="text-sm text-[#64748B] mt-1">
                  Waiting for Alex Rodriguez to join
                </p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Avatar */}
          <ProfileAvatarWithDropdownMenu session={session} className="size-10"/>
        </div>
      </div>
    </header>
  );
}
