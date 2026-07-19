import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const borrowRequestSchema = new Schema(
  {
    libraryItemId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "LibraryItem",
      index: true,
    },
    borrowerId: { type: Schema.Types.ObjectId, required: true, ref: "User", index: true },
    ownerId: { type: Schema.Types.ObjectId, required: true, ref: "User", index: true },
    status: {
      type: String,
      enum: ["pending", "approved", "declined", "returned"],
      default: "pending",
    },
  },
  { timestamps: true }
);

borrowRequestSchema.index(
  { libraryItemId: 1, borrowerId: 1, status: 1 },
  { unique: true, partialFilterExpression: { status: "pending" } }
);

export type BorrowRequest = InferSchemaType<typeof borrowRequestSchema>;

export default (models.BorrowRequest as Model<BorrowRequest>) ||
  model<BorrowRequest>("BorrowRequest", borrowRequestSchema);
