"use client";

import { Button } from "@/components/ui/button";

import { IconSidebar } from "@/components/ui/icons";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import React from "react";
import { DialogDescription, DialogTitle } from "../ui/dialog";

interface SidebarMobileProps {
  children: React.ReactNode;
  className?: string;
}

export function SidebarMobile({ children, className }: SidebarMobileProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="inherit" className={cn("sm:hidden", className)}>
          <IconSidebar className="size-7" />
          <span className="sr-only">Vaihda sivupalkki</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="inset-y-0 flex h-auto flex-col p-0 sm:hidden"
      >
        <DialogTitle className="sr-only">Mobile Navigation Menu</DialogTitle>
        <DialogDescription className="sr-only">
          Navigate through the menu options using the buttons.
        </DialogDescription>

        {children}
      </SheetContent>
    </Sheet>
  );
}
