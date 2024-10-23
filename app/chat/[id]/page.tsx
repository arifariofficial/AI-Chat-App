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
  const { id } = await params;

  // Redirect to login if no user is found
  if (!session?.user) {
    return redirect(`/auth/login?next=/chat/${id}`);
  }

  const userId = session.user.id as string;
  const chat = await getChat(id, userId);

  // Redirect if chat is not found
  if (!chat) {
    return redirect("/chat");
  }

  // Ensure the chat belongs to the current user
  if (chat?.userId !== userId) {
    return notFound();
  }

  // Render the AI component and chat UI
  return (
    <AI initialAIState={{ chatId: chat.id, messages: chat.messages }}>
      <Chat session={session} />
    </AI>
  );
}
