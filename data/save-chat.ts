import { auth } from "@auth";
import prisma from "@lib/prisma";
import redis from "@lib/redis";
import { Chat } from "@lib/types";

export async function saveChat(chat: Chat) {
  const session = await auth();

  if (!session || !session.user) {
    console.log("No valid session available.");
    return;
  }

  const userExists = await prisma.user.findUnique({
    where: { id: chat.userId },
  });

  if (!userExists) {
    console.error("User does not exist, cannot save chat.");
    return;
  }

  try {
    await prisma.$transaction(async (prisma) => {
      // Fetch existing chat to compare messages
      const existingChat = await prisma.chat.findUnique({
        where: { id: chat.id },
        include: { messages: true },
      });

      const newMessages = chat.messages.filter(
        (msg) => !existingChat?.messages.some((exMsg) => exMsg.id === msg.id)
      );

      const updatedChat = await prisma.chat.upsert({
        where: { id: chat.id },
        include: { messages: true },
        update: {
          title: chat.title,
          createdAt: chat.createdAt,
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

      console.log(`Chat with ID ${chat.id} saved successfully.`);

      const chatKey = `chat:${chat.id}`;
      const pipeline = redis.pipeline();
      pipeline.hset(chatKey, "details", JSON.stringify(updatedChat));
      await redis.expire(chatKey, 3600);
      pipeline.zadd(`user:chat:${chat.userId}`, Date.now(), chatKey);

      const result = await pipeline.exec();
      console.log("redis:", result);
      console.log(`Chat with ID ${chat.id} added/updated in Redis successfully.`);
    });
  } catch (error) {
    console.error(`Failed to save chat: ${error}`);
    throw error; // Rethrow after logging to handle higher up if needed
  }
}
