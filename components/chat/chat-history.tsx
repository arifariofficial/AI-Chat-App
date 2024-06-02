"use client";

import { SidebarList } from "@/components/chat/sidebar-list";
import { Button } from "@components/ui/button";
import { IconRefresh } from "@components/ui/icons";
import { useChats } from "@lib/hooks/useChats";
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
    <div className="flex h-full flex-col ">
      <div className="flex items-center p-4">
        <h4 className="text-sm font-medium">Chat History</h4>
        <Button
          variant="nav"
          className="mx-8 bg-inherit"
          onClick={() => session?.user?.id && loadChats(session?.user?.id)}
        >
          <IconRefresh />
        </Button>
      </div>
      <Suspense
        fallback={
          <div className="flex flex-1 flex-col space-y-4 overflow-auto px-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="h-6 w-full shrink-0 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800"
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
