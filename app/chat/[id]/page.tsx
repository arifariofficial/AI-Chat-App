import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { AI } from "@/lib/chat/actions";
import { Session } from "next-auth";
import Chat from "@components/chat/chat";
import { getChat } from "@data/get-chat";
import { getMissingKeys } from "@data/chat";

export interface ChatPageProps {
  params: {
    id: string;
  };
}

export default async function ChatPage({ params }: ChatPageProps) {
  const session = (await auth()) as Session;
  const missingKeys = await getMissingKeys();

  if (!session?.user) {
    redirect(`/login?next=/chat/${params.id}`);
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
      <Chat
        id={chat.id}
        session={session}
        initialMessages={chat.messages}
        missingKeys={missingKeys}
      />
    </AI>
  );
}
