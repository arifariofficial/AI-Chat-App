"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import prisma from "@lib/prisma";
import redis from "@lib/redis";

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
    await redis?.del(`chat:${id}`); // Invalidate cache
    await redis?.del(`user:${session.user.id}:chats`); // Invalidate user's chat list cache

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
  const userChats = await prisma.chat.findMany({
    where: { userId: session.user.id },
    select: { id: true }, // Only fetch the chat IDs
  });

  await prisma.chat.deleteMany({
    where: { userId: session.user.id },
  });

  const chatKeys = userChats.map((chat) => `chat:${chat.id}`);
  if (chatKeys.length > 0) {
    await redis?.del(chatKeys);
  }
  await redis?.del(`user:${session.user.id}:chats`);

  revalidatePath("/");
  return redirect("/");
}

export async function refreshHistory(path: string) {
  redirect(path);
}
