import Link from "next/link";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import UserButton from "./user-button";
import Balance from "./balance-button";
import { auth } from "@auth";
import { ModeToggle } from "@components/mode-toggle";

const NavBar = async () => {
  const session = await auth();
  return (
    <div className="dark:border-px sticky top-0 z-10 rounded-b-md bg-[#344d4d] text-[#F5EFD1] shadow-md dark:border-b dark:border-white/50 dark:bg-[#0e172b] dark:text-white ">
      <nav className="mx-auto flex  h-14 max-w-screen-2xl justify-between">
        <section className="flex items-center">
          <Link href={`/`}>
            <div className="flex gap-2 px-4 text-2xl font-extrabold tracking-wide dark:text-white/80 ">
              <LocalLibraryIcon fontSize="large" />
              <p className="mt-1">SIPE</p>
            </div>
          </Link>
        </section>
        <section className="mr-2 flex items-center justify-center text-xl font-semibold hover:opacity-90  ">
          <div className="flex h-full flex-row items-center p-px">
            {session && <Balance />}
            <ModeToggle />
            <UserButton />
          </div>
        </section>
      </nav>
    </div>
  );
};

export default NavBar;
