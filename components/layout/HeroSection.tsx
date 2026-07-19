"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  MapPin,
  ArrowRight,
  RotateCcw,
  Clock,
  CheckCircle2,
  MessageCircle,
  Trees,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export function HeroSection() {
  const [demoState, setDemoState] = useState<0 | 1 | 2>(0);

  const handleBorrowClick = () => {
    if (demoState === 0) {
      setDemoState(1);
      setTimeout(() => {
        setDemoState(2);
      }, 1500);
    }
  };

  const resetDemo = () => setDemoState(0);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-900 via-emerald-950 to-stone-900 py-16 md:py-24 lg:py-32 text-white">
      {/* Natural emerald ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT COLUMN: ECO PITCH & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-wide uppercase">
              <Trees className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Saving Trees Through P2P Sharing</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none">
              Share Books. Save Trees. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                Read Sustainably Nearby.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Every book printed costs trees and water. Turn your neighborhood
              into an eco-friendly library! Borrow bestsellers from readers just
              minutes away, give finished books a second life, and protect our
              planet together.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href={ROUTES.EXPLORE} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 h-12 shadow-lg shadow-emerald-600/30 gap-2"
                >
                  Explore Eco-Library <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="#how-it-works" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-stone-700 bg-stone-800/50 hover:bg-stone-800 text-stone-200 font-semibold px-6 h-12 backdrop-blur-sm"
                >
                  Our Green Impact
                </Button>
              </Link>
            </div>

            {/* Quick Green Impact Stats */}
            <div className="pt-6 border-t border-stone-800/80 flex items-center justify-center lg:justify-start gap-8 text-stone-400 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <span className="font-bold text-emerald-400 text-base">
                  120+
                </span>{" "}
                Trees Saved 🌳
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base">0 ₹</span> Free
                Borrowing
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-teal-400 text-base">
                  {"< 2 km"}
                </span>{" "}
                Local Swaps
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE LIVE-DEMO WIDGET */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full max-w-sm bg-stone-900/90 border border-stone-700/80 rounded-2xl p-5 shadow-2xl backdrop-blur-xl relative">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-800">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  LIVE ECO-EXCHANGE DEMO
                </div>
                {demoState > 0 && (
                  <button
                    onClick={resetDemo}
                    className="text-[11px] text-stone-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                )}
              </div>

              {/* Book Info Section */}
              <div className="flex gap-4 items-start">
                <div className="w-20 h-28 rounded-lg overflow-hidden bg-stone-800 shrink-0 border border-stone-700 shadow-md relative">
                  <img
                    src="https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg"
                    alt="Atomic Habits"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80";
                    }}
                  />
                  <div className="absolute top-1 right-1 bg-black/70 backdrop-blur-md rounded text-[9px] px-1.5 py-0.5 font-bold text-amber-400">
                    4.9 ★
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Available to Share
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-white mt-1.5 truncate">
                    Atomic Habits
                  </h3>
                  <p className="text-xs text-stone-400">by James Clear</p>

                  {/* Owner Info */}
                  <div className="mt-3 flex items-center justify-between bg-stone-950/60 rounded-lg p-2 border border-stone-800">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold text-white">
                        H
                      </div>
                      <span className="text-xs font-medium text-stone-200">
                        Harish
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-teal-400 font-semibold">
                      <MapPin className="w-3 h-3" />
                      0.8 km away
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive State Progression */}
              <div className="mt-5 pt-4 border-t border-stone-800">
                <div className="flex items-center justify-between text-[11px] font-medium text-stone-400 mb-4 px-1">
                  <span
                    className={
                      demoState >= 0 ? "text-emerald-400 font-bold" : ""
                    }
                  >
                    1. Available
                  </span>
                  <span className="text-stone-600">----&gt;</span>
                  <span
                    className={
                      demoState >= 1 ? "text-emerald-400 font-bold" : ""
                    }
                  >
                    2. Request
                  </span>
                  <span className="text-stone-600">----&gt;</span>
                  <span
                    className={demoState === 2 ? "text-teal-400 font-bold" : ""}
                  >
                    3. Accepted
                  </span>
                </div>

                {demoState === 0 && (
                  <Button
                    onClick={handleBorrowClick}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-11 shadow-lg shadow-emerald-600/20 animate-pulse"
                  >
                    Borrow & Save Paper 🌳
                  </Button>
                )}

                {demoState === 1 && (
                  <Button
                    disabled
                    className="w-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold h-11 flex items-center justify-center gap-2 cursor-not-allowed"
                  >
                    <Clock className="w-4 h-4 animate-spin" />
                    Request Sent... (Waiting for Harish)
                  </Button>
                )}

                {demoState === 2 && (
                  <div className="space-y-2 animate-in fade-in zoom-in-95 duration-200">
                    <div className="w-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-lg p-2.5 text-center text-xs font-bold flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Harish accepted! You saved ~0.5kg of CO₂ 🌱
                    </div>
                    <Button
                      onClick={() =>
                        window.open(
                          "https://wa.me/?text=Hi Harish! I just requested Atomic Habits on BookTuk. Excited to share and save paper!",
                          "_blank",
                        )
                      }
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-10 text-xs flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <MessageCircle className="w-4 h-4" /> Coordinate on
                      WhatsApp
                    </Button>
                  </div>
                )}

                <p className="text-[10px] text-center text-stone-500 mt-2.5">
                  👆 Click above to test the eco-friendly interactive demo!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
