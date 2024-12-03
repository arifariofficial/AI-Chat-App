import { auth } from "@/auth";
import Chat from "@/components/chat/chat";
import { AI } from "@/lib/chat/actions";
import { nanoid } from "nanoid";
import { Metadata } from "next";
import { Session } from "next-auth";

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

  return (
    <AI initialAIState={{ chatId: chatId, messages: [] }}>
      <Chat chatId={chatId} session={session} />
    </AI>
  );
}
