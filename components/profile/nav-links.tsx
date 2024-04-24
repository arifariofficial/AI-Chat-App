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
    name: "Subscription",
    href: "/profile/subscription",
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
              "m-1 flex h-[48px] grow items-center justify-center gap-2 rounded-sm  text-sm font-medium hover:bg-gray-200 hover:text-gray-600 sm:mx-3 sm:flex-none sm:justify-start  sm:px-4",
              { "bg-gray-200 text-gray-600": pathname === link.href },
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
