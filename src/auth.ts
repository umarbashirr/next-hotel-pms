import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";

import bcrypt from "bcryptjs";
import prisma from "./lib/db";
import { Adapter } from "next-auth/adapters";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async ({ email, password }: any) => {
        let user = null;

        // logic to verify if user exists
        const isUserExisted = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!isUserExisted) {
          throw new Error("User not found.");
        }

        const isValidPassword = await bcrypt.compare(
          password,
          isUserExisted.password
        );

        if (!isValidPassword) {
          throw new Error("Invalid Password");
        }

        const userHotel = await prisma.userHotel.findMany({
          where: {
            userId: isUserExisted.id,
          },
          include: {
            hotel: true,
          },
        });

        const hotelWithRole = userHotel.map((hotel) => {
          return {
            hotelName: hotel.hotel.name,
            hotelId: hotel.hotel.id,
            role: hotel.role,
          };
        });

        user = {
          id: isUserExisted?.id,
          email: isUserExisted?.email,
          name: isUserExisted?.name,
          hotels: hotelWithRole,
        };

        // return user object with the their profile data
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({token, user}) {
      return token
    },
    async session({session, token, user}) {
      return session
    }
});
