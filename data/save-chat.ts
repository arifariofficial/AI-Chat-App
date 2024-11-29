"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Chat } from "@/lib/types";

// Helper function to format message data for Prisma
const formatMessages = (messages: Chat["messages"]) =>
  messages.map((message) => ({
    id: message.id,
    role: message.role,
    content:
      typeof message.content === "string"
        ? message.content
        : JSON.stringify(message.content),
    createdAt: message.createdAt || new Date().toISOString(),
  }));

export async function saveChat(chat: Chat) {
  const session = await auth();

  if (!session || !session.user) {
    console.error("No valid session available.");
    return;
  }

  if (session.user.id !== chat.userId) {
    console.error("Unauthorized access attempt detected.");
    return;
  }

  try {
    const now = new Date().toISOString();

    await prisma.$transaction(async (prisma) => {
      const existingChat = await prisma.chat.findUnique({
        where: { id: chat.id },
        include: { messages: true },
      });

      console.log("Existing Chat:", existingChat);

      if (existingChat) {
        // Delete all existing messages for the chat
        await prisma.message.deleteMany({
          where: { chatId: chat.id },
        });
        console.log("All previous messages deleted.");
      }

      // Prepare new messages
      const formattedMessages = formatMessages(chat.messages);

      // Upsert the chat
      await prisma.chat.upsert({
        where: { id: chat.id },
        update: {
          title: chat.title,
          updatedAt: now,
          userId: chat.userId,
          path: chat.path,
          messages: {
            create: formattedMessages,
          },
        },
        create: {
          id: chat.id,
          title: chat.title,
          createdAt: chat.createdAt || now,
          userId: chat.userId,
          path: chat.path,
          messages: {
            create: formattedMessages,
          },
        },
      });
    });
  } catch (error) {
    console.error(
      `Failed to save chat: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
    throw error instanceof Error
      ? error
      : new Error("Unknown error occurred while saving chat.");
  }
}
