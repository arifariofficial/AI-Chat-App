import { auth } from "@/auth";
import Chat from "@/components/chat/chat";
import { AI } from "@/lib/chat/actions";
import { nanoid } from "nanoid";
import { Metadata } from "next";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "SipeAI - Keskustelu",
  description: "Oikeudellinen tekoälyassistentti",
  icons: "/favicon.ico",
};

export default async function ChatPage() {
  const chatId = nanoid();
  const session = (await auth()) as Session;

  if (!session?.user) {
    redirect(`/auth/login?next=/chat/`);
  }

  return (
    <AI initialAIState={{ chatId: chatId, messages: [] }}>
      <Chat chatId={chatId} session={session} />
    </AI>
  );
}
