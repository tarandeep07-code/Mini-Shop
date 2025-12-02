import { NextResponse } from "next/server";
import Stripe from "stripe";
import clientPromise from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2023-08-16" as any,
    });

    const url = new URL(req.url);
    const sessionId = url.searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
    }

    // 1️⃣ Retrieve Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const paid = session.payment_status === "paid";

    // 2️⃣ Extract cart & billing from metadata
    const cart = session.metadata?.cart ? JSON.parse(session.metadata.cart) : [];
    const billing = {
      name: session.metadata?.name || "",
      email: session.customer_email || "",
      phone: session.metadata?.phone || "",
      address: session.metadata?.address || "",
    };

    // 3️⃣ Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("mini-shop");

    // 4️⃣ Check if order already exists
    let order = await db.collection("orders").findOne({ sessionId });

    if (!order && paid) {
      // Save order
      const result = await db.collection("orders").insertOne({
        sessionId,
        customer: billing,
        items: cart,
        amount_total: session.amount_total,
        payment_status: session.payment_status,
        createdAt: new Date(),
      });

      order = await db.collection("orders").findOne({ _id: result.insertedId });
    }

    return NextResponse.json({ paid, order, items: cart, billing, amount_total: session.amount_total });
  } catch (err) {
    console.error("Stripe verify error:", err);
    return NextResponse.json({ error: "Failed to verify session" }, { status: 500 });
  }
}
