import { Separator } from "@/components/ui/separator";
import { UIState } from "@/lib/chat/actions";

export interface ChatDisplay {
  messages: UIState;
}

export function ChatDisplay({ messages }: ChatDisplay) {
  if (!messages.length) {
    return null;
  }

  return (
    <div className="absolute top-0 flex h-[calc(100vh-150px)] w-full flex-col items-start overflow-y-scroll p-2 text-foreground sm:h-[calc(100vh-170px)]">
      <div className="mr-8 p-6">
        {messages.map((message, index) => (
          <div key={message.id}>
            {message.display}
            {index < messages.length - 1 && (
              <Separator className="my-6 bg-background" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
