import { BookOpen, ExternalLink } from "lucide-react";

import type { Book } from "@/types/book";
import { AddToLibraryButton } from "@/components/books/AddToLibraryButton";

export function BookCard({ book }: { book: Book }) {
  return (
    <article className="flex overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md sm:block">
      <div className="flex h-40 w-28 shrink-0 items-center justify-center bg-emerald-50 sm:h-60 sm:w-full">
        {book.thumbnail ? (
          // Google Books thumbnail hosts vary, so a plain img avoids an overly broad image allowlist.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt={`Cover of ${book.title}`}
            className="h-full w-full object-cover"
            src={book.thumbnail}
          />
        ) : (
          <BookOpen className="size-8 text-emerald-500" aria-hidden="true" />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-4">
        <p className="text-xs font-semibold tracking-wide text-emerald-700 uppercase">
          {book.categories[0] ?? "Book"}
        </p>
        <h2 className="mt-1 line-clamp-2 font-bold text-slate-900">{book.title}</h2>
        <p className="mt-1 line-clamp-1 text-sm text-slate-600">
          {book.authors.join(", ")}
        </p>
        {book.publishedDate && (
          <p className="mt-1 text-xs text-slate-400">{book.publishedDate}</p>
        )}
        {book.previewLink && (
          <a
            className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            href={book.previewLink}
            rel="noreferrer"
            target="_blank"
          >
            View on Google Books <ExternalLink className="size-3.5" aria-hidden="true" />
          </a>
        )}
        <AddToLibraryButton
          book={{
            googleBookId: book.id,
            title: book.title,
            authors: book.authors,
            thumbnail: book.thumbnail,
            publishedDate: book.publishedDate,
            categories: book.categories,
          }}
        />
      </div>
    </article>
  );
}
