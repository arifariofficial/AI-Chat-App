import React from "react";

import { cn } from "@/lib/utils";

export function FooterText({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "!mb-1 !mt-0 flex px-2 text-center text-xs text-muted-foreground",
        className,
      )}
      {...props}
    >
      SipeAI: Sinun oikeudellinen tekoälyneuvoja
    </p>
  );
}
