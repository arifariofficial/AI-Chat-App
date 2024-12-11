// auth.config.ts

import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./lib/Schema";
import { getUserByEmail } from "./data/user";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { getStringFromBuffer } from "./lib/utils";

export const authConfig = {
  pages: {
    signIn: "/lang/auth/login",
    signOut: "/auth/logout",
    newUser: "/auth/register",
    error: "/auth/error",
  },
  basePath: "/api/auth",
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),

    Credentials({
      async authorize(credentials) {
        try {
          // Validate the input using Zod schema (LoginSchema)
          const parsedCredentials = LoginSchema.safeParse(credentials);
          if (!parsedCredentials.success) {
            return null; // Validation failed
          }

          const { email, password } = parsedCredentials.data;

          // Fetch the user by email
          const user = await getUserByEmail(email);
          if (!user) {
            return null; // No user found
          }

          // Prepare salted password
          const encoder = new TextEncoder();
          const saltedPassword = encoder.encode(password + user.salt);

          // Hash the salted password using SHA-256
          const hashedPasswordBuffer = await crypto.subtle.digest(
            "SHA-256",
            saltedPassword,
          );
          const hashedPassword = getStringFromBuffer(hashedPasswordBuffer);

          // Compare hashed password with stored password
          if (hashedPassword === user.password) {
            // Authentication successful, return user object
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role, // Include any other necessary fields
            };
          } else {
            return null; // Password mismatch
          }
        } catch (error) {
          console.error("Error during authorization:", error);
          return null; // Handle unexpected errors
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
