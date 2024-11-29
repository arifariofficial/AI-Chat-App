import prisma from "@/lib/prisma";
import { Chat } from "@/lib/types";

export async function updateChat(chat: Chat) {
  await prisma.chat.update({
    where: { id: chat.id },
    data: {
      title: chat.title,
      messages: {
        // Assuming you need to upsert messages
        upsert: chat.messages.map((message) => ({
          where: { id: message.id },
          update: {
            content: message.content,
            updatedAt: new Date(),
          },
          create: {
            id: message.id,
            role: message.role,
            content: message.content,
            parentMessageId: message.parentMessageId,
            createdAt: message.createdAt || new Date(),
          },
        })),
      },
      updatedAt: new Date(),
    },
  });
}
