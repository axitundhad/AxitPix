// app/api/payment-success/route.ts
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { razorpayPaymentId, razorpayOrderId, productId, variant } =
      await req.json();

    await connectDB();

    const newOrder = await Order.create({
      userId: session.user.id,
      productId,
      razorpayOrderId,
      razorpayPaymentId,
      amount: variant.price,
      status: "completed", // "completed" is better than "paid"
      variants: {
        licence: variant.licence,
        type: variant.type,
        price: variant.price,
      },
    });

    return NextResponse.json({ success: true, dbOrderId: newOrder._id });
  } catch (err) {
    console.error("Error finalizing order after payment:", err);
    return NextResponse.json(
      { error: "Failed to create order after payment" },
      { status: 500 }
    );
  }
}
