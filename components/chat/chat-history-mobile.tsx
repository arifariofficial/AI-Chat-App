"use client";

import { SidebarList } from "@/components/chat/sidebar-list";
import {
  IconRefresh,
  IconPlus,
  IconShareUp,
  IconHome,
} from "@/components/ui/icons";
import { useChat } from "@/lib/hooks/use-chat";
import { Session } from "next-auth";
import { Suspense, useEffect } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import MyButton from "../my-button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { resetChat, selectChatStarted } from "@/lib/store/chatSlice";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { ThemeToggle } from "../theme-toggle-mobile";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useSidebar } from "@/lib/hooks/use-sidebar";

interface ChatHistoryProps {
  session: Session | null;
  buttonClassName?: string;
  onShareClick: () => void;
}

export function ChatHistoryMobile({
  session,
  buttonClassName,
  onShareClick,
}: ChatHistoryProps) {
  const { loadChats } = useChat();
  const router = useRouter();
  const dispatch = useDispatch();
  const chatStarted = useSelector(selectChatStarted);
  const { theme } = useTheme();
  const { isSidebarOpen } = useSidebar();

  useEffect(() => {
    async function fetchSessionAndLoadChats() {
      try {
        if (isSidebarOpen && session?.user?.id) {
          loadChats(session.user.id);
        }
      } catch (error) {
        console.error("Failed to load chats:", error);
        throw error; // Rethrow the error for the caller to handle
      }
    }

    fetchSessionAndLoadChats();
  }, [loadChats, session?.user?.id, isSidebarOpen]);

  if (!isSidebarOpen) {
    return null; // Ensure the component doesn't render when the sidebar is closed
  }

  return (
    <div className="flex h-full flex-col bg-backgroundSecondary">
      <div>
        <ul className="flex w-full flex-col gap-y-1">
          <li className="flex w-full items-center justify-center bg-background py-4 shadow">
            <h1 className="my-2 text-lg font-semibold text-foreground/80">
              Valikko
            </h1>
          </li>
          <li className="flex w-full px-1">
            <MyButton
              variant="outline"
              className="z-50 flex w-full items-center border p-1 focus:border-foreground/40 sm:hidden"
              onClick={() => {
                router.push("/new");
                setInterval(() => {
                  dispatch(resetChat());
                }, 2000);
              }}
            >
              <div className="flex flex-row items-center gap-4">
                <p>Uusi keskustelu</p>
                <IconPlus className="m-1 size-5 border-2 border-foreground/40" />
                <span className="sr-only">Uusi keskustelu</span>
              </div>
            </MyButton>
          </li>
          {chatStarted && (
            <li className="flex w-full px-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={onShareClick}
                    className="z-50 w-full gap-1 border-foreground/40 p-1 text-foreground hover:bg-accent"
                  >
                    <div className="flex flex-row items-center gap-4">
                      <p>Jaa keskustelu</p>
                      <IconShareUp className="m-1 ml-2 size-6 text-foreground/60" />
                    </div>
                    <span className="sr-only">Jaa keskustelu</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Jaa keskustelu</TooltipContent>
              </Tooltip>
            </li>
          )}
          <li className="flex w-full px-1">
            <ThemeToggle
              buttonClassName="flex items-center bg-background border w-full gap-1 border-foreground/40 p-1 text-foreground hover:bg-accent items-center"
              variant="inherit"
              style={{ zIndex: 20 }}
              buttonText="Vaihda teema"
              iconClassName={cn(
                theme === "light"
                  ? "text-inherit font-extrabold bg-inherit "
                  : "",
                "size-7 z-40 m-1 ml-6 size-6 text-foreground/60",
              )}
            />
          </li>
          <li className="flex w-full px-1">
            <Link href="/" style={{ zIndex: 20 }} className="w-full">
              <Button
                variant="inherit"
                className="z-50 w-full gap-1 border border-foreground/40 bg-background p-1 text-foreground hover:bg-accent"
              >
                <div className="flex flex-row items-center gap-4">
                  <p>Takaisin etusivulle</p>
                  <IconHome
                    className={cn(
                      theme === "light" ? "text-inherit" : "text-foreground",
                      "ml-2 size-7 text-foreground/60",
                    )}
                  />
                </div>
              </Button>
            </Link>
          </li>
        </ul>
      </div>
      <div className="mt-6 border-t-2 border-foreground/40">
        <div>
          <div className="mb-2 flex w-full items-center justify-between bg-background px-4 shadow-md">
            <h4 className="flex h-16 items-center text-sm font-medium">
              Keskusteluhistoria
            </h4>
            <MyButton
              variant="inherit"
              className={cn(
                buttonClassName,
                "h-7 border-2 border-foreground/30 active:bg-foreground/20",
              )}
            >
              <div className="mx-3 flex flex-row items-center gap-2">
                <p>Päivitä</p>
                <IconRefresh />
              </div>
            </MyButton>
          </div>
          <Suspense
            // Loading skeleton while chats are loading
            fallback={
              <div className="flex flex-1 flex-col space-y-4 overflow-auto px-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-6 w-full shrink-0 animate-pulse rounded-md border bg-zinc-200 dark:bg-zinc-800"
                  />
                ))}
              </div>
            }
          >
            <SidebarList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
