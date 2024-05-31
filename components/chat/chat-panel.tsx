import { Button } from "@/components/ui/button";
import { IconShare } from "@/components/ui/icons";
import { FooterText } from "@components/chat/footer";
import { useAIState, useActions, useUIState } from "ai/rsc";
import { UserMessage } from "./message";
import { PromptForm } from "./prompt-form";
import { AI } from "@lib/chat/actions";
import { nanoid } from "@lib/utils";
import { useAppDispatch } from "@lib/store/hook";
import { decrement } from "@lib/store/balanceSlice";
import { useState } from "react";
import { ChatShareDialog } from "./chat-share-dialog";
import { ButtonScrollToBottom } from "./button-scroll-to-bottom";
import { shareChat } from "@data/share-chat";

export interface ChatPanelProps {
  id?: string;
  title?: string;
  input: string;
  setInput: (value: string) => void;
  isAtBottom: boolean;
  scrollToBottom: () => void;
}

export function ChatPanel({
  id,
  title,
  input,
  setInput,
  isAtBottom,
  scrollToBottom,
}: ChatPanelProps) {
  const [aiState] = useAIState();
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const exampleMessages = [
    {
      heading: "Mitä liikennevakuutuslaki",
      subheading: "'1 § Lain soveltamisala' sisältää?",
      message: `Mitä liikennevakuutuslaki '1 § Lain soveltamisala' sisältää?`,
    },
    {
      heading: "Miten voi saada",
      subheading: "hyvää vakuutuus?",
      message: `Miten voi saada hyvää vakuutuus?`,
    },
  ];

  return (
    <div className="absolute inset-x-0  bottom-0 w-full bg-transparent">
      <ButtonScrollToBottom
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />
      <div className="mx-auto flex max-w-3xl flex-col bg-transparent sm:pr-4">
        <div className="grid w-full grid-cols-2 bg-transparent px-6 text-center sm:mb-4 sm:gap-4">
          {messages.length === 0 &&
            exampleMessages.map((example, index) => (
              <div
                key={example.heading}
                className={`w-full cursor-pointer rounded-lg border border-border/30 bg-background p-4 hover:bg-foreground/5 ${
                  index > 1 && "hidden md:block"
                }`}
                onClick={async () => {
                  setIsLoading(true);
                  setMessages((currentMessages) => [
                    ...currentMessages,
                    {
                      id: nanoid(),
                      display: <UserMessage>{example.message}</UserMessage>,
                    },
                  ]);

                  const responseMessage = await submitUserMessage(
                    example.message,
                  );

                  setMessages((currentMessages) => [
                    ...currentMessages,
                    responseMessage,
                  ]);
                  setIsLoading(false);
                  dispatch(decrement());
                }}
              >
                <div className="text-sm font-semibold text-foreground/90">
                  {example.heading}
                </div>
                <div className="text-sm text-foreground/80">
                  {example.subheading}
                </div>
              </div>
            ))}
        </div>

        {messages?.length >= 2 ? (
          <div className="hidden h-12 items-center justify-center">
            <div className="flex space-x-2">
              {id && title ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setShareDialogOpen(true)}
                  >
                    <IconShare className="mr-2" />
                    Share
                  </Button>
                  <ChatShareDialog
                    open={shareDialogOpen}
                    onOpenChange={setShareDialogOpen}
                    onCopy={() => setShareDialogOpen(false)}
                    shareChat={shareChat}
                    chat={{
                      id,
                      title,
                      messages: aiState.messages,
                    }}
                  />
                </>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="space-y-2 bg-background px-4 pt-3 shadow-lg sm:rounded-t-xl sm:border sm:border-border/40 ">
          <PromptForm
            input={input}
            setInput={setInput}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
          <FooterText className="mt-0 hidden sm:block" />
        </div>
      </div>
    </div>
  );
}
