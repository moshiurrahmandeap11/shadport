export interface Thumbnail {
  url: string;
  publicId: string;
  mediaType: string;
}

export interface Media {
  url: string;
  publicId: string;
  mediaType: string;
}

export interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  description: string;
  thumbnail: Thumbnail;
  media: Media | null;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface BlogsResponse {
  success: boolean;
  message: string;
  data: Blog[];
  pagination: Pagination;
}

export interface BlogResponse {
  success: boolean;
  message: string;
  data: Blog;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

export async function fetchBlogs(page = 1): Promise<BlogsResponse> {
  const res = await fetch(`${API_BASE}/blogs?page=${page}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
}

export async function fetchBlogById(id: string): Promise<BlogResponse> {
  const res = await fetch(`${API_BASE}/blogs/${id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch blog");
  return res.json();
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function estimateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, "");
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
