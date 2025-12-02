import { NextRequest } from "next/server";
import Stripe from "stripe";
import clientPromise from "@/lib/mongodb";

// Disable body parsing for Stripe webhook
export const runtime = "edge"; // optional if you want edge function

export const POST = async (req: NextRequest) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-08-16" as any,
  });

  const buf = await req.arrayBuffer();
  const rawBody = Buffer.from(buf);

  const sig = req.headers.get("stripe-signature")!;
  
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return new Response(`Webhook Error: ${err}`, { status: 400 });
  }

  // handle your webhook events
  if (event.type === "checkout.session.completed") {
    // your logic
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
};
