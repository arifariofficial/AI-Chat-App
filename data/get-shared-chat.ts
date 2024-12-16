"use server";

import prisma from "@/lib/prisma";

// Function to retrieve a shared chat by ID
export async function getSharedChat(id: string) {
  try {
    // Fetch the chat from the database
    const chat = await prisma.chat.findUnique({
      where: { id },
      include: { messages: true },
    });

    // Ensure the chat exists and has a sharePath
    if (!chat || !chat.sharePath) {
      return null;
    }

    return chat;
  } catch (error) {
    // Log the error and return null in case of any unexpected issues
    console.error("Error fetching shared chat:", error);
    return null;
  }
}
