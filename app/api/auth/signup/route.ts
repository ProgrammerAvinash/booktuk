import bcrypt from "bcryptjs";
import { z } from "zod";

import { connectToDatabase } from "@/lib/mongodb";
import { createSession } from "@/lib/session";
import User from "@/models/User";

const signUpSchema = z.object({
  name: z.string().trim().min(1, "Enter your name.").max(100),
  email: z.string().trim().email("Enter a valid email address.").max(320),
  password: z.string().min(8, "Use at least 8 characters.").max(128),
});

export async function POST(request: Request) {
  try {
    const body = signUpSchema.safeParse(await request.json());
    if (!body.success) {
      return Response.json({ message: body.error.issues[0]?.message }, { status: 400 });
    }

    await connectToDatabase();
    const email = body.data.email.toLowerCase();
    const existingUser = await User.exists({ email });

    if (existingUser) {
      return Response.json(
        { message: "An account already exists for this email." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(body.data.password, 12);
    const user = await User.create({ name: body.data.name, email, passwordHash });

    await createSession({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
    });

    return Response.json(
      { user: { id: user._id.toString(), name: user.name, email: user.email } },
      { status: 201 }
    );
  } catch {
    return Response.json({ message: "Unable to create your account." }, { status: 500 });
  }
}
