"use server";

import * as z from "zod";
import { LoginSchema } from "@/lib/Schema";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { getUserByEmail } from "../data/user";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import prisma from "@/lib/prisma";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email or password" };
  }

  const { email, password, code } = validatedFields.data;

  const existinguser = await getUserByEmail(email);

  if (!existinguser || !existinguser.email || !existinguser.password) {
    return { error: "Invalid email or password" };
  }

  // prevent signin without email verification
  /*   if (!existinguser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existinguser.email,
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: "Confirmation email sent" };
  } */

  if (existinguser.isTwoFactorEnabled && existinguser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existinguser.email);
      if (!twoFactorToken) {
        return { error: "Invalid code" };
      }

      if (twoFactorToken.token !== code) {
        return { error: "Invalid code" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "Token has expired" };
      }

      await prisma.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existinguser.id,
      );

      if (existingConfirmation) {
        await prisma.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        });
      }

      await prisma.twoFactorConfirmation.create({
        data: {
          userId: existinguser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existinguser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });

    if (!result) {
      return { error: "Failed to sign in" };
    }
    return { success: "Logged in successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
