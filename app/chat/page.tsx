import { auth } from "@/auth";
import Chat from "@/components/chat/chat";
import { AI } from "@/lib/chat/actions";
import { nanoid } from "nanoid";
import { Metadata } from "next";
import { Session } from "next-auth";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "SipeAI - Keskustelu",
  description: "Oikeudellinen tekoälyassistentti",
  icons: "/favicon.ico",
};

export default async function ChatPage() {
  const chatId = nanoid();
  const session = (await auth()) as Session;

  if (!session?.user?.id) {
    throw new Error("User not authenticated.");
  }

  // Save the chat immediately upon initialization
  try {
    await prisma.chat.create({
      data: {
        id: chatId,
        userId: session.user.id,
        createdAt: new Date(),
        title: "New Chat", // Optional: Set a default title
        path: `/chat/${chatId}`, // Add a default path or generate one as needed
      },
    });
    console.log("Chat successfully initialized:", chatId);
  } catch (error) {
    console.error("Error initializing chat:", error);
  }

  console.log("chatid", chatId);

  return (
    <AI initialAIState={{ chatId: chatId, messages: [] }}>
      <Chat id={chatId} session={session} />
    </AI>
  );
}
