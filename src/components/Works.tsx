"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useProjects } from "@/lib/projects";
import { staticProjects } from "@/lib/projects";
import { GitBranch, ExternalLink, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projectColors = [
  "#064E3B",
  "#7F1D1D",
  "#1E3A5F",
  "#581C87",
  "#713F12",
  "#0C4A6E",
  "#3F6212",
  "#831843",
  "#134E4A",
  "#312E81",
];

export default function Works() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useProjects();

  // Use API data if available, fallback to static
  const projects = data?.data ?? staticProjects;

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

  useEffect(() => {
    if (!cardsContainerRef.current || !projects.length) return;

    const cards = cardsContainerRef.current.querySelectorAll(".project-card");

    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        const isLast = index === cards.length - 1;

        ScrollTrigger.create({
          trigger: card,
          start: "top 12%",
          end: isLast ? "bottom bottom" : "bottom 12%",
          pin: true,
          pinSpacing: false,
          onUpdate: (self) => {
            const progress = self.progress;
            if (progress > 0.25) {
              const scale = 1 - (progress - 0.25) * 0.15;
              const opacity = 1 - (progress - 0.25) * 1.3;
              const yPercent = (progress - 0.25) * -25;
              gsap.set(card, {
                scale: Math.max(scale, 0.85),
                opacity: Math.max(opacity, 0),
                yPercent: Math.max(yPercent, -25),
              });
            } else {
              gsap.set(card, { scale: 1, opacity: 1, yPercent: 0 });
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [projects.length]);

  return (
    <section
      ref={sectionRef}
      id="works"
      className="relative bg-background"
    >
      {/* Top label */}
      <div
        ref={titleRef}
        className="max-w-7xl mx-auto pt-16 sm:pt-20 lg:pt-28 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-2 rounded-full bg-foreground" />
          <span className="text-xs sm:text-sm font-medium text-foreground/70 uppercase tracking-widest">
            Selected Works
          </span>
        </div>
        <div className="flex items-end justify-between">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Projects
          </h2>
          <Link
            href="/projects"
            className="group flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
          >
            View All
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
        <div className="h-px bg-foreground/10 w-full mt-6" />
      </div>

      {/* Stacking Project Cards - max-w-7xl centered */}
      <div ref={cardsContainerRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {projects.map((project, index) => {
          const bgColor = projectColors[index % projectColors.length];
          const isReversed = index % 2 === 1;

          return (
            <div
              key={project.slug}
              className="project-card relative w-full mb-[-60px] sm:mb-[-80px] lg:mb-[-100px]"
              style={{ zIndex: index + 1 }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="block w-full group"
              >
                <div
                  className="w-full rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden transition-all duration-500 hover:shadow-2xl"
                  style={{ backgroundColor: bgColor }}
                >
                  <div
                    className={`flex flex-col ${
                      isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
                    } lg:items-stretch`}
                  >
                    {/* Content Side */}
                    <div className="flex-1 p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-between min-h-[280px] sm:min-h-[320px] lg:min-h-[420px]">
                      {/* Top: Category */}
                      <div>
                        <span className="text-[10px] sm:text-xs font-semibold text-white/60 uppercase tracking-widest">
                          {project.techStack[0]} Project
                        </span>
                      </div>

                      {/* Middle: Description */}
                      <div className="my-5 sm:my-6 lg:my-8 max-w-md">
                        <p className="text-sm sm:text-base lg:text-lg text-white/70 leading-relaxed">
                          {project.short_description}
                        </p>
                      </div>

                      {/* Bottom: Title + Links */}
                      <div className="flex items-end justify-between gap-4">
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-none">
                          {project.title.toUpperCase()}
                        </h3>
                        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                          {project.links.find((l) =>
                            l.name.toLowerCase().includes("github")
                          ) && (
                            <a
                              href={
                                project.links.find((l) =>
                                  l.name.toLowerCase().includes("github")
                                )?.url
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/25 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 hover:bg-white/10 transition-all duration-300"
                            >
                              <GitBranch className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                            </a>
                          )}
                          {project.links.find((l) =>
                            l.name.toLowerCase().includes("live")
                          ) && (
                            <a
                              href={
                                project.links.find((l) =>
                                  l.name.toLowerCase().includes("live")
                                )?.url
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/25 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 hover:bg-white/10 transition-all duration-300"
                            >
                              <ExternalLink className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Image Side - Device Mockup Style */}
                    <div className="flex-1 relative min-h-[260px] sm:min-h-[320px] lg:min-h-[420px] p-5 sm:p-6 lg:p-8 xl:p-10 flex items-center justify-center">
                      <div className="relative w-full max-w-[480px] aspect-[4/3]">
                        {/* Device frame / laptop mockup */}
                        <div className="absolute inset-0 rounded-lg sm:rounded-xl overflow-hidden bg-white shadow-2xl">
                          {project.screenshots[0] && (
                            <Image
                              src={project.screenshots[0]}
                              alt={project.title}
                              fill
                              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                              sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                          )}
                        </div>
                        {/* Laptop base / bottom bar */}
                        <div className="absolute -bottom-2 sm:-bottom-3 left-1/2 -translate-x-1/2 w-[115%] h-3 sm:h-4 bg-gradient-to-b from-gray-300 to-gray-400 rounded-b-lg shadow-lg" />
                      </div>

                      {/* Hover overlay with arrow */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-500 shadow-xl">
                          <ArrowUpRight className="w-6 h-6 sm:w-7 sm:h-7 text-foreground" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
