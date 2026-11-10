"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export default function ShowreelVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  // Track scroll position through the pinned section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Liquid spring physics for buttery smooth scrubbing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.5,
    restDelta: 0.0001,
  });

  // Timeline:
  // Initial state: Prominent large container (88vw width, 76vh height) so 16:9 slide content is 100% visible and uncropped
  // 0.0 -> 0.45: Video expands smoothly to 100vw / 100vh (full edge-to-edge)
  // 0.45 -> 0.90: Video stays LOCKED at 100vw / 100vh full-screen immersion
  // > 0.90: Section completes and continues scrolling downwards to the next section
  const videoWidth = useTransform(
    smoothProgress,
    [0.0, 0.45, 1.0],
    ["88vw", "100vw", "100vw"]
  );

  const videoHeight = useTransform(
    smoothProgress,
    [0.0, 0.45, 1.0],
    ["76vh", "100vh", "100vh"]
  );

  // Autoplay video on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  const toggleSound = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!isPlaying) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section
      ref={containerRef}
      id="showreel"
      className="relative h-[280vh] bg-background text-foreground transition-colors duration-500"
    >
      {/* Sticky viewport frame: true 100vw edge-to-edge, NO horizontal padding */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Animated Expanding Video Container (Starts large at 88vw x 76vh, expands to 100vw x 100vh) */}
        <motion.div
          style={{
            width: videoWidth,
            height: videoHeight,
          }}
          className="relative bg-black rounded-none overflow-hidden shadow-2xl flex items-center justify-center will-change-[width,height] border border-black/10 dark:border-white/10"
        >
          {/* HTML5 Looping Video with object-contain to ensure zero content cropping */}
          <video
            ref={videoRef}
            src="/video.mp4"
            autoPlay
            muted={isMuted}
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-contain select-none"
          />

          {/* Floating Center Sound / Audio Toggle Button (Brand Appart style) */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label={isMuted ? "Unmute showreel video" : "Mute showreel video"}
            className="group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-13 h-13 sm:w-16 sm:h-16 rounded-full bg-black/45 hover:bg-black/70 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl cursor-pointer"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 sm:w-6 sm:h-6 text-white/90 transition-transform duration-200 group-hover:scale-110" />
            ) : (
              <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-white transition-transform duration-200 group-hover:scale-110" />
            )}

            {/* Subtle Tooltip */}
            <span className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-none bg-black/80 text-white text-[10px] uppercase font-bold tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {isMuted ? "Unmute" : "Mute"}
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
