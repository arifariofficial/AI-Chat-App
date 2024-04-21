"use server";

import * as z from "zod";
import { RegisterSchema } from "@/lib/Schema";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { getUserByEmail } from "../data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const valiedatedFields = RegisterSchema.safeParse(values);
  if (!valiedatedFields.success) {
    return { error: "Invalid credentials" };
  }

  const { email, password } = valiedatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already exists" };
  }

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  // const verificationToken = await generateVerificationToken(email);

  // await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return {
    success: "Confirmation email sent",
  };
};
