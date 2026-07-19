import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const sessionCookieName = "booktuk_session";
const sessionDuration = 60 * 60 * 24 * 7;

function getSessionSecret() {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("Missing AUTH_SECRET environment variable.");
  }

  return new TextEncoder().encode(secret);
}

export type Session = {
  userId: string;
  email: string;
  name: string;
};

export async function createSession(session: Session) {
  const token = await new SignJWT(session)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${sessionDuration}s`)
    .sign(getSessionSecret());

  const cookieStore = await cookies();
  cookieStore.set(sessionCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: sessionDuration,
    path: "/",
  });
}

export async function getSession(): Promise<Session | null> {
  const token = (await cookies()).get(sessionCookieName)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSessionSecret());

    if (
      typeof payload.userId !== "string" ||
      typeof payload.email !== "string" ||
      typeof payload.name !== "string"
    ) {
      return null;
    }

    return { userId: payload.userId, email: payload.email, name: payload.name };
  } catch {
    return null;
  }
}

export async function clearSession() {
  (await cookies()).delete(sessionCookieName);
}
