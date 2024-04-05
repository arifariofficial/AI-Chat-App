"use client";

import ChatDisplay from "@components/ChatDisplay";
import ChatInput from "@components/ChatInput";
import { useState } from "react";

interface Message {
  author: string;
  text: string;
}

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([]);

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
