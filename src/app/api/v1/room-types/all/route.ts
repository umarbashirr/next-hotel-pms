import { auth } from "@/auth";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const propertyId = searchParams.get("propertyId") || "";

    const session: any = await auth();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not allowed to complete this operation",
        },
        { status: 403 }
      );
    }

    const roomTypes = await prisma.roomType.findMany({
      where: {
        hotelId: propertyId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Room types fetched successfully",
        data: roomTypes,
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
