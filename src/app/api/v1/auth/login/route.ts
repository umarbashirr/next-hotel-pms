import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { signIn } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const data = signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    if (isRedirectError(error)) {
      console.error(error);
      throw error;
    }
  }
}
