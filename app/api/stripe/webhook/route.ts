import { NextResponse } from "next/server";
import Stripe from "stripe";
import clientPromise from "@/lib/mongodb";

export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2023-08-16" as any });

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  const buf = await req.arrayBuffer();
  const body = Buffer.from(buf);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed.", err.message);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const cart = session.metadata?.cart ? JSON.parse(session.metadata.cart) : [];
    const billing = {
      name: session.metadata?.name,
      email: session.customer_email,
      phone: session.metadata?.phone,
      address: session.metadata?.address,
    };

    // Save to MongoDB
    const client = await clientPromise;
    const db = client.db();

    // Prevent duplicate orders
    const existing = await db.collection("orders").findOne({ sessionId: session.id });
    if (!existing) {
      await db.collection("orders").insertOne({
        sessionId: session.id,
        customer: billing,
        cart,
        amount_total: session.amount_total,
        payment_status: session.payment_status,
        createdAt: new Date(),
      });
      console.log("✅ Order saved:", session.id);
    }
  }

  return NextResponse.json({ received: true });
}
