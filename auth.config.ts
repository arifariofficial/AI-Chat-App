import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./lib/Schema";
import { getUserByEmail } from "./data/user";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { getStringFromBuffer } from "./lib/utils";

export const authConfig = {
  pages: {
    signIn: "/auth/login",
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
        const parsedCredentials = LoginSchema.safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUserByEmail(email);

          if (!user) return null;

          const encoder = new TextEncoder();
          const saltedPassword = encoder.encode(password + user.salt);
          const hashedPasswordBuffer = await crypto.subtle.digest(
            "SHA-256",
            saltedPassword,
          );
          const hashedPassword = getStringFromBuffer(hashedPasswordBuffer);

          if (hashedPassword === user.password) {
            return user;
          } else {
            return null;
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
