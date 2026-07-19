import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      maxlength: 320,
    },
    passwordHash: { type: String, required: true, select: false },
  },
  { timestamps: true }
);

export type User = InferSchemaType<typeof userSchema>;

export default (models.User as Model<User>) || model<User>("User", userSchema);
