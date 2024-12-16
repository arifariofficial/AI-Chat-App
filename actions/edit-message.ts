"use server";

import { auth } from "@/auth";
import { getChat } from "@/data/get-chat";
import { updateMessageContent } from "@/data/update-message";

export async function editMessage(
  userId: string,
  messageId: string,
  content: string,
  chatId: string,
) {
  const session = await auth();

  // Confirm user session for authorization
  if (!session?.user?.id) {
    console.error("Unauthorized: Session missing or invalid.");
    throw new Error("Unauthorized");
  }

  if (session.user.id !== userId) {
    console.error(
      "Unauthorized: Session user ID does not match provided user ID.",
    );
    throw new Error("Unauthorized");
  }

  // Retrieve chat to confirm user ownership
  const chat = await getChat(chatId, userId);
  if (!chat) {
    console.error(
      "Chat not found or user is not authorized to edit this chat.",
    );
    throw new Error("Chat not found");
  }

  // Find message within chat by messageId
  const message = chat.messages.find((msg) => msg.id === messageId);
  if (!message) {
    console.error("Message not found in chat.");
    throw new Error("Message not found");
  }

  try {
    // Call the function to update the message content in the database
    await updateMessageContent(chatId, messageId, content);

    console.log("Message content updated successfully.");
    return { success: true };
  } catch (error) {
    console.error("Failed to update message content:", error);
    throw error;
  }
}
