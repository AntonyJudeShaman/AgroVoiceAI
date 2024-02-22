
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const exists = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  } else {
    const user = await db.user.create({
      data: {
        email,
        password: await hash(password, 10),
      },
    });
    return NextResponse.json(user);
  }
}
