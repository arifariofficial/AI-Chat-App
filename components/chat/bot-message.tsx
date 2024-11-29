"use client";

import { cn } from "@/lib/utils";
import { useStreamableText } from "@/lib/hooks/use-streamable-text";
import { StreamableValue } from "ai/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { IconEdit } from "@/components/ui/icons";
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
import { useRouter } from "next/navigation";
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
        "relative flex w-full flex-col items-start font-medium text-foreground",
        className,
      )}
    >
      <div className="flex">
        <div className="flex size-[25px] shrink-0 select-none items-center justify-center rounded-full border border-foreground/90 text-foreground/90 shadow-sm">
          <LocalLibrary className="mb-px p-[2px]" />
        </div>
        <div className="flex flex-row items-start">
          <h1 className="mx-3 -mt-1 text-lg font-semibold text-foreground/90">
            Sipe
          </h1>
          {/* Add edit message */}
          {session?.user?.role === Role.EDITOR && (
            <Button
              variant="ghost"
              className="mx-2 -mt-1 h-full bg-backgroundSecondary p-0 hover:text-secondary"
              onClick={handleEditMessage}
            >
              <IconEdit className="size-5" />
            </Button>
          )}
        </div>
      </div>
      {/* copy + bot message container */}
      <div className="size-full pl-9">
        {isEditing ? (
          <div className="flex w-full flex-col gap-2">
            <Textarea
              className="flex-grow resize-none overflow-hidden p-0 px-px text-base focus:border-foreground/20"
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
