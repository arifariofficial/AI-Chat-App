import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { UIState } from "@/lib/chat/actions";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { Button } from "@components/ui/button";
import { CopyIcon, TickIcon } from "@components/ui/icons";

export interface ChatDisplayProps {
  messages: UIState;
}

// Type guard to check if an object is a React element
function isReactElement(element: ReactNode): element is ReactElement {
  return element != null && typeof element === "object" && "props" in element;
}

export function ChatDisplay({ messages }: ChatDisplayProps) {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

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

  // Copy text to clipboard
  const handleCopyText = (text: string, messageId: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedMessageId(messageId);
        setTimeout(() => {
          setCopiedMessageId(null);
        }, 2000);
      })
      .catch((err) => {
        console.log("Failed to copy text: ", err);
      });
  };

  if (!messages.length) {
    return <div>Loading...</div>;
  }

  return (
    <div
      ref={containerRef}
      className="absolute top-0 flex h-[calc(100vh-110px)] w-full flex-col items-start overflow-y-auto pb-[70px] pl-0 text-foreground sm:mr-2 sm:h-[calc(100vh-170px)] sm:p-2"
      style={{
        scrollbarColor: "transparent transparent",
      }}
    >
      <div className="mr-8 p-6">
        {messages.map((message, index) => (
          <div key={message.id}>
            <div className="flex flex-col">
              {message.display}

              <Tooltip>
                <TooltipTrigger asChild className="w-fit pl-6 hover:bg-inherit">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      if (isReactElement(message.display)) {
                        handleCopyText(
                          message.display.props?.content || "",
                          message.id,
                        );
                      }
                    }}
                    className="ml-1 mt-1"
                  >
                    {copiedMessageId === message.id ? (
                      <TickIcon className="text-gray-400" />
                    ) : (
                      <CopyIcon className="text-gray-400 hover:text-gray-900" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Copy</p>
                </TooltipContent>
              </Tooltip>
            </div>
            {index < messages.length - 1 && (
              <Separator className="my-6 bg-background" />
            )}
          </div>
        ))}
      </div>
      <div ref={endOfMessagesRef} />
    </div>
  );
}
