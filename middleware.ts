import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (path === "/") {
    return NextResponse.next();
  }

  const session = await auth()
  if (!session && path === "/settings") {
    return NextResponse.redirect(new URL("/", req.url));
  } 
  return NextResponse.next();
}
