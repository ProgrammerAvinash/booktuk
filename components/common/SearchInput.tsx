"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchInput({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();

    if (value) {
      router.push(`/search?q=${encodeURIComponent(value)}`);
    }
  }

  return (
    <form className="flex w-full gap-2" onSubmit={handleSubmit} role="search">
      <label className="sr-only" htmlFor="book-search">
        Search books by title, author, or ISBN
      </label>
      <Input
        className="h-11 bg-white text-black"
        id="book-search"
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by title, author, or ISBN"
        type="search"
        value={query}
      />
      <Button
        aria-label="Search books"
        className="h-11 bg-emerald-600 px-4 text-white hover:bg-emerald-700"
        type="submit"
      >
        <Search className="size-4" aria-hidden="true" />
        <span className="hidden sm:inline">Search</span>
      </Button>
    </form>
  );
}
