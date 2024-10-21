"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { IconMoon, IconSun } from "./ui/icons";
import { cn } from "@lib/utils";

interface ThemeToggleProps {
  className?: string;
  variant?: "ghost" | "outline" | "secondary" | "link" | "nav" | "default";
  iconClassName?: string;
}

export function ThemeToggle({
  className,
  variant,
  iconClassName,
}: ThemeToggleProps) {
  const { setTheme, theme } = useTheme();
  const [, startTransition] = React.useTransition();

  return (
    <Button
      className={cn(className)}
      variant={variant}
      onClick={() => {
        startTransition(() => {
          setTheme(theme === "light" ? "dark" : "light");
        });
      }}
    >
      <div>
        {!theme ? null : theme === "dark" ? (
          <IconMoon className={cn(iconClassName, "size-6 transition-all")} />
        ) : (
          <IconSun className={cn(iconClassName, "size-6 transition-all")} />
        )}
        <span className="sr-only">Toggle theme</span>
      </div>
    </Button>
  );
}
