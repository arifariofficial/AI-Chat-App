"use server";

import prisma from "@lib/prisma";

export async function updateBalance(balance: number, userId: string) {
  const previousBalance = await prisma.user.findFirst({
    where: { id: userId },
    select: { balance: true },
  });

  if (previousBalance === null) {
    return { error: "User not found" };
  }

  const newBalance = previousBalance.balance + balance;

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { balance: newBalance },
    });
    return { success: true, message: "Balance updated successfully" };
  } catch (error) {
    return { error: "Something went wrong database error" };
  }
}
