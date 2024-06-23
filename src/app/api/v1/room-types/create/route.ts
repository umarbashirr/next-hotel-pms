import { VerifyUserConfigureAccess } from "@/helpers/verify-user-access";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      roomTypeCode,
      description,
      price,
      checkInTime,
      checkOutTime,
      propertyId,
    } = await req.json();

    const response = await VerifyUserConfigureAccess(propertyId);

    if (!response.success) {
      return NextResponse.json(
        {
          success: false,
          message: response.message,
        },
        { status: 403 }
      );
    }

    const createdRoomType = await prisma.roomType.create({
      data: {
        name,
        roomTypeCode,
        description,
        price,
        checkInTime,
        checkOutTime,
        hotelId: propertyId,
      },
    });

    if (!createdRoomType) {
      throw new Error("Room type creation failed.");
    }

    return NextResponse.json(
      {
        success: true,
        message: "Room type created successfully.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
