"use server";

import prisma from "@/lib/prisma";
import { Chat } from "@/lib/types";

// Function to retrieve all chats for a given user
export async function getChats(userId?: string | null): Promise<Chat[]> {
  if (!userId) {
    console.log("No user ID provided.");
    return [];
  }

  try {
    // Fetch chats directly from the database
    const chats = await prisma.chat.findMany({
      where: { userId },
      include: { messages: true },
      orderBy: { createdAt: "desc" },
    });

    // Return the chats, ensuring that date objects are correctly parsed
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

// Function to retrieve a specific chat by ID and user ID
export async function getChat(id: string, userId: string) {
  console.log(`Fetching chat ${id} for user ${userId}`);
  try {
    // Fetch the chat from the database
    return await fetchChatFromDB(id, userId);
  } catch (error) {
    console.error(`Failed to retrieve chat for ${id}:`, error);
    return null;
  }
}

// Helper function to fetch a chat from the database
async function fetchChatFromDB(id: string, userId: string) {
  try {
    // Find the chat by ID and ensure it belongs to the correct user
    const chat = await prisma.chat.findUnique({
      where: { id, userId }, // Use a composite unique key (id + userId)
      include: { messages: true },
    });

    if (!chat) {
      console.log(`No chat found with ID ${id} for user ${userId}.`);
      return null;
    }

    return chat;
  } catch (error) {
    console.error(`Error fetching chat from database for ${id}:`, error);
    return null;
  }
}
