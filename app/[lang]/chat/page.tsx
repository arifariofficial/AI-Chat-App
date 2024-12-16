//app/[lang]/chat/page.tsx

import { auth } from "@/auth";
import Chat from "@/components/chat/chat";
import { Locale } from "@/i18n.config";
import { AI } from "@/lib/chat/actions";
import { LangProvider } from "@/lib/chat/lang-context";
import { getDictionary } from "@/lib/dictionary";
import { localizedRoutes } from "@/lib/localized-routes";
import { nanoid } from "nanoid";
import { Metadata } from "next";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

// Metadata will be dynamically generated based on the localizedRoutes
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const dictionary = await getDictionary(lang);

  return {
    title: `SipeAI - ${dictionary.chatPage.header}`,
    description: `${dictionary.chatPage.description}`,
    icons: "/favicon.ico",
  };
}

export default async function ChatPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const chatId = nanoid();
  const session = (await auth()) as Session;
  const lang = (await params).lang;

  const routes = localizedRoutes[lang];

  if (!session?.user) {
    redirect(`/${lang}${routes.auth.signIn}?next=/${lang}${routes.chat}`);
  }

  // Await the AI component logic
  const aiComponent = await AI({
    initialAIState: { chatId, messages: [] },
    children: <Chat chatId={chatId} session={session} lang={lang} />,
  });

  // Wrap the awaited result in LangProvider
  return <LangProvider lang={lang}>{aiComponent}</LangProvider>;
}
