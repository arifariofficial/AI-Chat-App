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
import { Locale } from "@/i18n.config";
import { localizedRoutes } from "@/lib/localized-routes";

import { Dictionary } from "@/lib/types";

interface UserButtonDesktopProps {
  session?: Session | null;
  className?: string;
  style?: React.CSSProperties;
  iconColor?: string;
  lang: Locale;
  dictionary: Dictionary;
  variant?:
    | "nav"
    | "outline"
    | "default"
    | "destructive"
    | "ghost"
    | "link"
    | "inherit"
    | "black"
    | "navMobile";
}

export default function UserButtonDesktop({
  session,
  className,
  variant,
  style,
  iconColor,
  lang,
  dictionary,
}: UserButtonDesktopProps) {
  const { theme } = useTheme();
  const routes = localizedRoutes[lang];

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
                    alt={session.user.name || dictionary.image.imageAlt}
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
                    alt={session.user.name || dictionary.image.imageAlt}
                  />
                )}
                <AvatarFallback className="size-32 rounded-none">
                  {dictionary.image.imageError}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xl">
                  {session.user.name || dictionary.userButton.noName}
                </p>
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
                  className="flex h-[48px] w-full items-center justify-between px-8"
                  href={`/${lang}${routes.account}`}
                >
                  <p>{dictionary.userButton.account}</p>
                  <UserIcon />
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <SignOutButton
                className="flex h-[48px] w-full justify-between px-8 hover:cursor-pointer"
                dictionary={dictionary}
              />
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <Button variant="nav" className={cn(className, "h-full")}>
      <Link
        href={`/${lang}${routes.auth.signIn}`}
        className="flex h-full flex-row items-center gap-2 font-bold"
      >
        <LockIcon />
        <p className="text-lg">{dictionary.auth.signin}</p>
      </Link>
    </Button>
  );
}
