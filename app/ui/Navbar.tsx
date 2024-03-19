import Link from "next/link";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

const Nav = () => {
  return (
    <div className="sticky top-0 bg-[#2d4242]">
      <nav className="page-max-width">
        <section>
          <Link href={`/`}>
            <h1 className="text-[#F5EFD1] font-extrabold text-2xl p-4 font-satoshi tracking-wide flex">
              <div className="px-1 ">
                <LocalLibraryIcon fontSize="large" />
              </div>
              SIPE
            </h1>
          </Link>
        </section>
      </nav>
    </div>
  );
};

export default Nav;
