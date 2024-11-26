"use client";

import Link from "next/link";
import UserButtonMobile from "./user-button-mobile";
import NavItemsRight from "./nav-items-right";
import NavItemsMiddle from "./nav-items-middle";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle-mobile";

interface NavBarProps {
  session?: Session | null;
}

const NavBar = ({ session }: NavBarProps) => {
  const pathname = usePathname();

  if (pathname.startsWith("/chat") || pathname.startsWith("/new")) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 rounded-b-md border-b border-b-border/20 bg-navBarGradient-light dark:bg-navBarGradient-dark">
      <div className="mx-auto flex h-[60px] max-w-screen-2xl justify-between sm:h-[80px]">
        <section className="flex items-center text-foregroundNav">
          <Link href={`/`}>
            <div className="mx-4 flex">
              <p className="inline-flex items-end text-3xl font-bold">
                <span>SIPE</span>
                <span className="align-baseline text-base font-light">AI</span>
              </p>
            </div>
          </Link>
        </section>
        <NavItemsMiddle />
        <section className="mr-1 flex items-center justify-center text-xl font-semibold hover:opacity-90">
          <div className="flex size-full flex-row items-center p-px">
            <NavItemsRight session={session} />
            <ThemeToggle
              buttonClassName="text-foregroundNav hover:opacity-90 sm:hidden flex"
              variant="inherit"
            />
            <UserButtonMobile
              session={session}
              className="flex size-full sm:hidden"
              buttonClassName="h-full text-foregroundNav hover:opacity-90"
              variant="inherit"
            />
          </div>
        </section>
      </div>
    </nav>
  );
};

export default NavBar;
