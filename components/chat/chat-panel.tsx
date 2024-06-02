import { FooterText } from "@components/chat/footer";
import { useActions, useUIState } from "ai/rsc";
import { UserMessage } from "./message";
import { PromptForm } from "./prompt-form";
import { AI } from "@lib/chat/actions";
import { nanoid } from "@lib/utils";
import { useAppDispatch } from "@lib/store/hook";
import { decrement } from "@lib/store/balanceSlice";
import { useState } from "react";

export interface ChatPanelProps {
  input: string;
  setInput: (value: string) => void;
  isAtBottom: boolean;
  scrollToBottom: () => void;
}

export function ChatPanel({ input, setInput }: ChatPanelProps) {
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions();
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
    <div className="mx-auto flex size-full max-w-3xl flex-col sm:pr-4">
      {messages.length === 0 && (
        <div className="mb-2 flex w-full flex-row gap-2 px-4  text-center sm:mb-4">
          {exampleMessages.map((example, index) => (
            <div
              key={example.heading}
              className={`w-full cursor-pointer rounded-lg border border-border/30 bg-background p-2 shadow-sm hover:bg-foreground/5 ${
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
              <div className="text-xs font-semibold text-foreground/80 sm:text-sm">
                {example.heading}
              </div>
              <div className="text-xs text-muted-foreground sm:text-sm">
                {example.subheading}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-2 bg-background px-4 drop-shadow-xl sm:rounded-t-xl sm:border sm:border-border/20">
        <PromptForm
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <FooterText className="mt-0 hidden sm:block" />
      </div>
    </div>
  );
}
