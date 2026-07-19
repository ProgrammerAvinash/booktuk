"use client";

import {
  Search,
  PlusCircle,
  Share2,
  MapPin,
  MessageCircle,
  ArrowRight,
  Trees,
  Recycle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Search & Lookup",
      description:
        "Type an ISBN or title. We fetch cover art and details instantly without printing catalogs.",
      color: "bg-emerald-700 text-white shadow-emerald-700/30",
      borderColor: "group-hover:border-emerald-600/50",
    },
    {
      number: "02",
      icon: PlusCircle,
      title: "Add Finished Books",
      description:
        "Take books gathering dust on your shelf and add them to your digital library inventory.",
      color: "bg-teal-600 text-white shadow-teal-600/30",
      borderColor: "group-hover:border-teal-600/50",
    },
    {
      number: "03",
      icon: Share2,
      title: "Mark Available",
      description:
        "Toggle visibility so readers within your 5 km neighborhood radius can discover them.",
      color: "bg-green-600 text-white shadow-green-600/30",
      borderColor: "group-hover:border-green-600/50",
    },
    {
      number: "04",
      icon: MapPin,
      title: "Local Reader Finds It",
      description:
        "A nearby neighbor requests to borrow your book instead of ordering a new paper copy.",
      color: "bg-amber-600 text-white shadow-amber-600/30",
      borderColor: "group-hover:border-amber-600/50",
    },
    {
      number: "05",
      icon: MessageCircle,
      title: "Borrow & Save Trees",
      description:
        "Connect via instant WhatsApp chat, meet up locally, and protect our planet together! 🌳",
      color: "bg-emerald-600 text-white shadow-emerald-600/30",
      borderColor: "group-hover:border-emerald-600/50",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-16 md:py-24 bg-stone-50 border-t border-stone-200/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold tracking-wide uppercase">
            <Trees className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Simple 5-Step Green Flow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
            How BookTuk Works
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-normal">
            From your bookshelf to a neighbor&#39;s hands in just a few clicks.
            Sharing books has never been easier—or greener.
          </p>
        </div>

        {/* HORIZONTAL TIMELINE (DESKTOP) / VERTICAL TIMELINE (MOBILE) */}
        <div className="relative">
          {/* Earth-Toned Connecting Line Behind Nodes (Desktop Only) */}
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-linear-to-r from-emerald-200 via-teal-200 to-amber-200 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === steps.length - 1;

              return (
                <div
                  key={step.number}
                  className="group relative flex flex-col items-center text-center"
                >
                  {/* Step Icon & Number Badge */}
                  <div className="relative mb-6">
                    <div
                      className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:-translate-y-1.5 ${step.color}`}
                    >
                      <Icon className="w-8 h-8" />
                    </div>

                    {/* Number Pill */}
                    <div className="absolute -top-2 -right-2 bg-stone-900 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full border-2 border-white shadow-sm">
                      {step.number}
                    </div>

                    {/* Mobile/Tablet Connecting Arrow (Hidden on Desktop) */}
                    {!isLast && (
                      <div className="lg:hidden absolute -bottom-6 left-1/2 -translate-x-1/2 text-stone-300 font-bold">
                        ↓
                      </div>
                    )}
                  </div>

                  {/* Step Card Content */}
                  <div
                    className={`w-full bg-white rounded-xl p-5 border border-stone-200/80 transition-all duration-300 ${step.borderColor} hover:shadow-md flex-1 flex flex-col justify-between`}
                  >
                    <div>
                      <h3 className="font-bold text-base text-stone-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed font-normal">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Desktop Right Arrow Between Columns */}
                  {!isLast && (
                    <div className="hidden lg:flex absolute top-7 -right-3 z-20 w-6 h-6 rounded-full bg-white border border-stone-200 items-center justify-center text-stone-400 shadow-sm">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM ECO CTA BANNER */}
        <div className="mt-16 sm:mt-20 bg-linear-to-r from-emerald-900 via-green-900 to-stone-900 rounded-2xl p-6 sm:p-10 text-white text-center shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-emerald-800/50">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
              <Recycle className="w-4 h-4" />
              <span>Circular Economy in Action</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Ready to give your books a second life?
            </h3>
            <p className="text-emerald-200 text-xs sm:text-sm">
              Join local readers in your neighborhood and start saving trees
              today.
            </p>
          </div>
          <Link href={ROUTES.EXPLORE} className="w-full sm:w-auto shrink-0">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-white text-emerald-900 hover:bg-emerald-50 font-extrabold px-8 h-12 shadow-lg shadow-black/10 transition-transform hover:scale-105"
            >
              Start Sharing Now 🌱
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
