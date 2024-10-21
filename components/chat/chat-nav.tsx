import UserButtonDesktop from "@components/navbar/user-button-desktop";
import { Session } from "next-auth";
import { useTheme } from "next-themes";
import { ThemeToggle } from "@components/theme-toggle-mobile";
import Link from "next/link";
import { IconHome } from "@components/ui/icons";

interface ChatNavProps {
  session: Session;
}

const ChatNav = ({ session }: ChatNavProps) => {
  const { theme } = useTheme();

  return (
    <div className="ml-auto inline-flex items-center">
      <Link href="/" style={{ zIndex: 10 }}>
        <IconHome className="size-7 text-primary" />
      </Link>
      <ThemeToggle
        className="w-10 bg-backgroundSecondary pr-2"
        variant="ghost"
        iconClassName={theme === "light" ? "text-primary font-extrabold" : ""}
      />
      <UserButtonDesktop session={session} variant="ghost" className="w-30" />
    </div>
  );
};
export default ChatNav;
