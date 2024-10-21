"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const isLightMode = theme === "light";
  const isDarkMode = theme === "dark";
  const isSystemMode = theme === "system";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="nav" className="h-full">
          <SunIcon className="size-[1.3rem]  rotate-0 scale-100 font-bold transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute size-[1.3rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />

          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="w-56 border border-border/30"
      >
        <DropdownMenuCheckboxItem
          checked={isLightMode}
          onCheckedChange={() => setTheme("light")}
        >
          <DropdownMenuItem className="flex w-full items-center justify-evenly hover:cursor-pointer">
            <p>Light</p>
            <SunIcon className="size-[1.3rem]" />
          </DropdownMenuItem>
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={isDarkMode}
          onCheckedChange={() => setTheme("dark")}
        >
          <DropdownMenuItem className="flex w-full items-center justify-evenly hover:cursor-pointer">
            <p>Dark</p>
            <MoonIcon className="size-[1.2rem]" />
          </DropdownMenuItem>
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={isSystemMode}
          onCheckedChange={() => setTheme("system")}
        >
          <DropdownMenuItem className="flex w-full items-center justify-evenly hover:cursor-pointer">
            <p>System</p>
            <SettingsSuggestOutlinedIcon className="mr-1 size-[1.2rem]" />
          </DropdownMenuItem>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
