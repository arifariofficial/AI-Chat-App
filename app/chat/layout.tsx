"use client";

import ChatModal from "@components/chat/chat-modal";
import ChatNav from "@components/chat/chat-nav";
import { SidebarDesktop } from "@components/chat/sidebar-desktop";
import { SidebarToggle } from "@components/chat/sidebar-toggle";
import { useSidebar } from "@lib/hooks/use-sidebar";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ChatLayoutProps {
  children: React.ReactNode;
}

export default function ChatLayout({ children }: ChatLayoutProps) {
  const { isSidebarOpen } = useSidebar();
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!session) {
      setShowModal(true);
    }
  }, [session]);

  const handleModalClose = () => {
    setShowModal(false);
    router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
  };

  if (!session) {
    return (
      <ChatModal showModal={showModal} handleModalClose={handleModalClose} />
    );
  }

  return (
    <div className="mx-auto flex size-full h-screen flex-row bg-backgroundSecondary">
      <div
        className={`hidden items-center bg-muted duration-300 ease-in-out md:block ${isSidebarOpen ? "w-96" : "w-0"} overflow-hidden`}
      >
        <SidebarDesktop />
      </div>
      <div className="flex w-full flex-row duration-300 ease-in-out">
        <div className="hidden items-center border-l border-border/20 md:flex">
          <SidebarToggle />
        </div>
        <div className="flex size-full flex-col">
          <ChatNav session={session} />
          {children}
        </div>
      </div>
    </div>
  );
}
