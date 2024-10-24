import { auth } from "@/auth";
import Chat from "@/components/chat/chat";
import { AI } from "@/lib/chat/actions";
import { nanoid } from "nanoid";
import { Metadata } from "next";
import { Session } from "next-auth";

export const metadata: Metadata = {
  title: "SIPE | Chat",
  description: "Legal AI assistant",
  icons: "/favicon.ico",
};

export default async function ChatPage() {
  const id = nanoid();
  const session = (await auth()) as Session;

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <Chat id={id} session={session} />
    </AI>
  );
}
