"use client";

import * as React from "react";
import { toast } from "sonner";
import { useChat } from "@/lib/hooks/use-chat";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard";
import { IconSpinner } from "@/components/ui/icons";
import { Chat } from "@/lib/types";

export function ChatShareDialog() {
  const {
    chatToShare,
    setShareDialogOpen,
    shareDialogOpen,
    shareChatFunction,
  } = useChat();
  const { copyToClipboard } = useCopyToClipboard({ timeout: 1000 });
  const [isSharePending, startShareTransition] = React.useTransition();

  const copyShareLink = React.useCallback(
    async (chat: Chat) => {
      if (!chat.sharePath) {
        toast.error("Could not copy share link to clipboard");
        return;
      }

      const url = new URL(window.location.href);
      url.pathname = chat.sharePath;
      copyToClipboard(url.toString());
      setShareDialogOpen(false);
      toast.success("Share link copied to clipboard");
    },
    [copyToClipboard, setShareDialogOpen],
  );

  const handleShareChat = React.useCallback(() => {
    if (!chatToShare?.id) {
      toast.error("Chat ID is missing. Cannot share this chat.");
      return;
    }
    startShareTransition(() => {
      (async () => {
        try {
          const result = await shareChatFunction(chatToShare?.id);

          if ("error" in result) {
            toast.error(result.error as string);
            return;
          }

          copyShareLink(result);
        } catch (error) {
          console.error("Failed to share chat:", error);
          toast.error("Failed to share chat");
        }
      })();
    });
  }, [chatToShare, copyShareLink, shareChatFunction]);

  if (!chatToShare) {
    return null; // Don't render if there's no chat to share
  }

  return (
    <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
      <DialogContent className="w-[400px] rounded-md sm:w-[700px]">
        <DialogHeader>
          <DialogTitle>Share a link to the chat</DialogTitle>
          <DialogDescription>
            Anyone with the URL can view the shared discussion.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-1 rounded-md border p-4 text-sm">
          <ul className="font-medium">
            {chatToShare.messages.length > 0 && (
              <li key={0}>{chatToShare.messages[0].content}</li>
            )}
          </ul>
          <div className="text-muted-foreground">
            {chatToShare.messages.length} messages
          </div>
        </div>
        <DialogFooter className="items-center">
          <Button disabled={isSharePending} onClick={handleShareChat}>
            {isSharePending ? (
              <>
                <IconSpinner className="mr-2 animate-spin" />
                Copying...
              </>
            ) : (
              <>Copy Link</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
