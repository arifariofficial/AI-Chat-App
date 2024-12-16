"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import LogoutIcon from "@mui/icons-material/Logout";
import { cn } from "@/lib/utils";
import { Locale } from "@/i18n.config";
import { Dictionary } from "@/lib/types";
import { LocalizedRoutes } from "@/lib/localized-routes";

interface SignOutButtonMobileProps {
  className?: string;
  spanClassName?: string;
  lang: Locale;
  dictionary: Dictionary;
  routes: LocalizedRoutes[Locale];
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

const SignOutButtonMobile = ({
  className,
  spanClassName,
  lang,
  dictionary,
  routes,
}: SignOutButtonMobileProps) => {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: `/${lang}${routes.auth.signOut}` });
  };

  return (
    <Button
      variant="navMobile"
      onClick={handleSignOut}
      className={cn("hover:text-foreground", className)}
      spanClassName={spanClassName}
      iconRight={<LogoutIcon />}
    >
      <p className="text-2xl font-bold">{dictionary.auth.signout}</p>
    </Button>
  );
};

export default SignOutButtonMobile;
