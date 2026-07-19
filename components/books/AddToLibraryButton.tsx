"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

type BookToSave = {
  googleBookId: string;
  title: string;
  authors: string[];
  thumbnail?: string;
  publishedDate?: string;
  categories: string[];
};

export function AddToLibraryButton({ book }: { book: BookToSave }) {
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function addToLibrary() {
    setState("saving");
    try {
      const response = await fetch("/api/library", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });

      if (response.status === 401) {
        window.location.assign("/login");
        return;
      }

      setState(response.ok ? "saved" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <Button
      className="mt-3 h-8 w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50"
      disabled={state === "saving" || state === "saved"}
      onClick={addToLibrary}
      size="sm"
      type="button"
      variant="outline"
    >
      {state === "saved" ? <Check className="size-3.5" /> : <Plus className="size-3.5" />}
      {state === "saving" ? "Saving…" : state === "saved" ? "In your library" : state === "error" ? "Try again" : "Add to library"}
    </Button>
  );
}
