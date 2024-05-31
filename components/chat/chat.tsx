"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Session } from "next-auth";
import { EmptyScreen } from "./empty-screen";
import { ChatPanel } from "./chat-panel";
import { useAIState, useUIState } from "ai/rsc";
import { useLocalStorage } from "@lib/hooks/use-local-storage";
import { ChatDisplay } from "./chat-display";
import { useScrollAnchor } from "@lib/hooks/use-scroll-anchor";
import { Message } from "@lib/types";
import { useChats } from "@lib/hooks/useChats";

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
  const { loadChats } = useChats();
  const [, setNewChatId] = useLocalStorage("newChatId", id);

  useEffect(() => {
    if (session?.user) {
      if (!path.includes("/chat/") && messages.length === 1) {
        window.history.replaceState({}, "/chat/", `/chat/${id}`);
      }
    }
  }, [id, path, session?.user, messages]);

  useEffect(() => {
    const messagesLength = aiState.messages?.length;
    if (messagesLength === 2) {
      session?.user.id && loadChats(session?.user?.id);
    }
  }, [aiState.messages, loadChats, router, session?.user?.id]);

  useEffect(() => {
    setNewChatId(id);
  }, [id, setNewChatId]);

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor();

  return (
    <div className="mx-auto flex w-full max-w-screen-md" ref={scrollRef}>
      <div
        className="relative mx-auto flex size-full flex-col items-center justify-center overflow-auto"
        ref={messagesRef}
      >
        {messages.length ? (
          <ChatDisplay messages={messages} />
        ) : (
          <EmptyScreen />
        )}
        <div className="h-px w-full" ref={visibilityRef} />
        <ChatPanel
          id={id}
          input={input}
          setInput={setInput}
          isAtBottom={isAtBottom}
          scrollToBottom={scrollToBottom}
        />
      </div>
    </div>
  );
}
export default Chat;
