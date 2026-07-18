"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface TextDecodeProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "p";
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export default function TextDecode({
  text,
  className = "",
  delay = 0,
  duration = 1.5,
  as: Tag = "span",
}: TextDecodeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayText, setDisplayText] = useState(text);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || hasAnimated) return;

    const timeout = setTimeout(() => {
      let iteration = 0;
      const totalIterations = text.length * 3;
      const intervalDuration = (duration * 1000) / totalIterations;

      const interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iteration / 3) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        iteration += 1;

        if (iteration >= totalIterations) {
          clearInterval(interval);
          setDisplayText(text);
          setHasAnimated(true);
        }
      }, intervalDuration);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [isInView, text, delay, duration, hasAnimated]);

  return (
    <div ref={ref} className="inline-block">
      <Tag className={className}>{displayText}</Tag>
    </div>
  );
}
