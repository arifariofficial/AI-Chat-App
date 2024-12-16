"use client";

import UserButtonDesktop from "@/components/navbar/user-button-desktop";
import { Session } from "next-auth";
import { ThemeToggle } from "@/components/theme-toggle-mobile";
import Link from "next/link";
import { IconEdit, IconHome, IconShareUp } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { SidebarMobile } from "./sidebar-mobile";
import { ChatHistoryMobile } from "./chat-history-mobile";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useSelector } from "react-redux";
import { selectChatStarted } from "@/lib/store/chatSlice";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/store/hook";
import { resetChat } from "@/lib/store/chatSlice";
import { ModelSelection } from "./model-selection";
import { Role } from "@/types";
import { useChat } from "@/lib/hooks/use-chat";
import { Locale } from "@/i18n.config";
import { Dictionary } from "@/lib/types";
import React from "react";

interface ChatNavProps {
  session: Session;
  lang: Locale;
  dictionary: Dictionary;
  setShowPromptModal: (value: boolean) => void;
}

const ChatNav: React.FC<ChatNavProps> = ({
  session,
  setShowPromptModal,
  lang,
  dictionary,
}) => {
  const chatStarted = useSelector(selectChatStarted);
  const { handleShare } = useChat();
  const dispatch = useAppDispatch();
  const params = useParams();
  const chatId = Array.isArray(params?.slug) ? params.slug[0] : params?.slug; // Ensure chatId is a string
  const router = useRouter();

  const onShareClick = () => {
    if (session.user.id && chatId) {
      const userId = session.user.id as string;
      handleShare(chatId, userId);
    }
  };

  return (
    <div className="mb-4 flex h-14 w-full flex-row items-center justify-between">
      <SidebarMobile className="z-50 border-none focus:border-none">
        <ChatHistoryMobile session={session} onShareClick={onShareClick} />
      </SidebarMobile>
      <div className="flex">
        <Tooltip>
          <TooltipTrigger asChild className="hidden sm:flex">
            <Button
              variant="inherit"
              onClick={() => {
                router.push(`/${lang}/new`);
                dispatch(resetChat());
              }}
              className="z-50 my-0 border-border/40 p-0 px-1 font-bold text-foreground hover:bg-accent hover:text-foreground/80 active:text-foreground sm:ml-1 sm:border"
            >
              <div className="flex items-center gap-1">
                <span className="hidden text-sm md:inline-flex">New</span>
                <IconEdit className="my-0 mb-1 size-5 p-0" />
                <span className="sr-only">New chat</span>
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent>New Chat</TooltipContent>
        </Tooltip>
        {/* Model Selection  */}
        {session.user.role === Role.EDITOR && (
          <div className="z-50 ml-1 mr-1 flex w-full justify-center sm:mr-0">
            <ModelSelection setShowPromptModal={setShowPromptModal} />
          </div>
        )}
        {chatStarted && (
          <Tooltip>
            <TooltipTrigger asChild className="hidden sm:flex">
              <Button
                variant="inherit"
                onClick={onShareClick}
                className="z-50 border-border/40 p-0 px-1 font-bold text-foreground hover:bg-accent hover:text-foreground/80 active:text-foreground sm:ml-1 sm:border"
              >
                <div className="flex items-center gap-1">
                  <span className="hidden text-sm md:inline-flex">Share</span>
                  <IconShareUp className="mb-1 size-5 p-0" />
                  <span className="sr-only">Share chat</span>
                </div>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Share chat</TooltipContent>
          </Tooltip>
        )}
      </div>

      <div className="ml-auto hidden items-center sm:inline-flex">
        <Link href="/" style={{ zIndex: 50 }}>
          <Button variant="inherit" className="text-foreground">
            <IconHome className="size-7" />
          </Button>
        </Link>

        <ThemeToggle
          buttonClassName="hidden sm:flex"
          variant="inherit"
          style={{ zIndex: 20 }}
          iconClassName="size-7"
        />
        <UserButtonDesktop
          session={session}
          variant="inherit"
          className="w-30 hidden sm:flex"
          iconColor="#333333"
          style={{ zIndex: 20 }}
          lang={lang}
          dictionary={dictionary}
        />
      </div>
    </div>
  );
};

export default React.memo(ChatNav);
