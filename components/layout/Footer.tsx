import Link from "next/link";
import { BookOpen, Mail, Heart, Sparkles, GitBranch } from "lucide-react";
import { ROUTES } from "@/constants/routes";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "Features", href: "#features" },
    { name: "Community", href: "#communities" },
    { name: "Privacy", href: "#" },
    {
      name: "Github",
      href: "https://github.com/ProgrammerAvinash/booktuk",
      external: true,
    },
    { name: "Contact", href: "mailto:hello@booktuk.com" },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-slate-800/60">
          {/* BRAND LOGO & TAGLINE */}
          <div className="flex flex-col items-center md:items-start space-y-2.5 text-center md:text-left">
            <Link
              href="/"
              className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-500/20">
                <BookOpen className="h-4 w-4" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Book<span className="text-emerald-500">Tuk</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 max-w-sm">
              The peer-to-peer neighborhood library. Give your read books a
              second life and connect with local book lovers.
            </p>
          </div>

          {/* NAVIGATION LINKS */}
          <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm font-medium">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target={link.external ? "_blank" : "_self"}
                rel={link.external ? "noopener noreferrer" : ""}
                className="text-slate-400 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* SOCIAL ICONS / HACKATHON BADGE */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
              title="View GitHub Repository"
            >
              <GitBranch className="w-4 h-4" />
            </a>
            <a
              href="mailto:hello@booktuk.local"
              className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
              title="Contact Us"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT & HACKATHON CREDIT */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="flex items-center gap-1.5">
            <span>© {currentYear} BookTuk. All rights reserved.</span>
          </p>

          <p className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800/80 text-slate-400 font-medium">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Built with</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
            <span>for the Hackathon</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
