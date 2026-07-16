import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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

// ── Raw fetch helpers (used by both RSC and TanStack) ─────────────────────

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

// ── TanStack Query hooks ──────────────────────────────────────────────────

const blogsQueryKey = (page: number) => ["blogs", "list", page] as const;
const blogDetailQueryKey = (id: string) => ["blogs", "detail", id] as const;

export function useBlogs(page = 1) {
  return useQuery<BlogsResponse, Error>({
    queryKey: blogsQueryKey(page),
    queryFn: () => fetchBlogs(page),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useBlog(id: string) {
  return useQuery<BlogResponse, Error>({
    queryKey: blogDetailQueryKey(id),
    queryFn: () => fetchBlogById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}

export function usePrefetchBlog() {
  const queryClient = useQueryClient();
  return (id: string) => {
    queryClient.prefetchQuery({
      queryKey: blogDetailQueryKey(id),
      queryFn: () => fetchBlogById(id),
      staleTime: 1000 * 60 * 5,
    });
  };
}

// ── Mutations ───────────────────────────────────────────────────────────────

export function useDeleteBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API_BASE}/blogs/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete blog");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}

export function useCreateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch(`${API_BASE}/blogs`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to create blog");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}

export function useUpdateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: FormData }) => {
      const res = await fetch(`${API_BASE}/blogs/${id}`, {
        method: "PUT",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to update blog");
      return res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: blogDetailQueryKey(variables.id) });
    },
  });
}

// ── Utilities ───────────────────────────────────────────────────────────────

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
