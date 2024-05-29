"use server";

import prisma from "@lib/prisma";
import redis from "@lib/redis";

export async function getBalance(userId: string) {
  const cacheKey = `user:balance:${userId}`;

  // Try to get the balance from Redis cache
  const cachedBalance = await redis?.get(cacheKey);
  if (cachedBalance !== null) {
    return { balance: Number(cachedBalance) };
  }

  // If not found in cache, query the database
  const previousBalance = await prisma.user.findFirst({
    where: { id: userId },
    select: { balance: true },
  });

  if (previousBalance === null) {
    return { error: "User not found" };
  }

  const balance = previousBalance.balance;

  // Save the balance to Redis cache for 5 minutes
  await redis?.setex(cacheKey, 5, balance.toString());

  return { balance };
}

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
    return { success: true, balance: previousBalance.balance };
  }
}

export async function checkBalance(userId: string) {
  const cacheKey = `user:balance:${userId}`;

  // Try to get the balance from Redis cache
  let balance: number | null = null;
  const cachedBalance = await redis?.get(cacheKey);

  if (cachedBalance !== null) {
    balance = Number(cachedBalance);
  } else {
    // If not found in cache, query the database
    const previousBalance = await prisma.user.findFirst({
      where: { id: userId },
      select: { balance: true },
    });

    if (previousBalance === null) {
      return { error: "User not found" };
    }

    balance = previousBalance.balance;

    // Store the balance in Redis cache with a short expiration time (e.g., 5 minutes)
    await redis?.setex(cacheKey, 300, balance.toString());
  }

  // Check if the balance is sufficient
  if (balance < 0.5) {
    return false;
  }

  // Update the balance
  const currentBalance = balance - 0.5;

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { balance: currentBalance },
    select: { balance: true },
  });

  // Invalidate and update the cache with the new balance
  await redis?.setex(cacheKey, 300, updatedUser.balance.toString());

  return true;
}
