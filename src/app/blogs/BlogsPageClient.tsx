"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Blog, formatDate, estimateReadTime, useBlogs } from "@/lib/blogs";
import { SkeletonBlogCard } from "@/components/ui/Skeleton";
import {
  ArrowUpRight,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Search,
  Tag,
  User,
} from "lucide-react";

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
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 flex items-center justify-center">
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
              <span className="flex items-center gap-1 font-medium">
                <User className="w-3 h-3" />
                {blog.author}
              </span>
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

export default function BlogsPageClient({
  initialBlogs,
  totalPages,
  totalItems,
}: BlogsPageClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isFetching } = useBlogs(currentPage);

  // Use server-fetched initial data on first page, otherwise use TanStack data
  const blogs = currentPage === 1 && !data ? initialBlogs : (data?.data ?? []);
  const pages = data?.pagination?.totalPages ?? totalPages;
  const items = data?.pagination?.totalItems ?? totalItems;

  // Client-side search filtering
  const filteredBlogs = searchQuery.trim()
    ? blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : blogs;

  const goToPage = (page: number) => {
    if (page === currentPage) return;
    setCurrentPage(page);
    setSearchQuery("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const loading = isLoading || isFetching;

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-8 sm:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[#f97316]" />
            <span className="text-xs sm:text-sm font-medium text-[#f97316] uppercase tracking-widest">
              My Thoughts & Insights
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight">
                Blogs
              </h1>
              <p className="text-foreground/50 mt-2 max-w-lg">
                Web development insights, MERN Stack tutorials, React.js tips,
                and Next.js guides from my experience.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-foreground/50 bg-foreground/5 px-4 py-2 rounded-full">
                {items} articles
              </span>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-foreground/5 border border-foreground/10 text-foreground placeholder:text-foreground/40 text-sm focus:outline-none focus:border-[#f97316]/50 transition-colors"
            />
          </div>
        </motion.div>

        <div className="h-px bg-foreground/10 w-full mt-8" />
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonBlogCard key={i} />
            ))}
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-20">
            <Tag className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
            <p className="text-foreground/40">
              No blogs found matching your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredBlogs.map((blog, index) => (
              <BlogCard key={blog._id} blog={blog} index={index} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {pages > 1 && !searchQuery && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1 || loading}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-all disabled:border-foreground/10 disabled:text-foreground/30 disabled:cursor-not-allowed border-foreground/30 text-foreground hover:bg-foreground/5 hover:border-foreground/50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: pages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                disabled={loading}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  page === currentPage
                    ? "bg-[#f97316] text-white"
                    : "border border-foreground/20 text-foreground/60 hover:bg-foreground/5 hover:border-foreground/40"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === pages || loading}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-all disabled:border-foreground/10 disabled:text-foreground/30 disabled:cursor-not-allowed border-foreground/30 text-foreground hover:bg-foreground/5 hover:border-foreground/50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* SEO Footer Text */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="border-t border-foreground/10 pt-8">
          <p className="text-xs text-foreground/30 leading-relaxed max-w-3xl">
            Welcome to the blog of Moshiur Rahman DEAP, a top-rated full stack
            developer in Bangladesh. Here you will find in-depth tutorials on
            MERN Stack, React.js, Next.js, Node.js, TypeScript, MongoDB, and
            modern web development practices. Whether you are a beginner looking
            to learn web development or an experienced developer seeking advanced
            tips, these articles cover everything from frontend frameworks to
            backend architecture. Follow along for regular updates on
            JavaScript, CSS, Tailwind, API design, database optimization,
            deployment strategies, and more.
          </p>
        </div>
      </div>
    </div>
  );
}
