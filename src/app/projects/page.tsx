import { Metadata } from "next";
import { staticProjects } from "@/lib/projects";
import ProjectsPageClient from "./ProjectsPageClient";

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

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
