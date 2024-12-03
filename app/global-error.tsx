"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.log("global-error: ", error);

  return (
    <html className="h-full w-full bg-background text-foreground">
      <body className="flex h-full w-full items-center justify-center">
        <div className="max-w-lg space-y-6 rounded-lg border border-border bg-card p-6 text-center shadow-md">
          <h1 className="text-2xl font-bold">Oops! Something went wrong</h1>
          <p className="text-sm text-muted-foreground">
            We encountered an unexpected error. Please try again or contact
            support if the problem persists.
          </p>
          <pre className="overflow-x-auto rounded-md bg-muted p-4 text-left text-xs">
            {error.digest ?? error.message}
          </pre>
          <Button onClick={() => reset()} className="w-full" variant="outline">
            Try Again
          </Button>
        </div>
      </body>
    </html>
  );
}
