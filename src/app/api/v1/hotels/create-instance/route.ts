import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { hotelName } = await req.json();

    const hotel = await prisma.hotel.create({
      data: {
        name: hotelName,
      },
    });

    if (!hotel) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to create hotel",
        },
        { status: 500 }
      );
    }

    const botUser = await prisma.user.findUnique({
      where: {
        email: process.env.BOT_EMAIL!,
      },
    });

    const password = await bcrypt.hash(process.env.BOT_PASSWORD!, 10);

    if (!botUser) {
      const newBot = await prisma.user.create({
        data: {
          email: process.env.BOT_EMAIL!,
          name: "Bot",
          password: password,
        },
      });

      const userHotel = await prisma.userHotel.findFirst({
        where: {
          userId: newBot?.id,
          hotelId: hotel.id,
        },
      });

      if (!userHotel) {
        await prisma.userHotel.create({
          data: {
            userId: newBot.id,
            hotelId: hotel.id,
            role: "BOT",
          },
        });
      }
    } else {
      const userHotel = await prisma.userHotel.findFirst({
        where: {
          userId: botUser?.id,
          hotelId: hotel.id,
        },
      });

      if (!userHotel) {
        await prisma.userHotel.create({
          data: {
            userId: botUser.id,
            hotelId: hotel.id,
            role: "BOT",
          },
        });
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Hotel created successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
