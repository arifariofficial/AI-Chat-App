"use server";

import logger from "@/lib/logger";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";

// Define an enum for response types to ensure type safety
enum ResponseType {
  SUCCESS = "success",
  ERROR = "error",
}

// Define the structure of the response
interface SendEmailResponse {
  type: ResponseType;
  message: string;
}

// Centralize your messages to avoid hard-coded strings
const MESSAGES = {
  SUCCESS: "Verification email sent successfully.",
  ERROR: "An error occurred while sending the verification email.",
  INVALID_EMAIL: "The provided email address is invalid.",
};

// Inline email validation function using a regular expression
const isEmailValid = (email: string): boolean => {
  // Simple regex for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const sendNewVerificationEmail = async (
  email: string,
): Promise<SendEmailResponse> => {
  // Validate the email format
  if (!isEmailValid(email)) {
    return {
      type: ResponseType.ERROR,
      message: MESSAGES.INVALID_EMAIL,
    };
  }

  try {
    // Generate a verification token
    const verificationToken = await generateVerificationToken(email);

    // Send the verification email
    await sendVerificationEmail(email, verificationToken.token);

    return {
      type: ResponseType.SUCCESS,
      message: MESSAGES.SUCCESS,
    };
  } catch (error) {
    // Log the error details for debugging purposes
    logger.error(`Failed to send verification email to ${email}:`, error);

    return {
      type: ResponseType.ERROR,
      message: MESSAGES.ERROR,
    };
  }
};
