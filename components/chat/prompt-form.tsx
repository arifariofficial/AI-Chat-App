"use client";

import * as React from "react";
import { useActions, useUIState } from "ai/rsc";
import { type AI } from "@/lib/chat/actions";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEnterSubmit } from "@/lib/hooks/use-enter-submit";
import { useRouter } from "next/navigation";
import { IconArrowElbow, IconPlus } from "@components/ui/icons";
import { UserMessage } from "./message";
import { CircularProgress, InputAdornment, TextField } from "@mui/material";
import { nanoid } from "@lib/utils";
import { decrement } from "@lib/store/balanceSlice";
import { useAppDispatch } from "@lib/store/hook";

export function PromptForm({
  input,
  setInput,
  isLoading,
  setIsLoading,
}: {
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}) {
  const router = useRouter();
  const { formRef, onKeyDown, handleButtonClick } = useEnterSubmit();
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const { submitUserMessage } = useActions();
  const [, setMessages] = useUIState<typeof AI>();

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  React.useEffect(() => {
    const inputElement = document.getElementById("message");
    if (inputElement) {
      inputElement.setAttribute("spellCheck", "true");
      inputElement.setAttribute("lang", "fi-FI");
    }
  }, []);

  return (
    <form
      ref={formRef}
      onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        // Blur focus on mobile
        if (window.innerWidth < 600) {
          const messageElement = (
            e.target as HTMLFormElement
          ).elements.namedItem("message");
          if (messageElement instanceof HTMLElement) {
            messageElement.blur();
          }
        }

        const value = input.trim();
        setInput("");
        if (!value) return;

        // Optimistically add user message UI
        setMessages((currentMessages) => [
          ...currentMessages,
          {
            id: nanoid(),
            display: <UserMessage>{value}</UserMessage>,
          },
        ]);

        // Submit and get response message
        const responseMessage = await submitUserMessage(value);
        setMessages((currentMessages) => [...currentMessages, responseMessage]);
        setIsLoading(false);
        dispatch(decrement());
      }}
    >
      <div className="w-full resize-none  sm:text-sm">
        <TextField
          id="message"
          name="message"
          type="text"
          fullWidth
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          multiline
          minRows={1}
          maxRows={14}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Write a Message to SIPE..."
          helperText={`${input.length}/5000`}
          inputProps={{
            maxLength: 5000,
            spellCheck: true,
            lang: "fi-FI",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        router.push("/new");
                      }}
                      className="hidden drop-shadow-sm sm:block"
                    >
                      <IconPlus />
                      <span className="sr-only">New Chat</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>New Chat</TooltipContent>
                </Tooltip>
              </InputAdornment>
            ),

            endAdornment: (
              <InputAdornment position="end">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={handleButtonClick}
                      type="submit"
                      disabled={!isLoading && !input.trim()}
                    >
                      {isLoading ? (
                        <CircularProgress
                          size="20px"
                          className="text-foreground"
                        />
                      ) : (
                        <IconArrowElbow
                          fontSize="small"
                          className="text-foreground"
                        />
                      )}
                      <span className="sr-only">Send message</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Send message</TooltipContent>
                </Tooltip>
              </InputAdornment>
            ),
          }}
          sx={{
            color: "var(--foreground)",

            "& .MuiInputBase-root": {
              minHeight: "60px",
              display: "flex",
              alignItems: "end",
              borderRadius: "6px",
              py: 0,

              "& .MuiInputBase-input": {
                padding: "2px 16px",
                marginBottom: "14px",
              },
            },
            "& .MuiInputAdornment-positionEnd": {
              marginBottom: "29px",
            },
            "& .MuiInputAdornment-positionStart": {
              marginBottom: "29px",
            },
          }}
        />
      </div>
    </form>
  );
}
