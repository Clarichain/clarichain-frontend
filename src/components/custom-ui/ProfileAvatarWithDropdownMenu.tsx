import { Session } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import LogOutBtn from "./LogOutBtn";
import ProfileAvatar from "./ProfileAvatar";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ProfileAvatarWithDropdownMenu = ({
  session,
  className,
}: {
  session: Session;
  className?: string;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ProfileAvatar
          image={session?.user?.image || ""}
          name={session?.user?.name || ""}
          className={cn(
            "size-12 border border-blue-400/60 cursor-pointer",
            className
          )}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="!w-60 !p-2 bg-white shadow-lg rounded-lg"
        align="end"
      >
        <div className="flex flex-col gap-1 justify-center items-center">
          <ProfileAvatar
            image={session?.user?.image || ""}
            name={session?.user?.name || ""}
            className="size-24 rounded-full border "
          />
          <div className="space-y-1 text-center mt-1">
            <h1 className="font-medium ">{session?.user?.name}</h1>
            <p className="text-sm max-w-full truncate">{session?.user?.email}</p>
          </div>
          <Separator className="!mt-2" />
          <div className="w-full mt-2">
            <DropdownMenuItem asChild>
              <Link href={"/dashboard"}>Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={"/dashboard/settings"}>Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/dashboard/settings"}>Support</Link>
            </DropdownMenuItem>
          </div>
          <Separator className="mt-2" />
          <div className="mt-1">
            <LogOutBtn className=" text-red-500 hover:text-red-500 transition-all duration-300 hover:bg-white/0! cursor-pointer " />
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileAvatarWithDropdownMenu;
