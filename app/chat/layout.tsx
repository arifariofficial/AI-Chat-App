"use client";

import ChatModal from "@components/chat/chat-modal";
import { SidebarDesktop } from "@components/chat/sidebar-desktop";
import { SidebarToggle } from "@components/chat/sidebar-toggle";
import { useSidebar } from "@lib/hooks/use-sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ChatLayoutProps {
  children: React.ReactNode;
}

export default function ChatLayout({ children }: ChatLayoutProps) {
  const { isSidebarOpen } = useSidebar();
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      setShowModal(true);
    }
  }, [session]);

  const handleModalClose = () => {
    setShowModal(false);
    router.push("/auth/login");
  };

  if (!session) {
    return (
      <ChatModal showModal={showModal} handleModalClose={handleModalClose} />
    );
  }

  return (
    <div className="mx-auto flex h-[calc(100dvh-1rem)] w-full flex-row sm:h-full">
      <div
        className={`hidden items-center bg-muted duration-300 ease-in-out md:block ${isSidebarOpen ? "w-64 md:w-72 lg:w-80" : "w-0"} overflow-hidden `}
      >
        <SidebarDesktop />
      </div>
      <div className={`flex size-full flex-row duration-300 ease-in-out`}>
        <div className="hidden items-center border-l border-border/20 md:flex">
          <SidebarToggle />
        </div>
        <div className="flex w-full">{children}</div>
      </div>
    </div>
  );
}
