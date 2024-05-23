"use client";

import * as React from "react";
import { useSidebar } from "@/lib/hooks/use-sidebar";
import { Button } from "@/components/ui/button";
import { IconArrowRight, IconArrowLeft } from "@/components/ui/icons";

export function SidebarToggle() {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <Button
      variant="ghost"
      className="absolute left-4 top-4 z-40 hover:bg-transparent hover:text-primary "
      onClick={() => {
        toggleSidebar();
      }}
    >
      {isSidebarOpen ? (
        <IconArrowLeft className="size-6 " />
      ) : (
        <IconArrowRight className="size-6 " />
      )}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}
