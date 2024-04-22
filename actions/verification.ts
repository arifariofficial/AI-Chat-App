"use server";

import { getVerificationTokenByToken } from "@/data/verification-token";
import { getUserByEmail } from "../data/user";
import prisma from "@/lib/prisma";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "token not found" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "token has expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email not found" };
  }

  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await prisma.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return {
    success: "Email verified",
  };
};
