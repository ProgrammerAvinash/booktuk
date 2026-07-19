import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const libraryItemSchema = new Schema(
  {
    ownerId: { type: Schema.Types.ObjectId, required: true, ref: "User", index: true },
    googleBookId: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    authors: { type: [String], default: [] },
    thumbnail: { type: String },
    publishedDate: { type: String },
    categories: { type: [String], default: [] },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

libraryItemSchema.index({ ownerId: 1, googleBookId: 1 }, { unique: true });

export type LibraryItem = InferSchemaType<typeof libraryItemSchema>;

export default (models.LibraryItem as Model<LibraryItem>) ||
  model<LibraryItem>("LibraryItem", libraryItemSchema);
