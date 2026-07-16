import { Metadata } from "next";
import { staticProjects } from "@/lib/projects";
import { fetchBlogs } from "@/lib/blogs";

const BASE_URL = "https://moshiurrahman.online";

export default async function sitemap() {
  const routes = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
  ];

  // Project routes
  const projectRoutes = staticProjects.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Blog routes
  let blogRoutes: { url: string; lastModified: Date; changeFrequency: "weekly"; priority: number }[] = [];
  try {
    const blogsResponse = await fetchBlogs(1);
    if (blogsResponse.success) {
      blogRoutes = blogsResponse.data.map((blog) => ({
        url: `${BASE_URL}/blogs/${blog._id}`,
        lastModified: new Date(blog.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
    }
  } catch {
    // If fetching fails, return without blog routes
  }

  return [...routes, ...projectRoutes, ...blogRoutes];
}
