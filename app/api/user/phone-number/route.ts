import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { userId, phone } = await req.json();

    try {
        const userPhone = await db.user.update({
            where: {
                id: userId,
            },
            data: {
                phone: phone,
            },
        });

        if (userPhone) {
            return NextResponse.json({ success: true }, { status: 200 });
        } else {
            return NextResponse.json({ success: false, error: "Failed to update phone number" }, { status: 400 });
        }
    } catch (error) {
        // console.error("Error updating phone number:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}
