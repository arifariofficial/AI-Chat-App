import NextAuth, { type DefaultSession } from "next-auth";
import { authConfig } from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import { getUserById } from "./data/user";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
      isTwoFactorEnabled: boolean;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  ...authConfig,
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    newUser: "/auth/register",
    error: "/auth/error",
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account }) {
      if (typeof user.id === "undefined") {
        console.error("User ID is undefined");
        return false;
      }
      const existingUser = await getUserById(user.id);
      if (account?.provider === "credentials") {
        if (existingUser?.isTwoFactorEnabled) {
          const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
            existingUser.id,
          );
          if (!twoFactorConfirmation) return false;

          // Delete two factor confirmation for next sign in
          await prisma.twoFactorConfirmation.delete({
            where: {
              id: twoFactorConfirmation.id,
            },
          });
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        const existingUser = await getUserById(token.sub);
        if (existingUser && session.user) {
          session.user.role = existingUser.role;
          session.user.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
        }
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      return token;
    },
  },

  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
});
