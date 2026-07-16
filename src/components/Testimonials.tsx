"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { feedbacks } from "@/lib/reviews";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useHydrated } from "@/lib/use-hydrated";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const hydrated = useHydrated();

  const allReviews = feedbacks;

  const averageRating =
    allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

  const visibleReviews = allReviews.slice(currentIndex, currentIndex + 2);
  const hasNext = currentIndex + 2 < allReviews.length;
  const hasPrev = currentIndex > 0;

  useEffect(() => {
    if (!hydrated || !titleRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [hydrated]);

  const animateCards = useCallback((direction: "next" | "prev") => {
    if (!cardsRef.current || isAnimating) return;
    setIsAnimating(true);

    const cards = cardsRef.current.querySelectorAll(".review-card");
    const xOffset = direction === "next" ? -60 : 60;

    gsap.to(cards, {
      x: xOffset,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      stagger: 0.05,
      onComplete: () => {
        setCurrentIndex((prev) =>
          direction === "next" ? prev + 1 : prev - 1
        );
      },
    });
  }, [isAnimating]);

  // Animate in new cards after index changes
  useEffect(() => {
    if (!hydrated || !cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll(".review-card");
    gsap.fromTo(
      cards,
      { x: 60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.35,
        ease: "power3.out",
        stagger: 0.08,
        onComplete: () => setIsAnimating(false),
      }
    );
  }, [currentIndex, hydrated]);

  const handleNext = () => {
    if (hasNext && !isAnimating) animateCards("next");
  };

  const handlePrev = () => {
    if (hasPrev && !isAnimating) animateCards("prev");
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-16 sm:py-20 lg:py-28 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top label */}
        <div ref={titleRef} className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-foreground" />
            <span className="text-xs sm:text-sm font-medium text-foreground/70 uppercase tracking-widest">
              Testimonials
            </span>
          </div>
          <div className="h-px bg-foreground/10 w-full" />
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">
          {/* Left Side - Rating */}
          <div className="lg:w-[200px] lg:pr-8 lg:border-r border-foreground/10 flex flex-col justify-between">
            <div>
              <div className="text-5xl sm:text-6xl lg:text-7xl font-black text-foreground leading-none">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex items-center gap-1 mt-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-xs text-foreground/50 mt-2 uppercase tracking-wider">
                Average Rating
              </p>
            </div>

            <div className="mt-8 lg:mt-0 space-y-4">
              <div>
                <p className="text-[10px] sm:text-xs text-foreground/50 uppercase tracking-wider mb-2">
                  Check me on
                </p>
                <a
                  href="https://www.fiverr.com/moshiurrahman67"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <svg
                    viewBox="0 0 100 30"
                    className="w-20 h-6 sm:w-24 sm:h-7 fill-foreground/80 hover:fill-foreground transition-colors"
                  >
                    <text
                      x="0"
                      y="22"
                      className="text-2xl font-bold"
                      style={{ fontFamily: "Arial, sans-serif" }}
                    >
                      fiverr.
                    </text>
                  </svg>
                </a>
              </div>
              <div>
                <a
                  href="https://www.linkedin.com/in/moshiurrahmandeap"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Reviews */}
          <div className="flex-1 lg:pl-8 min-w-0">
            <div
              ref={cardsRef}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
            >
              {visibleReviews.map((review) => (
                <div
                  key={review.id}
                  className="review-card relative flex flex-col h-[320px] sm:h-[340px] lg:h-[360px] p-5 sm:p-6 rounded-2xl border border-foreground/10 bg-foreground/[0.02]"
                >
                  {/* Stars + Platform logo */}
                  <div className="flex items-center justify-between mb-4 flex-shrink-0">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-foreground/60">
                      {review.platform.toLowerCase() === "fiverr" ? "fiverr." : "LinkedIn"}
                    </span>
                  </div>

                  {/* Quote icon */}
                  <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-foreground/30 mb-3 flex-shrink-0" />

                  {/* Feedback text - scrollable if too long */}
                  <div className="flex-1 overflow-hidden">
                    <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed line-clamp-6">
                      {review.feedback}
                    </p>
                  </div>

                  {/* User info */}
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-foreground/5 flex-shrink-0">
                    <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-foreground/10 flex-shrink-0">
                      <Image
                        src={review.avatar}
                        alt={review.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {review.name}
                      </p>
                      <p className="text-xs text-foreground/50">
                        {review.platform}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-end gap-2 mt-8 sm:mt-10">
              <button
                onClick={handlePrev}
                disabled={!hasPrev || isAnimating}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  hasPrev && !isAnimating
                    ? "border-foreground/30 text-foreground hover:bg-foreground/5 hover:border-foreground/50"
                    : "border-foreground/10 text-foreground/30 cursor-not-allowed"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                disabled={!hasNext || isAnimating}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  hasNext && !isAnimating
                    ? "border-foreground/30 text-foreground hover:bg-foreground/5 hover:border-foreground/50"
                    : "border-foreground/10 text-foreground/30 cursor-not-allowed"
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
