import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, price, image, category, description, publisher } = body;

    if (!name || !price || !category) {
      return NextResponse.json(
        { error: "Name, price & category are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("mini-shop");
    const products = db.collection("products");

    // Get last product ID
    const last = await products
      .find({})
      .sort({ id: -1 })
      .limit(1)
      .toArray();

    const newId = last.length > 0 ? last[0].id + 1 : 1;

    const newProduct = {
      id: newId,
      name,
      price: Number(price),
      image: image || "",
      category,
      description: description || "",
      publisher: {
        name: publisher?.name || "",
        email: publisher?.email || "",
        role: publisher?.role || "",
      },
      createdAt: new Date(),
    };

    await products.insertOne(newProduct);

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}
