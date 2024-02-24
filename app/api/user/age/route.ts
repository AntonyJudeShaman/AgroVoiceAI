import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { userId, age } = await req.json();

    const userAge = await db.user.update({
        where: {
            id: userId,
        },
        data: {
            age: age,
        },
  });
  return NextResponse.json(userAge);
}