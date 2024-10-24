"use server";

import prisma from "@/lib/prisma";

// Function to get the balance of a user
export async function getBalance(userId: string) {
  // Query the database directly for the user's balance
  const previousBalance = await prisma.user.findFirst({
    where: { id: userId },
    select: { balance: true },
  });

  // If the user is not found, return an error
  if (previousBalance === null) {
    return { error: "User not found" };
  }

  // Return the user's balance
  const balance = previousBalance.balance;
  return { balance };
}

// Function to update the balance of a user
export async function updateBalance(balance: number, userId: string) {
  // Query the database to get the user's previous balance
  const previousBalance = await prisma.user.findFirst({
    where: { id: userId },
    select: { balance: true },
  });

  // If the user is not found, return an error
  if (previousBalance === null) {
    return { error: "User not found" };
  }

  // Calculate the new balance by adding the incoming balance
  const newBalance = previousBalance.balance + balance;

  // Try updating the balance in the database
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { balance: newBalance },
    });
    return { success: true, message: "Balance updated successfully" };
  } catch (error) {
    // In case of an error, return the previous balance
    return { success: true, balance: previousBalance.balance };
  }
}

// Function to check and update the user's balance after a transaction
export async function checkBalance(userId: string) {
  // Query the database to get the user's balance
  const previousBalance = await prisma.user.findFirst({
    where: { id: userId },
    select: { balance: true },
  });

  // If the user is not found, return an error
  if (previousBalance === null) {
    return { error: "User not found" };
  }

  let balance = previousBalance.balance;

  // Check if the balance is sufficient for the transaction (e.g., greater than or equal to 0.5)
  if (balance < 0.5) {
    return false;
  } else {
    // Deduct the required amount from the user's balance
    const currentBalance = balance - 0.5;
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { balance: currentBalance },
      select: { balance: true },
    });
  }

  return true;
}
