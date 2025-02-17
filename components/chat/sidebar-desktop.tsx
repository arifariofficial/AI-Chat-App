"use client";

import { Sidebar } from "@/components/chat/sidebar";
import { ChatHistory } from "@/components/chat/chat-history";
import { useSession } from "next-auth/react";
import { LocalizedRoutes } from "@/lib/localized-routes";
import { Locale } from "@/i18n.config";

interface SidebarDesktopProps {
  lang: Locale;
  routes: LocalizedRoutes[Locale];
}

export function SidebarDesktop({ lang, routes }: SidebarDesktopProps) {
  const { data: session } = useSession();

  if (!session?.user?.id) {
    return null;
  }

  return (
    <Sidebar className="peer w-full -translate-x-full ease-in-out data-[state=open]:translate-x-0">
      <ChatHistory session={session} lang={lang} routes={routes} />
    </Sidebar>
  );
}
