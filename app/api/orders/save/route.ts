import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { sessionId, billing, cart } = await req.json();

    const client = await clientPromise;
    const db = client.db("mini-shop");
    const ordersCollection = db.collection("orders");

    // 1️⃣ Ensure sessionId is unique
    await ordersCollection.createIndex({ sessionId: 1 }, { unique: true });

    // 2️⃣ Insert the order
    const result = await ordersCollection.insertOne({
      sessionId,
      name: billing.name,
      email: billing.email,
      phone: billing.phone || "",
      address: billing.address || "",
     // total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      items: cart.map((item: any) => ({
        productId: item.id,
        productName: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      createdAt: new Date(),
    });

    // 3️⃣ Fetch the saved document
    const savedOrder = await ordersCollection.findOne({
      _id: result.insertedId,
    });

    return NextResponse.json({ success: true, order: savedOrder });
  } catch (err: any) {
    console.error("Save order error:", err);

    // If duplicate sessionId, return custom message
    if (err.code === 11000) {
      return NextResponse.json(
        { error: "Order with this session already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to save order" },
      { status: 500 }
    );
  }
}
