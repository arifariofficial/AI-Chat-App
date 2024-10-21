import UserButtonDesktop from "@components/navbar/user-button-desktop";
import { cn } from "@lib/utils";
import { Session } from "next-auth";
import Link from "next/link";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

interface ChatNavProps {
  className?: string;
  session: Session;
}

function HomeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const ChatNav = ({ className, session }: ChatNavProps) => {
  return (
    <div className={cn(className, "flex w-full items-center justify-end")}>
      <Link href="/">
        <HomeIcon color="primary" fontSize="large" />
      </Link>
      <UserButtonDesktop
        session={session}
        variant="ghost"
        className="w-30 overflow-hidden hover:bg-none"
      />
    </div>
  );
};
export default ChatNav;
