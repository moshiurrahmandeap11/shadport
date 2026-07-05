import { Metadata } from "next";
import { projects } from "@/lib/projects";
import ProjectDetailClient from "./ProjectDetailClient";
import { notFound } from "next/navigation";

// Generate static params for all projects
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate dynamic metadata for each project
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | Moshiur Rahman DEAP",
      description: "This project could not be found.",
    };
  }

  const title = `${project.title} | Project by Moshiur Rahman DEAP - Best Full Stack Developer in Bangladesh`;
  const description =
    project.short_description +
    ` Built by Moshiur Rahman DEAP, best full stack developer in Bangladesh specializing in ${project.techStack.join(", ")}. Hire for your next project.`;
  const url = `https://moshiurrahman.online/projects/${slug}`;
  const ogImage = project.screenshots[0] || "https://moshiurrahman.online/opengraph-image";

  return {
    title,
    description,
    keywords: [
      "moshiur rahman",
      "moshiur rahman deap",
      project.title.toLowerCase(),
      ...project.techStack.map((t) => t.toLowerCase()),
      "full stack project",
      "web development project",
      "best developer bangladesh",
      "mern stack project",
      "react js project",
      "next js project",
      "node js project",
      "hire developer",
      "freelance developer",
      "web application",
      "software project",
      "bangladesh developer project",
      "custom web development",
    ],
    authors: [
      { name: "Moshiur Rahman DEAP" },
      { name: "Moshiur Rahman" },
    ],
    creator: "Moshiur Rahman DEAP",
    publisher: "Moshiur Rahman DEAP",
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: "Moshiur Rahman DEAP - Full Stack Developer",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${project.title} - Project by Moshiur Rahman DEAP`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@moshiurrahman",
      title,
      description,
      images: [ogImage],
      creator: "@moshiurrahman",
    },
    alternates: {
      canonical: url,
    },
  };
}

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `https://moshiurrahman.online/projects/${slug}#project`,
    name: project.title,
    description: project.short_description,
    image: project.screenshots.map((screenshot) => ({
      "@type": "ImageObject",
      url: screenshot,
    })),
    url: `https://moshiurrahman.online/projects/${slug}`,
    author: {
      "@type": "Person",
      "@id": "https://moshiurrahman.online/#person",
      name: "Moshiur Rahman DEAP",
      alternateName: "Moshiur Rahman",
      url: "https://moshiurrahman.online",
    },
    creator: {
      "@type": "Person",
      "@id": "https://moshiurrahman.online/#person",
      name: "Moshiur Rahman DEAP",
      alternateName: "Moshiur Rahman",
    },
    keywords: project.techStack.join(", ") + ", moshiur rahman, moshiur rahman deap, full stack developer bangladesh",
    technologyUsed: project.techStack.map((tech) => ({
      "@type": "Thing",
      name: tech,
    })),
    featureList: project.features,
    isPartOf: {
      "@type": "WebSite",
      "@id": "https://moshiurrahman.online/#website",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetailClient project={project} />
    </>
  );
}
