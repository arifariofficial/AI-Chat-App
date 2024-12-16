"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";

// Function to share a chat by generating a shareable path
export async function shareChat(id: string) {
  try {
    const session = await auth();

    // Check if the user is authorized
    if (!session?.user?.id) {
      return {
        error: "Unauthorized",
      };
    }

    // Retrieve the chat from the database
    const chat = await prisma.chat.findUnique({
      where: { id },
      include: { messages: true },
    });

    // Check if the chat exists and if it belongs to the user
    if (!chat || chat.userId !== session.user.id) {
      return {
        error: "Chat not found",
      };
    }

    // Update the chat with a new share path
    const updatedChat = await prisma.chat.update({
      where: { id },
      data: { sharePath: `/share/${chat.id}` },
      include: { messages: true },
    });

    // Return the updated chat with the new share path
    return updatedChat;
  } catch (error) {
    console.error("Error sharing chat:", error);
    return {
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}
