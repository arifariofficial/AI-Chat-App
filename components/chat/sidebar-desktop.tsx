import { Sidebar } from "@/components/chat/sidebar";

import { auth } from "@/auth";
import { ChatHistory } from "@/components/chat/chat-history";

export async function SidebarDesktop() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  return (
    <Sidebar className="peer absolute inset-y-0 z-30 hidden w-[300px] -translate-x-full border-r border-border/20 bg-muted shadow-xl duration-300 ease-in-out data-[state=open]:translate-x-0 sm:block">
      <ChatHistory userId={session.user.id} />
    </Sidebar>
  );
}
