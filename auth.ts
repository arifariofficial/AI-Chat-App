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
      try {
        // Skip 2FA for OAuth providers
        if (account?.provider !== "credentials") {
          return true;
        }
        if (typeof user.id === "undefined") {
          console.error("User ID is undefined");
          return false;
        }

        const existingUser = await getUserById(user.id);

        if (!existingUser) {
          console.error(`User with ID ${user.id} does not exist`);
          return false;
        }
        // Only enforce 2FA if user has it enabled and is signing in with credentials
        if (existingUser.isTwoFactorEnabled) {
          const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
            existingUser.id,
          );

          if (!twoFactorConfirmation) {
            console.error(
              `No two-factor confirmation found for user ${existingUser.id}`,
            );
            return false;
          }

          // Delete two-factor confirmation for next sign-in
          await prisma.twoFactorConfirmation.delete({
            where: {
              id: twoFactorConfirmation.id,
            },
          });
        }

        return true;
      } catch (error) {
        console.error("Error during signIn:", error);
        return false; // You can adjust this behavior based on your application's needs
      }
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
