import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try { 
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json({ loggedIn: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.json({ loggedIn: true, user: decoded });
  } catch (err) {
    return NextResponse.json({ loggedIn: false });
  }
}
