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
            variant="ghost"
            onClick={onCopy}
            className="active:bg-backgroundd bg-inherit hover:text-secondary"
          >
            {isCopied ? <IconCheck /> : <IconCopy />}
            <span className="sr-only">Copy message</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Copy</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
