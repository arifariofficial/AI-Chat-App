import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { AI, UIState, getUIStateFromAIState } from "@/lib/chat/actions";
import { getSharedChat } from "@/data/get-shared-chat";
import { ChatList } from "@/components/chat/chat-list";
type Params = Promise<{ slug: string }>;

export const metadata: Metadata = {
  title: "SipeAI - Keskustelu",
  description: "Oikeudellinen tekoälyassistentti",
  icons: "/favicon.ico",
};

export default async function SharePage(props: { params: Params }) {
  const params = await props.params;

  const chat = await getSharedChat(params.slug);

  if (!chat || !chat?.sharePath) {
    notFound();
  }

  const uiState: UIState = getUIStateFromAIState(chat);

  const aiComponent = await AI({
    children: <ChatList messages={uiState} isShared={true} />,
  });

  return aiComponent;
}
