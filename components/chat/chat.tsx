"use client";

import ChatDisplay from "@components/chat/ChatDisplay";
import ChatInput from "@components/chat/ChatInput";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ChatSkeleton from "@components/skeletons/ChatSkeleton";
<<<<<<< HEAD
=======
import { Button, Typography } from "@mui/material";
>>>>>>> feature/chat

interface Message {
  author: string;
  text: string;
}

export default function Chat() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!session) {
      setTimeout(() => {
        setShowModal(true);
      }, 400);
    }
  }, [session, router]);

  const handleSendMessage = (newMessage: Message) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleModalClose = () => {
    setShowModal(false);
    router.push("/auth/login");
  };

  if (!session) {
    return (
      <main className=" mx-auto flex h-[40vh] max-w-screen-md items-center justify-center md:h-[90vh]">
        <ChatSkeleton />
        {showModal && (
          <div className=" absolute  flex w-full items-center justify-center font-semibold md:mt-auto ">
            <div className=" flex  w-1/2 max-w-[400px] flex-col items-center justify-center rounded-xl border border-gray-300 bg-[#ecfeff] p-4 text-[#F5EFD1] shadow-2xl">
              <p className="p-3 text-[#2e4342]">Please sign in</p>
              <Button sx={{ width: 200 }} onClick={handleModalClose}>
                OK
              </Button>
            </div>
          </div>
        )}
      </main>
    );
  }

  return (
    <>
      <main className="mx-auto mt-16 flex w-full max-w-[500px] items-center justify-center rounded-2xl bg-transparent  sm:max-w-[700px] md:max-w-[1000px]">
        <div className=" flex w-full flex-col rounded-2xl border border-gray-200  bg-transparent shadow-lg">
          <ChatDisplay messages={messages} />
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </main>
    </>
  );
}
