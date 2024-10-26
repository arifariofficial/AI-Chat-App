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
import { useChats } from "@/lib/hooks/useChats";
import { Session } from "next-auth";

interface ClearHistoryProps {
  isEnabled: boolean;
  clearChats: () => ServerActionResult<void>;
  session?: Session;
}

export function ClearHistory({
  isEnabled = false,
  clearChats,
  session,
}: ClearHistoryProps) {
  const [open, setOpen] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();
  const { loadChats } = useChats();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild className="flex w-full self-center">
        <Button variant="outline" disabled={!isEnabled || isPending}>
          {isPending && <IconSpinner className="mr-2" />}
          Tyhjennä historia
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Oletko aivan varma?</AlertDialogTitle>
          <AlertDialogDescription>
            Tämä poistaa keskusteluviestisi pysyvästi ja poistaa tietosi
            palvelimiltamme.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Peruuta</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            variant="outline"
            onClick={(event) => {
              event.preventDefault();
              startTransition(async () => {
                const result = await clearChats();
                if (result && "error" in result) {
                  toast.error(result.error);
                  return;
                }
                setOpen(false);
                // Ensure navigation and chat loading happen sequentially
                router.push("/new");
              });
            }}
          >
            {isPending && <IconSpinner className="mr-2 animate-spin" />}
            Poista
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
