"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import prisma from "@lib/prisma";
import redis from "@lib/redis";

export async function getChats(userId?: string | null) {
  if (!userId) {
    console.log("No user ID provided.");
    return [];
  }

  try {
    const cacheKey = `user:${userId}:chats`;
    const cachedChats = await redis.get(cacheKey);
    if (cachedChats) {
      return JSON.parse(cachedChats);
    }

    const chats = await prisma.chat.findMany({
      where: { userId },
      include: { messages: true },
      orderBy: { createdAt: "desc" },
    });

    await redis.set(cacheKey, JSON.stringify(chats), "EX", 60 * 5); // Cache for 5 minutes
    return chats;
  } catch (error) {
    console.error("Error retrieving chats:", error);
    return [];
  }
}

export async function removeChat({ id, path }: { id: string; path: string }) {
  const session = await auth();

  if (!session || !session.user) {
    console.log("Unauthorized attempt to remove chat.");
    return { error: "Unauthorized" };
  }

  try {
    const chat = await prisma.chat.findUnique({ where: { id } });

    if (!chat || chat.userId !== session.user.id) {
      return { error: "Unauthorized" };
    }

    await prisma.chat.delete({ where: { id } });
    await redis.del(`chat:${id}`); // Invalidate cache
    await redis.del(`user:${session.user.id}:chats`); // Invalidate user's chat list cache

    revalidatePath("/");
    return revalidatePath(path);
  } catch (error) {
    console.error("Error removing chat:", error);
    return { error: "Internal Server Error" };
  }
}

export async function clearChats() {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "Unauthorized",
    };
  }

  // Retrieve all chat IDs for the user to clear them from cache
  const userChats = await prisma.chat.findMany({
    where: { userId: session.user.id },
    select: { id: true }, // Only fetch the chat IDs
  });

  // Deleting chats from the database
  await prisma.chat.deleteMany({
    where: { userId: session.user.id },
  });

  // Clear each chat from Redis
  const chatKeys = userChats.map((chat) => `chat:${chat.id}`);
  if (chatKeys.length > 0) {
    await redis.del(chatKeys);
  }

  // Also clear the cached list of chats for the user
  await redis.del(`user:${session.user.id}:chats`);

  // Revalidate paths if needed (specific to your framework or use case)
  revalidatePath("/");
  return redirect("/");
}

export async function getSharedChat(id: string) {
  const cacheKey = `sharedChat:${id}`;
  const cachedChat = await redis.get(cacheKey);

  if (cachedChat) {
    const chat = JSON.parse(cachedChat);
    if (chat.sharePath) {
      // Ensure the shared path exists in the cached data
      return chat;
    }
  }

  const chat = await prisma.chat.findUnique({
    where: { id },
    include: { messages: true },
  });

  if (!chat || !chat.sharePath) {
    return null;
  }

  // Cache the chat if it has a sharePath and was fetched from the database
  await redis.set(cacheKey, JSON.stringify(chat), "EX", 60 * 30); // Cache for 30 minutes

  return chat;
}
export async function shareChat(id: string) {
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
      error: "Something went wrong",
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
  await redis.set(cacheKey, JSON.stringify(updatedChat), "EX", 60 * 30); // Cache for 30 minutes
  // Optionally, update a shared chats listing if applicable
  const sharedChatsKey = `sharedChats:${session.user.id}`;
  await redis.del(sharedChatsKey); // Invalidate the cache of shared chats list

  return updatedChat;
}

export async function refreshHistory(path: string) {
  redirect(path);
}

export async function getMissingKeys() {
  const keysRequired = ["OPENAI_API_KEY"];
  return keysRequired
    .map((key) => (process.env[key] ? "" : key))
    .filter((key) => key !== "");
}
