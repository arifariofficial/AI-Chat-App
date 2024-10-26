"use client";

import { useSidebar } from "@/lib/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { ComponentProps, useEffect, useState } from "react";

export interface SidebarProps extends ComponentProps<"div"> {
  customProp?: string;
}

export function Sidebar({ className, children }: SidebarProps) {
  const { isSidebarOpen, isLoading } = useSidebar();
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (isSidebarOpen && !isLoading) {
      const timer = setTimeout(() => {
        setShowSidebar(true);
      }, 300);

      return () => clearTimeout(timer); // Return a cleanup function
    } else {
      setShowSidebar(false);
      return undefined; // Explicitly return undefined here
    }
  }, [isSidebarOpen, isLoading]);

  if (!showSidebar) {
    return null;
  }

  return (
    <div
      data-state={isSidebarOpen && !isLoading ? "open" : "closed"}
      className={cn(className, "peer flex size-full flex-col dark:bg-zinc-950")}
    >
      {children}
    </div>
  );
}
