import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

import { Adapter } from "next-auth/adapters";
import authConfig from "./auth.config";
import prisma from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user };
      }

      return token;
    },
    async session({ session, token }: any) {
      session.user = token;
      return session;
    },
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
