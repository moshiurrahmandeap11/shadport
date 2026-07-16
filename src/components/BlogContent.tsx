"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { Blog, formatDate, estimateReadTime } from "@/lib/blogs";
import { ArrowLeft, Calendar, Clock, ArrowUpRight, Share2, Bookmark } from "lucide-react";
import { useHydrated } from "@/lib/use-hydrated";

gsap.registerPlugin(ScrollTrigger);

interface BlogContentProps {
  blog: Blog;
  relatedBlogs?: Blog[];
}

export default function BlogContent({ blog, relatedBlogs = [] }: BlogContentProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();

  const readTime = estimateReadTime(blog.content);

  useEffect(() => {
    if (!hydrated) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: "power3.out" }
        );
      }

      if (contentRef.current) {
        const elements = contentRef.current.querySelectorAll("p, h1, h2, h3, h4, ul, ol, blockquote, pre, img, video, .ql-align-center, .ql-align-right");
        gsap.fromTo(
          elements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (relatedRef.current) {
        const cards = relatedRef.current.querySelectorAll(".related-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: relatedRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [blog, hydrated]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.description,
          url: window.location.href,
        });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-foreground/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/blogs"
            className="group flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Blogs
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-lg text-foreground/40 hover:text-foreground hover:bg-foreground/5 transition-colors"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-sm text-foreground/40">
              <span>Blogs</span>
              <span>/</span>
              <span className="text-foreground/70 truncate max-w-[150px]">{blog.title}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div ref={heroRef} className="pt-24 pb-8 sm:pt-32 sm:pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-foreground/50">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(blog.createdAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {readTime} min read
            </span>
            <span className="text-foreground/70 font-medium">{blog.author}</span>
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-tight tracking-tight mb-8"
          >
            {blog.title}
          </h1>

          {/* Thumbnail */}
          <div className="relative aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden mb-8">
            <Image
              src={blog.thumbnail.url}
              alt={blog.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 900px"
              priority
            />
          </div>

          {/* Media (GIF/Video) if exists */}
          {blog.media && (
            <div className="mb-8 rounded-2xl overflow-hidden">
              {blog.media.mediaType === "video" || blog.media.url.endsWith(".mp4") ? (
                <video
                  src={blog.media.url}
                  controls
                  className="w-full rounded-2xl"
                  poster={blog.thumbnail.url}
                />
              ) : (
                <Image
                  src={blog.media.url}
                  alt={`${blog.title} media`}
                  width={800}
                  height={450}
                  className="w-full rounded-2xl object-cover"
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="pb-16 sm:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div
            ref={contentRef}
            className="prose prose-lg dark:prose-invert max-w-none blog-content rich-text-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </div>

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <div ref={relatedRef} className="pb-16 sm:pb-24 border-t border-foreground/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">
              Related Blogs
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBlogs.slice(0, 3).map((relatedBlog) => (
                <Link
                  key={relatedBlog._id}
                  href={`/blogs/${relatedBlog._id}`}
                  className="related-card group block"
                >
                  <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-foreground/20 hover:scale-[1.02]">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={relatedBlog.thumbnail.url}
                        alt={relatedBlog.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-500">
                          <ArrowUpRight className="w-4 h-4 text-foreground" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4 sm:p-5">
                      <h3 className="text-base sm:text-lg font-bold text-foreground line-clamp-2 group-hover:text-foreground/80 transition-colors">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-xs text-foreground/50 mt-2">
                        {formatDate(relatedBlog.createdAt)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
