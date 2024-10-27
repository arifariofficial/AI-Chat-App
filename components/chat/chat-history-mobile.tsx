"use client";

import { SidebarList } from "@/components/chat/sidebar-list";
import { IconRefresh } from "@/components/ui/icons";
import { useChats } from "@/lib/hooks/useChats";
import { Session } from "next-auth";
import { Suspense, useEffect } from "react";

import MyButton from "../my-button";
import { cn } from "@/lib/utils";

interface ChatHistoryProps {
  session: Session | null;
  buttonClassName?: string;
}

export function ChatHistoryMobile({
  session,
  buttonClassName,
}: ChatHistoryProps) {
  const { loadChats } = useChats();

  useEffect(() => {
    async function fetchSessionAndLoadChats() {
      try {
        if (session?.user?.id) {
          loadChats(session.user.id);
        }
      } catch (error) {
        console.error("Failed to load chats:", error);
        throw error; // Rethrow the error for the caller to handle
      }
    }

    fetchSessionAndLoadChats();
  }, [loadChats]);

  return (
    <div className="flex h-full flex-col bg-backgroundSecondary">
      <div className="flex items-center justify-between bg-background p-4 shadow">
        <h4 className="text-sm font-medium">Keskusteluhistoria</h4>
        <MyButton
          variant="inherit"
          className={cn(
            buttonClassName,
            "h-7 border-2 border-foreground/30 active:bg-foreground/20",
          )}
        >
          <IconRefresh />
        </MyButton>
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
