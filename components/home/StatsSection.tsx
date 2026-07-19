"use client";

import {
  BookOpen,
  Users,
  MapPin,
  RefreshCw,
  Sparkles,
  Trees,
} from "lucide-react";

export function StatsSection() {
  const stats = [
    {
      value: "18K+",
      label: "Books Shared",
      description: "Saved from dust & landfills",
      icon: BookOpen,
      iconColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      value: "2.3K+",
      label: "Eco-Readers",
      description: "Reducing new paper demand daily",
      icon: Users,
      iconColor: "text-teal-400 bg-teal-500/10 border-teal-500/20",
    },
    {
      value: "120+",
      label: "Green Clubs",
      description: "Neighborhood reading circles",
      icon: MapPin,
      iconColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      value: "12K+",
      label: "Books Exchanged",
      description: "~6,000 kg CO₂ saved together 🌱",
      icon: RefreshCw,
      iconColor: "text-green-400 bg-green-500/10 border-green-500/20",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-900 via-emerald-950 to-stone-900 py-16 md:py-20 text-white border-y border-stone-800">
      {/* Natural emerald ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* SECTION HEADER */}
        <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-300 text-xs font-bold tracking-wide uppercase backdrop-blur-sm">
            <Trees className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Real Environmental Impact</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Every Book Shared Saves Our Trees
          </h2>
        </div>

        {/* FOUR-COLUMN STATS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-stone-800/60 hover:bg-stone-800/90 border border-stone-700/80 rounded-2xl p-5 sm:p-6 transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between backdrop-blur-md shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center ${stat.iconColor}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 bg-stone-900/80 px-2 py-0.5 rounded-full border border-stone-700">
                    Verified Eco
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-mono">
                    {stat.value}
                  </h3>
                  <p className="text-sm font-bold text-emerald-200">
                    {stat.label}
                  </p>
                  <p className="text-xs text-stone-400 leading-relaxed hidden sm:block pt-1">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
