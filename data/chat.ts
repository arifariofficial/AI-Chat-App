"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

// Function to remove a specific chat
export async function removeChat({ id, path }: { id: string; path: string }) {
  const session = await auth();

  // Check if the user is authorized
  if (!session || !session.user) {
    console.log("Unauthorized attempt to remove chat.");
    return { error: "Unauthorized" };
  }

  try {
    // Find the chat in the database
    const chat = await prisma.chat.findUnique({ where: { id } });

    // Check if the chat belongs to the user
    if (!chat || chat.userId !== session.user.id) {
      return { error: "Unauthorized" };
    }

    // Delete the chat from the database
    await prisma.chat.delete({ where: { id } });

    // Revalidate the paths to refresh the cache
    revalidatePath("/");
    return revalidatePath(path);
  } catch (error) {
    console.error("Error removing chat:", error);
    return { error: "Internal Server Error" };
  }
}

// Function to clear all chats for the current user
export async function clearChats() {
  const session = await auth();

  // Check if the user is authorized
  if (!session?.user?.id) {
    return {
      error: "Unauthorized",
    };
  }

  // Get the user's chat IDs
  const userChats = await prisma.chat.findMany({
    where: { userId: session.user.id },
    select: { id: true }, // Only fetch the chat IDs
  });

  // Delete all the chats from the database
  await prisma.chat.deleteMany({
    where: { userId: session.user.id },
  });

  // Revalidate the path to refresh the cache
  revalidatePath("/");
  return redirect("/");
}

// Function to refresh the page history
export async function refreshHistory(path: string) {
  redirect(path);
}
