import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  [key: string]: any;
}

interface JwtPayload {
  id: string;
  email: string;
  name: string;
  role: "admin" | "customer";
}

// 🧩 GET user cart
export async function GET() {
  const token = (await cookies()).get("token")?.value;

  if (!token) return NextResponse.json({ items: [] });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const client = await clientPromise;
    const db = client.db("mini-shop");

    const existing = await db
      .collection("carts")
      .findOne({ userEmail: decoded.email });

    return NextResponse.json({ items: existing?.items || [] });
  } catch (err) {
    console.error("GET cart error:", err);
    return NextResponse.json({ items: [] });
  }
}

// 🧩 POST — save or update cart
export async function POST(req: Request) {
  const client = await clientPromise;
  const db = client.db("mini-shop");

  const cookie = (await cookies()).get("user");
  if (!cookie) return NextResponse.json({ message: "Not logged in" }, { status: 401 });

  const user = JSON.parse(cookie.value); // stable identifier
  const { items } = await req.json();

  await db.collection("carts").updateOne(
    { userEmail: user.email },
    { $set: { items, updatedAt: new Date() } },
    { upsert: true } // ✅ create if not exists
  );

  return NextResponse.json({ message: "Cart saved successfully" });
}

