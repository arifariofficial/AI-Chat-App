"use client";

import * as React from "react";
import { toast } from "sonner";
import { ServerActionResult } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IconSpinner } from "@/components/ui/icons";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

interface ClearHistoryProps {
  isEnabled: boolean;
  clearChats: () => ServerActionResult<void>;
  session?: Session;
}

export function ClearHistory({
  isEnabled = false,
  clearChats,
}: ClearHistoryProps) {
  const [open, setOpen] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild className="flex w-full self-center">
        <Button variant="outline" disabled={!isEnabled || isPending}>
          {isPending && <IconSpinner className="mr-2" />}
          Delete Chat History
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[300px] rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete your conversation message.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            variant="outline"
            onClick={(event) => {
              event.preventDefault();
              startTransition(() => {
                clearChats().then((result) => {
                  if (result && "error" in result) {
                    toast.error(result.error);
                    return;
                  }
                  setOpen(false);
                  // Ensure navigation and chat loading happen sequentially
                  router.push("/chat");
                });
              });
            }}
          >
            {isPending && <IconSpinner className="mr-2 animate-spin" />}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
