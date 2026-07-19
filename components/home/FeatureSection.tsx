"use client";

import {
  BookOpen,
  RefreshCw,
  MapPin,
  Users,
  Sparkles,
  Star,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function FeatureSection() {
  const features = [
    {
      icon: BookOpen,
      title: "Discover Books",
      description:
        "Search millions of books and explore titles sitting on shelves right in your neighborhood.",
      badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    },
    {
      icon: RefreshCw,
      title: "Borrow & Exchange",
      description:
        "Give books a second life. Borrow for free, trade finished reads, and reduce paper waste.",
      badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    },
    {
      icon: MapPin,
      title: "Readers Nearby",
      description:
        "Find readers around you. Our smart location feed connects you with book lovers just minutes away.",
      badgeColor: "bg-rose-500/10 text-rose-600 border-rose-500/20",
    },
    {
      icon: Users,
      title: "Communities",
      description:
        "Join local clubs, participate in neighborhood reading circles, and attend book meetups.",
      badgeColor: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    },
    {
      icon: Sparkles,
      title: "AI Recommendations",
      description:
        "Get personalized book suggestions powered by AI to help you discover your next favorite read.",
      badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    },
    {
      icon: Star,
      title: "Reviews & Trust",
      description:
        "Real reader opinions. Build community trust through mutual exchange ratings and reviews.",
      badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    },
  ];

  return (
    <section
      id="features"
      className="py-16 md:py-24 bg-stone-50 border-t border-slate-200/60"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <h2 className="text-xs font-bold tracking-widest text-emerald-600 uppercase">
            Why BookTuk?
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Everything You Need to Share & Connect
          </p>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            We are building more than just a library—we are connecting local
            book lovers and making reading accessible to everyone.
          </p>
        </div>

        {/* THREE-COLUMN FEATURE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="bg-white border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
              >
                <CardHeader className="space-y-3">
                  {/* ICON BADGE */}
                  <div
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center ${feature.badgeColor}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* TEXT CONTENT */}
                  <div className="space-y-1.5 pt-1">
                    <CardTitle className="text-lg font-bold text-slate-900">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-slate-600 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
