"use client";

import { SidebarList } from "@/components/chat/sidebar-list";
import { Button } from "@/components/ui/button";
import { IconRefresh } from "@/components/ui/icons";
import { useChats } from "@/lib/hooks/useChats";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { Suspense, useEffect } from "react";

export function ChatHistory({ session }: { session: Session | null }) {
  const { loadChats } = useChats();

  useEffect(() => {
    async function fetchSessionAndLoadChats() {
      const session = await getSession();
      if (session?.user?.id) {
        loadChats(session.user.id);
      }
    }

    fetchSessionAndLoadChats();
  }, [loadChats]);

  return (
    <div className="bg-bg-backgroundSecondary flex h-full flex-col">
      <div className="flex items-center justify-between bg-background p-4 shadow">
        <h4 className="text-sm font-medium">Keskusteluhistoria</h4>
        <Button
          variant="outline"
          className="h-7"
          onClick={() => session?.user?.id && loadChats(session?.user?.id)}
        >
          <IconRefresh />
        </Button>
      </div>
      <Suspense
        // Loading skeleton while chats are loading
        fallback={
          <div className="flex flex-1 flex-col space-y-4 overflow-auto px-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="h-6 w-full shrink-0 animate-pulse rounded-md border bg-zinc-200 dark:bg-zinc-800"
              />
            ))}
          </div>
        }
      >
        <SidebarList />
      </Suspense>
    </div>
  );
}
