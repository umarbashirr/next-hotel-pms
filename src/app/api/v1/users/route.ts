import { auth } from "@/auth";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const propertyId = searchParams.get("propertyId") || "";

    const { user }: any = await auth();

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
        users: true,
      },
    });

    console.log(users);

    const filteredUsers = users?.users.filter((user) => user.role !== "BOT");

    return NextResponse.json(
      {
        success: true,
        data: filteredUsers,
        message: "Users fetched successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const propertyId = searchParams.get("propertyId") || "";

    const { user }: any = await auth();
    const { name, email, password, role } = await req.json();

    // const createdUser = await prisma.userHotel.create({
    // data: {
    //     role: body.role,
    //     userId: body.userId,
    //     hotelId: propertyId,
    // },
    // });

    return NextResponse.json(
      {
        success: true,
        // data: createdUser,
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message,
      },
      { status: 500 }
    );
  }
}
