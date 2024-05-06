"use server";

import * as z from "zod";
import { getUserByEmail } from "../data/user";
import { generatePasswordResetToken } from "@/lib/token";
import { sendPasswordResetEmail } from "@/lib/mail";
import { setTimeout } from "timers";
import { ResetSchema } from "@lib/Schema";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const parsedCredentials = ResetSchema.safeParse(values);

  if (!parsedCredentials.success) {
    return { error: "Invalid email" };
  }

  const { email } = parsedCredentials.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    await new Promise((resolve) => setTimeout(resolve, 600)); // 600ms delay
    return {
      success: "An email will be sent if the user is found",
    };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return {
    success: "An email will be sent if the user is found",
  };
};
