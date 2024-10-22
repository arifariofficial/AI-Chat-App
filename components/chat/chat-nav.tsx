import UserButtonDesktop from "@components/navbar/user-button-desktop";
import { Session } from "next-auth";
import { useTheme } from "next-themes";
import { ThemeToggle } from "@components/theme-toggle-mobile";
import Link from "next/link";
import { IconHome } from "@components/ui/icons";
import { cn } from "@lib/utils";

interface ChatNavProps {
  session: Session;
}

const ChatNav = ({ session }: ChatNavProps) => {
  const { theme } = useTheme();

  return (
    <div className="ml-auto inline-flex items-center">
      <Link href="/" style={{ zIndex: 10 }} className="m-4 sm:m-0">
        <IconHome
          className={cn(
            theme === "light" ? "text-primary" : "text-foreground",
            "size-7",
          )}
        />
      </Link>
      <ThemeToggle
        className="ml-3 hidden size-10 bg-backgroundSecondary sm:flex"
        variant="ghost"
        iconClassName={cn(
          theme === "light" ? "text-primary font-extrabold" : "",
          "size-9",
        )}
      />
      <UserButtonDesktop
        session={session}
        variant="ghost"
        className="w-30 hidden sm:flex"
      />
    </div>
  );
};
export default ChatNav;
