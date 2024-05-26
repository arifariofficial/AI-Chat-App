"use client";

import { Sidebar } from "@/components/chat/sidebar";
import { ChatHistory } from "@/components/chat/chat-history";
import { useSession } from "next-auth/react";
import { Suspense } from "react";

export function SidebarDesktop() {
  const { data: session } = useSession();

  if (!session?.user?.id) {
    return null;
  }

  return (
    <Sidebar className="peer w-full -translate-x-full bg-muted ease-in-out data-[state=open]:translate-x-0">
      <Suspense>
        <ChatHistory userId={session.user.id} />
      </Suspense>
    </Sidebar>
  );
}
