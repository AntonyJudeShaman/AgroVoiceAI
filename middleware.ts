import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  return NextResponse.next();
}
