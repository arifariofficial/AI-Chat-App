"use server";

import prisma from "@lib/prisma";
import redis from "@lib/redis";
import { auth } from "@/auth";

export async function shareChat(id: string) {
  try {
    const session = await auth();

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

    // Update the cache with the new chat data
    const cacheKey = `chat:${id}`;
    await redis?.set(cacheKey, JSON.stringify(updatedChat), "EX", 60 * 30); // Cache for 30 minutes
    // Optionally, update a shared chats listing if applicable
    const sharedChatsKey = `sharedChats:${session.user.id}`;
    await redis?.del(sharedChatsKey); // Invalidate the cache of shared chats list

    return updatedChat;
  } catch (error) {
    console.error("Error sharing chat:", error);
    return {
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}
