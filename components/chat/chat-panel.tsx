"use client";

import { FooterText } from "@/components/chat/footer";
import { useActions, useUIState } from "ai/rsc";
import { PromptForm } from "./prompt-form";
import { AI } from "@/lib/chat/actions";
import { cn, nanoid } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import { decrement } from "@/lib/store/balanceSlice";
import React, { useEffect, useRef, useState } from "react";
import UserMessage from "./user-message";

const STATIC_EXAMPLE_MESSAGES: ExampleMessage[] = [
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
  // Uudet viestit
  {
    heading: "Sain kielteisen päätöksen vammaistuesta",
    subheading:
      "vaikka minulla on lääkärinlausunto, miten voin valittaa päätöksestä?",
    message: `Sain kielteisen päätöksen vammaistuesta vaikka minulla on lääkärinlausunto. Miten voin valittaa päätöksestä?`,
  },
  {
    heading: "Pitkäaikaissairaus ja kuntoutustuki",
    subheading:
      "miten haen kuntoutustukea ja mitä etuuksia voin saada Kelalta?",
    message: `Olen pitkäaikaissairas. Miten haen kuntoutustukea ja mitä etuuksia voin saada Kelalta?`,
  },
  {
    heading: "Vammaispalveluiden myöntämisen kriteerit",
    subheading:
      "mitä palveluita voin saada ja miten hakuprosessi toimii kunnassani?",
    message: `Mitkä ovat vammaispalveluiden myöntämisen kriteerit? Mitä palveluita voin saada ja miten hakuprosessi toimii kunnassani?`,
  },
  {
    heading: "Kelalta evättiin sairauspäiväraha",
    subheading: "vaikka olen ollut sairauslomalla yli viikon, mitä voin tehdä?",
    message: `Kelalta evättiin sairauspäiväraha vaikka olen ollut sairauslomalla yli viikon. Mitä voin tehdä?`,
  },
  {
    heading: "Työkyvyttömyyseläkkeen hakeminen",
    subheading: "mitä edellytyksiä ja dokumentteja tarvitaan hakemukseen?",
    message: `Miten haen työkyvyttömyyseläkettä? Mitä edellytyksiä ja dokumentteja tarvitaan hakemukseen?`,
  },
];

export interface ChatPanelProps {
  input: string;
  setInput: (value: string) => void;
  isAtBottom: boolean;
  scrollToBottom: () => void;
  className?: string;
}

interface ExampleMessage {
  heading: string;
  subheading: string;
  message: string;
  animationClass?: string;
  animationDelay?: string;
  ref?: React.RefObject<HTMLDivElement>;
}

export function ChatPanel({ input, setInput, className }: ChatPanelProps) {
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const model = useAppSelector((state) => state.model);

  // Use state to store messages with refs
  const [messagesWithAnimations, setMessagesWithAnimations] = useState<
    (ExampleMessage & { ref: React.RefObject<HTMLDivElement> })[]
  >([]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const exampleMessages = STATIC_EXAMPLE_MESSAGES;

  function assignAnimations(
    array: ExampleMessage[],
    direction: "left" | "right",
  ): (ExampleMessage & { ref: React.RefObject<HTMLDivElement> })[] {
    const animationClass =
      direction === "left"
        ? "animate-slide-left-to-right"
        : "animate-slide-right-to-left";

    return array.map((item, index) => {
      const animationDelay = `${index * 0.02}s`; // Ensure no overlap with incremental delay
      const ref = React.createRef<HTMLDivElement>();
      return { ...item, animationClass, animationDelay, ref };
    });
  }

  useEffect(() => {
    function shuffleArray(array: ExampleMessage[]): ExampleMessage[] {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }

    const getRandomDirection = (): "left" | "right" => {
      return Math.random() < 0.5 ? "left" : "right";
    };

    const updateMessages = () => {
      const shuffledMessages = shuffleArray(exampleMessages);

      // Use a random direction for each render
      const randomDirection = getRandomDirection();

      const messagesWithRefs = assignAnimations(
        shuffledMessages,
        randomDirection,
      );
      setMessagesWithAnimations(messagesWithRefs);
    };

    updateMessages(); // Initial call
  }, [exampleMessages]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerWidth = container.offsetWidth;
      const containerScrollLeft = container.scrollLeft;

      messagesWithAnimations.forEach((message) => {
        const messageElement = message.ref?.current;
        if (!messageElement) return;

        const messageOffsetLeft = messageElement.offsetLeft;
        const messageWidth = messageElement.offsetWidth;

        // Center position of the message relative to the container
        const messageCenter =
          messageOffsetLeft - containerScrollLeft + messageWidth / 1.9;

        const containerCenter = containerWidth / 2;

        const distanceFromCenter = Math.abs(containerCenter - messageCenter);
        const maxDistance = containerWidth / 0.7;

        const normalizedDistance = Math.min(
          distanceFromCenter / maxDistance,
          1,
        );

        const scale = 1 - normalizedDistance * 0.5; // Scale from 1 to 0.5
        const opacity = 1 - normalizedDistance * 0.5; // Opacity from 1 to 0.5

        // Apply transform and opacity
        messageElement.style.transform = `scale(${scale})`;
        messageElement.style.opacity = `${opacity}`;
      });
    };

    container.addEventListener("scroll", handleScroll);

    // Initial call to set positions
    handleScroll();

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [messagesWithAnimations]);

  const userMessageId = nanoid();

  return (
    /* Chat Input container */
    <div className={cn(className, "mx-auto flex size-full flex-col")}>
      {messages.length === 0 && (
        <div
          ref={scrollContainerRef}
          className="scroll-container absolute bottom-[100px] z-50 flex w-full justify-start overflow-x-scroll pl-5 sm:bottom-[130px] sm:mb-4 sm:pl-12 md:pl-16"
        >
          <div className="flex max-w-screen-sm flex-row text-center">
            {messagesWithAnimations.map((example) => (
              <div
                key={example.heading}
                ref={example.ref}
                className={cn(
                  "w-[165px] shrink-0 cursor-pointer rounded-lg border border-border/40 p-1 shadow-sm transition-all duration-500 ease-out hover:bg-foreground/5 sm:w-[300px]",
                  example.animationClass,
                )}
                style={{ animationDelay: example.animationDelay }}
                onClick={async () => {
                  if (isLoading) return;
                  setIsLoading(true);
                  setMessages((currentMessages) => [
                    ...currentMessages,
                    {
                      id: userMessageId,
                      role: "user",
                      display: (
                        <UserMessage
                          content={example.message}
                          userMessageId={userMessageId}
                        />
                      ),
                    },
                  ]);

                  try {
                    const responseMessage = await submitUserMessage({
                      userMessageId: userMessageId,
                      content: example.message,
                      model: model.model,
                    });
                    setMessages((currentMessages) => [
                      ...currentMessages,
                      responseMessage,
                    ]);
                  } catch (error) {
                    console.error("Failed to submit user message:", error);
                  } finally {
                    setIsLoading(false);
                    dispatch(decrement());
                  }
                }}
              >
                <div className="text-xs font-semibold text-foreground sm:text-sm">
                  {example.heading}
                </div>
                <div className="text-xs text-foreground sm:text-sm">
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
