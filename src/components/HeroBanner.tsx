"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Briefcase,
  Layers,
  Workflow,
  Smile,
  FileText,
  Mail,
  Phone,
  X,
  Star,
  CheckCircle2,
  Sun,
  Moon,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa6";

export default function HeroBanner() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const { resolvedTheme, setTheme } = useTheme();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Liquid scroll spring physics for the right vertical line
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
    mass: 0.45,
    restDelta: 0.0001,
  });

  const dotTop = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const lineFill = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // Live Bangladesh Time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Dhaka",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setCurrentTime(timeString);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fluid animated theme switcher with native View Transitions API
  const handleThemeChange = (newTheme: "light" | "dark") => {
    if (resolvedTheme === newTheme) return;

    if (typeof document !== "undefined" && "startViewTransition" in document) {
      (document as unknown as { startViewTransition: (cb: () => void) => void }).startViewTransition(() => {
        setTheme(newTheme);
      });
    } else {
      setTheme(newTheme);
    }
  };

  const leftDockItems = [
    { id: "works", label: "Selected Works", icon: Briefcase, href: "#works", isExternal: false },
    { id: "tech", label: "Tech Stack & Skills", icon: Layers, href: "#techstack", isExternal: false },
    { id: "process", label: "Work Process", icon: Workflow, href: "#workprocess", isExternal: false },
    { id: "about", label: "Why Choose Me", icon: Smile, href: "#about", isExternal: false },
    { id: "blogs", label: "Blogs & Journal", icon: FileText, href: "/blogs", isExternal: true },
    { id: "contact", label: "Get in Touch", icon: Mail, href: "#contact", isExternal: false },
  ];

  const handleDockClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isExternal: boolean) => {
    if (isExternal) return;
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.getElementById(href.replace("#", ""));
      if (element) {
        const offset = 70;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  const menuNavLinks = [
    { title: "Works", count: "10", href: "#works" },
    { title: "Tech Stack +", href: "#techstack" },
    { title: "Work Process +", href: "#workprocess" },
    { title: "About Me", href: "#about" },
    { title: "Journal & Blogs", href: "/blogs" },
    { title: "Contact Us", href: "#contact" },
  ];

  const menuSubLinks = [
    { title: "DOWNLOAD RESUME (PDF)", href: process.env.NEXT_PUBLIC_RESUME_URL || "/resume.pdf", isDownload: true },
    { title: "CLIENT TESTIMONIALS", href: "#testimonials" },
    { title: "FREQUENTLY ASKED (FAQ)", href: "/faq" },
    { title: "ADMIN CMS", href: "/admin/moshiur" },
    { title: "RSS FEED", href: "/feed.xml" },
  ];

  const socialLinks = [
    { name: "GitHub", icon: FaGithub, href: "https://github.com/moshiurrahmandeap11" },
    { name: "LinkedIn", icon: FaLinkedin, href: "https://linkedin.com/in/moshiurrahmandeap" },
    { name: "Instagram", icon: FaInstagram, href: "https://instagram.com/__moshiur.rahman.deap" },
    { name: "Email", icon: FaEnvelope, href: "mailto:contact@moshiur.pro" },
  ];

  return (
    <>
      {/* ── Sticky Item 1: Left Floating Icon Dock (FULL SQUARE / rounded-none, zero hover scale) ── */}
      <aside
        aria-label="Quick Section Navigation"
        className="fixed left-6 md:left-10 lg:left-12 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3 select-none"
      >
        {leftDockItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleDockClick(e, item.href, item.isExternal)}
              className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 lg:w-[56px] lg:h-[56px] rounded-none bg-[#EBE7DF] hover:bg-[#E0DBD1] dark:bg-[#181A20] dark:hover:bg-[#252830] text-[#1A1A1A] dark:text-[#EAEAEA] transition-colors duration-200 shadow-xs cursor-pointer"
              aria-label={item.label}
            >
              <Icon className="w-6 h-6 lg:w-[26px] lg:h-[26px] transition-transform duration-200 group-hover:rotate-6" />

              {/* Square Tooltip on hover */}
              <span className="pointer-events-none absolute left-full ml-3 px-3.5 py-1.5 rounded-none bg-foreground text-background text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 shadow-xl z-50">
                {item.label}
              </span>
            </a>
          );
        })}
      </aside>

      {/* ── Sticky Item 2: Bottom-Left MENU ... Button (Aligned directly under the dock) ── */}
      <div className="fixed bottom-6 left-6 md:left-10 lg:left-12 z-40">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="group inline-flex flex-col items-start gap-0.5 text-left transition-colors duration-200 cursor-pointer select-none"
          aria-label="Toggle Navigation Menu"
          aria-expanded={isMenuOpen}
        >
          <span className="text-xs sm:text-sm font-black tracking-widest uppercase text-foreground">
            {isMenuOpen ? "CLOSE" : "MENU"}
          </span>
          <span className="text-xs tracking-[0.3em] font-black text-foreground/40 group-hover:text-foreground transition-colors leading-none">
            ...
          </span>
        </button>
      </div>

      {/* ── Sticky Item 3: Right Side Vertical Scroll Track & Indicator Dot (LIQUID Physics Animation) ── */}
      <div
        aria-hidden="true"
        className="fixed right-6 md:right-10 lg:right-12 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center pointer-events-none select-none"
      >
        <div className="relative w-6 h-56 lg:h-72 flex justify-center items-start">
          {/* Subtle Background Guide Track */}
          <div className="absolute top-0 bottom-0 w-[1.5px] bg-foreground/15" />

          {/* Dynamic Liquid Progress Fill Line */}
          <motion.div
            className="absolute top-0 w-[2px] bg-foreground/45 origin-top"
            style={{ height: lineFill }}
          />

          {/* Liquid Animated Indicator Dot */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
            style={{
              top: dotTop,
            }}
          >
            <div className="w-4 h-4 rounded-full bg-foreground/10 border border-foreground/30 flex items-center justify-center shadow-xs backdrop-blur-[1px]">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Sticky Item 4: Bottom-Right Live Time & Location (NO pulse dot, clean typography) ── */}
      <div className="fixed bottom-6 right-6 md:right-10 lg:right-12 z-30 pointer-events-none select-none">
        <div className="flex items-center text-xs sm:text-sm font-medium text-foreground/70 tracking-tight whitespace-nowrap">
          <span>Dhaka, Bangladesh</span>
          {currentTime && (
            <span className="font-bold text-foreground ml-1.5">
              {currentTime}
            </span>
          )}
        </div>
      </div>

      {/* ── Hero Center Stage (Brand Appart Typography & Layout) ── */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col justify-center items-center bg-background text-foreground transition-colors duration-500 overflow-hidden px-4 sm:px-6 lg:px-12 select-none pt-12 pb-16"
      >
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center max-w-5xl mx-auto py-10 lg:py-16">
          
          {/* Giant Headline with Orange Badge */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.2rem] font-black tracking-tight leading-[1.0] text-foreground"
          >
            <span>The full-stack</span>
            <span className="inline-flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-full border-2 sm:border-3 border-[#FF5C00] text-[#FF5C00] mx-2 sm:mx-3 align-middle transition-transform duration-300 hover:rotate-45 shadow-lg shadow-[#FF5C00]/20">
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black leading-none">
                ©
              </span>
            </span>
            <br className="hidden sm:inline" />
            <span>developer for top-tier</span>
            <br />
            <span className="text-foreground">products</span>
          </motion.h1>

          {/* Credibility / Platform Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-wrap items-center justify-center gap-5 sm:gap-9 my-8 sm:my-10 text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground/50"
          >
            <span className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              Fiverr
            </span>
            <span className="hover:text-foreground transition-colors">
              LinkedIn Verified
            </span>
            <span className="hover:text-foreground transition-colors">
              50+ Projects Delivered
            </span>
            <span className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              AI & LLM INtegration
            </span>
          </motion.div>

          {/* Sub-headline Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-base sm:text-lg lg:text-xl font-normal text-foreground/75 max-w-2xl mx-auto leading-relaxed px-4"
          >
            Helping funded startups, founders, and companies ship iconic digital brands,
            scalable architectures, and conversion-ready web applications.
          </motion.p>

          {/* Central CTA: "BOOK AN INTRO CALL" (Square, Zero Scale, Text-to-Call-Icon Animation) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-8 sm:mt-10 flex items-center justify-center"
          >
            <a
              href={process.env.NEXT_PUBLIC_BOOKING_URL || "#contact"}
              target={process.env.NEXT_PUBLIC_BOOKING_URL ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group relative h-12 sm:h-13 px-7 sm:px-8 rounded-none bg-foreground text-background overflow-hidden inline-flex items-center justify-center transition-colors duration-200 cursor-pointer shadow-xl select-none"
            >
              {/* Default Content: Text + Call Icon (No avatar image) */}
              <div className="flex items-center gap-2.5 transition-all duration-300 ease-out group-hover:-translate-y-12 group-hover:opacity-0">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-background whitespace-nowrap">
                  BOOK AN INTRO CALL
                </span>
                <Phone className="w-4 h-4 text-background shrink-0" />
              </div>

              {/* Hovered Content: Centered Call Icon (slides in from bottom to center) */}
              <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-background" />
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-background">
                    CALL NOW
                  </span>
                </div>
              </div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Floating Dark Menu Drawer (ALL OPTIONS VISIBLE, NO BACKDROP BLUR, SQUARE) ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Click outside to close (NO backdrop blur, NO black overlay, completely transparent) */}
            <div
              className="fixed inset-0 z-40 bg-transparent"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Floating Menu Drawer Card (Proportionately scaled to guarantee all options are 100% visible) */}
            <motion.div
              ref={drawerRef}
              initial={{ opacity: 0, x: -50, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -35, scale: 0.96 }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 30,
                mass: 0.8,
              }}
              className="fixed bottom-6 left-4 sm:left-24 md:left-28 lg:left-32 z-50 w-[94vw] sm:w-[460px] md:w-[490px] lg:w-[510px] max-h-[92vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden bg-[#121212] text-white p-6 sm:p-7 lg:p-8 rounded-none shadow-2xl flex flex-col justify-between"
            >
              <div>
                {/* Header Row: Title & Close Button */}
                <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-white/10">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-white/40">
                    Navigation
                  </span>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-8 h-8 rounded-none bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Theme Switcher Inside the Menu (Square Fluid Animated Segmented Switch) */}
                <div className="flex items-center justify-between p-2.5 rounded-none bg-white/[0.04] mb-4 border border-white/5">
                  <span className="text-[11px] font-semibold text-white/60 uppercase tracking-wider select-none">
                    Appearance
                  </span>
                  <div className="relative flex items-center bg-black/50 p-1 rounded-none">
                    {/* Light Button */}
                    <button
                      type="button"
                      onClick={() => handleThemeChange("light")}
                      className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-none text-xs font-bold transition-colors duration-200 cursor-pointer select-none ${
                        resolvedTheme === "light"
                          ? "text-white"
                          : "text-white/50 hover:text-white/80"
                      }`}
                    >
                      {resolvedTheme === "light" && (
                        <motion.div
                          layoutId="activeThemePill"
                          className="absolute inset-0 bg-[#FF5C00] rounded-none shadow-md shadow-[#FF5C00]/30"
                          transition={{
                            type: "spring",
                            stiffness: 450,
                            damping: 32,
                            mass: 0.8,
                          }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-1.5">
                        <Sun className="w-3.5 h-3.5" />
                        <span>Light</span>
                      </span>
                    </button>

                    {/* Dark Button */}
                    <button
                      type="button"
                      onClick={() => handleThemeChange("dark")}
                      className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-none text-xs font-bold transition-colors duration-200 cursor-pointer select-none ${
                        resolvedTheme === "dark"
                          ? "text-white"
                          : "text-white/50 hover:text-white/80"
                      }`}
                    >
                      {resolvedTheme === "dark" && (
                        <motion.div
                          layoutId="activeThemePill"
                          className="absolute inset-0 bg-[#FF5C00] rounded-none shadow-md shadow-[#FF5C00]/30"
                          transition={{
                            type: "spring",
                            stiffness: 450,
                            damping: 32,
                            mass: 0.8,
                          }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-1.5">
                        <Moon className="w-3.5 h-3.5" />
                        <span>Dark</span>
                      </span>
                    </button>
                  </div>
                </div>

                {/* Main Links in Editorial Typography (Cleanly scaled so all options fit) */}
                <nav className="flex flex-col gap-1.5 sm:gap-2 mb-4">
                  {menuNavLinks.map((link, idx) => (
                    <motion.div
                      key={link.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.03 * (idx + 1), duration: 0.2 }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => {
                          setIsMenuOpen(false);
                          handleDockClick(e, link.href, link.href.startsWith("/"));
                        }}
                        className="group flex items-center justify-between text-2xl sm:text-3xl lg:text-[34px] font-black text-white hover:text-[#FF5C00] transition-colors tracking-tight leading-tight"
                      >
                        <span>{link.title}</span>
                        {link.count && (
                          <span className="text-sm sm:text-base font-bold text-white/30 group-hover:text-[#FF5C00] transition-colors">
                            [{link.count}]
                          </span>
                        )}
                      </a>
                    </motion.div>
                  ))}
                </nav>

                {/* Sub-navigation Links (All 5 links clearly visible) */}
                <div className="pt-3.5 border-t border-white/10 mb-4 space-y-1.5">
                  {menuSubLinks.map((sub) => (
                    <a
                      key={sub.title}
                      href={sub.href}
                      download={sub.isDownload ? true : undefined}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-[11px] sm:text-xs font-bold tracking-wider text-white/50 hover:text-white transition-colors uppercase"
                    >
                      {sub.title}
                    </a>
                  ))}
                </div>
              </div>

              {/* Bottom Social Icons (All 4 square buttons fully visible) */}
              <div className="pt-3.5 border-t border-white/10 flex items-center gap-2.5">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 sm:w-9.5 sm:h-9.5 rounded-none bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                      aria-label={social.name}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
