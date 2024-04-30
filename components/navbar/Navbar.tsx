import Link from "next/link";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import AuthButton from "./auth-button";
import { Session } from "next-auth";

const NavBar = ({ session }: { session: Session | null }) => {
  return (
    <div className="sticky top-0 z-10  rounded-b-md bg-[#2d4242] shadow-xl ">
      <nav className="mx-auto flex  h-16 max-w-screen-2xl justify-between">
        <section>
          <Link href={`/`}>
            <h1 className="flex p-4 text-2xl font-extrabold tracking-wide text-[#F5EFD1]">
              <div className="px-1 ">
                <LocalLibraryIcon fontSize="large" />
              </div>
              SIPE
            </h1>
          </Link>
        </section>
        <section className="mr-3 flex items-center text-xl font-semibold text-[#F5EFD1] hover:opacity-90">
          <div className="flex flex-col items-center">
            <AuthButton session={session} />
          </div>
        </section>
      </nav>
    </div>
  );
};

export default NavBar;
