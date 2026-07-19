"use client";

import { Star, Quote, Sparkles, CheckCircle2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "I borrowed Atomic Habits from someone just 2 km away. The process was super smooth, and we ended up chatting about habits for an hour over tea!",
      author: "Ananya Sharma",
      location: "Bandra West, Mumbai",
      avatarInitials: "AS",
      avatarColor: "bg-purple-600",
      role: "Borrowed 4 books",
    },
    {
      quote:
        "Best way to meet fellow readers. I moved to a new neighborhood and didn't know anyone until I joined the local reading circle on BookTuk.",
      author: "Rohan Mehta",
      location: "Indiranagar, Bengaluru",
      avatarInitials: "RM",
      avatarColor: "bg-emerald-600",
      role: "Joined 2 communities",
    },
    {
      quote:
        "I saved money and made friends! Why buy expensive hardcovers when your neighbors are happy to share? Absolutely love this platform.",
      author: "Sneha Kulkarni",
      location: "Koregaon Park, Pune",
      avatarInitials: "SK",
      avatarColor: "bg-emerald-600",
      role: "Shared 12 books",
    },
  ];

  return (
    <section
      id="reviews"
      className="py-16 md:py-24 bg-white border-t border-slate-200/60 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-700 text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Community Love</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Loved by Readers Around You
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            See how BookTuk is bringing neighborhoods together, one book
            exchange at a time.
          </p>
        </div>

        {/* THREE-COLUMN TESTIMONIALS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((item, index) => (
            <Card
              key={index}
              className="bg-stone-50/60 border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between relative overflow-hidden group"
            >
              {/* Subtle background quote icon accent */}
              <Quote className="absolute top-4 right-4 w-16 h-16 text-slate-200/60 -rotate-12 pointer-events-none group-hover:text-indigo-100/60 transition-colors" />

              <div>
                <CardHeader className="pb-4 relative z-10">
                  {/* ⭐⭐⭐⭐⭐ 5-STAR RATING */}
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>

                  {/* QUOTE TEXT */}
                  <p className="text-slate-700 font-medium text-sm sm:text-base leading-relaxed pt-1">
                    "{item.quote}"
                  </p>
                </CardHeader>
              </div>

              {/* AUTHOR BIO & VERIFIED BADGE */}
              <CardFooter className="pt-4 border-t border-slate-200/60 bg-white/80 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  {/* Avatar Initials */}
                  <div
                    className={`w-10 h-10 rounded-full ${item.avatarColor} text-white font-bold text-xs flex items-center justify-center shadow-sm shrink-0`}
                  >
                    {item.avatarInitials}
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-sm text-slate-900 line-clamp-1">
                        {item.author}
                      </h4>
                      <CheckCircle2
                        className="w-3.5 h-3.5 text-emerald-500 shrink-0"
                        title="Verified Local Reader"
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      {item.location}
                    </p>
                  </div>
                </div>

                {/* Role / Activity Badge */}
                <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded-md hidden sm:inline-block shrink-0 border border-slate-200/60">
                  {item.role}
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* TRUST BANNER FOOTER */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>
              All reviews are from verified BookTuk community members.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
