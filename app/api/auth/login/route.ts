import bcrypt from "bcryptjs";
import { z } from "zod";

import { connectToDatabase } from "@/lib/mongodb";
import { createSession } from "@/lib/session";
import User from "@/models/User";

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
});

export async function POST(request: Request) {
  try {
    const body = loginSchema.safeParse(await request.json());
    if (!body.success) {
      return Response.json({ message: body.error.issues[0]?.message }, { status: 400 });
    }

    await connectToDatabase();
    const user = await User.findOne({ email: body.data.email.toLowerCase() }).select(
      "+passwordHash"
    );
    const validPassword = user && (await bcrypt.compare(body.data.password, user.passwordHash));

    if (!validPassword || !user) {
      return Response.json(
        { message: "Your email or password is incorrect." },
        { status: 401 }
      );
    }

    await createSession({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
    });

    return Response.json({ user: { id: user._id.toString(), name: user.name, email: user.email } });
  } catch {
    return Response.json({ message: "Unable to log you in." }, { status: 500 });
  }
}
