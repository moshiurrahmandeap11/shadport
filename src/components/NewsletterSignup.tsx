"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

interface NewsletterSignupProps {
  variant?: "default" | "compact" | "footer";
}

export default function NewsletterSignup({ variant = "default" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call - store in localStorage for now
    await new Promise((resolve) => setTimeout(resolve, 800));

    const subscribers = JSON.parse(localStorage.getItem("newsletter_subscribers") || "[]");
    if (subscribers.includes(email)) {
      toast.error("You are already subscribed!");
      setIsSubmitting(false);
      return;
    }

    subscribers.push(email);
    localStorage.setItem("newsletter_subscribers", JSON.stringify(subscribers));
    setIsSubscribed(true);
    toast.success("Successfully subscribed to the newsletter!");
    setIsSubmitting(false);
  };

  if (isSubscribed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-2 text-emerald-400"
      >
        <CheckCircle className="w-5 h-5" />
        <span className="text-sm font-medium">You are subscribed!</span>
      </motion.div>
    );
  }

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 px-3 py-2 rounded-lg bg-foreground/5 border border-foreground/10 text-foreground placeholder:text-foreground/40 text-sm focus:outline-none focus:border-[#f97316]/50 transition-colors"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="p-2 rounded-lg bg-[#f97316] text-white hover:bg-[#f97316]/90 transition-colors disabled:opacity-50"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    );
  }

  if (variant === "footer") {
    return (
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-[#f97316]/50 transition-colors"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 rounded-lg bg-[#f97316] text-white text-sm font-medium hover:bg-[#f97316]/90 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "..." : "Join"}
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-[#f97316]/10 flex items-center justify-center">
          <Mail className="w-5 h-5 text-[#f97316]" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">Newsletter</h3>
          <p className="text-sm text-foreground/60">Get the latest articles delivered to your inbox.</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="flex-1 px-4 py-3 rounded-xl bg-foreground/5 border border-foreground/10 text-foreground placeholder:text-foreground/40 text-sm focus:outline-none focus:border-[#f97316]/50 transition-colors"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#f97316] text-white font-medium text-sm hover:bg-[#f97316]/90 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
