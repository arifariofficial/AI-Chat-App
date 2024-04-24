import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "@auth";
import NavLinks from "./nav-links";

export default function ProfileSideBar() {
  return (
    <div className=" flex h-[calc(100vh-4rem)] flex-col border bg-gray-50 sm:w-[250px]">
      <div className="mb-2 mt-8 flex h-full grow flex-col justify-between space-x-2  sm:flex-col sm:space-x-0 ">
        <div>
          <NavLinks />
        </div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-sm p-3 text-sm font-medium  sm:flex-none sm:justify-start sm:p-2 sm:px-3">
            <LogoutIcon className="w-6" />
            <div className="hidden sm:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
