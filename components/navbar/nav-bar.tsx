import Link from "next/link";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import UserButton from "./user-button";
import Balance from "./balance-button";
import { auth } from "@auth";
import { ModeToggle } from "@components/mode-toggle";

const NavBar = async () => {
  const session = await auth();
  return (
    <nav className="sticky top-0 z-10 rounded-b-md border-b border-b-border/20 bg-primary text-primary-foreground shadow-md">
      <div className="mx-auto flex  h-14 max-w-screen-2xl justify-between">
        <section className="flex items-center">
          <Link href={`/`}>
            <div className="flex gap-2 px-4 text-2xl font-extrabold tracking-wide dark:text-white/80 ">
              <LocalLibraryIcon fontSize="large" />
              <p className="mt-1">SIPE</p>
            </div>
          </Link>
        </section>
        <section className="mr-1 flex items-center justify-center text-xl font-semibold hover:opacity-90  ">
          <div className="flex h-full flex-row items-center p-px">
            {session && <Balance />}
            <ModeToggle />
            <UserButton />
          </div>
        </section>
      </div>
    </nav>
  );
};

export default NavBar;
