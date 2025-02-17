"use server";

import * as z from "zod";
import { LoginSchema } from "@/lib/Schema";
import { AuthError } from "next-auth";
import { getUserByEmail } from "../data/user";
import { sendTwoFactorTokenEmail } from "@/lib/mail";
import { generateTwoFactorToken } from "@/lib/token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import prisma from "@/lib/prisma";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { ResultCode } from "@/lib/utils";
import { signIn } from "@/auth";

async function handleTwoFactorAuthentication(email: string, code?: string) {
  if (code) {
    const twoFactorToken = await getTwoFactorTokenByEmail(email);
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

    const userId = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (!userId) return { error: "User not found" };

    const existingConfirmation = await getTwoFactorConfirmationByUserId(
      userId.id,
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
        userId: userId.id,
      },
    });

    return { success: true };
  } else {
    const twoFactorToken = await generateTwoFactorToken(email);
    await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

    return { twoFactor: true };
  }
}

interface Result {
  type: string;
  resultCode: ResultCode;
}

export const login = async (
  values: z.infer<typeof LoginSchema>,
): Promise<Result | undefined> => {
  try {
    const parsedCredentials = LoginSchema.safeParse(values);

    if (parsedCredentials.success) {
      const { email, password, code } = parsedCredentials.data;

      const existingUser = await getUserByEmail(email);
      if (!existingUser) {
        return {
          type: "error",
          resultCode: ResultCode.InvalidCredentials,
        };
      }

      if (existingUser.isTwoFactorEnabled && existingUser.email) {
        const twoFactorResult = await handleTwoFactorAuthentication(
          existingUser.email,
          code,
        );
        if (twoFactorResult.error) {
          return {
            type: "error",
            resultCode: ResultCode.InvalidCredentials,
          };
        }
        if (twoFactorResult.twoFactor) {
          return {
            type: "twoFactor",
            resultCode: ResultCode.TwoFactorRequired,
          };
        }
      }

      await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });

      return {
        type: "success",
        resultCode: ResultCode.UserLoggedIn,
      };
    } else {
      return {
        type: "error",
        resultCode: ResultCode.InvalidCredentials,
      };
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            type: "error",
            resultCode: ResultCode.InvalidCredentials,
          };
        default:
          return {
            type: "error",
            resultCode: ResultCode.UnknownError,
          };
      }
    }
    throw error;
  }
};
