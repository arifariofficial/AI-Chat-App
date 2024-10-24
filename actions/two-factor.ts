"use server";
import prisma from "@/lib/prisma";

export const twoFactor = async (userId: string | undefined, value: boolean) => {
  try {
    return await prisma.user.update({
      where: { id: userId },
      data: { isTwoFactorEnabled: value },
    });
  } catch (error) {
    return { error: "Something went wrong database error" };
  }
};
