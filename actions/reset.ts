"use server";

import { ResetSchema } from "@/lib/Schema";
import * as z from "zod";
import { getUserByEmail } from "../data/user";
import { generatePasswordResetToken } from "@/lib/token";
import { sendPasswordResetEmail } from "@/lib/mail";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const parsedCredentials = ResetSchema.safeParse(values);

  if (!parsedCredentials.success) {
    return { error: "Invalid email" };
  }

  const { email } = parsedCredentials.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return { success: "An email has been sent" };
};
