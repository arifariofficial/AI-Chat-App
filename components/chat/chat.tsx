"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Session } from "next-auth";
import { EmptyScreen } from "./empty-screen";
import { ChatPanel } from "./chat-panel";
import { useAIState, useUIState } from "ai/rsc";
import { toast } from "sonner";
import { useLocalStorage } from "@lib/hooks/use-local-storage";
import { ChatDisplay } from "./chat-display";
import ChatModal from "./chat-modal";
import { useScrollAnchor } from "@lib/hooks/use-scroll-anchor";
import { Message } from "@lib/types";

export interface ChatProps extends React.ComponentProps<"div"> {
  initialMessages?: Message[];
  id?: string;
  session?: Session;
  missingKeys: string[];
}

function Chat({ id, session, missingKeys }: ChatProps) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const [input, setInput] = useState("");
  const [messages] = useUIState();
  const [aiState] = useAIState();

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
      router.refresh();
    }
  }, [aiState.messages, router]);

  useEffect(() => {
    setNewChatId(id);
  }, [id, setNewChatId]);

  useEffect(() => {
    missingKeys.map((key) => {
      toast.error(`Missing ${key} environment variable!`);
    });
  }, [missingKeys]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (!session) {
      timer = setTimeout(() => {
        setShowModal(true);
      }, 400);
    }
    return () => clearTimeout(timer);
  }, [session]);

  const handleModalClose = () => {
    setShowModal(false);
    router.push("/auth/login");
  };

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor();

  // Show modal if user is not logged in
  if (!session) {
    return (
      <ChatModal showModal={showModal} handleModalClose={handleModalClose} />
    );
  }

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
