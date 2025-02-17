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
import MyButton from "../my-button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { resetChat, selectChatStarted } from "@/lib/store/chatSlice";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { ThemeToggle } from "../theme-toggle-mobile";
import Link from "next/link";
import { useSidebar } from "@/lib/hooks/use-sidebar";
import { LocalizedRoutes } from "@/lib/localized-routes";
import { Locale } from "@/i18n.config";

interface ChatHistoryProps {
  session: Session | null;
  buttonClassName?: string;
  onShareClick: () => void;
  routes: LocalizedRoutes[Locale];
  lang: Locale;
}

export function ChatHistoryMobile({
  session,
  buttonClassName,
  onShareClick,
  routes,
  lang,
}: ChatHistoryProps) {
  const { loadChats } = useChat();
  const router = useRouter();
  const dispatch = useDispatch();
  const chatStarted = useSelector(selectChatStarted);
  const { isSidebarOpen, isLoading } = useSidebar();

  useEffect(() => {
    if (isSidebarOpen && session?.user?.id) {
      try {
        loadChats(session.user.id);
      } catch (error) {
        console.error("Failed to load chats:", error);
      }
    }
  }, [loadChats, session?.user?.id, isSidebarOpen]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">Loading...</div>
    );
  }

  return isSidebarOpen ? (
    <div className="flex h-full flex-col bg-backgroundSecondary">
      <Header />
      <Menu
        chatStarted={chatStarted}
        router={router}
        dispatch={dispatch}
        onShareClick={onShareClick}
      />
      <HistorySection
        buttonClassName={buttonClassName}
        lang={lang}
        routes={routes}
      />
    </div>
  ) : null;
}

function Header() {
  return (
    <div>
      <ul className="flex w-full flex-col gap-y-1">
        <li className="flex w-full items-center justify-center bg-background py-4 shadow">
          <h1 className="my-2 text-lg font-semibold text-foreground">Menu</h1>
        </li>
      </ul>
    </div>
  );
}

interface MenuProps {
  chatStarted: boolean;
  router: ReturnType<typeof useRouter>;
  dispatch: ReturnType<typeof useDispatch>;
  onShareClick: () => void;
}

function Menu({ chatStarted, router, dispatch, onShareClick }: MenuProps) {
  return (
    <ul className="mt-2 flex w-full flex-col gap-y-1 px-1">
      <li>
        <MyButton
          variant="outline"
          className="z-50 flex w-full items-center justify-between border font-normal sm:hidden"
          spanClassName="w-full justify-between mx-16"
          iconRight={
            <IconPlus className="size-5 border-2 border-foreground/60 text-foreground" />
          }
          onClick={() => {
            router.push("/new");
            setTimeout(() => dispatch(resetChat()), 2000);
          }}
        >
          New Chat
          <span className="sr-only">New Chat</span>
        </MyButton>
      </li>
      {chatStarted && (
        <li>
          <MyButton
            variant="outline"
            className="z-50 flex w-full items-center justify-between border font-normal sm:hidden"
            spanClassName="w-full justify-between mx-16"
            iconRight={<IconShareUp className="size-6 text-foreground/80" />}
            onClick={onShareClick}
          >
            Share Chat
            <span className="sr-only">Share Chat</span>
          </MyButton>
        </li>
      )}
      <li>
        <ThemeToggle
          buttonClassName="flex items-center bg-background border w-full border-foreground/40  text-foreground hover:bg-accent font-normal"
          spanClassName="w-full justify-between  mx-16"
          variant="outline"
          style={{ zIndex: 20 }}
          buttonText="Theme"
          iconClassName="size-6 text-foreground "
        />
      </li>
      <li>
        <Link href="/" style={{ zIndex: 20 }} className="w-full">
          <Button
            variant="inherit"
            className="z-50 w-full border border-foreground/40 bg-background text-foreground hover:bg-accent"
            spanClassName="w-full justify-between mx-16"
            iconRight={<IconHome className="text-foreground/80" />}
          >
            Home
          </Button>
        </Link>
      </li>
    </ul>
  );
}

interface HistorySectionProps {
  buttonClassName?: string;
  routes: LocalizedRoutes[Locale];
  lang: Locale;
}

function HistorySection({
  buttonClassName,
  routes,
  lang,
}: HistorySectionProps) {
  return (
    <div className="mt-6 border-t-2 border-foreground/40">
      <div className="mb-2 flex w-full items-center justify-between bg-background px-4 shadow-md">
        <h4 className="flex h-16 items-center text-sm font-semibold">
          Chat History
        </h4>
        <MyButton
          variant="inherit"
          iconRight={<IconRefresh />}
          className={cn(
            buttonClassName,
            "h-7 border-2 border-foreground/30 active:bg-foreground/20",
          )}
        >
          <p>Update</p>
        </MyButton>
      </div>
      <Suspense
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
        <SidebarList lang={lang} routes={routes} />
      </Suspense>
    </div>
  );
}
