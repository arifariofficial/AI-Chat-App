"use client";

import ChatModal from "@/components/chat/chat-modal";
import ChatNav from "@/components/chat/chat-nav";
import PromptModal from "@/components/chat/prompt-modal";
import { SidebarDesktop } from "@/components/chat/sidebar-desktop";
import { SidebarToggle } from "@/components/chat/sidebar-toggle";
import { Locale } from "@/i18n.config";
import { useSidebar } from "@/lib/hooks/use-sidebar";
import { localizedRoutes } from "@/lib/localized-routes";
import { Dictionary } from "@/lib/types";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ChatLayoutProps {
  children: React.ReactNode;
  dictionary: Dictionary;
  lang: Locale;
}

export default function ChatLayout({
  children,
  dictionary,
  lang,
}: ChatLayoutProps) {
  const { isSidebarOpen } = useSidebar();
  const [showModal, setShowModal] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const routes = localizedRoutes[lang as keyof typeof localizedRoutes];

  useEffect(() => {
    if (status === "unauthenticated") {
      setShowModal(true);
    }
  }, [status]);

  const handleModalClose = () => {
    setShowModal(false);
    router.push(
      `/${lang}${routes.auth.signIn}?redirect=${encodeURIComponent(pathname)}`,
    );
  };
  const handlePromptModalClose = () => {
    setShowPromptModal(false);
  };

  // Handle the loading state
  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
        {/* You can replace this with a spinner or any loading indicator */}
      </div>
    );
  }
  // If the user is not authenticated, show the modal
  if (status === "unauthenticated") {
    return (
      <ChatModal showModal={showModal} handleModalClose={handleModalClose} />
    );
  }

  // If the user is authenticated, render the chat layout (type guard)
  if (status === "authenticated" && session) {
    return (
      <div className="mx-auto flex h-screen w-full flex-row bg-backgroundSecondary">
        <div
          className={`hidden items-center duration-300 ease-in-out sm:block ${
            isSidebarOpen ? "w-96" : "w-0"
          } overflow-hidden`}
        >
          <SidebarDesktop />
        </div>
        <div className="flex w-full flex-row duration-300 ease-in-out">
          <div className="hidden items-center border-l border-border/20 sm:flex">
            <SidebarToggle />
          </div>
          <div className="relative flex size-full flex-col overflow-x-hidden">
            <ChatNav
              session={session}
              setShowPromptModal={setShowPromptModal}
              lang={lang}
              dictionary={dictionary}
            />
            {showPromptModal && (
              <PromptModal
                handlePromptModalClose={handlePromptModalClose}
                showPromptModal={showPromptModal}
              />
            )}
            {children}
          </div>
        </div>
      </div>
    );
  }

  // Fallback in case none of the above conditions match
  return null;
}
