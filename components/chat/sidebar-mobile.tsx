"use client";

import { Button } from "@/components/ui/button";

import { IconSidebar } from "@/components/ui/icons";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import React from "react";
import { DialogDescription, DialogTitle } from "../ui/dialog";
import { useSidebar } from "@/lib/hooks/use-sidebar";

interface SidebarMobileProps {
  children: React.ReactNode;
  className?: string;
}

export function SidebarMobile({ children, className }: SidebarMobileProps) {
  const { toggleSidebar } = useSidebar();

  return (
    <Sheet onOpenChange={(isOpen) => toggleSidebar(isOpen)}>
      <SheetTrigger asChild>
        <Button
          variant="inherit"
          className={cn("focus:border-none sm:hidden", className)}
        >
          <IconSidebar className="size-7" />
          <span className="sr-only">Toggle the sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="inset-y-0 flex h-auto flex-col p-0 sm:hidden"
        tabIndex={-1} // Prevent focusing on the first element
      >
        <DialogTitle className="sr-only">Mobile navigation menu</DialogTitle>
        <DialogDescription className="sr-only">
          Navigate through the menu options using the buttons.
        </DialogDescription>
        {children}
      </SheetContent>
    </Sheet>
  );
}
