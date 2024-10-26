import { FooterText } from "@/components/chat/footer";
import { useActions, useUIState } from "ai/rsc";
import { UserMessage } from "./message";
import { PromptForm } from "./prompt-form";
import { AI } from "@/lib/chat/actions";
import { cn, nanoid } from "@/lib/utils";
import { useAppDispatch } from "@/lib/store/hook";
import { decrement } from "@/lib/store/balanceSlice";
import { useState } from "react";

export interface ChatPanelProps {
  input: string;
  setInput: (value: string) => void;
  isAtBottom: boolean;
  scrollToBottom: () => void;
  className?: string;
}

export function ChatPanel({ input, setInput, className }: ChatPanelProps) {
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions();
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const exampleMessages = [
    {
      heading: "Olin vakavassa liikenneonnettomuudessa",
      subheading:
        "ja kärsin pysyvästä vammasta. Mitä korvauksia voin saada vakuutusyhtiöltä ja Kelalta?",
      message: `Olen ollut vakavassa liikenneonnettomuudessa ja kärsin pysyvästä vammasta. Mitä korvauksia voin saada vakuutusyhtiöltä ja Kelalta?`,
    },
    {
      heading: "Vakuutusyhtiö kieltäytyy maksamasta",
      subheading:
        "tapaturmavakuutuksen korvauksia lääkärintodistuksista huolimatta, mitä tehdä?",
      message: `Vakuutusyhtiö kieltäytyy maksamasta tapaturmavakuutuksen korvauksia lääkärintodistuksista huolimatta, mitä tehdä?`,
    },
    {
      heading: "Minulla on tapaturmavakuutus joka katta",
      subheading:
        "työkyvyttömyyden, mutta vakuutusyhtiö ei maksa ansionmenetyskorvausta. Miten voin valittaa?",
      message: `Minulla on tapaturmavakuutus, joka kattaa työkyvyttömyyden, mutta vakuutusyhtiö ei maksa ansionmenetyskorvausta. Miten voin valittaa?`,
    },
    {
      heading: "Vakuutusyhtiö kieltäytyi maksamasta",
      subheading:
        "hoitokuluja sairauskuluvakuutuksesta. Onko oikeutta korvaukseen, miten tulisi edetä?",
      message: `Vakuutusyhtiö kieltäytyi maksamasta hoitokuluja sairauskuluvakuutuksesta. Onko oikeutta korvaukseen, miten tulisi edetä?`,
    },
  ];

  return (
    /* Chat Input container */
    <div className={cn(className, "mx-auto flex size-full flex-col")}>
      {messages.length === 0 && (
        /* Example message outer container absolute */
        <div className="scroll-container absolute bottom-[100px] flex w-full justify-start overflow-x-scroll pl-5 sm:bottom-[130px] sm:mb-4 sm:pl-12 md:pl-16">
          {/* Inner container for example message */}
          <div className="z-50 flex max-w-screen-sm flex-row gap-2 text-center">
            {exampleMessages.map((example) => (
              <div
                key={example.heading}
                /* example meassage container */
                className={`sm:block" } z-50 w-[165px] shrink-0 cursor-pointer rounded-lg border border-border/30 p-1 shadow-sm hover:bg-foreground/5 sm:w-[300px]`}
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
            {/* Empty div to create extra space at the end */}
            <div className="w-[100px] shrink-0" />
          </div>
        </div>
      )}

      <div className="space-y-2 bg-inherit px-4 drop-shadow-xl sm:mx-10 sm:rounded-t-xl sm:border sm:border-foreground/20">
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
