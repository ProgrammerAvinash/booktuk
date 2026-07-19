"use client";

import Link from "next/link";
import { ArrowRight, Trees, Sparkles, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export function CtaSection() {
  return (
    <section className="py-16 md:py-24 bg-stone-50 border-t border-stone-200 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* LUSH FOREST GRADIENT CTA BANNER CARD */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-700 via-green-800 to-teal-900 px-6 py-14 sm:px-12 sm:py-20 text-center shadow-2xl border border-emerald-500/30">
          {/* Natural Ambient Glows */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-64 h-64 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />

          {/* Floating Eco Badges */}
          <div className="hidden lg:flex absolute top-8 left-8 bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-3 items-center gap-2.5 text-white text-xs font-semibold shadow-lg transform -rotate-6">
            <Trees className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Zero Paper Waste 🌳</span>
          </div>

          <div className="hidden lg:flex absolute bottom-8 right-8 bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-3 items-center gap-2.5 text-white text-xs font-semibold shadow-lg transform rotate-6">
            <HeartHandshake className="w-4 h-4 text-amber-300 shrink-0" />
            <span>100% Free & Sustainable 🤝</span>
          </div>

          {/* MAIN CONTENT */}
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/20 border border-white/15 text-emerald-200 text-xs font-bold tracking-wide uppercase backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Join the Green Reading Movement</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Give Your Books <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-emerald-100 to-teal-200">
                A Second Life Today.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-emerald-100 font-normal max-w-xl mx-auto leading-relaxed">
              Why let finished books collect dust while more trees are cut down
              for new printings? Share your bookshelf with neighbors and protect
              our planet together.
            </p>

            {/* ACTION BUTTONS */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={ROUTES.EXPLORE} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-emerald-900 hover:bg-emerald-50 font-extrabold px-10 h-14 text-base shadow-xl shadow-black/20 gap-2 transition-all hover:scale-105"
                >
                  Start Sharing Now{" "}
                  <ArrowRight className="w-5 h-5 text-emerald-600" />
                </Button>
              </Link>

              <Link href="#communities" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white/30 bg-black/20 hover:bg-black/30 text-white font-bold px-8 h-14 text-base backdrop-blur-sm"
                >
                  Explore Green Clubs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
