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
    <Button
      variant="ghost"
      className=" size-7 bg-transparent p-0 text-foreground/50 hover:bg-transparent"
      onClick={() => {
        toggleSidebar();
      }}
    >
      {isSidebarOpen ? (
        <Tooltip>
          <TooltipTrigger>
            <ChevronLeft className="size-7 " strokeWidth={4} />
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Close Sidebar</p>
          </TooltipContent>
        </Tooltip>
      ) : (
        <Tooltip>
          <TooltipTrigger>
            <ChevronRight className="size-7" strokeWidth={4} />
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Open Sidebar</p>
          </TooltipContent>
        </Tooltip>
      )}

      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}
