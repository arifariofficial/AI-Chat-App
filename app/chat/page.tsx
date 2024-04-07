"use client";

import ChatDisplay from "@components/ChatDisplay";
import ChatInput from "@components/ChatInput";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


interface Message {
  author: string;
  text: string;
}

export default function Page() {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);


  const router = useRouter();

  useEffect(() => {
    if (!session) {
      alert("You need to sign in to access this page.");
      router.push("/api/auth/signin");
    }
  }, [session, router]);

  const handleSendMessage = (newMessage: Message) => {
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  return (
    <main className=" container mx-auto flex  max-w-[500px] sm:max-w-[700px] md:max-w-[1000px] items-center justify-center p-4  ">
      <div className="flex w-full flex-col drop-shadow-lg  rounded-3xl border ">
        <ChatDisplay  messages={messages} />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </main>
  );
}
