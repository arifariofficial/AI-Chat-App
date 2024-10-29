import React, { useEffect, useState } from "react";
import UserButtonDesktop from "@/components/navbar/user-button-desktop";
import { Session } from "next-auth";
import { useTheme } from "next-themes";
import { ThemeToggle } from "@/components/theme-toggle-mobile";
import Link from "next/link";
import { IconHome, IconShareUp } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SidebarMobile } from "./sidebar-mobile";
import { ChatHistoryMobile } from "./chat-history-mobile";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useSelector } from "react-redux";
import { selectChatStarted } from "@/lib/store/chatSlice";
import { useChat } from "@/lib/hooks/use-chat";
import { useParams } from "next/navigation";
import { getChat } from "@/data/get-chat";
import { Chat } from "@/lib/types";

interface ChatNavProps {
  session: Session;
}

const ChatNav: React.FC<ChatNavProps> = ({ session }) => {
  const { theme } = useTheme();
  const chatStarted = useSelector(selectChatStarted);
  const { handleShare } = useChat();
  const [chat, setChat] = useState<Chat>();

  const params = useParams();
  const chatId = Array.isArray(params?.slug) ? params.slug[0] : params?.slug; // Ensure chatId is a string

  useEffect(() => {
    (async () => {
      if (chatId && chatId.trim() !== "") {
        const userId = session?.user.id as string;
        const chatData = await getChat(chatId, userId);

        if (chatData) {
          setChat(chatData);
        }
      }
      return;
    })();
  }, [chatId, session]);

  const onShareClick = () => {
    if (chat) {
      handleShare(chat);
    }
  };

  return (
    <div className="mb-4 flex h-14 w-full flex-row items-center justify-between">
      <SidebarMobile className="z-50 border-none focus:border-none">
        <ChatHistoryMobile session={session} onShareClick={onShareClick} />
      </SidebarMobile>

      {chatStarted && (
        <Tooltip>
          <TooltipTrigger asChild className="hidden sm:flex">
            <Button
              variant="inherit"
              onClick={onShareClick}
              className="z-50 my-0 gap-1 border-foreground/40 p-0 px-1 text-foreground hover:bg-accent hover:text-foreground/80 active:text-foreground sm:ml-3 sm:border"
            >
              <div className="flex items-center gap-1">
                <span className="hidden text-sm md:inline-flex">Jaa</span>
                <IconShareUp className="mb-1 size-5 p-0" />
                <span className="sr-only">Jaa keskustelu</span>
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Jaa keskustelu</TooltipContent>
        </Tooltip>
      )}

      <div className="ml-auto inline-flex items-center">
        <Link href="/" style={{ zIndex: 50 }}>
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
            theme === "light" ? "text-inherit font-extrabold bg-inherit" : "",
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

export default React.memo(ChatNav);
