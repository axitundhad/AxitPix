import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find({})
      .populate("userId", "email")
      .populate("productId", "imageUrl")
      .lean()
      .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return NextResponse.json({ message: "No orders found" }, { status: 201 });
    }

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetching orders:" },
      { status: 500 }
    );
  }
}
