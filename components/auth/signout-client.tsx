"use client";

import { signOut } from "next-auth/react";
import LogoutIcon from "@mui/icons-material/Logout";
import { cn } from "@/lib/utils";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Dictionary } from "@/lib/types";
import { Locale } from "@/i18n.config";
import { LocalizedRoutes } from "@/lib/localized-routes";

interface SignOutButtonProps {
  className?: string;
  dictionary: Dictionary;
  lang: Locale;
  routes: LocalizedRoutes[Locale];
}

const SignOutButton = ({
  className,
  dictionary,
  lang,
  routes,
}: SignOutButtonProps) => {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: `/${lang}${routes.auth.signOut}` });
  };

  return (
    <DropdownMenuItem onClick={handleSignOut} className={cn(className)}>
      <p>{dictionary?.auth.signout}</p>
      <LogoutIcon />
    </DropdownMenuItem>
  );
};

export default SignOutButton;
