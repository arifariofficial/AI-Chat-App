"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  SecurityIcon,
  SubscriptionIcon,
  UserIcon,
} from "@/components/ui/icons";
import { Locale } from "@/i18n.config";
import { Dictionary } from "@/lib/types";
import { LocalizedRoutes } from "@/lib/localized-routes";

interface NavLinksProps {
  lang: Locale;
  dictionary: Dictionary;
  routes: LocalizedRoutes[Locale];
}

export default function NavLinks({ lang, dictionary, routes }: NavLinksProps) {
  const pathname = usePathname();

  const links = [
    {
      name: dictionary.profile.account.header,
      href: `/${lang}${routes.account}`,
      icon: UserIcon,
    },
    {
      name: dictionary.profile.subscription.header,
      href: `/${lang}${routes.subscription}`,
      icon: SubscriptionIcon,
    },
    {
      name: dictionary.profile.security.header,
      href: `/${lang}${routes.security}`,
      icon: SecurityIcon,
    },
  ];

  return (
    <>
      {links.map((link, index) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={index}
            href={link.href}
            className={clsx(
              "text-md m-px flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-background font-medium text-foreground hover:bg-foreground/10 md:mx-1 md:justify-start md:px-4",
              {
                "overflow-auto bg-foreground/10 text-foreground":
                  pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
