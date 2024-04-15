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
  const { email, password, name } = data;
  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (user) {
      return NextResponse.json({
        message: `${user.email} already exist!`,
      });
    } else {
      await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
        },
      });

      return NextResponse.json({
        message: "User created successfully",
      });
    }
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
