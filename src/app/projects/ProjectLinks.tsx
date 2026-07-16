"use client";

import { ExternalLink, GitBranch } from "lucide-react";

interface ProjectLink {
  name: string;
  url: string;
}

export default function ProjectLinks({ links }: { links: ProjectLink[] }) {
  const liveLinks = links.filter((l) => l.name.toLowerCase().includes("live"));
  const githubLinks = links.filter((l) => l.name.toLowerCase().includes("github"));

  return (
    <div className="flex items-center gap-2">
      {liveLinks.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 text-xs text-[#f97316] hover:underline"
        >
          <ExternalLink className="w-3 h-3" />
          Live
        </a>
      ))}
      {githubLinks.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 text-xs text-foreground/50 hover:text-foreground transition-colors"
        >
          <GitBranch className="w-3 h-3" />
          Code
        </a>
      ))}
    </div>
  );
}
