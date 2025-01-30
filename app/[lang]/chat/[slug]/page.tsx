//app/[lang]/chat/[slug]/page.tsx

import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { AI } from "@/lib/chat/actions";
import { Session } from "next-auth";
import { getChat } from "@/data/get-chat";

import Chat from "@/components/chat/chat";
import { Metadata } from "next";
import { Locale } from "@/i18n.config";
import { localizedRoutes } from "@/lib/localized-routes";

export const metadata: Metadata = {
  title: "SipeAI - Keskustelu",
  description: "Oikeudellinen tekoälyassistentti",
  icons: "/favicon.ico",
};

type Params = Promise<{ slug: string; lang: Locale }>;

export default async function ChatPage(props: { params: Params }) {
  const session = (await auth()) as Session;

  const { slug, lang } = await props.params;

  const routes = localizedRoutes[lang];

  const id = slug;

  if (!session?.user) {
    redirect(`/${lang}${routes.auth.signIn}?next=/${lang}${routes.chat}${id}`);
  }

  const userId = session.user.id as string;

  const chat = await getChat(id, userId);

  if (!chat) {
    redirect(`/${lang}${routes.chat}`);
  }

  if (chat?.userId !== session?.user?.id) {
    notFound();
  }

  // Await the AI component logic
  const aiComponent = await AI({
    initialAIState: { chatId: chat.id, messages: chat.messages },
    children: <Chat session={session} lang={lang} />,
  });

  return aiComponent;
}
