import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/db";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    const hotels = await prisma.userHotel.findMany({
      where: {
        userId: session?.user?.id,
      },
      select: {
        hotel: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: hotels,
        message: "Hotels fetched successfully",
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
