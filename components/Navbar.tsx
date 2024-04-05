import Link from "next/link";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

const Nav = () => {
  return (
    <div className="sticky top-0 bg-[#2d4242]">
      <nav className="page-max-width flex justify-between">
        <section>
          <Link href={`/`}>
            <h1 className="flex p-4 font-satoshi text-2xl font-extrabold tracking-wide text-[#F5EFD1]">
              <div className="px-1 ">
                <LocalLibraryIcon fontSize="large" />
              </div>
              SIPE
            </h1>
          </Link>
        </section>
        <section className="flex items-center text-xl font-semibold text-[#F5EFD1] hover:opacity-90">
          <Link href={`/signup`} className="px-3">
            Sign up
          </Link>
        </section>
      </nav>
    </div>
  );
};

export default Nav;
