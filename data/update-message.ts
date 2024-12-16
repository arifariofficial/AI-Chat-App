import prisma from "@/lib/prisma";

// Update the content of a specific message in a chat
export async function updateMessageContent(
  chatId: string,
  messageId: string,
  newContent: string,
) {
  try {
    const result = await prisma.message.updateMany({
      where: {
        id: messageId,
        chatId: chatId,
      },
      data: {
        edited: newContent,
      },
    });

    if (result.count === 0) {
      throw new Error("Message not found or failed to update.");
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating message content:", error);
    throw error;
  }
}
