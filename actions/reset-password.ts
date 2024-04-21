"use server";

import * as z from "zod";
import { ResetPasswordSchema } from "@/lib/Schema";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export const resetPassword = async (
  values: z.infer<typeof ResetPasswordSchema>,
  token?: string | null,
) => {
  if (!token) {
    return { error: "Missing token" };
  }

  const validatedFields = ResetPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid password" };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid token" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email not found" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashedPassword,
    },
  });

  await prisma.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return {
    success: "Password updated successfully",
  };
};
