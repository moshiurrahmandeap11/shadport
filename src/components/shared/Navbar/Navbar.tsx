"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useTheme } from "next-themes";
import { Sun, Moon, X, Menu } from "lucide-react";
import Link from "next/link";
import { useHydrated } from "@/lib/use-hydrated";

const navItems = [
  { id: 1, label: "Home", path: "/", scrollTo: "top" },
  { id: 2, label: "About", path: "/#about", scrollTo: "about" },
  { id: 3, label: "Contact", path: "/#contact", scrollTo: "contact" },
  { id: 4, label: "Projects", path: "/#works", scrollTo: "works" },
  { id: 5, label: "Blogs", path: "/blogs" },
  { id: 6, label: "FAQ", path: "/faq" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { resolvedTheme, setTheme, theme } = useTheme();
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const circleRef = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();

  useEffect(() => {
    const tryCalling = async () => {
      setMounted(true);
    };
    tryCalling();
  }, []);

  // GSAP stagger animation for nav items
  useEffect(() => {
    if (!hydrated || !menuOpen || itemRefs.current.length === 0) return;
    gsap.fromTo(
      itemRefs.current.filter(Boolean),
      { y: -12, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out",
      },
    );
  }, [menuOpen, hydrated]);

  const activeTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = activeTheme === "dark";

  const handleNavClick = (item: { scrollTo?: string; path?: string }) => {
    setMenuOpen(false);
    setMobileMenuOpen(false);
    
    // If it's a page navigation (like /blogs), use router
    if (item.path && !item.scrollTo) {
      window.location.href = item.path;
      return;
    }
    
    if (!item.scrollTo) return;
    
    if (item.scrollTo === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    
    const element = document.getElementById(item.scrollTo);
    if (element) {
      const offset = 80; // navbar height offset
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  const toggleTheme = useCallback(() => {
    if (!hydrated || isTransitioning) return;
    setIsTransitioning(true);

    const newTheme = isDark ? "light" : "dark";
    const circle = circleRef.current;
    if (!circle) {
      setTheme(newTheme);
      setIsTransitioning(false);
      return;
    }

    const btn = document.getElementById("theme-toggle-btn");
    const rect = btn?.getBoundingClientRect();

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const startX = rect ? rect.left + rect.width / 2 : viewportWidth - 40;
    const startY = rect ? rect.top + rect.height / 2 : 40;

    const distanceToBottomLeft = Math.sqrt(
      Math.pow(startX, 2) + Math.pow(viewportHeight - startY, 2),
    );

    const distanceToTopRight = Math.sqrt(
      Math.pow(viewportWidth - startX, 2) + Math.pow(startY, 2),
    );

    const maxDistance = Math.max(
      distanceToBottomLeft,
      distanceToTopRight,
      Math.sqrt(Math.pow(startX, 2) + Math.pow(startY, 2)),
      Math.sqrt(
        Math.pow(viewportWidth - startX, 2) +
          Math.pow(viewportHeight - startY, 2),
      ),
    );

    const circleSize = maxDistance * 2.5;

    gsap.set(circle, {
      x: startX,
      y: startY,
      width: 0,
      height: 0,
      borderRadius: "50%",
      backgroundColor: newTheme === "dark" ? "#0a0a0a" : "#ffffff",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 10000,
      pointerEvents: "none",
    });

    gsap.to(circle, {
      width: circleSize,
      height: circleSize,
      x: startX - circleSize / 2,
      y: startY - circleSize / 2,
      duration: 0.7,
      ease: "power3.inOut",
      onComplete: () => {
        setTheme(newTheme);
        gsap.to(circle, {
          opacity: 0,
          duration: 0.35,
          ease: "power2.out",
          delay: 0.1,
          onComplete: () => {
            gsap.set(circle, { width: 0, height: 0, opacity: 1, x: 0, y: 0 });
            setIsTransitioning(false);
          },
        });
      },
    });
  }, [isDark, isTransitioning, setTheme, hydrated]);

  if (!hydrated) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur-xl transition-colors duration-300">
        <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-3 sm:px-4 lg:px-6 xl:px-8">
          <Link
            href="/"
            className="text-lg sm:text-xl font-bold tracking-tight text-foreground transition-colors shrink-0"
          >
            Moshiur
          </Link>
          <div className="w-8" />
        </div>
      </nav>
    );
  }

  return (
    <>
      {/* Theme transition circle */}
      <div
        ref={circleRef}
        className="fixed pointer-events-none z-10000"
        style={{ transform: "translate(-50%, -50%)" }}
      />

      {/* Dark overlay when menu is open */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile slide-in menu - 80% width with backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop - 20% area that closes menu on click */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-55 bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Menu panel - 80% width from right */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-0 right-0 bottom-0 z-60 w-[80%] bg-background/98 backdrop-blur-xl md:hidden border-l border-foreground/10"
            >
              <div className="flex flex-col h-full px-6 py-20">
                <div className="flex flex-col gap-2">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                    >
                      <button
                        onClick={() => handleNavClick(item)}
                        className="flex items-center justify-between w-full py-4 text-2xl font-bold text-foreground border-b border-foreground/10 text-left"
                      >
                        <span>{item.label}</span>
                        <span className="text-foreground/30">→</span>
                      </button>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-auto flex flex-col gap-4">
                  <button
                    onClick={() => handleNavClick({ scrollTo: "contact" })}
                    className="flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-4 text-base font-bold text-background"
                  >
                    <span>Let&apos;s Talk</span>
                    <svg
                      className="w-4 h-4"
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
                  </button>

                  <div className="flex items-center justify-center gap-4 py-4">
                    <a
                      href="https://github.com/moshiurrahmandeap11"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 text-foreground"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                    </a>
                    <a
                      href="https://linkedin.com/in/moshiurrahmandeap"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 text-foreground"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect width="4" height="12" x="2" y="9" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                    {mounted && (
                      <button
                        onClick={() => {
                          toggleTheme();
                        }}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 text-foreground"
                      >
                        {isDark ? <Sun size={18} /> : <Moon size={18} />}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur-xl transition-colors duration-300"
      >
        <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-3 sm:px-4 lg:px-6 xl:px-8">
          {/* Left: Logo */}
          <Link
            href="/"
            className="text-lg sm:text-xl font-bold tracking-tight text-foreground transition-colors shrink-0"
          >
            Moshiur
          </Link>

          {/* Center: Click Me button - hidden on mobile, shown on sm+ */}
          <div className="hidden sm:flex relative items-center justify-center">
            <motion.button
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              onClick={() => setMenuOpen((prev) => !prev)}
              className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-bold text-background shadow-lg transition-shadow duration-300 hover:shadow-xl"
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="flex items-center gap-2"
                  >
                    <X size={16} strokeWidth={2.5} />
                    Close
                  </motion.span>
                ) : (
                  <motion.span
                    key="clickme"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="flex items-center gap-2"
                  >
                    <Menu size={16} strokeWidth={2.5} />
                    Click Me
                  </motion.span>
                )}
              </AnimatePresence>
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </motion.button>

            {/* Dropdown nav items */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -10,
                    scale: 0.95,
                    filter: "blur(8px)",
                  }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{
                    opacity: 0,
                    y: -10,
                    scale: 0.95,
                    filter: "blur(8px)",
                  }}
                  transition={{
                    duration: 0.25,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="absolute top-full mt-3 flex min-w-65 flex-col items-stretch gap-1 rounded-2xl border border-foreground/10 bg-background/95 p-4 shadow-2xl backdrop-blur-2xl"
                >
                  {navItems.map((item, i) => (
                    <button
                      key={item.id}
                      ref={(el) => {
                        itemRefs.current[i] = el;
                      }}
                      onClick={() => handleNavClick(item)}
                      className="group/item relative flex items-center justify-between overflow-hidden rounded-xl px-5 py-3 text-sm font-semibold text-foreground transition-all hover:bg-foreground/10 text-left w-full"
                    >
                      <span className="relative z-10">{item.label}</span>
                      <motion.span
                        className="text-foreground/30 transition-colors group-hover/item:text-foreground/70"
                        whileHover={{ x: 3 }}
                      >
                        →
                      </motion.span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
            {/* Desktop: Theme toggle + icons + Let's Talk */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3">
              {mounted && (
                <motion.button
                  id="theme-toggle-btn"
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  disabled={isTransitioning}
                  className="relative flex h-8 w-8 lg:h-9 lg:w-9 items-center justify-center rounded-full border border-foreground/10 text-foreground transition-colors hover:bg-foreground/5 disabled:opacity-50"
                >
                  <AnimatePresence mode="wait">
                    {isDark ? (
                      <motion.div
                        key="sun"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Sun size={15} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        initial={{ opacity: 0, rotate: 90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: -90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Moon size={15} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              )}

              <a
                href="https://github.com/moshiurrahmandeap11"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-8 w-8 lg:h-9 lg:w-9 items-center justify-center rounded-full border border-foreground/10 text-foreground transition-colors hover:bg-foreground/5"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>

              <a
                href="https://linkedin.com/in/moshiurrahmandeap"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-8 w-8 lg:h-9 lg:w-9 items-center justify-center rounded-full border border-foreground/10 text-foreground transition-colors hover:bg-foreground/5"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>

              <button
                onClick={() => handleNavClick({ scrollTo: "contact" })}
                className="group hidden lg:inline-flex items-center gap-2 rounded-full bg-foreground px-4 xl:px-5 py-2 text-sm font-semibold text-background transition-all hover:opacity-90 hover:scale-105"
              >
                <span>Let&apos;s Talk</span>
                <svg
                  className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
              </button>
            </div>

            {/* Tablet: show icons only, no Let's Talk */}
            <div className="hidden sm:flex md:hidden items-center gap-2">
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-foreground/10 text-foreground"
                >
                  {isDark ? <Sun size={15} /> : <Moon size={15} />}
                </button>
              )}
              <a
                href="https://github.com/moshiurrahmandeap11"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-foreground/10 text-foreground"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/moshiurrahmandeap"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-foreground/10 text-foreground"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>

            {/* Mobile hamburger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="flex md:hidden h-9 w-9 items-center justify-center rounded-full border border-foreground/10 text-foreground"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="mob-close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={18} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="mob-menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </nav>
    </>
  );
}
