"use server";

import prisma from "@/lib/prisma";
import { Prompt } from "@/lib/types";

export async function updatePrompt(id: string, data: Partial<Prompt> | null) {
  try {
    // Ensure the required parameters are provided
    if (!id || !data) {
      throw new Error("ID and data are required for updating a prompt.");
    }

    // Perform the update
    const updatedPrompt = await prisma.prompt.update({
      where: { id },
      data,
    });

    return updatedPrompt;
  } catch (error) {
    console.error("Error updating prompt in database:", error);
    return { error: "Internal Server Error" };
  }
}
