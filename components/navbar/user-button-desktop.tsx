import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LockIcon, UserIcon } from "@/components/ui/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from "next-auth";
import SignOutButton from "@/components/auth/signout-client";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface UserButtonDesktopProps {
  session?: Session | null;
  className?: string;
  style?: React.CSSProperties;
  iconColor?: string;
  variant?:
    | "nav"
    | "outline"
    | "default"
    | "destructive"
    | "secondary"
    | "ghost"
    | "link"
    | "inherit";
}

export default function UserButtonDesktop({
  session,
  className,
  variant,
  style,
  iconColor,
}: UserButtonDesktopProps) {
  const { theme } = useTheme();

  console.log(iconColor === undefined);

  if (session) {
    return (
      <div className={cn(className)}>
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="text-foreground"
            style={style}
          >
            <Button variant={variant} className="w-42 h-full">
              <Avatar className="size-8">
                {session.user.image && (
                  <AvatarImage
                    src={session.user.image}
                    alt={session.user.name || "Name not available"}
                  />
                )}
                <AvatarFallback className="size-full border text-3xl">
                  <AccountCircleIcon
                    fontSize="inherit"
                    htmlColor={
                      theme === "dark"
                        ? "#fff"
                        : iconColor
                          ? iconColor
                          : "#00a6fa"
                    }
                  />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-2 rounded-xl border border-border/30 shadow-xl sm:w-64">
            <DropdownMenuLabel className="flex w-full items-center justify-center gap-4">
              <Avatar className="size-12 border shadow-md">
                {session.user.image && (
                  <AvatarImage
                    src={session.user.image}
                    alt={session.user.name || "Name not available"}
                  />
                )}
                <AvatarFallback className="size-32 rounded-none">
                  No Image
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xl">{session.user.name || "No Name"}</p>
                <p>{session.user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="flex size-full hover:cursor-pointer"
                asChild
              >
                <Link
                  className="flex h-[48px] w-full items-center justify-evenly"
                  href="/profile"
                >
                  <p>Account</p>
                  <UserIcon />
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <SignOutButton className="flex h-[48px] w-full justify-evenly hover:cursor-pointer" />
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <Button variant="nav" className={cn(className, "h-full")}>
      <Link
        href={"/auth/login"}
        className="flex h-full flex-row items-center gap-2 font-bold"
      >
        <LockIcon className="text-foregroundNav" />
        <p className="text-foregroundNav">Log In</p>
      </Link>
    </Button>
  );
}
