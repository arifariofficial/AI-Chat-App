"use client";

import { Chat } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import { SidebarItem } from "./sidebar-item";
import { SidebarActions } from "./sidebar-actions";
import { removeChat } from "@/data/chat";
import { Locale } from "@/i18n.config";
import { LocalizedRoutes } from "@/lib/localized-routes";

interface SidebarItemsProps {
  chats?: Chat[];
  lang: Locale;
  routes: LocalizedRoutes[Locale];
}

export function SidebarItems({ chats, lang, routes }: SidebarItemsProps) {
  //  Return early if no chats are provided.
  if (!chats?.length) return null;

  return (
    <AnimatePresence>
      {chats.map(
        (chat, index) =>
          chat && (
            <motion.div
              key={chat?.id}
              exit={{
                opacity: 0,
                height: 0,
              }}
            >
              <SidebarItem
                index={index}
                chat={chat}
                lang={lang}
                routes={routes}
              >
                <SidebarActions chat={chat} removeChat={removeChat} />
              </SidebarItem>
            </motion.div>
          ),
      )}
    </AnimatePresence>
  );
}
