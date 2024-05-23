import { auth } from "@/auth";
import { Sidebar } from "./sidebar";
import { ChatHistory } from "./chat-history";

export async function SidebarDesktop() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  return (
    <Sidebar className="peer absolute inset-y-0 z-30  -translate-x-full border-r bg-muted duration-300 ease-in-out data-[state=open]:translate-x-0 sm:flex">
      <ChatHistory userId={session.user.id} />
      <SidebarDesktop />
    </Sidebar>
  );
}
