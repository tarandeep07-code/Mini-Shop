import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("mini-shop");

    // Just check if the DB is accessible
    const collections = await db.listCollections().toArray();

    return NextResponse.json({
      message: "✅ MongoDB connected successfully!",
      collections: collections.map((c) => c.name),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
