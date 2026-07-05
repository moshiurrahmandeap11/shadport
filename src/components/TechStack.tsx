"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiHtml5,
  SiCss as SiCss3,
  SiJavascript,
  SiTailwindcss,
  SiReact,
  SiNextdotjs,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiVscodium as SiVscode,
  SiGit,
  SiGithub,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  { name: "HTML", percent: "95%", Icon: SiHtml5, color: "#E34F26" },
  { name: "CSS", percent: "90%", Icon: SiCss3, color: "#1572B6" },
  { name: "JavaScript", percent: "85%", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "Tailwind CSS", percent: "85%", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "React", percent: "80%", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", percent: "75%", Icon: SiNextdotjs, color: "#000000" },
  { name: "PostgreSQL", percent: "72%", Icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", percent: "70%", Icon: SiMongodb, color: "#47A248" },
  { name: "Prisma", percent: "75%", Icon: SiPrisma, color: "#2D3748" },
  { name: "VS Code", percent: "90%", Icon: SiVscode, color: "#007ACC" },
  { name: "Git", percent: "85%", Icon: SiGit, color: "#F05032" },
  { name: "Github", percent: "85%", Icon: SiGithub, color: "#181717" },
];

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!titleRef.current) return;
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
  }, []);

  // Triple the items for seamless loop
  const tripledStack = [...techStack, ...techStack, ...techStack];

  const Card = ({ tech, index }: { tech: typeof techStack[0]; index: number }) => (
    <div className="group relative flex-shrink-0 w-[140px] sm:w-[180px] md:w-[220px] lg:w-[260px] mx-1.5 sm:mx-2.5 rounded-2xl border border-foreground/10 bg-background p-3 sm:p-4 lg:p-5 flex flex-col justify-between transition-all duration-500 hover:border-foreground/30 hover:bg-foreground/[0.03] hover:scale-[1.03] hover:z-10">
      {/* Icon with glow */}
      <div className="relative mb-3 sm:mb-4">
        <div
          className="absolute inset-0 blur-2xl opacity-0 group-hover:opacity-25 transition-opacity duration-500 rounded-full"
          style={{ backgroundColor: tech.color }}
        />
        <tech.Icon
          className="relative w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 transition-transform duration-500 group-hover:scale-110"
          style={{ color: tech.color }}
        />
      </div>

      {/* Percent + Name */}
      <div>
        <span className="block text-2xl sm:text-3xl lg:text-4xl font-black text-foreground mb-0.5 sm:mb-1">
          {tech.percent}
        </span>
        <span className="text-[10px] sm:text-xs lg:text-sm text-foreground/50 font-medium group-hover:text-foreground/80 transition-colors duration-300">
          {tech.name}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-2 sm:mt-3 lg:mt-4 h-[3px] sm:h-1 rounded-full bg-foreground/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: tech.color }}
          initial={{ width: 0 }}
          animate={isInView ? { width: tech.percent } : {}}
          transition={{
            duration: 1,
            delay: (index % techStack.length) * 0.08,
            ease: "easeOut",
          }}
        />
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="techstack"
      className="relative py-16 sm:py-20 lg:py-28 bg-background overflow-hidden"
    >
      {/* Top label */}
      <div
        ref={titleRef}
        className="max-w-7xl mx-auto mb-12 sm:mb-16 lg:mb-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-2 rounded-full bg-foreground" />
          <span className="text-xs sm:text-sm font-medium text-foreground/70 uppercase tracking-widest">
            TECH STACK
          </span>
        </div>
        <div className="h-px bg-foreground/10 w-full" />
      </div>

      {/* Marquee Row 1 - Left to Right */}
      <div className="relative max-w-7xl mx-auto mb-3 sm:mb-4 overflow-hidden">
        <div className="flex animate-marquee-left">
          {tripledStack.map((tech, i) => (
            <Card key={`r1-${i}`} tech={tech} index={i} />
          ))}
        </div>
      </div>

      {/* Marquee Row 2 - Right to Left (Reverse) */}
      <div className="relative max-w-7xl mx-auto overflow-hidden">
        <div className="flex animate-marquee-right">
          {[...tripledStack].reverse().map((tech, i) => (
            <Card key={`r2-${i}`} tech={tech} index={i} />
          ))}
        </div>
      </div>

      {/* Edge fade overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 lg:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 lg:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
    </section>
  );
}
