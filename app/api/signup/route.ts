import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

type Data = {
  email: string;
  password: string;
  error?: string;
};

export async function POST(req: Request) {
  const data = await req.json();
  const { email, password } = data;

  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (user) {
      return NextResponse.json({
        message: "User already exists",
      });
    }

    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });
    return NextResponse.json({
      user: newUser,
      message: "User created successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error saving user:", error);
      return NextResponse.json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }
}
