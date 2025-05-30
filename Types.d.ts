import { Connection } from "mongoose";

declare global{
    var mongoose: {
        conn: Connection | null;
        Promise: Promise<Connection> | null;
    }
    interface Window {
    Razorpay: any; // OR the actual Razorpay type if you have it
  }
}

export {};