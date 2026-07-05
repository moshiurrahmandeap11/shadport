"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Mail, Phone, MapPin, CheckCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!contentRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    // Send email via mailto link
    const subject = `Message from ${formData.name} - Portfolio Contact`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    const mailtoLink = `mailto:moshiurrahmandeap@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.open(mailtoLink, "_blank");

    // Show toast
    setShowToast(true);
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Me", href: "/about" },
    { label: "Portfolio", href: "/projects" },
    { label: "Contact Us", href: "#contact" },
  ];

  return (
    <section ref={sectionRef} id="contact" className="relative py-16 sm:py-20 lg:py-28 bg-background mb-[-100px] sm:mb-[-150px] lg:mb-[-200px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={contentRef}
          className="rounded-2xl sm:rounded-3xl bg-foreground/[0.03] border border-foreground/10 p-6 sm:p-8 lg:p-12 xl:p-16"
        >
          {/* Top Section - Heading + Form */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* Left - Big Heading */}
            <div className="lg:w-1/2 flex flex-col justify-center">
              <span className="text-[10px] sm:text-xs font-semibold text-foreground uppercase tracking-[0.2em] mb-4">
                Get Started a Projects?
              </span>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-foreground/10 leading-[0.9] tracking-tight select-none">
                LET&apos;S WORK
                <br />
                TOGETHER
              </h2>
            </div>

            {/* Right - Contact Form */}
            <div className="lg:w-1/2">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-transparent border border-foreground/20 text-foreground placeholder:text-foreground/40 text-sm focus:outline-none focus:border-foreground/40 transition-colors"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-transparent border border-foreground/20 text-foreground placeholder:text-foreground/40 text-sm focus:outline-none focus:border-foreground/40 transition-colors"
                  />
                </div>
                <textarea
                  name="message"
                  placeholder="Enter your message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-transparent border border-foreground/20 text-foreground placeholder:text-foreground/40 text-sm focus:outline-none focus:border-foreground/40 transition-colors resize-none"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-foreground text-background text-sm font-medium rounded-lg hover:bg-foreground/90 transition-colors disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-foreground/10 my-10 sm:my-12 lg:my-16" />

          {/* Bottom Section - Links & Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Quick Links */}
            <div>
              <h3 className="text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-4">
                Quick Links
              </h3>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {quickLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-xs sm:text-sm text-foreground/50 hover:text-foreground transition-colors uppercase tracking-wider"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Me */}
            <div>
              <h3 className="text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-4">
                Contact Me
              </h3>
              <div className="space-y-3">
                <a
                  href="tel:+8801409063324"
                  className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  +8801409063324
                </a>
                <a
                  href="mailto:moshiurrahmandeap@gmail.com"
                  className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  moshiurrahmandeap@gmail.com
                </a>
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 className="text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-4">
                Location
              </h3>
              <div className="flex items-start gap-2 text-sm text-foreground/60">
                <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                <span>Based on Mymensingh, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-2 fade-in duration-300">
          <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-foreground text-background shadow-lg border border-foreground/10">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-sm font-medium">Message sent!</p>
              <p className="text-xs text-background/70">Opening your email client...</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
