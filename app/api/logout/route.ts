// app/api/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });
  // Delete the cookie by setting it with an expired date
  res.cookies.set("token", "", {
    path: "/", // important to match original cookie path
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
