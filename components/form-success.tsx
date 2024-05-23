import { Typography } from "@mui/material";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

interface FormSuccessProps {
  message?: string;
  time?: boolean;
}

export const FormSucccess = ({ message, time = true }: FormSuccessProps) => {
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
    <div className="border/30 mb-4 flex flex-row items-center gap-x-2 rounded-md bg-emerald-500/15  p-3 text-sm text-emerald-500">
      <CheckCircledIcon />
      <Typography variant="body2">{visibleMessage}</Typography>
    </div>
  );
};
