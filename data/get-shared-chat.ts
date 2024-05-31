"use server";

import prisma from "@lib/prisma";
import redis from "@lib/redis";

export async function getSharedChat(id: string) {
  const cacheKey = `sharedChat:${id}`;

  try {
    // Attempt to retrieve the chat from the cache
    const cachedChat = await redis?.get(cacheKey);
    if (cachedChat) {
      const chat = JSON.parse(cachedChat);
      if (chat.sharePath) {
        // Ensure the shared path exists in the cached data
        return chat;
      }
    }

    // Fetch the chat from the database if not found in cache
    const chat = await prisma.chat.findUnique({
      where: { id },
      include: { messages: true },
    });

    if (!chat || !chat.sharePath) {
      // Return null if chat does not exist or does not have a share path
      return null;
    }

    // Cache the chat if it has a sharePath and was fetched from the database
    await redis?.set(cacheKey, JSON.stringify(chat), "EX", 60 * 30); // Cache for 30 minutes

    return chat;
  } catch (error) {
    // Log the error and return null in case of any unexpected issues
    console.error("Error fetching shared chat:", error);
    return null;
  }
}
