import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { AI } from "@/lib/chat/actions";
import { Session } from "next-auth";
import { getChat } from "@data/get-chat";

import Chat from "@components/chat/chat";

export interface ChatPageProps {
  params: {
    id: string;
  };
}

export default async function ChatPage({ params }: ChatPageProps) {
  const session = (await auth()) as Session;

  if (!session?.user) {
    redirect(`/auth/login?next=/chat/${params.id}`);
  }

  const userId = session.user.id as string;
  const chat = await getChat(params.id, userId);

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
