"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, CircleArrowRight, LibraryBig, LogOut, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";

type LibraryItem = {
  id: string;
  title: string;
  authors: string[];
  categories: string[];
};

export function DashboardClient({ userName }: { userName: string }) {
  const [library, setLibrary] = useState<LibraryItem[]>([]);
  const [communityBooks, setCommunityBooks] = useState<LibraryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [requestState, setRequestState] = useState<Record<string, string>>({});

  useEffect(() => {
    async function loadDashboard() {
      const [libraryResponse, communityResponse] = await Promise.all([
        fetch("/api/library"),
        fetch("/api/library?scope=community"),
      ]);
      if (libraryResponse.ok) setLibrary((await libraryResponse.json()).items);
      if (communityResponse.ok) setCommunityBooks((await communityResponse.json()).items);
      setIsLoading(false);
    }

    void loadDashboard();
  }, []);

  async function borrowBook(libraryItemId: string) {
    setRequestState((current) => ({ ...current, [libraryItemId]: "Sending…" }));
    const response = await fetch("/api/borrows", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ libraryItemId }),
    });
    const data = (await response.json().catch(() => null)) as { message?: string } | null;
    setRequestState((current) => ({
      ...current,
      [libraryItemId]: response.ok ? "Request sent" : data?.message || "Try again",
    }));
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.assign("/");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold tracking-wide text-emerald-700 uppercase">Your dashboard</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">Welcome back, {userName.split(" ")[0]}</h1>
            <p className="mt-2 text-slate-600">Search for a book, add it to your library, or borrow from a reader nearby.</p>
          </div>
          <Button onClick={logout} type="button" variant="outline"><LogOut className="size-4" /> Log out</Button>
        </div>

        <section className="mt-10 grid gap-4 md:grid-cols-3" aria-label="How BookTuk works">
          <Step number="1" title="Search" description="Find a title, author, subject, or ISBN." icon={<Search className="size-5" />} href="/search" action="Search books" />
          <Step number="2" title="Library" description="Save books you own or want to share." icon={<LibraryBig className="size-5" />} href="/search" action="Add a book" />
          <Step number="3" title="Borrow" description="Request an available book from the community." icon={<BookOpen className="size-5" />} href="#borrow" action="Browse books" />
        </section>

        <section className="mt-12" id="library">
          <div className="flex items-center justify-between gap-4">
            <div><h2 className="text-xl font-bold text-slate-900">Your library</h2><p className="mt-1 text-sm text-slate-600">Books you have saved to share with the community.</p></div>
            <Link className="text-sm font-semibold text-emerald-700 hover:text-emerald-800" href="/search">Add books</Link>
          </div>
          {isLoading ? <LoadingCards /> : library.length ? <BookList books={library} /> : <EmptyLibrary />}
        </section>

        <section className="mt-12 scroll-mt-24" id="borrow">
          <h2 className="text-xl font-bold text-slate-900">Available to borrow</h2>
          <p className="mt-1 text-sm text-slate-600">Books other BookTuk readers have made available.</p>
          {isLoading ? <LoadingCards /> : communityBooks.length ? <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{communityBooks.map((book) => <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm" key={book.id}><p className="text-xs font-semibold tracking-wide text-emerald-700 uppercase">{book.categories[0] ?? "Book"}</p><h3 className="mt-1 font-bold text-slate-900">{book.title}</h3><p className="mt-1 text-sm text-slate-600">{book.authors.join(", ")}</p><Button className="mt-4 w-full bg-emerald-600 text-white hover:bg-emerald-700" disabled={Boolean(requestState[book.id])} onClick={() => borrowBook(book.id)} type="button">{requestState[book.id] || "Request to borrow"}</Button></article>)}</div> : <div className="mt-5 rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600">No community books are available yet. Add a book to your library to get the exchange started.</div>}
        </section>
      </main>
    </div>
  );
}

function Step({ number, title, description, icon, href, action }: { number: string; title: string; description: string; icon: React.ReactNode; href: string; action: string }) {
  return <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><span className="flex size-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">{icon}</span><span className="text-sm font-bold text-slate-400">0{number}</span></div><h2 className="mt-5 font-bold text-slate-900">{title}</h2><p className="mt-1 text-sm text-slate-600">{description}</p><Link className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:text-emerald-800" href={href}>{action} <CircleArrowRight className="size-4" /></Link></article>;
}

function BookList({ books }: { books: LibraryItem[] }) {
  return <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{books.map((book) => <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm" key={book.id}><p className="text-xs font-semibold tracking-wide text-emerald-700 uppercase">{book.categories[0] ?? "Book"}</p><h3 className="mt-1 font-bold text-slate-900">{book.title}</h3><p className="mt-1 text-sm text-slate-600">{book.authors.join(", ")}</p><p className="mt-3 text-xs font-medium text-emerald-700">Available to share</p></article>)}</div>;
}

function LoadingCards() { return <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[1, 2, 3].map((item) => <div className="h-32 animate-pulse rounded-xl bg-slate-200" key={item} />)}</div>; }

function EmptyLibrary() { return <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center"><LibraryBig className="mx-auto size-8 text-emerald-600" /><h3 className="mt-3 font-bold text-slate-900">Your library is empty</h3><p className="mt-1 text-sm text-slate-600">Search for books you own and add them to start sharing.</p><Link className="mt-4 inline-block text-sm font-semibold text-emerald-700 hover:text-emerald-800" href="/search">Search books</Link></div>; }
