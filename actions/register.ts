"use server";

import * as z from "zod";
import { RegisterSchema } from "@/lib/Schema";
import prisma from "@/lib/prisma";
import { getUserByEmail } from "../data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { ResultCode, getStringFromBuffer } from "@lib/utils";
import { signIn } from "@auth";
import { AuthError } from "next-auth";

export async function createUser(
  email: string,
  hashedPassword: string,
  salt: string,
) {
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      type: "error",
      resultCode: ResultCode.UserAlreadyExists,
    };
  } else {
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        salt: salt,
      },
    });
    return {
      type: "success",
      resultCode: ResultCode.UserCreated,
    };
  }
}

interface Result {
  type: string;
  resultCode: ResultCode;
}

export const register = async (
  values: z.infer<typeof RegisterSchema>,
): Promise<Result | undefined> => {
  const parsedCredentials = RegisterSchema.safeParse(values);

  if (parsedCredentials.success) {
    const { email, password } = parsedCredentials.data;

    const salt = crypto.randomUUID();
    const encoder = new TextEncoder();
    const saltedPassword = encoder.encode(password + salt);
    const hashedPasswordBuffer = await crypto.subtle.digest(
      "SHA-256",
      saltedPassword,
    );
    const hashedPassword = getStringFromBuffer(hashedPasswordBuffer);

    try {
      const result = await createUser(email, hashedPassword, salt);

      if (result.resultCode === ResultCode.UserCreated) {
        await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
      }
      return result;
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
      } else {
        return {
          type: "error",
          resultCode: ResultCode.UnknownError,
        };
      }
    }
  } else {
    return {
      type: "error",
      resultCode: ResultCode.InvalidCredentials,
    };
  }

  // const verificationToken = await generateVerificationToken(email);

  // await sendVerificationEmail(verificationToken.email, verificationToken.token);
};
