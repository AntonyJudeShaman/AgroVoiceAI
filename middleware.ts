import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./app/actions";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (path === "/") {
    return NextResponse.next();
  }

  const session = await getCurrentUser()
  if (!session && path === "/settings") {
    return NextResponse.redirect(new URL("/", req.url));
  } 
  return NextResponse.next();
}
