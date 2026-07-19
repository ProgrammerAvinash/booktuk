"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
  UsersRound,
  Trees,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FieldName = "name" | "email" | "password" | "confirmPassword";
type Errors = Partial<Record<FieldName | "form", string>>;

const minimumPasswordLength = 8;

function validateForm(values: Record<FieldName, string>) {
  const errors: Errors = {};

  if (!values.name.trim()) errors.name = "Enter your name.";
  if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (values.password.length < minimumPasswordLength) {
    errors.password = `Use at least ${minimumPasswordLength} characters.`;
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}

export default function GetStartedPage() {
  const [values, setValues] = useState<Record<FieldName, string>>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function updateField(name: FieldName, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({
      ...current,
      [name]: undefined,
      form: undefined,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validateForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim().toLowerCase(),
          password: values.password,
        }),
      });

      const data = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        throw new Error(data?.message || "We could not create your account.");
      }

      setIsComplete(true);
    } catch (error) {
      setErrors({
        form:
          error instanceof Error
            ? error.message
            : "We could not create your account. Please try again.",
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
          <section className="bg-gradient-to-br from-emerald-700 via-green-800 to-teal-900 p-8 text-white sm:p-12 relative overflow-hidden flex flex-col justify-between">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 size-64 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 border border-white/15 text-emerald-200 text-xs font-bold tracking-wide uppercase backdrop-blur-sm">
                <Trees className="size-3.5 text-emerald-400" />
                <span>Join the Green Reading Club</span>
              </div>
              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Share Books. Save Trees.
              </h1>
              <p className="mt-4 max-w-sm text-emerald-100 leading-relaxed">
                Join readers who share recommendations, give finished books a
                second life, and protect our planet together.
              </p>

              <ul className="mt-10 space-y-5">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 rounded-lg bg-white/15 p-2 text-emerald-200">
                    <UsersRound className="size-5" aria-hidden="true" />
                  </span>
                  <span>
                    <strong className="block text-white">
                      Find your eco-community
                    </strong>
                    <span className="text-sm text-emerald-100/90">
                      Connect with local book lovers within your neighborhood
                      radius.
                    </span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 rounded-lg bg-white/15 p-2 text-emerald-200">
                    <BookOpen className="size-5" aria-hidden="true" />
                  </span>
                  <span>
                    <strong className="block text-white">
                      Reduce paper waste
                    </strong>
                    <span className="text-sm text-emerald-100/90">
                      Borrow bestsellers for free instead of ordering new paper
                      printings.
                    </span>
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-8 text-xs text-emerald-200/60 relative z-10 font-medium">
              Every book shared reduces ~0.5kg of carbon emissions 🌱
            </div>
          </section>

          {/* Right Panel: Form Section */}
          <section className="p-8 sm:p-12">
            {isComplete ? (
              <div className="flex min-h-96 flex-col items-center justify-center text-center">
                <span className="flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="size-8" aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-2xl font-bold tracking-tight text-stone-900">
                  Your account is ready!
                </h2>
                <p className="mt-2 max-w-sm text-stone-600">
                  Your BookTuk account has been created. You can now log in and
                  start saving trees.
                </p>
                <Link href="/dashboard" className="mt-7">
                  <Button className="bg-emerald-600 text-white hover:bg-emerald-700 font-semibold px-6 shadow-md shadow-emerald-600/20">
                    Go to dashboard{" "}
                    <ArrowRight className="size-4 ml-1.5" aria-hidden="true" />
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold tracking-tight text-stone-900">
                  Create your account
                </h2>
                <p className="mt-2 text-sm text-stone-600">
                  Start your BookTuk journey for free.
                </p>

                <form
                  className="mt-7 space-y-4"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <Field
                    error={errors.name}
                    icon={<UserRound className="size-4" aria-hidden="true" />}
                    id="name"
                    label="Full name"
                  >
                    <Input
                      autoComplete="name"
                      aria-invalid={Boolean(errors.name)}
                      id="name"
                      name="name"
                      onChange={(event) =>
                        updateField("name", event.target.value)
                      }
                      placeholder="Avery Reader"
                      required
                      value={values.name}
                      className="border-stone-200 focus-visible:ring-emerald-600"
                    />
                  </Field>

                  <Field
                    error={errors.email}
                    icon={<Mail className="size-4" aria-hidden="true" />}
                    id="email"
                    label="Email address"
                  >
                    <Input
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      id="email"
                      name="email"
                      onChange={(event) =>
                        updateField("email", event.target.value)
                      }
                      placeholder="you@example.com"
                      required
                      type="email"
                      value={values.email}
                      className="border-stone-200 focus-visible:ring-emerald-600"
                    />
                  </Field>

                  <Field
                    error={errors.password}
                    icon={<LockKeyhole className="size-4" aria-hidden="true" />}
                    id="password"
                    label="Password"
                  >
                    <div className="relative">
                      <Input
                        autoComplete="new-password"
                        aria-invalid={Boolean(errors.password)}
                        id="password"
                        name="password"
                        onChange={(event) =>
                          updateField("password", event.target.value)
                        }
                        placeholder={`At least ${minimumPasswordLength} characters`}
                        required
                        type={showPassword ? "text" : "password"}
                        value={values.password}
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
                  </Field>

                  <Field
                    error={errors.confirmPassword}
                    icon={<LockKeyhole className="size-4" aria-hidden="true" />}
                    id="confirm-password"
                    label="Confirm password"
                  >
                    <Input
                      autoComplete="new-password"
                      aria-invalid={Boolean(errors.confirmPassword)}
                      id="confirm-password"
                      name="confirm-password"
                      onChange={(event) =>
                        updateField("confirmPassword", event.target.value)
                      }
                      placeholder="Repeat your password"
                      required
                      type={showPassword ? "text" : "password"}
                      value={values.confirmPassword}
                      className="border-stone-200 focus-visible:ring-emerald-600"
                    />
                  </Field>

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
                    {isSubmitting ? "Creating account…" : "Create account"}
                    {!isSubmitting && (
                      <ArrowRight
                        className="size-4 ml-1.5"
                        aria-hidden="true"
                      />
                    )}
                  </Button>
                </form>

                <p className="mt-6 text-center text-sm text-stone-600">
                  Already have an account?{" "}
                  <Link
                    className="font-semibold text-emerald-600 hover:text-emerald-700 underline underline-offset-4"
                    href="/login"
                  >
                    Log in
                  </Link>
                </p>
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function Field({
  children,
  error,
  icon,
  id,
  label,
}: {
  children: React.ReactNode;
  error?: string;
  icon: React.ReactNode;
  id: string;
  label: string;
}) {
  return (
    <div>
      <label
        className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-stone-700"
        htmlFor={id}
      >
        <span className="text-stone-400">{icon}</span>
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>
      )}
    </div>
  );
}
