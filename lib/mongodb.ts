import mongoose from "mongoose";

const mongoUri = process.env.MONGODB_URI ?? "";

if (!mongoUri) {
  throw new Error("Missing MONGODB_URI environment variable.");
}

type MongooseCache = {
  connection: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalWithMongoose = global as typeof globalThis & {
  mongoose?: MongooseCache;
};

const cache = globalWithMongoose.mongoose ?? {
  connection: null,
  promise: null,
};

globalWithMongoose.mongoose = cache;

export async function connectToDatabase() {
  if (cache.connection) return cache.connection;

  cache.promise ??= mongoose.connect(mongoUri, { bufferCommands: false });
  cache.connection = await cache.promise;

  return cache.connection;
}
