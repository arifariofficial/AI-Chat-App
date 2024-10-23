"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Session } from "next-auth";
import { EmptyScreen } from "./empty-screen";
import { ChatPanel } from "./chat-panel";
import { useAIState, useUIState } from "ai/rsc";
import { useLocalStorage } from "@lib/hooks/use-local-storage";
import { useScrollAnchor } from "@lib/hooks/use-scroll-anchor";
import { Message } from "@lib/types";
import { useChats } from "@lib/hooks/useChats";
import { ChatList } from "./chat-list";

export interface ChatProps extends React.ComponentProps<"div"> {
  initialMessages?: Message[];
  id?: string;
  session?: Session;
}

function Chat({ id, session }: ChatProps) {
  const router = useRouter();
  const path = usePathname();
  const [input, setInput] = useState("");
  const [messages] = useUIState();
  const [aiState] = useAIState();
  const [, setNewChatId] = useLocalStorage("newChatId", id);
  const { loadChats } = useChats();

  useEffect(() => {
    if (session?.user) {
      if (!path.includes("/chat/") && messages.length === 1) {
        window.history.replaceState({}, "/chat", `/chat/${id}`);
      }
    }
  }, [id, path, session?.user, messages.length]);

  useEffect(() => {
    if (aiState.messages?.length === 2 && session?.user?.id) {
      loadChats(session.user.id);
    }
  }, [aiState.messages, router, session?.user?.id]);

  useEffect(() => {
    setNewChatId(id);
    console.log("chatid", id);
  }, [id, setNewChatId]);

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor();

  return (
    <div className="mx-auto flex size-full max-w-screen-md" ref={scrollRef}>
      <div className="mx-auto flex size-full flex-col" ref={messagesRef}>
        <div className="relative flex size-full">
          {messages?.length ? (
            <ChatList messages={messages} className="" />
          ) : (
            <EmptyScreen />
          )}
        </div>
        <div className="h-px w-full" ref={visibilityRef} />
        <div className="flex w-full">
          <ChatPanel
            input={input}
            setInput={setInput}
            isAtBottom={isAtBottom}
            scrollToBottom={scrollToBottom}
            className=""
          />
        </div>
      </div>
    </div>
  );
}
export default Chat;
