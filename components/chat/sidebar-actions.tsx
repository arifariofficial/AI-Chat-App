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
import { IconShare, IconSpinner, IconTrash } from "@/components/ui/icons";
import { ChatShareDialog } from "./chat-share-dialog";
import { useChats } from "@/lib/hooks/useChats";
import { useSession } from "next-auth/react";

interface SidebarActionsProps {
  chat: Chat;
  removeChat: (args: { id: string; path: string }) => ServerActionResult<void>;
  shareChat: (id: string) => ServerActionResult<Chat>;
}
export function SidebarActions({
  chat,
  removeChat,
  shareChat,
}: SidebarActionsProps) {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false);
  const [isRemovePending, startRemoveTransition] = React.useTransition();
  const { loadChats } = useChats();
  const { data: session } = useSession();

  return (
    <>
      <div className="space-x-2 pr-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="size-7 p-0"
              onClick={() => setShareDialogOpen(true)}
            >
              <IconShare />
              <span className="sr-only">Share</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Share chat</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="size-7 p-0"
              disabled={isRemovePending}
              onClick={() => setDeleteDialogOpen(true)}
            >
              <IconTrash />
              <span className="sr-only">Delete</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete chat</TooltipContent>
        </Tooltip>
      </div>
      <ChatShareDialog
        chat={chat}
        shareChat={shareChat}
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        onCopy={() => setShareDialogOpen(false)}
      />
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
