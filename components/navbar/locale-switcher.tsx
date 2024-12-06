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

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={cn(className)}>
        <Button
          variant="nav"
          className="h-full outline-none focus:outline-none focus-visible:outline-none"
          iconRight={<IconGlobe />}
        >
          <p className="text-sm font-bold">{lang.toUpperCase()}</p>
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
              <a href={redirectedPathName(locale)}>
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
