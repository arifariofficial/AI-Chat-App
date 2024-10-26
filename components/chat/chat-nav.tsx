import UserButtonDesktop from "@/components/navbar/user-button-desktop";
import { Session } from "next-auth";
import { useTheme } from "next-themes";
import { ThemeToggle } from "@/components/theme-toggle-mobile";
import Link from "next/link";
import { IconHome } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ChatNavProps {
  session: Session;
}

const ChatNav = ({ session }: ChatNavProps) => {
  const { theme } = useTheme();

  return (
    <div className="ml-auto inline-flex items-center">
      <Link href="/" style={{ zIndex: 20 }} className="m-4 sm:m-0">
        <Button variant="inherit" className="text-foreground">
          <IconHome
            className={cn(
              theme === "light" ? "text-inherit" : "text-foreground",
              "size-7",
            )}
          />
        </Button>
      </Link>
      <ThemeToggle
        className="ml-1 hidden size-10 sm:flex"
        variant="inherit"
        style={{ zIndex: 20 }}
        iconClassName={cn(
          theme === "light" ? "text-inherit font-extrabold bg-inherit " : "",
          "size-9 z-40",
        )}
      />
      <UserButtonDesktop
        session={session}
        variant="inherit"
        className="w-30 hidden sm:flex"
        iconColor="#333333"
        style={{ zIndex: 20 }}
      />
    </div>
  );
};
export default ChatNav;
