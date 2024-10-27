import UserButtonDesktop from "@/components/navbar/user-button-desktop";
import { Session } from "next-auth";
import { useTheme } from "next-themes";
import { ThemeToggle } from "@/components/theme-toggle-mobile";
import Link from "next/link";
import { IconHome, IconPlus } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import MyButton from "../my-button";
import { useRouter } from "next/navigation";
import { SidebarMobile } from "./sidebar-mobile";
import { ChatHistoryMobile } from "./chat-history-mobile";

interface ChatNavProps {
  session: Session;
}

const ChatNav = ({ session }: ChatNavProps) => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <div className="flex w-full flex-row items-center justify-between">
      <SidebarMobile className="z-50">
        <ChatHistoryMobile session={session} buttonClassName="mr-20" />
      </SidebarMobile>
      <div className="ml-auto inline-flex items-center">
        <MyButton
          variant="outline"
          tooltipText="Uusi keskustelu"
          className="flex size-6 border-2 border-foreground p-1 dark:border-white sm:hidden"
          onClick={() => {
            router.push("/new");
          }}
        >
          <IconPlus />
        </MyButton>
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
          buttonClassName="ml-1 hidden size-10 sm:flex"
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
    </div>
  );
};
export default ChatNav;
