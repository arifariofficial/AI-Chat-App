"use server";

import * as z from "zod";
import { ResetPasswordSchema } from "@/lib/Schema";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { getStringFromBuffer } from "@lib/utils";

export const resetPassword = async (
  values: z.infer<typeof ResetPasswordSchema>,
  token?: string | null,
) => {
  if (!token) {
    return { error: "Missing token" };
  }

  const parsedCredentials = ResetPasswordSchema.safeParse(values);
  if (!parsedCredentials.success) {
    return { error: "Invalid password" };
  }

  const { password } = parsedCredentials.data;

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

  const salt = crypto.randomUUID();

  const encoder = new TextEncoder();
  const saltedPassword = encoder.encode(password + salt);
  const hashedPasswordBuffer = await crypto.subtle.digest(
    "SHA-256",
    saltedPassword,
  );
  const hashedPassword = getStringFromBuffer(hashedPasswordBuffer);

  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashedPassword,
      salt: salt,
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
