"use client";

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
import { cn } from "@/lib/utils";
import { Dictionary } from "@/lib/types";

interface ModeToggleProps {
  className?: string;
  dictionary?: Dictionary;
}

export function ModeToggle({ className, dictionary }: ModeToggleProps) {
  const { theme, setTheme } = useTheme();
  const isLightMode = theme === "light";
  const isDarkMode = theme === "dark";
  const isSystemMode = theme === "system";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={cn(className)}>
        <Button
          variant="nav"
          className="h-full outline-none focus:outline-none focus-visible:outline-none"
        >
          <SunIcon className="size-[1.4rem] rotate-0 scale-100 font-bold transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute size-[1.4rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="w-48 border border-border/30"
      >
        <DropdownMenuCheckboxItem
          checked={isLightMode}
          onCheckedChange={() => setTheme("light")}
        >
          <DropdownMenuItem className="flex w-full items-center justify-evenly hover:cursor-pointer">
            <p>{dictionary?.theme.light}</p>
            <SunIcon className="size-[1.3rem]" />
          </DropdownMenuItem>
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={isDarkMode}
          onCheckedChange={() => setTheme("dark")}
        >
          <DropdownMenuItem className="flex w-full items-center justify-evenly hover:cursor-pointer">
            <p>{dictionary?.theme.dark}</p>
            <MoonIcon className="size-[1.2rem]" />
          </DropdownMenuItem>
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={isSystemMode}
          onCheckedChange={() => setTheme("system")}
        >
          <DropdownMenuItem className="flex w-full items-center justify-evenly hover:cursor-pointer">
            <p>{dictionary?.theme.system}</p>
            <SettingsSuggestOutlinedIcon className="mr-1 size-[1.2rem]" />
          </DropdownMenuItem>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
