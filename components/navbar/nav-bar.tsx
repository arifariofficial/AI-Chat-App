"use client";

import Link from "next/link";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { SidebarMobile } from "@/components/chat/sidebar-mobile";
import { ChatHistory } from "@/components/chat/chat-history";
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
            <div className="flex gap-2 px-4 text-2xl font-extrabold tracking-wide">
              <LocalLibraryIcon fontSize="large" aria-label="Library Icon" />
              <p className="mt-1">SipeAI</p>
            </div>
          </Link>
        </section>
        <NavItemsMiddle />
        <section className="mr-1 flex items-center justify-center text-xl font-semibold hover:opacity-90">
          <div className="flex size-full flex-row items-center p-px">
            <div className="flex size-full items-center justify-center">
              <SidebarMobile className="flex size-full items-center justify-center">
                {session && <ChatHistory session={session} />}
              </SidebarMobile>
            </div>
            <NavItemsRight session={session} />
            <ThemeToggle className="flex size-full sm:hidden" variant="nav" />
            <UserButtonMobile
              session={session}
              className="flex size-full sm:hidden"
            />
          </div>
        </section>
      </div>
    </nav>
  );
};

export default NavBar;
