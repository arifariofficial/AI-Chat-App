"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Chat } from "@/lib/types";

// Function to save or update a chat
export async function saveChat(chat: Chat) {
  const session = await auth();

  // Ensure that a valid session exists
  if (!session || !session.user) {
    console.log("No valid session available.");
    return;
  }

  // Check if the user exists
  const userExists = await prisma.user.findUnique({
    where: { id: chat.userId },
  });

  if (!userExists) {
    console.error("User does not exist, cannot save chat.");
    return;
  }

  try {
    // Perform a transaction to save or update the chat
    await prisma.$transaction(async (prisma) => {
      // Fetch the existing chat, if it exists
      const existingChat = await prisma.chat.findUnique({
        where: { id: chat.id },
        include: { messages: true },
      });

      // Filter out any messages that already exist in the chat
      const newMessages = chat.messages.filter(
        (msg) => !existingChat?.messages.some((exMsg) => exMsg.id === msg.id),
      );

      // Use Prisma's `upsert` to either update or create the chat
      await prisma.chat.upsert({
        where: { id: chat.id },
        include: { messages: true },
        update: {
          title: chat.title,
          updatedAt: chat.createdAt,
          userId: chat.userId,
          path: chat.path,
          messages: {
            create: newMessages.map((message) => ({
              id: message.id,
              role: message.role,
              content:
                typeof message.content === "string"
                  ? message.content
                  : JSON.stringify(message.content),
              createdAt: new Date().toISOString(),
            })),
          },
        },
        create: {
          id: chat.id,
          title: chat.title,
          createdAt: chat.createdAt,
          userId: chat.userId,
          path: chat.path,
          messages: {
            create: chat.messages.map((message) => ({
              id: message.id,
              role: message.role,
              content:
                typeof message.content === "string"
                  ? message.content
                  : JSON.stringify(message.content),
              createdAt: new Date().toISOString(),
            })),
          },
        },
      });
    });
  } catch (error) {
    console.error(`Failed to save chat: ${error}`);
    throw error;
  }
}
