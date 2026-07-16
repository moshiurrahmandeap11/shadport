"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/projects";
import {
  GitBranch,
  ExternalLink,
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  Lightbulb,
  Zap,
  Wrench,
} from "lucide-react";
import { useHydrated } from "@/lib/use-hydrated";

gsap.registerPlugin(ScrollTrigger);

interface ProjectDetailClientProps {
  project: Project;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const challengesRef = useRef<HTMLDivElement>(null);
  const learningsRef = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();

  useEffect(() => {
    if (!hydrated) return;
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      // Content sections stagger
      const sections = [
        contentRef.current,
        galleryRef.current,
        featuresRef.current,
        challengesRef.current,
        learningsRef.current,
      ];

      sections.forEach((section) => {
        if (!section) return;
        gsap.fromTo(
          section.querySelectorAll(".animate-item"),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [hydrated]);

  const githubLink = project.links.find((l) =>
    l.name.toLowerCase().includes("github")
  );
  const liveLink = project.links.find((l) =>
    l.name.toLowerCase().includes("live")
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-foreground/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            href="/#works"
            className="group flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Projects
          </Link>
          <div className="flex items-center gap-2 text-sm text-foreground/40">
            <span>Projects</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground/70">{project.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div ref={heroRef} className="pt-24 pb-12 sm:pt-32 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-item">
            <span className="text-xs font-semibold text-foreground/50 uppercase tracking-widest">
              {project.techStack[0]} Project
            </span>
          </div>
          <h1 className="animate-item text-4xl sm:text-5xl lg:text-7xl font-black text-foreground mt-4 tracking-tight">
            {project.title}
          </h1>
          <p className="animate-item text-base sm:text-lg lg:text-xl text-foreground/70 mt-6 max-w-3xl leading-relaxed">
            {project.description}
          </p>

          {/* Action Buttons */}
          <div className="animate-item flex items-center gap-3 mt-8">
            {liveLink && (
              <a
                href={liveLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-medium text-sm hover:bg-foreground/90 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
            {githubLink && (
              <a
                href={githubLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-foreground/20 text-foreground font-medium text-sm hover:bg-foreground/5 transition-colors"
              >
                <GitBranch className="w-4 h-4" />
                View Code
              </a>
            )}
          </div>

          {/* Tech Stack Tags */}
          <div className="animate-item flex flex-wrap gap-2 mt-8">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-foreground/5 text-foreground/70 border border-foreground/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Screenshots Gallery */}
      <div ref={galleryRef} className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="animate-item text-2xl sm:text-3xl font-bold text-foreground mb-8">
            Screenshots
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {project.screenshots.map((screenshot, index) => (
              <div
                key={index}
                className="animate-item relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden border border-foreground/10 bg-foreground/5 group"
              >
                <Image
                  src={screenshot}
                  alt={`${project.title} screenshot ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div ref={featuresRef} className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-item flex items-center gap-3 mb-8">
            <Zap className="w-5 h-5 text-foreground/60" />
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Key Features
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.features.map((feature, index) => (
              <div
                key={index}
                className="animate-item flex items-start gap-3 p-4 sm:p-5 rounded-xl border border-foreground/10 bg-foreground/[0.02] hover:bg-foreground/[0.04] transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-foreground/40 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base text-foreground/80">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Challenges Section */}
      <div ref={challengesRef} className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-item flex items-center gap-3 mb-8">
            <Wrench className="w-5 h-5 text-foreground/60" />
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Challenges Faced
            </h2>
          </div>
          <div className="space-y-4">
            {project.challenges.map((challenge, index) => (
              <div
                key={index}
                className="animate-item flex items-start gap-4 p-5 sm:p-6 rounded-xl border border-foreground/10 bg-foreground/[0.02]"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center text-sm font-bold text-foreground/60">
                  {index + 1}
                </span>
                <span className="text-base sm:text-lg text-foreground/80 pt-1">
                  {challenge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Learnings Section */}
      <div ref={learningsRef} className="py-12 sm:py-16 pb-24 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-item flex items-center gap-3 mb-8">
            <Lightbulb className="w-5 h-5 text-foreground/60" />
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              What I Learned
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.learnings.map((learning, index) => (
              <div
                key={index}
                className="animate-item flex items-start gap-3 p-4 sm:p-5 rounded-xl border border-foreground/10 bg-foreground/[0.02] hover:bg-foreground/[0.04] transition-colors"
              >
                <Lightbulb className="w-5 h-5 text-foreground/40 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base text-foreground/80">
                  {learning}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
