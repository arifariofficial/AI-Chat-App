"use client";

import { cn } from "@/lib/utils";
import { useStreamableText } from "@/lib/hooks/use-streamable-text";
import { StreamableValue } from "ai/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { IconPencil } from "@/components/ui/icons";
import LocalLibrary from "@mui/icons-material/LocalLibrary";
import { MemoizedReactMarkdown } from "./markdown";
import { ChatMessageActions } from "./chat-message-actions";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { startTransition, useEffect, useState } from "react";
import { editMessage } from "@/actions/edit-message";
import { getChat } from "@/data/get-chat";
import { Chat } from "@/lib/types";
import { usePathname, useRouter } from "next/navigation";
import { Role } from "@/types";

export function BotMessage({
  content,
  botMessageId,
  chatId,
  className,
}: {
  content: string | StreamableValue<string>;
  botMessageId: string;
  chatId?: string;
  className?: string;
}) {
  const { text, isStreamingDone } = useStreamableText(content);
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [chat, setChat] = useState<Chat | null>(null);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const path = usePathname();

  // Check if the path includes 'share'
  const isSharePath = path.includes("share");

  useEffect(() => {
    let isMounted = true;
    (async () => {
      // Fetch chat data
      if (isMounted) {
        const userId = session?.user.id ?? "";
        if (chatId) {
          try {
            const chatData = await getChat(chatId, userId);
            setChat(chatData);
          } catch (error) {
            console.error("Error fetching chat data:", error);
          }
        }
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [chatId, session?.user.id]);

  useEffect(() => {
    if (isStreamingDone && text) {
      setEditedContent(text);
    }
  }, [isStreamingDone, text]);

  const handleEditMessage = () => {
    setIsEditing(true);
  };
  if (!session && chat?.sharePath) {
    return null;
  }

  const handleSaveEditedContent = async () => {
    if (isSubmitting) return; // Prevent duplicate submissions

    if (editedContent.trim() === "") {
      alert("Täytä viesti");
      return;
    }
    setIsSubmitting(true);

    const userId = session?.user.id ?? "";
    if (!userId || !botMessageId || !chatId) {
      console.warn("Missing required parameters for saving content.");
      return;
    }

    if (!editedContent.trim()) {
      console.warn("Edited content is empty. Aborting save operation.");
      return;
    }

    startTransition(async () => {
      try {
        await editMessage(userId, botMessageId, editedContent, chatId);
        setIsEditing(false);

        setChat((prevChat) => {
          if (!prevChat) return null;
          return {
            ...prevChat,
            messages: prevChat.messages.map((message) =>
              message.id === botMessageId
                ? { ...message, edited: editedContent }
                : message,
            ),
          };
        });

        router.refresh();
      } catch (error) {
        console.error("Failed to save edited content:", error);
      } finally {
        setIsSubmitting(false);
      }
    });
  };

  const editedMessage = chat?.messages?.find(
    (message) => message.id === botMessageId && message.edited !== null,
  );

  return (
    /* Bot message container */
    <div
      className={cn(
        "group relative flex w-full flex-col items-start font-medium text-foreground",
        className,
      )}
    >
      <div className="flex">
        <div className="flex size-[25px] shrink-0 select-none items-center justify-center rounded-full border border-border text-foreground/90 shadow-sm">
          <LocalLibrary className="mb-px p-[2px]" />
        </div>
        <div className="flex flex-row items-start">
          <div className="mx-3 -mt-1 text-lg font-semibold text-foreground">
            <p className="inline-flex items-end font-bold">
              <span>SIPE</span>
              <span className="mb-[3px] align-baseline text-sm font-light">
                AI
              </span>
            </p>
          </div>

          {/* Add edit message */}
          {session?.user?.role === Role.EDITOR && !isSharePath && (
            <div className="absolute -right-9 top-7 opacity-0 transition-opacity group-hover:opacity-100">
              <Button
                variant="outline"
                onClick={handleEditMessage}
                className="rounded-full p-1 hover:bg-foreground/10"
              >
                <IconPencil className="h-5 w-5 text-foreground/90" />
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* copy + bot message container */}
      <div className="size-full pl-9">
        {isEditing ? (
          <div className="flex w-full flex-col gap-2">
            <Textarea
              className="w-full resize-none rounded-md border-border/20 p-2 text-base text-foreground shadow-none focus:border-foreground/40 focus-visible:ring-0"
              rows={1}
              value={editedContent}
              onChange={(e) => {
                setEditedContent(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              ref={(textarea) => {
                if (textarea) {
                  textarea.style.height = "auto"; // Reset the height
                  textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scroll height
                }
              }}
            />
            <div className="flex flex-row gap-2">
              <Button
                variant="outline"
                className="w-24 active:bg-backgroundSecondary"
                onClick={() => setIsEditing(false)}
              >
                Peruuta
              </Button>
              <Button
                variant="outline"
                className="w-24 active:bg-backgroundSecondary"
                onClick={handleSaveEditedContent}
              >
                Tallenna
              </Button>
            </div>
          </div>
        ) : (
          <MemoizedReactMarkdown
            className="prose w-full max-w-none dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
            remarkPlugins={[remarkGfm, remarkMath]}
            components={{
              p({ children }) {
                /* Bot messages most inner*/
                return <p className="mb-2 w-full p-2 last:mb-0">{children}</p>;
              },
            }}
          >
            {editedMessage ? editedMessage.edited : text}
          </MemoizedReactMarkdown>
        )}

        {isStreamingDone &&
          !isEditing &&
          (editedMessage ? (
            <ChatMessageActions message={editedMessage.edited ?? text ?? ""} />
          ) : (
            <ChatMessageActions message={text} />
          ))}

        {/* Render edited content if any */}
        {editedMessage && (
          <div className="edited-message">
            <h1 className="mt-4 font-bold">Alkuperäinen vastaus</h1>
            <MemoizedReactMarkdown
              className="prose w-full max-w-none dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
              remarkPlugins={[remarkGfm, remarkMath]}
              components={{
                p({ children }) {
                  return <p className="w-full">{children}</p>;
                },
              }}
            >
              {editedMessage.content}
            </MemoizedReactMarkdown>
            <ChatMessageActions message={editedMessage.content} />
          </div>
        )}
      </div>
    </div>
  );
}
