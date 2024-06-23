"use server";

import { auth } from "@/auth";

export const isUserAndHaveConfigureAccess = async (propertyId: string) => {
  const session: any = await auth();
  if (!session) {
    return {
      success: false,
      message: "You are not allowed to complete this operation",
    };
  }

  const hasAccess = await session.user.hotels.some(
    (user: any) =>
      user.hotelId === propertyId &&
      (user.role === "ADMIN" || user.role === "BOT")
  );

  if (!hasAccess) {
    return {
      success: false,
      message: "You are not allowed to complete this operation",
    };
  }

  return { success: true, user: session.user };
};
