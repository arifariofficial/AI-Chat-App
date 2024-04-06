"use client";

import ChatDisplay from "@components/ChatDisplay";
import ChatInput from "@components/ChatInput";
import { useEffect, useState } from "react";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { signIn, useSession } from "next-auth/react";

interface Message {
  author: string;
  text: string;
}

export default function Page() {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const loading = status === "loading";

  useEffect(() => {
    if (!loading && !session) {
      alert("You need to sign in to access this page.");
      signIn();
    }
  }, [session, loading]);

  const handleSendMessage = (newMessage: Message) => {
    setMessages([...messages, newMessage]);
  };

  return (
    <main className="grid h-screen place-content-center">
      <div className=" h-[500px] w-[800px]">
        <ChatDisplay messages={messages} />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </main>
  );
}
