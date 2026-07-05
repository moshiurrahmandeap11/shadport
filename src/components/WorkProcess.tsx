"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const processes = [
  {
    num: "01",
    title: "Requirement Gathering",
    desc: "I offer a range of professional services designed to meet your business needs with precision and creativity, Project structure.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80",
  },
  {
    num: "02",
    title: "Planning & Research",
    desc: "Analyzing project scope, defining milestones, and creating detailed roadmaps to ensure successful delivery within timelines.",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&q=80",
  },
  {
    num: "03",
    title: "Development Phase",
    desc: "Writing clean, efficient code with modern technologies while maintaining best practices and performance standards.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80",
  },
  {
    num: "04",
    title: "Maintenance & Support",
    desc: "Providing ongoing support, updates, and optimizations to keep your application running smoothly and securely.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  },
];

export default function WorkProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [activeIndex, setActiveIndex] = useState(0);

  // Title animation
  useEffect(() => {
    if (!titleRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
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
  }, []);

  // Horizontal scroll animation
  useEffect(() => {
    if (!sliderRef.current || !sectionRef.current) return;

    const slider = sliderRef.current;
    const cards = slider.querySelectorAll<HTMLElement>(".process-card");
    const totalWidth = cards.length * window.innerWidth;

    const ctx = gsap.context(() => {
      // Create horizontal scroll animation
      const tl = gsap.to(slider, {
        x: -(totalWidth - window.innerWidth),
        duration: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${(cards.length - 1) * 100}%`,
          scrub: 1.5,
          pin: containerRef.current,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const newIndex = Math.round(progress * (cards.length - 1));
            const clampedIndex = Math.min(
              Math.max(newIndex, 0),
              cards.length - 1
            );
            setActiveIndex(clampedIndex);
          },
        },
      });

      // Animate cards opacity and scale based on active index
      cards.forEach((card, index) => {
        // Create a scroll trigger for each card
        ScrollTrigger.create({
          trigger: card,
          start: "left center",
          end: "right center",
          onUpdate: (self) => {
            const progress = self.progress;
            // Update active index based on card visibility
            if (progress > 0.3 && progress < 0.7) {
              setActiveIndex(index);
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="workprocess" className="relative bg-background overflow-hidden">
      {/* Section Title */}
      <div
        ref={titleRef}
        className="text-center pt-20 sm:pt-28 lg:pt-36 pb-12 px-4 relative z-10"
      >
        <span className="inline-block text-sm sm:text-base font-medium text-foreground/50 uppercase tracking-widest mb-4">
          How I Work
        </span>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight">
          Work Process
        </h2>
      </div>

      {/* Horizontal Slider Container */}
      <div ref={containerRef} className="relative h-screen w-full">
        <div
          ref={sliderRef}
          className="flex h-screen items-center"
          style={{ width: `${processes.length * 100}vw` }}
        >
          {processes.map((process, index) => (
            <div
              key={process.num}
              className="process-card relative flex-shrink-0 w-screen h-screen flex items-center justify-center px-8 sm:px-16 lg:px-24"
            >
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 max-w-6xl mx-auto w-full">
                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <motion.span
                    className="block text-6xl sm:text-7xl lg:text-8xl font-black mb-6"
                    animate={{
                      color: index === activeIndex
                        ? (isDark ? "rgba(255,255,255,1)" : "rgba(0,0,0,1)")
                        : (isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"),
                      scale: index === activeIndex ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    {process.num}
                  </motion.span>
                  <motion.h3
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 uppercase tracking-tight"
                    animate={{
                      opacity: index === activeIndex ? 1 : 0.3,
                      x: index === activeIndex ? 0 : -20,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    {process.title}
                  </motion.h3>
                  <motion.p
                    className="text-sm sm:text-base text-foreground/60 max-w-md mx-auto lg:mx-0 leading-relaxed uppercase tracking-wide"
                    animate={{
                      opacity: index === activeIndex ? 1 : 0.2,
                      x: index === activeIndex ? 0 : -15,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                  >
                    {process.desc}
                  </motion.p>
                </div>

                {/* Image */}
                <motion.div
                  className="relative w-full max-w-sm lg:max-w-md xl:max-w-lg aspect-[3/4] rounded-2xl overflow-hidden"
                  animate={{
                    scale: index === activeIndex ? 1 : 0.85,
                    opacity: index === activeIndex ? 1 : 0.3,
                    rotateY: index === activeIndex ? 0 : -10,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <Image
                    src={process.image}
                    alt={process.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 400px"
                  />
                  {/* Gradient overlay for better visibility */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-black/30' : 'from-white/20'} via-transparent to-transparent`} />
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {processes.map((_, index) => (
          <button
            key={index}
            className={`h-1 rounded-full transition-all duration-500 ${
              index === activeIndex ? "w-12 bg-foreground" : "w-4 bg-foreground/20"
            }`}
            onClick={() => {
              const slider = sliderRef.current;
              if (slider) {
                const cardWidth = window.innerWidth;
                gsap.to(slider, {
                  x: -index * cardWidth,
                  duration: 0.8,
                  ease: "power2.inOut",
                });
                setActiveIndex(index);
              }
            }}
          />
        ))}
      </div>
    </section>
  );
}