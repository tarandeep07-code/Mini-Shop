import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("mini-shop");
    const users = db.collection("users");
 
    const { name, email, password, role } = await req.json();

    // Check if user exists
    const existingUser = await users.findOne({ email });
    if (existingUser)
      return NextResponse.json({ error: "User already exists" }, { status: 400 });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const result = await users.insertOne({
      name,
      email,
      password: hashedPassword,
      role: role || "customer",
      createdAt: new Date(),
    });

    // ✅ Generate JWT token for auto-login
    const token = jwt.sign(
      { id: result.insertedId, name, email, role: role || "customer" },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    const res = NextResponse.json({ 
      message: "User registered and logged in successfully",
      user: { name, email, role: role || "customer" } 
     });

    

    // Set token in HTTP-only cookie
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/", // cookie available for all routes
    });

    // Optionally set a user cookie for your cart logic
    res.cookies.set(
      "user",
      JSON.stringify({ email, name, role: role || "customer" }),
      { path: "/" }
    );

    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
