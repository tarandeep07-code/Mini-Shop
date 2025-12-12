import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { email, role } = await req.json(); // receive both email + role

    if (!email || !role) {
      return NextResponse.json(
        { error: "Email and role are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("mini-shop");

    let orders;

    if (role === "admin") {
      // ADMIN → fetch all orders
      orders = await db
        .collection("orders")
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
    } else {
      // CUSTOMER / OTHER ROLES → fetch only their orders
      orders = await db
        .collection("orders")
        .find({ "customer.email": email })
        .sort({ createdAt: -1 })
        .toArray();
    }

    return NextResponse.json({ orders });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
