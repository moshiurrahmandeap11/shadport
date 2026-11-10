"use client";

import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";

export default function Navbar() {
  return (
    <>
      {/* ── Sticky Item 1: Top-Left Brand Logo (Floating independently, NO background bar, NO blur) ── */}
      <div className="fixed top-6 left-6 md:left-10 lg:left-12 z-50 pointer-events-auto">
        <Link
          href="/"
          className="flex flex-col group shrink-0 select-none"
        >
          <span className="text-xl sm:text-2xl font-black tracking-tight text-foreground group-hover:opacity-85 transition-opacity leading-none">
            Moshiur
          </span>
          <span className="text-[10px] uppercase tracking-widest font-extrabold text-foreground/45 mt-0.5">
            Rahman DEAP
          </span>
        </Link>
      </div>

      {/* ── Sticky Item 2: Top-Right BOOK A CALL NOW Button (Floating independently, NO background bar, NO blur) ── */}
      <div className="fixed top-6 right-6 md:right-10 lg:right-12 z-50 pointer-events-auto">
        <a
          href={process.env.NEXT_PUBLIC_BOOKING_URL || "#contact"}
          target={process.env.NEXT_PUBLIC_BOOKING_URL ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="group relative h-11 sm:h-12 px-6 sm:px-7 rounded-none bg-foreground text-background overflow-hidden inline-flex items-center justify-center transition-colors duration-200 cursor-pointer shadow-sm select-none"
        >
          {/* Default State: Text + Arrow (slides up on hover) */}
          <div className="flex items-center gap-2 transition-all duration-300 ease-out group-hover:-translate-y-10 group-hover:opacity-0">
            <span className="text-xs sm:text-sm font-bold tracking-wider whitespace-nowrap uppercase">
              BOOK A CALL NOW
            </span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>

          {/* Hovered State: Call Icon (slides in from bottom to center) */}
          <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
            <Phone className="w-4 h-4 text-background" />
          </div>
        </a>
      </div>
    </>
  );
}
