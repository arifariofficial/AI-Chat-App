"use client";

import { i18n, Locale } from "@/i18n.config";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { IconGlobe } from "../ui/icons";
import { Dictionary } from "@/lib/types";
import { findRouteKeyFromPath, getLocalizedPath } from "@/lib/locale-utils";

export function LocaleSwitcher({
  className,
  lang,
  dictionary,
}: {
  className?: string;
  lang: Locale;
  dictionary: Dictionary;
}) {
  const pathName = usePathname();

  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return "/";

    // Find the route key for the current path
    const routeKey = findRouteKeyFromPath(pathName, lang);

    // If a valid route key is found, generate the localized path
    if (routeKey) {
      return `/${locale}${getLocalizedPath(locale, routeKey)}`;
    }

    // Default to the homepage if no valid route key is found
    return `/${locale}`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={cn(className)}>
        <Button
          variant="nav"
          className="flex h-full items-center justify-center outline-none focus:outline-none focus-visible:outline-none"
          iconRight={<IconGlobe className="size-6" />}
        >
          <p className="text-xl font-bold">{lang.toUpperCase()}</p>
          <span className="sr-only">Switch Locale</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="w-36 border border-border/30"
      >
        {i18n.locales.map((locale, index) => (
          <div key={locale}>
            <DropdownMenuItem
              className="flex w-full items-center justify-evenly hover:cursor-pointer"
              asChild
            >
              <a href={redirectedPathName(locale as Locale)}>
                <p>{dictionary.language[locale]}</p>
              </a>
            </DropdownMenuItem>
            {index < i18n.locales.length - 1 && <DropdownMenuSeparator />}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
