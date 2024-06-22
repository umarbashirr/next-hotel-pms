"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

export const addNewUserToProperty = async ({
  name,
  email,
  password,
  role,
  propertyId,
}: {
  name: string;
  email: string;
  password: string;
  role: any;
  propertyId: string;
}) => {
  try {
    const { user }: any = await auth();

    const hasUserAccess = user.hotels.some((user: any) => {
      return (
        user.hotelId === propertyId &&
        (user.role == "ADMIN" || user.role == "BOT")
      );
    });

    if (!hasUserAccess) {
      throw new Error("You do not have access to perform this action");
    }

    const isUserAlreadyExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (isUserAlreadyExists) {
      throw new Error("User already exists");
    }

    const hashPass = await bcrypt.hash(password, 10);

    const createdUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPass,
      },
    });

    if (!createdUser) {
      throw new Error("Failed to create user");
    }

    const userHotel = await prisma.userHotel.create({
      data: {
        userId: createdUser.id,
        hotelId: propertyId,
        role,
      },
    });

    if (!userHotel) {
      throw new Error("Failed to create user");
    }

    return { success: true, message: "User created successfully" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const fetchUsersForProperty = async (propertyId: string) => {
  const { user }: any = await auth();
  try {
    const users = await prisma.hotel.findUnique({
      where: {
        id: propertyId,
        users: {
          some: {
            userId: user.id,
          },
        },
      },
      select: {
        users: {
          include: {
            user: true,
          },
        },
      },
    });

    const filteredUsers = users?.users.filter((user) => user.role !== "BOT");

    return {
      success: true,
      data: filteredUsers,
      message: "Users fetched successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message,
    };
  }
};
