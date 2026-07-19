import { z } from "zod";

import { requireSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import BorrowRequest from "@/models/BorrowRequest";
import LibraryItem from "@/models/LibraryItem";

const borrowSchema = z.object({ libraryItemId: z.string().regex(/^[a-f\d]{24}$/i) });

export async function POST(request: Request) {
  try {
    const session = await requireSession();
    const body = borrowSchema.safeParse(await request.json());
    if (!body.success) {
      return Response.json({ message: "Choose a valid book to borrow." }, { status: 400 });
    }

    await connectToDatabase();
    const item = await LibraryItem.findOne({ _id: body.data.libraryItemId, isAvailable: true });

    if (!item) {
      return Response.json({ message: "This book is no longer available." }, { status: 404 });
    }
    if (item.ownerId.toString() === session.userId) {
      return Response.json({ message: "You cannot borrow a book from your own library." }, { status: 400 });
    }

    await BorrowRequest.create({
      libraryItemId: item._id,
      borrowerId: session.userId,
      ownerId: item.ownerId,
    });

    return Response.json({ message: "Borrow request sent." }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return Response.json({ message: "Please log in to borrow books." }, { status: 401 });
    }
    if (error instanceof Error && /duplicate key/i.test(error.message)) {
      return Response.json({ message: "You already requested this book." }, { status: 409 });
    }
    return Response.json({ message: "Unable to send your borrow request." }, { status: 500 });
  }
}
