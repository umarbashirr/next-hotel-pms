import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import prisma from "./lib/db";
import bcrypt from "bcryptjs";

export default {
  providers: [
    credentials({
      async authorize({ email, password }: any) {
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
        console.log("userlog", user);
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
