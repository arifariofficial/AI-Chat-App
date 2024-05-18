"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { SecurityIcon, SubscriptionIcon, UserIcon } from "@components/ui/icons";

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
              " m-px flex h-[48px] grow items-center justify-center gap-2 rounded-sm bg-background text-sm font-medium text-foreground hover:bg-foreground/10 sm:mx-1 sm:justify-start  sm:px-4",
              {
                "bg-foreground/10 text-foreground": pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden sm:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
