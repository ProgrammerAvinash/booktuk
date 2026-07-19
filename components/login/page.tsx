"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Quote,
  Trees,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Errors = Partial<Record<"email" | "password" | "form", string>>;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function updateEmail(value: string) {
    setEmail(value);
    setErrors((current) => ({ ...current, email: undefined, form: undefined }));
  }

  function updatePassword(value: string) {
    setPassword(value);
    setErrors((current) => ({
      ...current,
      password: undefined,
      form: undefined,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: Errors = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!password) nextErrors.password = "Enter your password.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });
      const data = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        throw new Error(
          data?.message || "Your email or password is incorrect.",
        );
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      setErrors({
        form:
          error instanceof Error
            ? error.message
            : "We could not log you in. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Logo */}
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 text-stone-900 transition-opacity hover:opacity-80"
        >
          <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
            <BookOpen className="size-5" aria-hidden="true" />
          </span>
          <span className="text-xl font-extrabold tracking-tight">
            Book<span className="text-emerald-600">Tuk</span>
          </span>
        </Link>

        {/* Card Container */}
        <div className="mt-8 grid overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl shadow-stone-950/5 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left Panel: Eco-Theme Gradient */}
          <section className="order-2 bg-gradient-to-br from-emerald-800 via-green-900 to-teal-950 p-8 text-white sm:p-12 lg:order-1 relative overflow-hidden flex flex-col justify-between">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-0 -translate-y-12 -translate-x-12 size-64 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 border border-white/15 text-emerald-200 text-xs font-bold tracking-wide uppercase backdrop-blur-sm">
                <Trees className="size-3.5 text-emerald-400" />
                <span>Green Reading Community</span>
              </div>
              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Pick up right where your reading left off.
              </h1>
              <p className="mt-4 max-w-sm text-emerald-100 leading-relaxed">
                Your next chapter, saved local titles, and neighborhood reading
                circles are ready whenever you are.
              </p>

              <figure className="mt-12 border-l-2 border-emerald-400 pl-5">
                <Quote className="size-5 text-emerald-300" aria-hidden="true" />
                <blockquote className="mt-3 text-lg leading-7 text-stone-100 font-medium">
                  BookTuk made it effortless to share bestsellers with neighbors
                  while knowing we are actively saving paper and trees!
                </blockquote>
                <figcaption className="mt-4 text-sm text-emerald-200/80">
                  — A Verified Eco-Reader
                </figcaption>
              </figure>
            </div>

            <div className="pt-8 text-xs text-emerald-200/60 relative z-10 font-medium">
              Over 12,000+ sustainable book swaps completed 🌱
            </div>
          </section>

          {/* Right Panel: Login Form Section */}
          <section className="order-1 p-8 sm:p-12 lg:order-2">
            <h2 className="text-2xl font-bold tracking-tight text-stone-900">
              Log in to BookTuk
            </h2>
            <p className="mt-2 text-sm text-stone-600">
              Enter your details to continue saving trees.
            </p>

            <form className="mt-7 space-y-4" noValidate onSubmit={handleSubmit}>
              <div>
                <label
                  className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-stone-700"
                  htmlFor="email"
                >
                  <Mail className="size-4 text-stone-400" aria-hidden="true" />
                  Email address
                </label>
                <Input
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  id="email"
                  name="email"
                  onChange={(event) => updateEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                  type="email"
                  value={email}
                  className="border-stone-200 focus-visible:ring-emerald-600"
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <div className="mb-1.5 flex items-center">
                  <label
                    className="flex items-center gap-1.5 text-sm font-medium text-stone-700"
                    htmlFor="password"
                  >
                    <LockKeyhole
                      className="size-4 text-stone-400"
                      aria-hidden="true"
                    />
                    Password
                  </label>
                </div>
                <div className="relative">
                  <Input
                    autoComplete="current-password"
                    aria-invalid={Boolean(errors.password)}
                    id="password"
                    name="password"
                    onChange={(event) => updatePassword(event.target.value)}
                    placeholder="Enter your password"
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                    className="border-stone-200 focus-visible:ring-emerald-600"
                  />
                  <button
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute inset-y-0 right-0 px-3 text-stone-400 hover:text-stone-700"
                    onClick={() => setShowPassword((visible) => !visible)}
                    type="button"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" aria-hidden="true" />
                    ) : (
                      <Eye className="size-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">
                    {errors.password}
                  </p>
                )}
              </div>

              {errors.form && (
                <p
                  className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 border border-red-100"
                  role="alert"
                >
                  {errors.form}
                </p>
              )}

              <Button
                className="mt-2 h-11 w-full bg-emerald-600 text-white hover:bg-emerald-700 font-bold shadow-md shadow-emerald-600/20 transition-all"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? "Logging in…" : "Log in"}
                {!isSubmitting && (
                  <ArrowRight className="size-4 ml-1.5" aria-hidden="true" />
                )}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-stone-600">
              New to BookTuk?{" "}
              <Link
                className="font-semibold text-emerald-600 hover:text-emerald-700 underline underline-offset-4"
                href="/get-started"
              >
                Create an account
              </Link>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
