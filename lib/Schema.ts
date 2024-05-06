import * as z from "zod";

function validateTld(email: string) {
  const domainPart = email.split("@")[1];
  const tld = domainPart.split(".").pop() || "";
  const knownTlds = [
    "com",
    "org",
    "net",
    "edu",
    "gov", // Generic TLDs
    "uk",
    "de",
    "br",
    "ru",
    "it",
    "au",
    "pl",
    "in",
    "jp",
    "cn", // Country code TLDs
    "info",
    "biz",
    "name",
    "io",
    "tech", // Newer generic TLDs
    "agency",
    "email",
    "network",
    "digital",
    "today", // Niche TLDs
  ];
  return knownTlds.includes(tld);
}

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const ResetSchema = z.object({
  email: z
    .string()
    .email({ message: "Email is required" })
    .refine(validateTld, { message: "Invalid email" }),
});

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/[a-zA-Z]/, {
        message: "Password must contain at least one letter.",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[!@#$%^&*]/, {
        message: "Password must contain at least one special character.",
      }),
    confirmPassword: z.string().min(1, {
      message: "Confirm password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const RegisterSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Email is required" })
      .refine(validateTld, { message: "Invalid email" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/[a-zA-Z]/, {
        message: "Password must contain at least one letter.",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[!@#$%^&*]/, {
        message: "Password must contain at least one special character.",
      }),
    confirmPassword: z.string().min(1, {
      message: "Confirm password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
