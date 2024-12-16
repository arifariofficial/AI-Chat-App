"use client";

import { i18n, Locale } from "@/i18n.config";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { IconGlobe } from "../ui/icons";
import { Dictionary } from "@/lib/types";
import { findRouteKeyFromPath, getLocalizedPath } from "@/lib/locale-utils";
import Link from "next/link";

interface LocaleSwitcherMobileProps {
  className?: string;
  lang: Locale;
  dictionary: Dictionary;
}

export function LocaleSwitcherMobile({
  className,
  lang,
  dictionary,
}: LocaleSwitcherMobileProps) {
  const pathName = usePathname();

  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return "/";

    const routeKey = findRouteKeyFromPath(pathName, lang);

    if (routeKey) {
      return `/${locale}${getLocalizedPath(locale, routeKey)}`;
    }

    return `/${locale}`;
  };

  return (
    <Accordion
      type="single"
      collapsible
      className={cn("rounded-md border border-border/20", className)}
    >
      <AccordionItem value="localeSwitcherMobile" className="border-none">
        <AccordionTrigger
          className={cn(
            "h-[60px] w-full rounded-md hover:bg-inherit hover:text-foreground hover:no-underline",
          )}
          hideChevron={true}
        >
          <Button
            asChild
            spanClassName="border"
            variant="navMobile"
            iconRight={<IconGlobe className="size-6" />}
            className="flex w-full justify-between border-none px-7 outline-none focus:bg-transparent focus:outline-none focus:ring-0"
          >
            <p className="text-2xl font-bold">{lang.toUpperCase()}</p>
          </Button>
        </AccordionTrigger>
        <AccordionContent className="border-none">
          <div className="flex flex-col space-y-2 border-t border-border/20 p-4">
            {i18n.locales.map((locale) => (
              <Button
                key={locale}
                asChild
                variant={lang === locale ? "black" : "outline"}
                className="flex w-full items-center"
              >
                <Link
                  href={redirectedPathName(locale as Locale)}
                  className="mx-auto w-full text-center"
                >
                  {dictionary.language[locale]}
                </Link>
              </Button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
