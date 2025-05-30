import mongoose, { Schema, model, models } from "mongoose";
import { ImageVariant, imageVariantType } from "./Product";

interface PopulatedUser {
    _id: mongoose.Types.ObjectId;
    email: string;
}

interface PopulatedProduct {
    _id: mongoose.Types.ObjectId;
    name: string;
    imageUrl: string;
}

export interface IOrder {
    _id?: mongoose.Types.ObjectId;
    userId?: mongoose.Types.ObjectId | PopulatedUser;
    productId?: mongoose.Types.ObjectId | PopulatedProduct;
    variants: ImageVariant;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    amount: number;
    status: "pending" | "completed" | "failed";
    downloadUrl?: string;
    previewUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    variants: {
      type: {
        type: String,
        required: true,
        enum: ["SQUARE", "WIDE", "PORTRAIT"] as imageVariantType[],
        set: (v: String) => v.toUpperCase(),
      },
      price: { type: Number, required: true },
      licence: {
        type: String,
        required: true,
        enum: ["personal", "commercial"],
      },
    },
    razorpayOrderId: { type: String, required: true},
    razorpayPaymentId: { type: String},
    amount: { type: Number, required: true},
    status: {
        type: String,
        required: true,
        enum: ["pending", "completed", "failed"],
        default: "pending",
      },
      downloadUrl: {type: String},
      previewUrl: {type: String},
  },
  { timestamps: true }
);

const Order = models?.Order || model<IOrder>("Order", orderSchema);

export default Order;
