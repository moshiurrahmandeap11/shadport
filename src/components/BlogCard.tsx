"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Blog, formatDate, estimateReadTime } from "@/lib/blogs";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";

interface BlogCardProps {
  blog: Blog;
  index?: number;
}

export default function BlogCard({ blog, index = 0 }: BlogCardProps) {
  const readTime = estimateReadTime(blog.content);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    >
      <Link
        href={`/blogs/${blog._id}`}
        className="group block h-full"
      >
        <div className="h-full rounded-2xl sm:rounded-3xl border border-foreground/10 bg-foreground/[0.02] overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-foreground/20 hover:scale-[1.02]">
          {/* Thumbnail */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={blog.thumbnail.url}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-500">
                <ArrowUpRight className="w-5 h-5 text-foreground" />
              </div>
            </div>
            {/* Media type badge */}
            {blog.media && (
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-medium">
                {blog.media.mediaType === "video" ? "Video" : "GIF"}
              </div>
            )}
          </div>

          {/* Content */}
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
                  {readTime} min read
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
