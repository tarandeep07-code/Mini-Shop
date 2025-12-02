import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { sessionId, billing, cart, amount_total } = await req.json();

    if (!sessionId) return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });

    const client = await clientPromise;
    const db = client.db("mini-shop");

    // Prevent duplicate orders
    let existingOrder = await db.collection("orders").findOne({ sessionId });
    if (existingOrder) return NextResponse.json({ success: true, order: existingOrder });

    const result = await db.collection("orders").insertOne({
      sessionId,
      customer: billing,
      items: cart,
      amount_total,
      payment_status: "paid",
      createdAt: new Date(),
    });

    const savedOrder = await db.collection("orders").findOne({ _id: result.insertedId });

    return NextResponse.json({ success: true, order: savedOrder });
  } catch (err) {
    console.error("Save order error:", err);
    return NextResponse.json({ error: "Failed to save order" }, { status: 500 });
  }
}
