import { cn } from "@/lib/utils";
import { ModeToggle } from "../mode-toggle";
import UserButtonDesktop from "./user-button-desktop";
import { Session } from "next-auth";
import Link from "next/link";
import { Button } from "@components/ui/button";

interface NavItemsMRightProps {
  session?: Session | null;
  className?: string;
}

function NavItemsRight({ className, session }: NavItemsMRightProps) {
  return (
    <div className={cn(className, "mr-1 hidden h-full items-center sm:flex")}>
      <Link href={`/chat`} className="h-full">
        <Button variant="nav" className="hidden size-full sm:flex">
          <p className="text-sm">SipeAI</p>
        </Button>
      </Link>
      <ModeToggle />
      <UserButtonDesktop session={session} className="h-full" variant="nav" />
    </div>
  );
}
export default NavItemsRight;
