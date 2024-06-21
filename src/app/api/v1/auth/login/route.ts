import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Missing credentials",
          success: false,
        },
        { status: 402 }
      );
    }

    return NextResponse.json(
      {
        message: "Logged-in successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error?.message,
        success: false,
      },
      { status: 500 }
    );
  }
}
