"use client";

import * as React from "react";
import { useSidebar } from "@/lib/hooks/use-sidebar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "@components/ui/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function SidebarToggle() {
  const { toggleSidebar, isSidebarOpen } = useSidebar();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          className="size-7 bg-transparent p-0 text-foreground/50 hover:bg-transparent"
          onClick={() => {
            toggleSidebar();
          }}
        >
          {isSidebarOpen ? (
            <ChevronLeft className="size-7" strokeWidth={4} />
          ) : (
            <ChevronRight className="size-7" strokeWidth={4} />
          )}
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>{isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}</p>
      </TooltipContent>
    </Tooltip>
  );
}
