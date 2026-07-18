"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { staticProjects } from "@/lib/projects";
import { ArrowUpRight, FolderKanban, Search, X, SlidersHorizontal } from "lucide-react";
import ProjectLinks from "./ProjectLinks";
import { SkeletonCard } from "@/components/ui/Skeleton";

// Extract all unique tech stacks
const allTechStacks = Array.from(
  new Set(staticProjects.flatMap((p) => p.techStack))
).sort();

export default function ProjectsPageClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"newest" | "alphabetical">("newest");
  const [isLoading] = useState(false);

  const filteredProjects = useMemo(() => {
    let filtered = [...staticProjects];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.short_description.toLowerCase().includes(query) ||
          p.techStack.some((t) => t.toLowerCase().includes(query))
      );
    }

    // Tech stack filter
    if (selectedTech.length > 0) {
      filtered = filtered.filter((p) =>
        selectedTech.some((tech) => p.techStack.includes(tech))
      );
    }

    // Sort
    if (sortBy === "alphabetical") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // Default order (by id)
      filtered.sort((a, b) => (a.id || 0) - (b.id || 0));
    }

    return filtered;
  }, [searchQuery, selectedTech, sortBy]);

  const toggleTech = (tech: string) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTech([]);
    setSortBy("newest");
  };

  const hasActiveFilters = searchQuery || selectedTech.length > 0 || sortBy !== "newest";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-8 sm:pb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-[2px] bg-[#f97316]" />
          <span className="text-xs sm:text-sm font-medium text-[#f97316] uppercase tracking-widest">
            Portfolio
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight">
          All Projects
        </h1>
        <p className="text-foreground/50 mt-3 max-w-lg">
          A collection of full-stack web applications built with modern technologies.
        </p>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-foreground/5 border border-foreground/10 text-foreground placeholder:text-foreground/40 text-sm focus:outline-none focus:border-[#f97316]/50 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-foreground/40" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "newest" | "alphabetical")}
              className="px-3 py-2.5 rounded-xl bg-foreground/5 border border-foreground/10 text-foreground text-sm focus:outline-none focus:border-[#f97316]/50 transition-colors"
            >
              <option value="newest">Newest</option>
              <option value="alphabetical">A-Z</option>
            </select>
          </div>
        </div>

        {/* Tech Stack Filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          {allTechStacks.map((tech) => (
            <button
              key={tech}
              onClick={() => toggleTech(tech)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedTech.includes(tech)
                  ? "bg-[#f97316] text-white"
                  : "bg-foreground/5 text-foreground/60 border border-foreground/10 hover:bg-foreground/10 hover:text-foreground"
              }`}
            >
              {tech}
            </button>
          ))}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-red-400 hover:text-red-300 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Results count */}
        <p className="text-sm text-foreground/40 mt-4">
          {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <FolderKanban className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
            <p className="text-foreground/40 mb-2">No projects found matching your filters.</p>
            <button
              onClick={clearFilters}
              className="text-[#f97316] hover:underline text-sm"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            layout
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block"
                >
                  <div className="h-full rounded-2xl sm:rounded-3xl border border-foreground/10 bg-foreground/[0.02] overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-foreground/20 hover:scale-[1.02]">
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#111827]">
                      {project.thumbnail?.url ? (
                        <Image
                          src={project.thumbnail.url}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : project.screenshots[0] ? (
                        <Image
                          src={project.screenshots[0]}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <FolderKanban className="w-12 h-12 text-gray-700" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-500">
                          <ArrowUpRight className="w-5 h-5 text-foreground" />
                        </div>
                      </div>
                    </div>
                    <div className="p-5 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-foreground leading-tight line-clamp-2 mb-3 group-hover:text-foreground/80 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-foreground/60 line-clamp-3 mb-4 leading-relaxed">
                        {project.short_description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-medium border ${
                              selectedTech.includes(tech)
                                ? "bg-[#f97316]/10 text-[#f97316] border-[#f97316]/20"
                                : "bg-foreground/5 text-foreground/50 border-foreground/10"
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="px-2 py-0.5 rounded-md bg-foreground/5 text-foreground/40 text-[10px]">
                            +{project.techStack.length - 4}
                          </span>
                        )}
                      </div>
                      <ProjectLinks links={project.links} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
