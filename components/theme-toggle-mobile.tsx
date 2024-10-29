"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { IconMoon, IconSun } from "./ui/icons";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  style?: React.CSSProperties;
  iconClassName?: string;
  buttonClassName?: string;
  buttonText?: string;
  variant?:
    | "nav"
    | "outline"
    | "default"
    | "destructive"
    | "secondary"
    | "ghost"
    | "link"
    | "inherit";
}

export function ThemeToggle({
  buttonClassName,
  variant,
  iconClassName,
  buttonText,
  style,
}: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Ensure the component is mounted before rendering
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // If not mounted, return null to prevent mismatches
  if (!mounted) {
    return null;
  }

  return (
    <Button
      style={style}
      className={cn(buttonClassName)}
      variant={variant}
      onClick={() => {
        setTheme(resolvedTheme === "light" ? "dark" : "light");
      }}
    >
      <div className="flex flex-row items-center">
        {buttonText && <p>{buttonText}</p>}
        <div>
          {resolvedTheme === "dark" ? (
            <IconMoon className={cn(iconClassName, "size-7 transition-all")} />
          ) : (
            <IconSun className={cn(iconClassName, "size-7 transition-all")} />
          )}
          <span className="sr-only">Toggle theme</span>
        </div>
      </div>
    </Button>
  );
}
