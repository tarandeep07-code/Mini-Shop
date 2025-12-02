import { NextResponse } from "next/server";
import Stripe from "stripe";
import clientPromise from "@/lib/mongodb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16" as any,
});

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    // 1️⃣ Retrieve Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // 2️⃣ If payment succeeded, save order in DB
    let order = null;
    if (session.payment_status === "paid") {
      const client = await clientPromise;
      const db = client.db();

      // Check if order already exists to avoid duplicates
      order = await db.collection("orders").findOne({ sessionId });

      if (!order) {
        const cart = session.metadata?.cart ? JSON.parse(session.metadata.cart) : [];
        const billing = {
          name: session.metadata?.name || "",
          email: session.customer_email || "",
          phone: session.metadata?.phone || "",
          address: session.metadata?.address || "",
        };

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
    }

    return NextResponse.json({
      paid: session.payment_status === "paid",
      order,
      items: session.metadata?.cart ? JSON.parse(session.metadata.cart) : [],
      billing: {
        name: session.metadata?.name || "",
        email: session.customer_email || "",
        phone: session.metadata?.phone || "",
        address: session.metadata?.address || "",
      },
      amount_total: session.amount_total,
    });
  } catch (err) {
    console.error("Stripe verify error:", err);
    return NextResponse.json({ error: "Failed to verify session" }, { status: 500 });
  }
}
