import { VerifyUserConfigureAccess } from "@/helpers/verify-user-access";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, params: { typeId: string }) {
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

    const updatedRoomType = await prisma.roomType.update({
      where: {
        id: params?.typeId,
        hotelId: propertyId,
      },
      data: {
        name,
        roomTypeCode,
        description,
        price,
        checkInTime,
        checkOutTime,
      },
    });

    if (!updatedRoomType) {
      throw new Error("Room type creation failed.");
    }

    return NextResponse.json(
      {
        success: true,
        message: "Room type updated successfully.",
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
