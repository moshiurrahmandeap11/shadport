import { Metadata } from "next";
import { staticProjects } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FolderKanban } from "lucide-react";
import ProjectLinks from "./ProjectLinks";

export const metadata: Metadata = {
  title: "Projects | Moshiur Rahman DEAP - Full Stack Developer Portfolio",
  description:
    "Explore Moshiur Rahman DEAP's portfolio projects. Full stack web applications built with MERN Stack, Next.js, React.js, Node.js, and MongoDB. Best developer in Bangladesh.",
  keywords: [
    "moshiur rahman projects",
    "moshiur rahman deap portfolio",
    "full stack projects",
    "mern stack projects",
    "react js projects",
    "next js projects",
    "web development portfolio",
    "best developer bangladesh projects",
  ],
  openGraph: {
    title: "Projects | Moshiur Rahman DEAP",
    description: "Full stack web applications built with MERN Stack, Next.js, React.js.",
    url: "https://moshiurrahman.online/projects",
    type: "website",
  },
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = staticProjects;

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

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project) => (
            <Link
              key={project.slug}
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
                        className="px-2 py-0.5 rounded-md bg-foreground/5 text-foreground/50 text-[10px] font-medium border border-foreground/10"
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
          ))}
        </div>
      </div>
    </div>
  );
}
