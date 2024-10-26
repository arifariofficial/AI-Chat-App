import { useEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { UIState } from "@/lib/chat/actions";
import { cn } from "@/lib/utils";

export interface ChatListProps {
  messages: UIState;
  className?: string;
}

export function ChatList({ messages, className }: ChatListProps) {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length === 0) return;
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new MutationObserver(() => {
      if (isAtBottom) {
        scrollToBottom();
      }
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
    });

    const handleScroll = () => {
      const isScrolledToBottom =
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 1;
      setIsAtBottom(isScrolledToBottom);
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      container.removeEventListener("scroll", handleScroll);
    };
  }, [isAtBottom]);

  if (!messages.length) {
    return <div>Loading...</div>;
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        className,
        "absolute flex size-full flex-col items-start overflow-y-auto px-2 pb-20 text-foreground sm:max-w-screen-md sm:px-10 md:max-w-screen-lg",
      )}
      style={{
        scrollbarColor: "transparent transparent",
      }}
    >
      <div className="">
        {messages.map((message, index) => (
          <div key={message.id}>
            <div className="mr-10 flex flex-col">{message.display}</div>
            {index < messages.length - 1 && (
              <Separator className="my-8 h-0 border-none" />
            )}
          </div>
        ))}
      </div>
      <div ref={endOfMessagesRef} />
    </div>
  );
}
