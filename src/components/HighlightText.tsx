"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lines = [
  "I am a passionate Web Developer with a strong focus on creating",
  "clean, modern, and user-friendly websites. Skilled in front-end",
  "and back-end technologies, I love turning ideas into fully",
  "functional digital experiences.",
];

export default function HighlightText() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const words = sectionRef.current?.querySelectorAll(".highlight-word");
      if (!words) return;

      gsap.set(words, { opacity: 0.15 });

      gsap.to(words, {
        opacity: 1,
        stagger: {
          each: 0.02,
          from: "start",
        },
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "center 50%",
          scrub: 2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="highlight"
      className="relative -mt-4 sm:-mt-8 lg:-mt-12 py-10 sm:py-12 lg:py-14 bg-background px-6 sm:px-8 lg:px-12"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center gap-2 sm:gap-3">
          {lines.map((line, lineIndex) => (
            <div
              key={lineIndex}
              className="flex justify-center gap-x-2 sm:gap-x-3 gap-y-1 flex-wrap sm:flex-nowrap"
            >
              {line.split(" ").map((word, wordIndex) => {
                return (
                  <span
                    key={`${lineIndex}-${wordIndex}`}
                    className="highlight-word text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-foreground whitespace-nowrap"
                    style={{
                      opacity: 0.15,
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}