import React, { useState, useEffect } from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

interface FormErrorProps {
  message?: string;
  time?: boolean;
  className?: string;
}

export const FormError = ({
  message,
  time = true,
  className,
}: FormErrorProps) => {
  const [visibleMessage, setVisibleMessage] = useState<string | undefined>(
    message,
  );

  useEffect(() => {
    setVisibleMessage(message);

    let timer: ReturnType<typeof setTimeout> | null = null;

    if (time) {
      timer = setTimeout(() => {
        setVisibleMessage(undefined);
      }, 5000);
    }

    return () => {
      if (time && timer !== null) clearTimeout(timer);
    };
  }, [message, time]);

  if (!visibleMessage) return null;
  return (
    <div
      className={cn(
        className,
        "flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive",
      )}
    >
      <ExclamationTriangleIcon className="size-4" />
      <p>{visibleMessage}</p>
    </div>
  );
};
