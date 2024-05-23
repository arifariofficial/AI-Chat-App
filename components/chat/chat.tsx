"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import { EmptyScreen } from "./empty-screen";
import { ChatPanel } from "./chat-panel";
import { useAIState, useUIState } from "ai/rsc";
import { toast } from "sonner";
import { useLocalStorage } from "@lib/hooks/use-local-storage";
import { ChatDisplay } from "./chat-display";
import { Message } from "@lib/types";
import ChatModal from "./chat-modal";

export interface ChatProps extends React.ComponentProps<"div"> {
  id?: string;
  session?: Session;
  initialMessages: Message[];
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

  useEffect(() => {
    const fetchData = async () => {
      await getSession();
    };
    fetchData();
  }, []);

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (!session) {
      timer = setTimeout(() => {
        setShowModal(true);
      }, 400);
    }

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [session]);

  const handleModalClose = () => {
    setShowModal(false);
    router.push("/auth/login");
  };

  // Show modal if user is not logged in
  if (!session) {
    return (
      <ChatModal showModal={showModal} handleModalClose={handleModalClose} />
    );
  }

  return (
    <div className="absolute inset-x-0 top-0 mx-auto flex h-[calc(100vh-63px)] w-screen max-w-screen-md">
      <div className="relative mx-auto flex size-full flex-col items-center">
        {messages.length ? (
          <ChatDisplay messages={messages} />
        ) : (
          <EmptyScreen />
        )}
        <ChatPanel id={id} input={input} setInput={setInput} />
      </div>
    </div>
  );
}
export default Chat;
