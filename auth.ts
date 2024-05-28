import NextAuth, { type DefaultSession } from "next-auth";
import { authConfig } from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import { getUserById } from "./data/user";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import redis from "@lib/redis";

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
      isTwoFactorEnabled: boolean;
      emailVerified: Date | null;
      name: string | null;
      balance: number | null;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
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
          session.user.emailVerified = existingUser.emailVerified;
          session.user.name = existingUser.name;
          session.user.balance = existingUser.balance;
        }
        await redis.set(
          `session:${token.sub}`,
          JSON.stringify(session),
          "EX",
          24 * 60 * 60,
        ); // 24 hours expiration
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      if (token.sub) {
        const redisSession = await redis.get(`session:${token.sub}`);
        if (redisSession) {
          const parsedSession = JSON.parse(redisSession);
          token = {
            ...token,
            ...parsedSession.user,
          };
        }
      }
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
    signIn: async ({ user }) => {
      if (user.email && user.id) {
        await prisma.loginHistory.create({
          data: {
            userId: user.id,
            email: user.email,
            loginAt: new Date().toISOString(),
          },
        });
      }
    },
  },
});
