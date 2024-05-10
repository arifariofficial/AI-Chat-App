"use server";

import prisma from "@lib/prisma";

export async function updateName(name: string, userId: string) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { name },
    });
    return { success: true, message: "Name updated successfully" };
  } catch (error) {
    return { error: "Something went wrong database error" };
  }
}
