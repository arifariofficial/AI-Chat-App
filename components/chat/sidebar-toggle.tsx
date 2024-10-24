"use client";

import * as React from "react";
import { useSidebar } from "@/lib/hooks/use-sidebar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "@/components/ui/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function SidebarToggle() {
  const { toggleSidebar, isSidebarOpen } = useSidebar();

  return (
    <Tooltip>
      <TooltipTrigger
        className={`${isSidebarOpen ? "" : "border-r"} flex h-full flex-col items-center justify-evenly border-foreground/10 bg-background`}
      >
        <div
          className={` ${isSidebarOpen ? "hidden" : ""} inline-block rotate-180 cursor-default justify-center text-sm text-foreground/70 [writing-mode:vertical-lr]`}
        >
          Chat History
        </div>
        <Button
          asChild
          variant="ghost"
          className="hover:bg-transparen size-7 h-96 bg-transparent p-0 text-foreground/50"
          onClick={() => {
            toggleSidebar();
          }}
        >
          <div>
            {" "}
            {isSidebarOpen ? (
              <ChevronLeft className="size-7" strokeWidth={4} />
            ) : (
              <ChevronRight className="size-7" strokeWidth={4} />
            )}
            <span className="sr-only">Toggle Sidebar</span>
          </div>
        </Button>
        <div
          className={` ${isSidebarOpen ? "hidden" : ""} inline-block rotate-180 cursor-default justify-center text-sm text-foreground/70 [writing-mode:vertical-lr]`}
        >
          Chat History
        </div>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>{isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}</p>
      </TooltipContent>
    </Tooltip>
  );
}
