"use client";

import { Button } from "@/components/ui/button";
import { IconCheck, IconCopy } from "@/components/ui/icons";
import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

interface ChatMessageActionsProps extends React.ComponentProps<"div"> {
  message: string;
}

export function ChatMessageActions({
  message,
  className,
  ...props
}: ChatMessageActionsProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(message);
  };

  return (
    <div className={cn("flex w-fit", className)} {...props}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="inherit"
            onClick={onCopy}
            className="bg-backgroundSecondary p-0 text-secondary hover:bg-backgroundSecondary active:bg-backgroundSecondary"
          >
            {isCopied ? (
              <IconCheck className="size-5 bg-backgroundSecondary" />
            ) : (
              <IconCopy className="size-6 bg-backgroundSecondary" />
            )}
            <span className="sr-only">Kopioi viesti</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Kopioi</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
