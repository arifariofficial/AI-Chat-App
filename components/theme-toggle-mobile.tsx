"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { IconMoon, IconSun } from "./ui/icons";
import { cn } from "@/lib/utils";
import MyButton from "./my-button";

interface ThemeToggleProps {
  className?: string;
  style?: React.CSSProperties;
  iconClassName?: string;
  buttonClassName?: string;
  spanClassName?: string;
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
  spanClassName,
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
    <MyButton
      style={style}
      className={cn(buttonClassName)}
      spanClassName={spanClassName}
      variant={variant}
      iconRight={
        <div>
          {resolvedTheme === "dark" ? (
            <IconMoon className={cn("size-6 transition-all", iconClassName)} />
          ) : (
            <IconSun className={cn("size-6 transition-all", iconClassName)} />
          )}
          <span className="sr-only">Toggle theme</span>
        </div>
      }
      onClick={() => {
        setTheme(resolvedTheme === "light" ? "dark" : "light");
      }}
    >
      {buttonText && <p>{buttonText}</p>}
    </MyButton>
  );
}
