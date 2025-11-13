// app/api/seed/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { products } from "@/data/products"; // your existing array

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("mini-shop");

    const existing = await db.collection("products").countDocuments();
    if (existing > 0) {
      return NextResponse.json({ message: "Products already seeded" });
    }

    await db.collection("products").insertMany(products);
    return NextResponse.json({ message: "Products added successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
