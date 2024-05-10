import Link from "next/link";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import UserButton from "./user-button";
import Balance from "./balance-button";
import { auth } from "@auth";

const NavBar = async () => {
  const session = await auth();
  return (
    <div className="sticky top-0 z-10  rounded-b-md bg-[#344d4d] shadow-md ">
      <nav className="mx-auto flex  h-14 max-w-screen-2xl justify-between">
        <section className="flex items-center">
          <Link href={`/`}>
            <div className="flex gap-2 px-4 text-2xl font-extrabold tracking-wide text-[#F5EFD1]">
              <LocalLibraryIcon fontSize="large" />
              <p className="mt-1">SIPE</p>
            </div>
          </Link>
        </section>
        <section className="mr-2 flex items-center justify-center text-xl font-semibold text-[#F5EFD1] hover:opacity-90 ">
          <div className="flex h-full flex-row items-center p-px">
            {session && <Balance />}
            <UserButton />
          </div>
        </section>
      </nav>
    </div>
  );
};

export default NavBar;
