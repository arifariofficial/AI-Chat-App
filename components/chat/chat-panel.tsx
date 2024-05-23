import * as React from "react";

import { Button } from "@/components/ui/button";
import { IconShare } from "@/components/ui/icons";
import { FooterText } from "@components/chat/footer";
import { useActions, useUIState } from "ai/rsc";
import { UserMessage } from "./message";
import { PromptForm } from "./prompt-form";
import { AI } from "@lib/chat/actions";
import { nanoid } from "@lib/utils";
import { getSession } from "next-auth/react";

export interface ChatPanelProps {
  id?: string;
  title?: string;
  input: string;
  setInput: (value: string) => void;
}

export function ChatPanel({ id, title, input, setInput }: ChatPanelProps) {
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions();
  const [, setShareDialogOpen] = React.useState(false);

  React.useEffect(() => {
    const fetchSession = async () => {
      await getSession();
    };

    fetchSession();
  }, [messages]);

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
      <div className="mx-auto flex max-w-3xl flex-col bg-transparent sm:px-4">
        <div className="mb-4 grid w-full grid-cols-2 gap-4 bg-background px-6 text-center">
          {messages.length === 0 &&
            exampleMessages.map((example, index) => (
              <div
                key={example.heading}
                className={`w-full cursor-pointer rounded-lg border border-border/30 bg-background p-4 hover:bg-foreground/5 ${
                  index > 1 && "hidden md:block"
                }`}
                onClick={async () => {
                  setMessages((currentMessages) => [
                    ...currentMessages,
                    {
                      id: nanoid(),
                      display: <UserMessage>{example.message}</UserMessage>,
                    },
                  ]);

                  const responseMessage = await submitUserMessage(
                    example.message,
                    1,
                  );

                  setMessages((currentMessages) => [
                    ...currentMessages,
                    responseMessage,
                  ]);
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
          <div className="flex h-12 items-center justify-center">
            <div className="flex space-x-2 ">
              {id && title ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setShareDialogOpen(true)}
                  >
                    <IconShare className="mr-2" />
                    Share
                  </Button>
                </>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="space-y-2 bg-background px-4 pt-3 shadow-lg sm:rounded-t-xl sm:border sm:border-border/40 ">
          <PromptForm input={input} setInput={setInput} />
          <FooterText className="mt-0 hidden sm:block" />
        </div>
      </div>
    </div>
  );
}
