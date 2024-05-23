import { auth } from "@auth";
import Chat from "@components/chat/chat";
import { getMissingKeys } from "@data/chat";
import { AI } from "@lib/chat/actions";
import { nanoid } from "@lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SIPE | Chat",
  description: "Legal AI assistant",
  icons: "/favicon.ico",
};

export default async function ChatPage() {
  const id = nanoid();
  const session = await auth();
  const missingKeys = await getMissingKeys();

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <Chat
        id={id}
        session={session ?? undefined}
        missingKeys={missingKeys}
        initialMessages={[]}
      />
    </AI>
  );
}
