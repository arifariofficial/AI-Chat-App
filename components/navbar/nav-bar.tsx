"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import NavItemsRight from "./nav-items-right";
import NavItemsMiddle from "./nav-items-middle";
import { Locale } from "@/i18n.config";
import { Dictionary } from "@/lib/types";
import { Session } from "next-auth";
import { cn } from "@/lib/utils";
import { Roboto } from "next/font/google";
import { LocalizedRoutes } from "@/lib/localized-routes";
import HamburgerButton from "./hamburger-button";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

interface NavBarProps {
  session?: Session | null;
  lang: Locale;
  dictionary: Dictionary;
  routes: LocalizedRoutes[Locale];
}

const NavBar: React.FC<NavBarProps> = ({
  session = null,
  lang,
  dictionary,
  routes,
}) => {
  const pathname = usePathname();

  // Define paths to hide the navbar
  const hiddenPaths = [`/${lang}/chat`, `/${lang}/new`];
  if (hiddenPaths.some((path) => pathname.startsWith(path))) {
    return null;
  }

  return (
    <nav
      className={cn(
        roboto.className,
        "sticky top-0 z-50 rounded-b-md border-b bg-primary",
      )}
    >
      <div className="mx-auto flex h-[60px] max-w-screen-2xl justify-between sm:h-[80px]">
        {/* Logo Section */}
        <section className="flex items-center">
          <Link href="/" aria-label="Home">
            <div className="mx-4 flex w-[100px]">
              <Image
                src="/assets/Logo-main.svg"
                alt="Logo"
                width={120}
                height={100}
                priority
              />
            </div>
          </Link>
        </section>

        {/* Middle Nav Items */}
        <NavItemsMiddle lang={lang} dictionary={dictionary} />

        {/* Right Nav Items */}
        <section className="mr-1 flex items-center justify-center text-xl font-semibold hover:opacity-90">
          <div className="flex h-full flex-row items-center p-px">
            <NavItemsRight
              session={session}
              lang={lang}
              dictionary={dictionary}
            />
            <HamburgerButton
              variant="nav"
              session={session}
              className="flex size-full sm:hidden"
              buttonClassName="h-full text-foregroundNav hover:opacity-90"
              lang={lang}
              dictionary={dictionary}
              routes={routes}
            />
          </div>
        </section>
      </div>
    </nav>
  );
};

export default NavBar;
