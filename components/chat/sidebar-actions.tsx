"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";

import { ServerActionResult, type Chat } from "@/lib/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconSpinner, IconTrash } from "@/components/ui/icons";
import { useChat } from "@/lib/hooks/use-chat";
import { useSession } from "next-auth/react";
import { removeChat } from "@/data/chat";

interface SidebarActionsProps {
  chat: Chat;
  removeChat: (args: { id: string; path: string }) => ServerActionResult<void>;
}
export function SidebarActions({ chat }: SidebarActionsProps) {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [isRemovePending, startRemoveTransition] = React.useTransition();
  const { loadChats } = useChat();
  const { data: session } = useSession();

  return (
    <>
      <div className="space-x-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="size-7 p-0"
              disabled={isRemovePending}
              onClick={() => setDeleteDialogOpen(true)}
            >
              <IconTrash />
              <span className="sr-only">Poista</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="-translate-x-10 transform">
            Poista keskustelu
          </TooltipContent>
        </Tooltip>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Oletko aivan varma?</AlertDialogTitle>
            <AlertDialogDescription>
              Tämä poistaa keskusteluviestisi pysyvästi ja poistaa tietosi
              palvelimiltamme.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isRemovePending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isRemovePending}
              onClick={(event) => {
                event.preventDefault();

                startRemoveTransition(async () => {
                  const result = await removeChat({
                    id: chat.id,
                    path: chat.path,
                  });

                  if (result && "error" in result) {
                    toast.error(result.error);
                    return;
                  }

                  setDeleteDialogOpen(false);
                  router.refresh();
                  router.push("/chat");
                  toast.success("Chat deleted");
                  loadChats(session?.user?.id ?? "");
                });
              }}
            >
              {isRemovePending && <IconSpinner className="mr-2 animate-spin" />}
              Poista
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
