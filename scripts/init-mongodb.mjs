import nextEnv from "@next/env";
import mongoose from "mongoose";

const { loadEnvConfig } = nextEnv;

loadEnvConfig(process.cwd());

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error("MONGODB_URI is missing. Add it to .env.local before initializing MongoDB.");
}

const collectionDefinitions = [
  {
    name: "users",
    indexes: [{ key: { email: 1 }, options: { unique: true, name: "email_unique" } }],
  },
  {
    name: "libraryitems",
    indexes: [
      {
        key: { ownerId: 1, googleBookId: 1 },
        options: { unique: true, name: "owner_book_unique" },
      },
      { key: { ownerId: 1 }, options: { name: "owner_lookup" } },
    ],
  },
  {
    name: "borrowrequests",
    indexes: [
      { key: { libraryItemId: 1 }, options: { name: "library_item_lookup" } },
      { key: { borrowerId: 1 }, options: { name: "borrower_lookup" } },
      { key: { ownerId: 1 }, options: { name: "owner_lookup" } },
      {
        key: { libraryItemId: 1, borrowerId: 1, status: 1 },
        options: {
          unique: true,
          name: "pending_request_unique",
          partialFilterExpression: { status: "pending" },
        },
      },
    ],
  },
];

await mongoose.connect(mongoUri);

try {
  const database = mongoose.connection.db;
  const existingCollections = new Set(
    (await database.listCollections({}, { nameOnly: true }).toArray()).map(
      (collection) => collection.name,
    ),
  );

  for (const definition of collectionDefinitions) {
    if (!existingCollections.has(definition.name)) {
      await database.createCollection(definition.name);
    }

    const collection = database.collection(definition.name);
    for (const index of definition.indexes) {
      await collection.createIndex(index.key, index.options);
    }
  }

  console.log("MongoDB collections and indexes are ready.");
} finally {
  await mongoose.disconnect();
}
