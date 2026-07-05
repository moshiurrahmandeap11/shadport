"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Blog, formatDate, estimateReadTime } from "@/lib/blogs";
import { ArrowUpRight, Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";

interface BlogCardProps {
  blog: Blog;
  index?: number;
}

function BlogCard({ blog, index = 0 }: BlogCardProps) {
  const readTime = estimateReadTime(blog.content);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    >
      <Link href={`/blogs/${blog._id}`} className="group block h-full">
        <div className="h-full rounded-2xl sm:rounded-3xl border border-foreground/10 bg-foreground/[0.02] overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-foreground/20 hover:scale-[1.02]">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={blog.thumbnail.url}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-500">
                <ArrowUpRight className="w-5 h-5 text-foreground" />
              </div>
            </div>
            {blog.media && (
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-medium">
                {blog.media.mediaType === "video" ? "Video" : "GIF"}
              </div>
            )}
          </div>
          <div className="p-5 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-foreground leading-tight line-clamp-2 mb-3 group-hover:text-foreground/80 transition-colors">
              {blog.title}
            </h3>
            <p className="text-sm text-foreground/60 line-clamp-3 mb-4 leading-relaxed">
              {blog.description}
            </p>
            <div className="flex items-center justify-between text-xs text-foreground/50">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(blog.createdAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {readTime} min
                </span>
              </div>
              <span className="font-medium">{blog.author}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

interface BlogsPageClientProps {
  initialBlogs: Blog[];
  totalPages: number;
  totalItems: number;
}

export default function BlogsPageClient({ initialBlogs, totalPages, totalItems }: BlogsPageClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPage = async (page: number) => {
    if (page === currentPage) return;
    setIsLoading(true);
    try {
      const res = await fetch(`https://server-portfolio-flame.vercel.app/api/blogs?page=${page}`);
      const data = await res.json();
      if (data.success) {
        setBlogs(data.data);
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-8 sm:pb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-2 rounded-full bg-foreground" />
          <span className="text-xs sm:text-sm font-medium text-foreground/70 uppercase tracking-widest">
            My Thoughts
          </span>
        </div>
        <div className="flex items-end justify-between">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">Blogs</h1>
          <span className="text-sm text-foreground/50">{totalItems} articles</span>
        </div>
        <div className="h-px bg-foreground/10 w-full mt-6" />
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {blogs.map((blog, index) => (
              <BlogCard key={blog._id} blog={blog} index={index} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => fetchPage(currentPage - 1)}
              disabled={currentPage === 1 || isLoading}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-all disabled:border-foreground/10 disabled:text-foreground/30 disabled:cursor-not-allowed border-foreground/30 text-foreground hover:bg-foreground/5 hover:border-foreground/50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => fetchPage(page)}
                disabled={isLoading}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  page === currentPage
                    ? "bg-foreground text-background"
                    : "border border-foreground/20 text-foreground/60 hover:bg-foreground/5 hover:border-foreground/40"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => fetchPage(currentPage + 1)}
              disabled={currentPage === totalPages || isLoading}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-all disabled:border-foreground/10 disabled:text-foreground/30 disabled:cursor-not-allowed border-foreground/30 text-foreground hover:bg-foreground/5 hover:border-foreground/50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
