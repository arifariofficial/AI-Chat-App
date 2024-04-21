import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});
export const ResetSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
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
    email: z.string().email("Email is required"),
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
