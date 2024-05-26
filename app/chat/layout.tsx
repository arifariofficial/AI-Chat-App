"use client";

import { SidebarDesktop } from "@components/chat/sidebar-desktop";
import { SidebarToggle } from "@components/chat/sidebar-toggle";
import ChatPageSkeleton from "@components/skeletons/ChatSkeleton";
import { useSidebar } from "@lib/hooks/use-sidebar";
import { Suspense } from "react";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSidebarOpen } = useSidebar();

  return (
    <div className="mx-auto flex size-full flex-row">
      <div
        className={`hidden items-center duration-300 ease-in-out md:block ${isSidebarOpen ? "w-64 md:w-72 lg:w-80" : "w-0"} overflow-hidden `}
      >
        <SidebarDesktop />
      </div>
      <div className={`flex size-full flex-row duration-300 ease-in-out`}>
        <div className="hidden items-center border-l border-border/20 md:flex">
          <SidebarToggle />
        </div>
        <div className="flex w-full">
          <Suspense fallback={<ChatPageSkeleton />}>{children}</Suspense>
        </div>
      </div>
    </div>
  );
}
