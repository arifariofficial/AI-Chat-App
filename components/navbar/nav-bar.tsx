import Link from "next/link";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import UserButton from "./user-button";
import Balance from "./balance-button";

import { ModeToggle } from "@components/mode-toggle";
import { Session } from "next-auth";

const NavBar = ({ session }: { session: Session | null }) => {
  return (
    <nav className="sticky top-0 z-50 rounded-b-md border-b border-b-border/20 bg-primary text-foregroundNav">
      <div className="mx-auto flex  h-14 max-w-screen-2xl justify-between">
        <section className="flex items-center">
          <Link href={`/`}>
            <div className="flex gap-2 px-4 text-2xl font-extrabold tracking-wide">
              <LocalLibraryIcon fontSize="large" aria-label="Library Icon" />
              <p className="mt-1">SIPE</p>
            </div>
          </Link>
        </section>
        <section className="mr-1 flex items-center justify-center text-xl font-semibold hover:opacity-90  ">
          <div className="flex h-full flex-row items-center p-px">
            {session?.user && <Balance session={session} />}
            <ModeToggle />
            <UserButton session={session} />
          </div>
        </section>
      </div>
    </nav>
  );
};

export default NavBar;
