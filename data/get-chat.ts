import prisma from "@lib/prisma";
import redis from "@lib/redis";

export async function getChat(id: string, userId: string) {
  const chatKey = `chat:${id}`;

  try {
    const chat = await getCachedChat(chatKey);
    if (chat && chat.userId === userId) {
      return chat;
    } else {
      console.log(
        `Cache miss or user ID mismatch for chat ${id}. User ID from cache: ${
          chat ? chat.userId : "No chat"
        }`
      );
    }
  } catch (error) {
    console.error(`Failed to retrieve chat from cache for ${id}:`, error);
  }

  return await fetchChatFromDB(id, userId);
}

async function fetchChatFromDB(id: string, userId: string) {
  const chat = await prisma.chat.findUnique({
    where: { id },
    include: { messages: true },
  });

  if (!chat || chat.userId !== userId) {
    console.log(
      `No chat found or user ID mismatch in DB fetch: Chat ID ${id}, User ${userId}`
    );
    return null;
  }

  try {
    const chatKey = `chat:${id}`;
    await redis.hset(chatKey, "data", JSON.stringify(chat));
  } catch (cacheError) {
    console.error(`Failed to cache chat ${id} in Redis:`, cacheError);
  }

  return chat;
}

async function getCachedChat(chatKey: string) {
  try {
    const cachedData = await redis.hget(chatKey, "details");
    if (cachedData) {
      try {
        return JSON.parse(cachedData);
      } catch (parseError) {
        console.error(`Error parsing JSON from Redis for ${chatKey}:`, parseError);
        throw new Error("Failed to parse chat data from Redis");
      }
    } else {
      console.log(`No cached data found for ${chatKey}`);
    }
  } catch (error) {
    console.error(`Error retrieving data from Redis for ${chatKey}:`, error);
  }
  return null;
}
