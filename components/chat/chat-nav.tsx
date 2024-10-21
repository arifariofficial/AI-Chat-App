import UserButtonDesktop from "@components/navbar/user-button-desktop";
import { cn } from "@lib/utils";
import { Session } from "next-auth";

interface ChatNavProps {
  className?: string;
  session: Session;
}

const ChatNav = ({ className, session }: ChatNavProps) => {
  return (
    <div className={cn(className, "flex w-full justify-end overflow-auto")}>
      <UserButtonDesktop session={session} className="w-30 overflow-hidden" />
    </div>
  );
};
export default ChatNav;
