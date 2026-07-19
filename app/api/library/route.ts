import { z } from "zod";

import { requireSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import LibraryItem from "@/models/LibraryItem";

const bookSchema = z.object({
  googleBookId: z.string().min(1),
  title: z.string().trim().min(1).max(500),
  authors: z.array(z.string().trim().min(1)).max(20).default([]),
  thumbnail: z.string().url().optional(),
  publishedDate: z.string().max(30).optional(),
  categories: z.array(z.string().trim().min(1)).max(10).default([]),
});

function serializeItem(item: {
  _id: { toString(): string };
  ownerId: { toString(): string };
  googleBookId: string;
  title: string;
  authors: string[];
  thumbnail?: string | null;
  publishedDate?: string | null;
  categories: string[];
  isAvailable: boolean;
  createdAt: Date;
}) {
  return {
    id: item._id.toString(),
    ownerId: item.ownerId.toString(),
    googleBookId: item.googleBookId,
    title: item.title,
    authors: item.authors,
    thumbnail: item.thumbnail,
    publishedDate: item.publishedDate,
    categories: item.categories,
    isAvailable: item.isAvailable,
    createdAt: item.createdAt.toISOString(),
  };
}

export async function GET(request: Request) {
  try {
    const session = await requireSession();
    await connectToDatabase();
    const scope = new URL(request.url).searchParams.get("scope");
    const filter = scope === "community" ? { ownerId: { $ne: session.userId }, isAvailable: true } : { ownerId: session.userId };
    const items = await LibraryItem.find(filter).sort({ createdAt: -1 }).lean();

    return Response.json({ items: items.map(serializeItem) });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return Response.json({ message: "Please log in to view library items." }, { status: 401 });
    }
    return Response.json({ message: "Unable to load library items." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireSession();
    const body = bookSchema.safeParse(await request.json());
    if (!body.success) {
      return Response.json({ message: "The book information is invalid." }, { status: 400 });
    }

    await connectToDatabase();
    const item = await LibraryItem.findOneAndUpdate(
      { ownerId: session.userId, googleBookId: body.data.googleBookId },
      { $setOnInsert: { ownerId: session.userId, ...body.data } },
      { new: true, upsert: true }
    );

    return Response.json({ item: serializeItem(item) }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return Response.json({ message: "Please log in to save books." }, { status: 401 });
    }
    return Response.json({ message: "Unable to save this book." }, { status: 500 });
  }
}
