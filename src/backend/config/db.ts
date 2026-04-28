import mongoose from "mongoose";
import { env } from "./env";

// const connectDB = async (): Promise<void> => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGODB_URI as string);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//     process.exit(1);
//   }
// };

// export default connectDB;

// Reuse DB connection and pending promise
type GlobalMongo = {
  conn: typeof mongoose | null; // saved connected DB
  promise: Promise<typeof mongoose> | null; // connection running now
};

// Add custom global.mongo variable
declare global {
  // eslint-disable-next-line no-var
  var mongo: GlobalMongo | undefined;
}

// Use old cache or create new cache
const cached: GlobalMongo = global.mongo || {
  conn: null,
  promise: null,
};

// Save cache globally first time
if (!global.mongo) {
  global.mongo = cached;
}

// Connect MongoDB
const connectDB = async (): Promise<typeof mongoose> => {
  // If already connected, use same connection
  if (cached.conn) {
    console.log("MongoDB Already Connected");
    return cached.conn;
  }

  // If no connection started, start now
  if (!cached.promise) {
    cached.promise = mongoose.connect(env.MONGODB_URI, {
      dbName: "asset-management",
    });
  }

  try {
    // Wait for connection success
    cached.conn = await cached.promise;
    console.log("MongoDB Connected:", cached.conn.connection.host);
    return cached.conn; // Return connected DB
  } catch (error) {
    cached.promise = null; // Clear failed promise and retry next time

    console.error("MongoDB Connection Error:", error);

    throw error;
  }
};

export default connectDB;
