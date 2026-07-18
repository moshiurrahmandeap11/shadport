"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useHydrated } from "@/lib/use-hydrated";

export default function HeroBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();

  useEffect(() => {
    if (!hydrated) return;
    const ctx = gsap.context(() => {
      // Title character split animation
      const titleChars = titleRef.current?.querySelectorAll(".char");
      if (titleChars) {
        gsap.fromTo(
          titleChars,
          { y: 120, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.2,
            stagger: 0.04,
            ease: "power4.out",
            delay: 0.3,
          }
        );
      }

      // Left content slide in
      gsap.fromTo(
        leftContentRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.6 }
      );

      // Right content slide in
      gsap.fromTo(
        rightContentRef.current,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.8 }
      );

      // Image reveal
      gsap.fromTo(
        imageRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.2 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [hydrated]);

  const firstName = "MOSHIUR";
  const lastName = "RAHMAN";

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center overflow-hidden bg-background px-4 sm:px-6 lg:px-8 xl:px-12"
    >
      {/* Giant Title - Top, overlapping image */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-16 sm:pt-20 lg:pt-24">
        <h1
          ref={titleRef}
          className="text-[13vw] sm:text-[12vw] md:text-[11vw] lg:text-[10vw] font-black leading-[0.8] tracking-tighter text-center select-none"
          style={{ perspective: 1000 }}
        >
          <span className="block">
            {firstName.split("").map((char, i) => (
              <span
                key={`f-${i}`}
                className="char inline-block"
                style={{
                  WebkitTextStroke: "1.5px currentColor",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {char}
              </span>
            ))}
          </span>
          <span className="block -mt-[2vw] sm:-mt-[2.5vw] lg:-mt-[3vw]">
            {lastName.split("").map((char, i) => (
              <span
                key={`l-${i}`}
                className="char inline-block text-foreground"
              >
                {char}
              </span>
            ))}
          </span>
        </h1>
      </div>

      {/* Main layout: Left | Image | Right */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex-1 flex items-center justify-center -mt-[8vw] sm:-mt-[10vw] lg:-mt-[12vw]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center w-full">
          
          {/* Left: Info */}
          <motion.div
            ref={leftContentRef}
            className="order-2 lg:order-1 text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              Full Stack Developer
            </h2>
            <p className="text-sm sm:text-base text-foreground/60 max-w-sm mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed">
              Designing digital products that are clear, usable, and conversion focused.
              Building immersive web experiences with modern technologies.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <Link
                href="/#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base font-semibold text-background shadow-lg transition-all hover:shadow-xl hover:scale-105"
              >
                <span>Let&apos;s collaborate</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 17L17 7M17 7H7M17 7v10"
                  />
                </svg>
              </Link>
              <a
                href={process.env.NEXT_PUBLIC_RESUME_URL || "/resume.pdf"}
                download
                className="group inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base font-semibold text-foreground transition-all hover:bg-foreground/5 hover:border-foreground/40"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span>Resume</span>
              </a>
            </div>
          </motion.div>

          {/* Center: Image - much bigger */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div
              ref={imageRef}
              className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto"
            >
              <div className="relative w-full aspect-[489/510]">
                <Image
                  src="/moshiur.png"
                  alt="Moshiur Rahman"
                  fill
                  className="object-contain grayscale hover:grayscale-0 transition-all duration-700"
                  priority
                  sizes="(max-width: 640px) 95vw, (max-width: 768px) 90vw, (max-width: 1024px) 70vw, (max-width: 1280px) 60vw, 700px"
                />
              </div>
            </div>
          </div>

          {/* Right: Socials */}
          <motion.div
            ref={rightContentRef}
            className="order-3 lg:order-3 flex flex-col gap-3 sm:gap-4 items-center lg:items-end"
          >
            {[
              { name: "GitHub", icon: "GH", href: "https://github.com/moshiurrahmandeap11" },
              { name: "LinkedIn", icon: "in", href: "https://linkedin.com/in/moshiurrahmandeap" },
              { name: "Instagram", icon: "IG", href: "https://instagram.com/__moshiur.rahman.deap" },
              { name: "Email", icon: "@", href: "mailto:moshiurrahmandeap@gmail.com" },
            ].map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-full border border-foreground/10 bg-background/50 backdrop-blur-sm px-4 py-2.5 sm:px-5 sm:py-3 text-sm font-medium text-foreground transition-all hover:bg-foreground/5 hover:border-foreground/20 hover:scale-105 w-full sm:w-auto lg:w-44 justify-center lg:justify-start"
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-foreground/10 text-[10px] sm:text-xs font-bold">
                  {social.icon}
                </span>
                <span>{social.name}</span>
                <svg
                  className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 group-hover:-translate-y-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 17L17 7M17 7H7M17 7v10"
                  />
                </svg>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
