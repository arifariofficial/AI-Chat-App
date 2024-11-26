import { cn } from "@/lib/utils";
import { ModeToggle } from "../mode-toggle";
import UserButtonDesktop from "./user-button-desktop";
import { Session } from "next-auth";

interface NavItemsMRightProps {
  session?: Session | null;
  className?: string;
}

function NavItemsRight({ className, session }: NavItemsMRightProps) {
  return (
    <div className={cn(className, "mr-1 hidden h-full items-center sm:flex")}>
      <ModeToggle />
      <UserButtonDesktop session={session} className="h-full" variant="nav" />
    </div>
  );
}
export default NavItemsRight;
