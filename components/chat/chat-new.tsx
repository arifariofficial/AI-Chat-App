"use client";

import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { useAIState, useUIState } from "ai/rsc";
import { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { EmptyScreen } from "./empty-screen";
import { ChatPanel } from "./chat-panel";
import { ChatDisplay } from "./chat-display";

export interface ChatProps extends React.ComponentProps<"div"> {
  id?: string;
  session?: Session;
  missingKeys: string[];
}

function Chat({ id, session, missingKeys }: ChatProps) {
  const router = useRouter();
  const path = usePathname();
  const [input, setInput] = useState("");
  const [messages] = useUIState();
  const [aiState] = useAIState();

  const [, setNewChatId] = useLocalStorage("newChatId", id);

  useEffect(() => {
    if (session?.user) {
      if (!path.includes("chat") && messages.length === 1) {
        window.history.replaceState({}, "", `/chat/${id}`);
      }
    }
  }, [id, path, session?.user, messages]);

  useEffect(() => {
    const messagesLength = aiState.messages?.length;
    if (messagesLength === 2) {
      router.refresh();
    }
  }, [aiState.messages, router]);

  useEffect(() => {
    setNewChatId(id);
  });

  useEffect(() => {
    missingKeys.map((key) => {
      toast.error(`Missing ${key} environment variable!`);
    });
  }, [missingKeys]);

  return (
    <div className="absolute inset-x-0 top-0 mx-auto flex h-[calc(100vh-63px)] w-screen max-w-screen-md">
      <div className="relative mx-auto flex size-full flex-col items-center">
        {messages.length ? (
          <ChatDisplay messages={messages} />
        ) : (
          <EmptyScreen />
        )}
        <div className="h-px w-full" />
      </div>
      <ChatPanel id={id} input={input} setInput={setInput} />
    </div>
  );
}
export default Chat;
