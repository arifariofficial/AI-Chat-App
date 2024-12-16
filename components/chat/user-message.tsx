"use client";

import { useState } from "react";
import { IconPencil, UserIcon } from "@/components/ui/icons";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useAppSelector } from "@/lib/store/hook";
import { useActions, useUIState } from "ai/rsc";
import { AI } from "@/lib/chat/actions";
import { usePathname } from "next/navigation";

interface UserMessageProps {
  content: string;
  userMessageId: string;
}

export default function UserMessage({
  content,
  userMessageId,
}: UserMessageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const model = useAppSelector((state) => state.model);
  const { submitUserMessage } = useActions();
  const [, setMessages] = useUIState<typeof AI>();
  const path = usePathname();

  // Check if the path includes 'share'
  const isSharePath = path.includes("share");

  const handleSave = async () => {
    if (isSubmitting) return; // Prevent duplicate submissions

    if (editContent.trim() === "") {
      alert("Täytä viesti");
      return;
    }
    setIsSubmitting(true);
    // Update the existing user message in UI state
    setMessages((currentMessages) =>
      currentMessages.map((msg) =>
        msg.id === userMessageId
          ? {
              ...msg,
              display: (
                <UserMessage
                  content={editContent}
                  userMessageId={userMessageId}
                />
              ),
            }
          : msg,
      ),
    );

    setMessages((currentMessages) => {
      // Find the index of the message with the matching id
      const targetIndex = currentMessages.findIndex(
        (msg) => msg.id === userMessageId,
      );

      if (targetIndex === -1) {
        // If the message is not found, return the current messages
        console.log("Message ID not found:", userMessageId);
        return currentMessages;
      }

      // Keep messages up to and including the matching message
      return currentMessages.filter((msg, index) => {
        // Keep all messages before the matching index
        if (index < targetIndex) return true;

        // Keep the matching message if its role is 'user'
        if (index === targetIndex && msg.role === "user") return true;

        // Delete everything else after the targetIndex
        return false;
      });
    });

    // Submit and get new AI response
    try {
      const responseMessage = await submitUserMessage({
        content: editContent,
        model: model.model,
        userMessageId,
        editAIState: true,
      });
      setMessages((currentMessages) => [...currentMessages, responseMessage]);
      setIsEditing(false);
    } catch (error) {
      console.error("Error submitting user message:", error);
    } finally {
      setIsSubmitting(false); // Reset the flag
    }
  };

  return (
    <div className="group relative flex flex-col">
      <div className="flex flex-row">
        <div className="flex size-[24px] shrink-0 select-none items-center justify-center rounded-full border border-border text-foreground/90 shadow-sm">
          <UserIcon className="p-[2px]" fill="currentColor" />
        </div>
        <h1 className="mx-3 -mt-1 text-lg font-semibold text-foreground">
          Sinä
        </h1>
        {/* Conditionally render the pencil icon based on the path */}
        {!isEditing && !isSharePath && (
          <div className="absolute -right-9 top-7 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="rounded-full p-1 hover:bg-foreground/10"
            >
              <IconPencil className="h-5 w-5 text-foreground/90" />
            </Button>
          </div>
        )}
      </div>

      <div className="ml-6 flex-1 space-y-2 overflow-hidden rounded-3xl bg-foreground/5 p-2 px-5">
        {isEditing ? (
          <div className="flex flex-col space-y-2">
            <Textarea
              value={editContent}
              className="w-full resize-none rounded-md border-none p-2 text-base text-foreground shadow-none focus:border-none focus-visible:ring-0"
              rows={1}
              onChange={(e) => {
                setEditContent(e.target.value);
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
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="px-3 py-1"
              >
                Peruuta
              </Button>
              <Button
                variant="outline"
                onClick={handleSave}
                className="px-3 py-1"
              >
                Lähetä
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-base text-foreground/90">{content}</p>
        )}
      </div>
    </div>
  );
}
