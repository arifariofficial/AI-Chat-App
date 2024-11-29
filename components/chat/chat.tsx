"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Session } from "next-auth";
import { EmptyScreen } from "./empty-screen";
import { ChatPanel } from "./chat-panel";
import { useAIState, useUIState } from "ai/rsc";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { useScrollAnchor } from "@/lib/hooks/use-scroll-anchor";
import { ChatList } from "./chat-list";
import { useAppDispatch } from "@/lib/store/hook";
import { startChat } from "@/lib/store/chatSlice";

export interface ChatProps extends React.ComponentProps<"div"> {
  id?: string;
  session?: Session;
}

const Chat: React.FC<ChatProps> = ({ id = "", session, ...props }) => {
  const path = usePathname();
  const [input, setInput] = useState("");
  const [messages] = useUIState();
  const [aiState] = useAIState();
  const [, setNewChatId] = useLocalStorage("newChatId", id);
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Refresh the page when AI messages reach an even number
  useEffect(() => {
    const messageCount = aiState.messages?.length || 0;
    if (messageCount === 2) {
      router.refresh();
      dispatch(startChat());
    }
  }, [aiState.messages?.length, dispatch, router]); // Only depend on the length of messages

  // Update browser history to the current chat URL if conditions are met
  useEffect(() => {
    if (
      session?.user &&
      id &&
      !path.includes("/chat/") &&
      messages?.length === 1
    ) {
      window.history.replaceState({}, "", `/chat/${id}`);
    }
  }, [id, path, session?.user, messages?.length]);

  // Store the chat ID in local storage when it changes
  useEffect(() => {
    if (id) {
      setNewChatId(id);
    }
  }, [id, setNewChatId]);

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor();

  return (
    <div
      className="relative z-10 mx-auto flex size-full sm:max-w-screen-md lg:max-w-screen-lg"
      ref={scrollRef}
      {...props}
    >
      <div className="mx-auto flex size-full flex-col" ref={messagesRef}>
        <div className="relative flex size-full justify-center">
          {messages?.length ? (
            <ChatList messages={messages} />
          ) : (
            <EmptyScreen />
          )}
        </div>
        <div className="h-px w-full" ref={visibilityRef} />
        {/* Chat Input container */}
        <div className="flex w-full">
          <ChatPanel
            input={input}
            setInput={setInput}
            isAtBottom={isAtBottom}
            scrollToBottom={scrollToBottom}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
