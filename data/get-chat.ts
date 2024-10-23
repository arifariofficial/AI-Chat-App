"use server";

import prisma from "@lib/prisma";
import redis from "@lib/redis";
import { Chat } from "@lib/types";
export async function getChats(userId?: string | null): Promise<Chat[]> {
  if (!userId) {
    console.log("No user ID provided.");
    return [];
  }

  const cacheKey = `user:${userId}:chats`;

  try {
    const cachedChats = await redis?.get(cacheKey);
    if (cachedChats) {
      const parsedChats = JSON.parse(cachedChats);
      return parsedChats.map((chat: Chat) => ({
        ...chat,
        createdAt: chat.createdAt ? new Date(chat.createdAt) : null,
        messages: chat.messages.map((message) => ({
          ...message,
          createdAt: new Date(message.createdAt || Date.now()),
        })),
      }));
    }

    const chats = await prisma.chat.findMany({
      where: { userId },
      include: { messages: true },
      orderBy: { createdAt: "desc" },
    });

    const serializedChats = chats.map((chat) => ({
      ...chat,
      createdAt: chat.createdAt ? chat.createdAt.toISOString() : null,
      messages: chat.messages.map((message) => ({
        ...message,
        createdAt: message.createdAt.toISOString(),
      })),
    }));

    await redis?.set(cacheKey, JSON.stringify(serializedChats), "EX", 5); // Cache for 5 minutes

    return chats.map((chat) => ({
      ...chat,
      createdAt: chat.createdAt ? new Date(chat.createdAt) : null,
      messages: chat.messages.map((message) => ({
        ...message,
        createdAt: new Date(message.createdAt || Date.now()),
      })),
    }));
  } catch (error) {
    console.error("Error retrieving chats:", error);
    return [];
  }
}
export async function getChat(id: string, userId: string) {
  const chatKey = `chat:${id}`;

  try {
    const chat = await getCachedChat(chatKey);
    if (chat && chat.userId === userId) {
      return chat;
    }
  } catch (error) {
    console.error(`Failed to retrieve chat from cache for ${id}:`, error);
  }

  return await fetchChatFromDB(id, userId);
}

async function fetchChatFromDB(id: string, userId: string) {
  try {
    const chat = await prisma.chat.findUnique({
      where: { id },
      include: { messages: true },
    });

    if (!chat) {
      console.log(`No chat found with ID ${id} in the database.`);
      return null;
    }

    if (chat.userId !== userId) {
      console.log(
        `User ID mismatch: chat user ID ${chat.userId}, request user ID ${userId}`,
      );
      return null;
    }

    const chatKey = `chat:${id}`;
    await redis?.hset(chatKey, "details", JSON.stringify(chat));
    //console.log(`Chat ${id} cached successfully.`);
    return chat;
  } catch (error) {
    console.error(`Error fetching chat from database for ${id}:`, error);
    return null;
  }
}

async function getCachedChat(chatKey: string) {
  try {
    const cachedData = await redis?.hget(chatKey, "details");
    if (cachedData) {
      return JSON.parse(cachedData);
    } else {
      // console.log(`No cached data found for ${chatKey}`);
    }
  } catch (error) {
    console.error(`Error retrieving data from Redis for ${chatKey}:`, error);
  }
  return null;
}
