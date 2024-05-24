import { useEffect, useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { UIState } from "@/lib/chat/actions";

export interface ChatDisplayProps {
  messages: UIState;
}

export function ChatDisplay({ messages }: ChatDisplayProps) {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length === 0) return;
    scrollToBottom();
  }, [messages.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new MutationObserver(scrollToBottom);

    observer.observe(container, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  if (!messages.length) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="absolute top-0 flex h-[calc(100vh-150px)] w-full flex-col items-start overflow-y-auto  p-2 pb-[70px] text-foreground sm:h-[calc(100vh-170px)]"
    >
      <div className="mr-8 p-6">
        {messages.map((message, index) => (
          <div key={message.id}>
            {message.display}
            {index < messages.length - 1 && (
              <Separator className="my-6 bg-background" />
            )}
          </div>
        ))}
        <div ref={endOfMessagesRef} />
      </div>
    </div>
  );
}
