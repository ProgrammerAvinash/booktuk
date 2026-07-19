import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/layout/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { FeatureSection } from "@/components/home/FeatureSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { CommunitySection } from "@/components/home/CommunitySection";
import { TestimonialsSection } from "@/components/home/TestimonialSection";
import { CtaSection } from "@/components/home/CtaSection";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-between">
      {/* Sticky Top Navigation */}
      <Navbar />

      {/* Main Landing Page Content */}
      <div className="flex-1 space-y-0">
        <HeroSection />
        <StatsSection />
        <FeatureSection />
        <HowItWorksSection />
        <CommunitySection />

        {/* Interactive Neighborhood Book Discovery Grid */}
        <section
          id="explore"
          className="py-16 md:py-24 bg-slate-100 border-t border-slate-200/80"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                Explore Books Near You
              </h2>
              <p className="text-sm text-slate-600">
                Browse real listings available for instant borrowing in your
                community.
              </p>
            </div>
          </div>
        </section>

        <TestimonialsSection />
        <CtaSection />
      </div>

      {/* Bottom Footer */}
      <Footer />
    </div>
  );
}
