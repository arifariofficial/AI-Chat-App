"use server";

import prisma from "@/lib/prisma";

export async function getPrompt() {
  try {
    const prompt = await prisma.prompt.findFirst({});
    return prompt;
  } catch (error) {
    console.error("Error getting prompt from database:", error);
    return { error: "Internal Server Error" };
  }
}
