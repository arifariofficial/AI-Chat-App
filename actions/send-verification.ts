"use server";

import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";

export const sendNewVerificationEmail = async (email: string) => {
  try {
    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );
    return {
      type: "success",
      message: "Verification email sent",
    };
  } catch (error) {
    return {
      type: "error",
      message: "Error sending verification email",
    };
  }
};
