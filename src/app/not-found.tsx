"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        titleRef.current,
        { y: 60, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8 }
      )
        .fromTo(
          subtitleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          actionsRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.3"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-background flex items-center justify-center px-4"
    >
      <div className="text-center max-w-lg">
        {/* 404 Number */}
        <h1
          ref={titleRef}
          className="text-[120px] sm:text-[160px] font-black text-foreground leading-none tracking-tighter select-none"
          style={{
            WebkitTextStroke: "2px currentColor",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-xl sm:text-2xl text-foreground/70 font-medium mt-2"
        >
          Page not found
        </p>
        <p className="text-sm text-foreground/50 mt-3 max-w-sm mx-auto leading-relaxed">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        {/* Actions */}
        <div ref={actionsRef} className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-medium text-sm hover:bg-foreground/90 transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-foreground/20 text-foreground font-medium text-sm hover:bg-foreground/5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

        {/* Suggested Links */}
        <div className="mt-12 pt-8 border-t border-foreground/10">
          <p className="text-xs text-foreground/40 uppercase tracking-widest mb-4">
            Popular pages
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { label: "Home", href: "/" },
              { label: "Projects", href: "/projects" },
              { label: "Blogs", href: "/blogs" },
              { label: "Contact", href: "/#contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-full text-sm text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors border border-foreground/10"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
