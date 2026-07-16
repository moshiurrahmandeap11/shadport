import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

// ── Contacts ─────────────────────────────────────────────────────────────────

export function useContacts() {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/contacts`);
      if (!res.ok) throw new Error("Failed to fetch contacts");
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useMarkContactRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API_BASE}/contacts/${id}/read`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Failed to mark as read");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
}

export function useDeleteContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API_BASE}/contacts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete contact");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
}

// ── Projects (re-export from projects.ts for convenience) ────────────────────

export { useProjects, useProject, useCreateProject, useUpdateProject, useDeleteProject } from "./projects";

// ── Blogs (re-export from blogs.ts for convenience) ──────────────────────────

export { useBlogs, useBlog, useCreateBlog, useUpdateBlog, useDeleteBlog } from "./blogs";
