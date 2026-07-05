"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { num: "3", label: "YEARS OF EXPERIENCE", suffix: "" },
  { num: "50", label: "PROJECTS COMPLETED", suffix: "+" },
  { num: "20", label: "HAPPY CLIENTS", suffix: "+" },
];

const qualities = ["BOLD IDEAS", "SHARP INSIGHT", "CREATIVE WORK"];

export default function WhyChooseMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const qualitiesRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!titleRef.current || !statsRef.current || !qualitiesRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
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

      // Stats counter animation
      const statNums = statsRef.current?.querySelectorAll(".stat-num");
      statNums?.forEach((el, i) => {
        const target = parseInt(stats[i].num);
        gsap.fromTo(
          el,
          { innerText: "0" },
          {
            innerText: target,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Qualities stagger animation
      const qualityItems = qualitiesRef.current?.querySelectorAll(".quality-item");
      qualityItems?.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: qualitiesRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 sm:py-28 lg:py-36 bg-background px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Top label */}
      <div ref={titleRef} className="max-w-7xl mx-auto mb-16 sm:mb-20 lg:mb-24">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-2 h-2 rounded-full bg-foreground" />
          <span className="text-xs sm:text-sm font-medium text-foreground/70 uppercase tracking-widest">
            WHY CHOOSE ME
          </span>
        </div>
        <div className="h-px bg-foreground/10 w-full" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Stats */}
          <div ref={statsRef} className="flex flex-col gap-10 sm:gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="relative"
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.2, ease: "easeOut" }}
              >
                <div className="flex items-baseline gap-1">
                  <span className="stat-num text-7xl sm:text-8xl lg:text-9xl font-black text-foreground leading-none">
                    {stat.num}
                  </span>
                  {stat.suffix && (
                    <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground">
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <span className="inline-block mt-2 px-4 py-1.5 rounded-full bg-foreground text-background text-xs sm:text-sm font-bold uppercase tracking-wide -rotate-3">
                  {stat.label}
                </span>
              </motion.div>
            ))}

            {/* Customer avatars */}
            <motion.div
              className="flex items-center gap-4 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-background bg-foreground/20 overflow-hidden"
                  >
                    <div className="w-full h-full bg-gradient-to-br from-foreground/30 to-foreground/10" />
                  </div>
                ))}
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-foreground">98%</span>
                <p className="text-xs sm:text-sm text-foreground/60">Customer satisfaction rate</p>
              </div>
            </motion.div>
          </div>

          {/* Right: Qualities */}
          <div ref={qualitiesRef} className="flex flex-col gap-2 sm:gap-3">
            {qualities.map((quality, i) => (
              <motion.div
                key={quality}
                className="quality-item overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.12, ease: "easeOut" }}
              >
                <h3 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-foreground uppercase tracking-tight leading-[0.9]">
                  {quality}
                </h3>
              </motion.div>
            ))}

            {/* Arrow indicator */}
            <motion.div
              className="mt-6 sm:mt-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <svg
                className="w-6 h-6 text-foreground/40 animate-pulse"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
