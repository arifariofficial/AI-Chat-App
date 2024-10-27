import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { AI } from "@/lib/chat/actions";
import { Session } from "next-auth";
import { getChat } from "@/data/get-chat";

import Chat from "@/components/chat/chat";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SipeAI - Keskustelu",
  description: "Oikeudellinen tekoälyassistentti",
  icons: "/favicon.ico",
};

type Params = Promise<{ slug: string }>;

export default async function ChatPage(props: { params: Params }) {
  const session = (await auth()) as Session;

  const params = await props.params;
  const id = params.slug;

  if (!session?.user) {
    redirect(`/auth/login?next=/chat/${id}`);
  }

  const userId = session.user.id as string;
  const chat = await getChat(id, userId);

  if (!chat) {
    redirect("/chat");
  }

  if (chat?.userId !== session?.user?.id) {
    notFound();
  }

  return (
    <AI initialAIState={{ chatId: chat.id, messages: chat.messages }}>
      <Chat session={session} />
    </AI>
  );
}
