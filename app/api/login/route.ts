import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import clientPromise from "@/lib/mongodb"; // ✅ make sure this path is correct

export async function POST(req: Request) {
  try {
    console.log("🔹 /api/login called");

    const { email, password } = await req.json();
    console.log("📩 Incoming:", { email });

    const client = await clientPromise;
    const db = client.db("mini-shop");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ email });
    console.log("👤 Found user:", !!user);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const valid = await bcrypt.compare(password, user.password);
    console.log("🔐 Password match:", valid);

    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Ensure secret exists
    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET not found in environment variables!");
      return NextResponse.json({ error: "Server config error" }, { status: 500 });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const res = NextResponse.json({ message: "Login successful", user: { name: user.name, email: user.email,role: user.role, } });
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    console.log("✅ Token set, login successful");
    return res;

  } catch (err: any) {
    console.error("❌ Login API error:", err);
    return NextResponse.json({
      error: "Internal Server Error",
      details: err.message,
    }, { status: 500 });
  }
}
