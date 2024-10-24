"use client";

import { cn } from "@/lib/utils";
import { useStreamableText } from "@/lib/hooks/use-streamable-text";
import { StreamableValue } from "ai/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { UserIcon } from "@/components/ui/icons";
import LocalLibrary from "@mui/icons-material/LocalLibrary";
import { MemoizedReactMarkdown } from "./markdown";
import { spinner } from "./spinner";
import { ChatMessageActions } from "./chat-message-actions";

export function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <div className="flex size-[24px] shrink-0 select-none items-center justify-center rounded-full border border-foreground/90 text-foreground/90 shadow-sm">
          <UserIcon className="p-[2px]" fill="currentColor" />
        </div>
        <h1 className="mx-3 -mt-1 text-lg font-semibold text-foreground/90">
          Sinä
        </h1>
      </div>
      <div className="ml-8 flex-1 space-y-2 overflow-hidden pl-2">
        {children}
      </div>
    </div>
  );
}

export function BotMessage({
  content,
  className,
}: {
  content: string | StreamableValue<string>;
  className?: string;
}) {
  const { text, isStreamingDone } = useStreamableText(content);

  return (
    /* Bot message container */
    <div
      className={cn(
        "relative flex w-full flex-col items-start font-medium text-foreground",
        className,
      )}
    >
      <div className="flex">
        <div className="flex size-[25px] shrink-0 select-none items-center justify-center rounded-full border border-foreground/90 text-foreground/90 shadow-sm">
          <LocalLibrary className="mb-px p-[2px]" />
        </div>
        <h1 className="mx-3 -mt-1 text-lg font-semibold text-foreground/90">
          Sipe
        </h1>
      </div>
      {/* copy + bot message container */}
      <div className="pl-9">
        <MemoizedReactMarkdown
          className="prose w-full max-w-none dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              /* Bot messages most inner*/
              return <p className="mb-2 w-full last:mb-0">{children}</p>;
            },
          }}
        >
          {text}
        </MemoizedReactMarkdown>
        {isStreamingDone && <ChatMessageActions message={text} />}
      </div>
    </div>
  );
}

export function SpinnerMessage() {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div className="flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm">
        <LocalLibrary />
      </div>
      <div className="ml-4 flex h-[24px] flex-1 flex-row items-center space-y-2 overflow-hidden px-1">
        {spinner}
      </div>
    </div>
  );
}

export function BotCard({
  children,
  showAvatar = true,
}: {
  children: React.ReactNode;
  showAvatar?: boolean;
}) {
  return (
    <div className="group relative flex items-start border md:-ml-12">
      <div
        className={cn(
          "flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm",
          !showAvatar && "invisible",
        )}
      >
        <LocalLibrary />
      </div>
      <div className="ml-4 flex-1 pl-2">{children}</div>
    </div>
  );
}
