import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Check your database connection string..");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, Promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.Promise) {
    const opts = {
      bufferCommands: true,
    };
    cached.Promise = mongoose
      .connect(MONGODB_URI, opts)
      .then(() => mongoose.connection);
  }

  try {
    cached.conn = await cached.Promise;
  } catch (error) {
    cached.Promise = null;
    throw error;
  }

  return cached.conn;
}
