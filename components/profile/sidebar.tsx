import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "@auth";
import NavLinks from "./nav-links";

export default function ProfileSideBar() {
  return (
    <div className="flex h-[calc(100dvh-4rem)] flex-col border-r border-r-border/30 bg-background  sm:h-[calc(100vh-3rem)] md:w-[250px] lg:w-[350px] ">
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
          <button className="hover:bg-background-hover flex h-[48px] w-full grow items-center justify-center gap-2 rounded-sm bg-background p-3 text-sm font-medium text-foreground hover:bg-foreground/10 sm:flex-none sm:justify-start sm:p-2 sm:px-3">
            <LogoutIcon className="w-6" />
            <div className="hidden sm:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
