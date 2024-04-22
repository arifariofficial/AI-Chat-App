"use client";

import ChatDisplay from "@components/chat/ChatDisplay";
import ChatInput from "@components/chat/ChatInput";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ChatSkeleton from "@components/skeletons/ChatSkeleton";
import { Metadata } from "next";

interface Message {
  author: string;
  text: string;
}

export default function Chat() {
  const session = useSession();
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

  const metadata = {
    title: "SIPE | Chat",
    description: "Chat with the AI assistant.",
    icons: "/favicon.ico",
  };

  const handleModalClose = () => {
    setShowModal(false);
    router.push("/auth/login");
  };

  if (!session) {
    return (
      <main className=" w-responsive mx-auto flex h-[40vh] max-w-screen-md items-center justify-center md:h-[90vh]">
        <ChatSkeleton />
        {showModal && (
          <div className=" left-50 absolute  flex w-full items-center justify-center font-semibold md:mt-auto ">
            <div className="border-bg-[#2e4342] flex  w-[50%] max-w-[400px] flex-col items-center justify-center rounded-xl border border-gray-300 bg-[#ecfeff] p-4 text-[#F5EFD1] shadow-2xl">
              <p className="p-3 text-[#2e4342]">Please sign in</p>
              <button
                className="m-2 flex  w-[100px] max-w-[200px] cursor-pointer items-center justify-center  rounded-md bg-gray-600 p-2 text-sm shadow-xl hover:bg-gray-700 hover:shadow-2xl active:bg-gray-500 md:w-[300px]"
                onClick={handleModalClose}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </main>
    );
  }

  return (
    <>
      <main className="mx-auto mt-12  flex w-full max-w-[500px] items-center justify-center p-4 sm:max-w-[700px] md:max-w-[1000px]">
        <div className=" flex w-full flex-col rounded-lg border border-gray-400  drop-shadow-2xl">
          <ChatDisplay messages={messages} />
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </main>
    </>
  );
}
