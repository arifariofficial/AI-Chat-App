"use client";

import { Button } from "@/components/ui/button";

import { IconSidebar } from "@/components/ui/icons";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { SidebarMobileContainer } from "./sidebar-mobile-container";
import React from "react";

interface SidebarMobileProps {
  children: React.ReactNode;
  className?: string;
}

export function SidebarMobile({ children, className }: SidebarMobileProps) {
  const path = usePathname();

  if (!path.includes("/chat")) return null;

  return (
    <Sheet>
      <SheetTrigger
        asChild
        className="text-foregroundNav focus-visible:border-none focus-visible:ring-0"
      >
        <Button variant="nav" className={cn("sm:hidden", className)}>
          <IconSidebar className="size-6" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="inset-y-0 flex h-auto w-full flex-col border p-0 sm:hidden"
      >
        <SidebarMobileContainer className="flex">
          {children}
        </SidebarMobileContainer>
      </SheetContent>
    </Sheet>
  );
}
