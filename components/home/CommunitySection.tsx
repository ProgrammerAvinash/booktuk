"use client";

import { useState } from "react";
import {
  MapPin,
  Users,
  BookOpen,
  Check,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "sonner";

export function CommunitySection() {
  // Keep track of which communities the user has joined for the live demo
  const [joinedIds, setJoinedIds] = useState<number[]>([]);

  const communities = [
    {
      id: 1,
      name: "Whitefield Readers",
      location: "Bengaluru",
      members: "245 Members",
      books: "1,278 Books",
      description:
        "A vibrant club for techies and bookworms in around Whitefield. We meet every alternate Sunday for coffee and book swaps.",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      activeStatus: "Very Active",
    },
    {
      id: 2,
      name: "Mumbai Readers",
      location: "Mumbai",
      members: "520 Members",
      books: "5,830 Books",
      description:
        "The largest peer-to-peer library community in the city! Covering Bandra, Andheri, Powai, and South Bombay.",
      badgeColor: "bg-emerald-50 text-emerald-700 border-indigo-200",
      activeStatus: "Trending 🔥",
    },
    {
      id: 3,
      name: "Pune Book Club",
      location: "Pune",
      members: "180 Members",
      books: "900 Books",
      description:
        "Focused on fiction, philosophy, and Marathi literature. Frequent local meetups around Koregaon Park and Kothrud.",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      activeStatus: "Fast Growing",
    },
  ];

  const handleJoinToggle = (id: number, name: string) => {
    if (joinedIds.includes(id)) {
      setJoinedIds(joinedIds.filter((item) => item !== id));
      toast.info(`Left ${name}`);
    } else {
      setJoinedIds([...joinedIds, id]);
      toast.success(`🎉 You joined ${name}! Welcome to the club.`);
    }
  };

  return (
    <section
      id="communities"
      className="py-16 md:py-24 bg-stone-50 border-t border-slate-200/60"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-indigo-100 text-emerald-600 text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Neighborhood Reading Circles</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Join Local Communities
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal">
              Connect with readers around your city. Share books, join weekend
              reading sessions, and participate in local book exchanges.
            </p>
          </div>

          <Button
            variant="outline"
            className="hidden md:flex items-center gap-2 border-slate-300 font-semibold text-slate-700 hover:bg-slate-100"
          >
            View All Communities <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>

        {/* THREE-COLUMN COMMUNITY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {communities.map((community) => {
            const isJoined = joinedIds.includes(community.id);

            return (
              <Card
                key={community.id}
                className="bg-white border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* TOP HEADER WITH LOCATION BADGE */}
                  <CardHeader className="pb-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full border flex items-center gap-1 ${community.badgeColor}`}
                      >
                        <MapPin className="w-3 h-3 shrink-0" />
                        {community.location}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400">
                        {community.activeStatus}
                      </span>
                    </div>

                    <CardTitle className="text-xl font-bold text-slate-900">
                      {community.name}
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {community.description}
                    </CardDescription>
                  </CardHeader>

                  {/* STATS SECTION (MEMBERS & BOOKS) */}
                  <CardContent className="py-3 border-y border-slate-100 bg-stone-50/50">
                    <div className="grid grid-cols-2 gap-2 text-center divide-x divide-slate-200/60">
                      <div className="flex items-center justify-center gap-2 py-1">
                        <Users className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="text-xs font-bold text-slate-700">
                          {community.members}
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-2 py-1 pl-2">
                        <BookOpen className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="text-xs font-bold text-slate-700">
                          {community.books}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </div>

                {/* ACTION BUTTON */}
                <CardFooter className="pt-4 pb-5">
                  <Button
                    onClick={() =>
                      handleJoinToggle(community.id, community.name)
                    }
                    variant={isJoined ? "outline" : "default"}
                    className={`w-full font-bold text-xs h-10 transition-all ${
                      isJoined
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800"
                        : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-500/20"
                    }`}
                  >
                    {isJoined ? (
                      <>
                        <Check className="w-4 h-4 mr-1.5 text-emerald-600" />{" "}
                        Joined Club
                      </>
                    ) : (
                      "Join Community"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* MOBILE VIEW ALL BUTTON */}
        <div className="mt-8 text-center md:hidden">
          <Button
            variant="outline"
            className="w-full border-slate-300 font-semibold text-slate-700"
          >
            View All Communities <ArrowUpRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
