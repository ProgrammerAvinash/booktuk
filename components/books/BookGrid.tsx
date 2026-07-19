import type { Book } from "@/types/book";

import { BookCard } from "@/components/books/BookCard";

export function BookGrid({ books }: { books: Book[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((book) => (
        <BookCard book={book} key={book.id} />
      ))}
    </div>
  );
}
