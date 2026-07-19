import type { Book } from "@/types/book";

type GoogleBooksResponse = {
  items?: Array<{
    id: string;
    volumeInfo?: {
      title?: string;
      authors?: string[];
      description?: string;
      imageLinks?: { thumbnail?: string };
      publishedDate?: string;
      categories?: string[];
      previewLink?: string;
    };
  }>;
};

export async function searchBooks(query: string): Promise<Book[]> {
  const endpoint = process.env.NEXT_PUBLIC_GOOGLE_BOOK_API;
  if (!endpoint) {
    throw new Error("Book search is not configured.");
  }

  const url = new URL(endpoint);
  url.searchParams.set("q", query);
  url.searchParams.set("maxResults", "24");
  url.searchParams.set("printType", "books");

  const response = await fetch(url, { next: { revalidate: 3600 } });
  if (!response.ok) {
    throw new Error("We could not search books right now. Please try again.");
  }

  const data = (await response.json()) as GoogleBooksResponse;

  return (data.items ?? []).map(({ id, volumeInfo = {} }) => ({
    id,
    title: volumeInfo.title ?? "Untitled book",
    authors: volumeInfo.authors ?? ["Unknown author"],
    description: volumeInfo.description,
    thumbnail: volumeInfo.imageLinks?.thumbnail?.replace(/^http:/, "https:"),
    publishedDate: volumeInfo.publishedDate,
    categories: volumeInfo.categories ?? [],
    previewLink: volumeInfo.previewLink,
  }));
}
