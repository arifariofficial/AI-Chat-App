"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import {
  SecurityIcon,
  SubscriptionIcon,
  UserIcon,
} from "@/components/ui/icons";

const links = [
  {
    name: "Account",
    href: "/profile",
    icon: UserIcon,
  },
  {
    name: "Balance",
    href: "/profile/balance",
    icon: SubscriptionIcon,
  },
  { name: "Security", href: "/profile/security", icon: SecurityIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
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
