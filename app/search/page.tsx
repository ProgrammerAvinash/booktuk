import Link from "next/link";
import { BookOpen, SearchX, Trees } from "lucide-react";

import { BookGrid } from "@/components/books/BookGrid";
import { SearchInput } from "@/components/common/SearchInput";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { searchBooks } from "@/services/book.service";
import type { Book } from "@/types/book";

type SearchPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.trim() : "";

  let books: Book[] = [];
  let error: string | undefined;

  if (query) {
    try {
      books = await searchBooks(query);
    } catch (searchError) {
      error =
        searchError instanceof Error
          ? searchError.message
          : "We could not search books right now. Please try again.";
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      <Navbar />
      <main className="flex-1">
        {/* Eco-Themed Search Header */}
        <section className="relative overflow-hidden border-b border-emerald-900/20 bg-gradient-to-br from-emerald-950 via-green-900 to-teal-950 py-14 text-white sm:py-20">
          {/* Ambient Natural Glow */}
          <div className="absolute -top-24 right-10 size-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold tracking-wide text-emerald-300 uppercase backdrop-blur-sm border border-white/10 mb-3">
              <Trees className="size-3.5 text-emerald-400" />
              <span>Explore Local Bookshelves</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Find your next sustainable read
            </h1>
            <p className="mt-3 max-w-xl text-emerald-100 leading-relaxed">
              Search titles shared by neighbors nearby or lookup books by ISBN
              to borrow for free and reduce paper waste.
            </p>
            <div className="mt-7 max-w-2xl">
              <SearchInput initialQuery={query} />
            </div>
          </div>
        </section>

        {/* Results & States Section */}
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          {!query ? (
            <EmptySearchState />
          ) : error ? (
            <div
              className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-800 font-medium"
              role="alert"
            >
              {error}
            </div>
          ) : books.length === 0 ? (
            <div className="rounded-3xl border border-stone-200 bg-white p-12 text-center shadow-sm">
              <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-stone-100 text-stone-400">
                <SearchX className="size-8" aria-hidden="true" />
              </div>
              <h2 className="mt-4 text-lg font-bold text-stone-900">
                No books found
              </h2>
              <p className="mt-1 text-sm text-stone-600">
                We couldn&apos;t find any listings for &ldquo;{query}&rdquo;.
                Try a different title, author name, or ISBN.
              </p>
            </div>
          ) : (
            <>
              <p className="mb-6 text-sm text-stone-600">
                Showing{" "}
                <span className="font-bold text-stone-900">{books.length}</span>{" "}
                result{books.length === 1 ? "" : "s"} for{" "}
                <span className="font-bold text-emerald-700">“{query}”</span>
              </p>
              <BookGrid books={books} />
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

function EmptySearchState() {
  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-12 text-center shadow-sm">
      <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
        <BookOpen className="size-8" aria-hidden="true" />
      </div>
      <h2 className="mt-4 text-lg font-bold text-stone-900">
        What would you like to read?
      </h2>
      <p className="mt-1 text-sm text-stone-600 max-w-md mx-auto">
        Search for a book title, author, or ISBN to discover available copies in
        your community library.
      </p>
      <Link
        className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:scale-105"
        href="/"
      >
        Return home
      </Link>
    </div>
  );
}
