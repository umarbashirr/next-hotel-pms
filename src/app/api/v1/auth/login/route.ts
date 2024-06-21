import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid password",
        },
        { status: 401 }
      );
    }

    const userHotel = await prisma.userHotel.findMany({
      where: {
        userId: user.id,
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

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      hotels: hotelWithRole,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    cookies().set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          user: payload,
          token,
        },
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
