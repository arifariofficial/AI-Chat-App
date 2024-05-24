"use client";

import * as React from "react";

import { useSidebar } from "@/lib/hooks/use-sidebar";
import { Button } from "@/components/ui/button";
import { IconSidebar } from "@/components/ui/icons";

export function SidebarToggle() {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      variant="ghost"
      className=" size-9 p-0"
      onClick={() => {
        toggleSidebar();
      }}
    >
      <IconSidebar className="hidden size-6 sm:block" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}
