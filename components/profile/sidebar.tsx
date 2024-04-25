import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "@auth";
import NavLinks from "./nav-links";

export default function ProfileSideBar() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col border border-l-transparent bg-gray-50 md:w-[250px] ">
      <div className="mb-2 mt-4 flex h-full grow flex-col justify-between   sm:flex-col ">
        <div>
          <NavLinks />
        </div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
          className="m-px"
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-sm p-3 text-sm font-medium  text-gray-800  hover:bg-gray-200 hover:text-gray-900 sm:flex-none sm:justify-start sm:p-2 sm:px-3">
            <LogoutIcon className="w-6" />
            <div className="hidden sm:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
