"use server";

import { isUserAndHaveConfigureAccess } from "@/app/(admin)/action";
import { auth } from "@/auth";
import prisma from "@/lib/db";

export const fetchCurrentPropertyDetails = async (propertyId: string) => {
  try {
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

    const hotel = await prisma.hotel.findFirst({
      where: {
        id: propertyId,
        users: {
          some: {
            userId: session.user.id,
          },
        },
      },
    });

    return { success: true, data: hotel, message: "Hotel details fetched" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const updatePropertyDetails = async (propertyId: string, data: any) => {
  try {
    const response: any = await isUserAndHaveConfigureAccess(propertyId);

    if (!response.success) {
      return response;
    }

    const updatedHotel = await prisma.hotel.update({
      where: {
        id: propertyId,
        users: {
          some: {
            userId: response.userId,
          },
        },
      },
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: {
          upsert: {
            create: {
              street: data.address.street,
              city: data.address.city,
              state: data.address.state,
              country: data.address.country,
              zip: data.address.zip,
            },
            update: {
              street: data.address.street,
              city: data.address.city,
              state: data.address.state,
              country: data.address.country,
              zip: data.address.zip,
            },
          },
        },
        website: data.website,
        mapURL: data.mapURL,
        ownerDetails: {
          upsert: {
            create: {
              name: data.ownerDetails.name,
              email: data.ownerDetails.email,
              phone: data.ownerDetails.phone,
            },
            update: {
              name: data.ownerDetails.name,
              email: data.ownerDetails.email,
              phone: data.ownerDetails.phone,
            },
          },
        },
        gstDetails: {
          upsert: {
            create: {
              ...data?.gstDetails,
            },
            update: {
              ...data?.gstDetails,
            },
          },
        },
      },
    });

    if (!updatedHotel) {
      return { success: false, message: "Failed to update property details" };
    }

    return { success: true, message: "Property details updated successfully" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
