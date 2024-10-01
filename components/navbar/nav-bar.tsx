import Link from "next/link";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import Balance from "./balance-button";
import { ModeToggle } from "@components/mode-toggle";
import { SidebarMobile } from "@components/chat/sidebar-mobile";
import { ChatHistory } from "@components/chat/chat-history";
import { auth } from "@auth";
import UserButtonDesktop from "./user-button-desktop";
import UserButtonMobile from "./user-button-mobile";
import { Button } from "@components/ui/button";

const NavBar = async () => {
  const session = await auth();

  return (
    <nav className="sticky top-0 z-50 rounded-b-md border-b border-b-border/20 bg-primary text-foregroundNav">
      <div className="mx-auto flex  h-16 max-w-screen-2xl justify-between">
        <section className="flex items-center">
          <Link href={`/`}>
            <div className="flex gap-2 px-4 text-2xl font-extrabold tracking-wide">
              <LocalLibraryIcon fontSize="large" aria-label="Library Icon" />
              <p className="mt-1">SIPE</p>
            </div>
          </Link>
          {session && (
            <Balance
              session={session}
              className="flex size-full items-center justify-center"
            />
          )}
        </section>
        <section className="mr-1 flex items-center justify-center text-xl font-semibold hover:opacity-90  ">
          <div className="flex size-full flex-row items-center p-px">
            <div className="flex size-full items-center justify-center">
              <SidebarMobile className="flex size-full items-center justify-center">
                <ChatHistory session={session} />
              </SidebarMobile>
            </div>
            <Link href={`/about`} className="size-full">
              <Button variant="nav" className="hidden size-full sm:flex">
                <p className="text-sm">About</p>
              </Button>
            </Link>
            <div className="hidden size-full sm:flex">
              <ModeToggle />
            </div>
            <UserButtonDesktop
              session={session}
              className="hidden size-full sm:flex"
            />
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
