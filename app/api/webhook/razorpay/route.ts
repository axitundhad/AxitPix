import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest("hex");

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body);
    await connectDB();

    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;

      const order = await Order.findOneAndUpdate(
        {
          razorpayOrderId: payment.order_id,
        },
        {
          razorpayPaymentId: payment.id,
          status: "completed",
        }
      ).populate([
        { path: "productId", select: "name" },
        { path: "userId", select: "email" },
      ]);
      if (order) {
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Admin AxitPix" <${process.env.GMAIL_USER}>`,
          to: order.userId.email,
          subject: "Order Completed",
          text: `
           Thank you for your purchase!

        Order Details:
        - Order ID: ${order._id.toString().slice(-6)}
        - Product: ${order.productId.name}
        - Version: ${order.variants.type}
        - Price: $${order.amount.toFixed(2)}

        Your image is now available in your orders page.
        Thank you for shopping with AxitPix ImageKit Shop!
                  `.trim(),
        });
        //         const transporter = nodemailer.createTransport({
        //           host: "sandbox.smtp.mailtrap.io",
        //           port: 2525,
        //           auth: {
        //             user: process.env.MAILTRAP_USERNAME,
        //             pass: process.env.MAILTRAP_PASS,
        //           },
        //         });

        //         await transporter.sendMail({
        //           from: "admin@axitpix.com",
        //           to: order.userId.email,
        //           subject: "Order Completed",
        //           text: `
        // Thank you for your purchase!

        // Order Details:
        // - Order ID: ${order._id.toString().slice(-6)}
        // - Product: ${order.productId.name}
        // - Version: ${order.variants.type}
        // - License: ${order.variants.license}
        // - Price: $${order.amount.toFixed(2)}

        // Your image is now available in your orders page.
        // Thank you for shopping with ImageKit Shop!
        //           `.trim(),
        //         });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
