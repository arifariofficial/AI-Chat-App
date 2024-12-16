"use client";

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
        className={`${isSidebarOpen ? "" : "border-r"} flex h-full flex-col items-center justify-evenly border-foreground/10 hover:bg-inherit`}
      >
        <div
          className={` ${isSidebarOpen ? "hidden" : ""} inline-block rotate-180 cursor-default justify-center text-sm text-foreground/70 [writing-mode:vertical-lr]`}
        >
          Keskusteluhistoria
        </div>
        <Button
          asChild
          variant="ghost"
          className="size-7 h-96 bg-transparent p-0 text-foreground/50 hover:bg-transparent"
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
            <span className="sr-only">Vaihda sivupalkki</span>
          </div>
        </Button>
        <div
          className={` ${isSidebarOpen ? "hidden" : ""} inline-block rotate-180 cursor-default justify-center text-sm text-foreground/70 [writing-mode:vertical-lr]`}
        >
          Keskusteluhistoria
        </div>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>{isSidebarOpen ? "Sulje sivupalkki" : "Avaa sivupalkki"}</p>
      </TooltipContent>
    </Tooltip>
  );
}
