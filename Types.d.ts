import { Connection } from "mongoose";

export {};

declare global{
    var mongoose: {
        conn: Connection | null;
        Promise: Promise<Connection> | null;
    }
    interface Window {
     Razorpay: new (options: any) => any;
  }
}

