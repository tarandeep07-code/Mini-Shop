import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("mini-shop");
    const products = await db.collection("products").find({}).toArray();
    return NextResponse.json(products);
  } catch (err: any) {
    console.error("Error fetching products:", err);
    return NextResponse.json({ error: "Failed to load products" }, { status: 500 });
  }
}
