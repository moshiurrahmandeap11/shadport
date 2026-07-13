"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, ImageIcon, Video } from "lucide-react";
import toast from "react-hot-toast";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

interface Blog {
  _id: string;
  title: string;
  author: string;
  description: string;
  content: string;
}

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    content: "",
  });
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [media, setMedia] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  async function fetchBlog() {
    try {
      const res = await fetch(`${API_BASE}/blogs/${id}`);
      const data = await res.json();
      if (data.success) {
        const blog: Blog = data.data;
        setFormData({
          title: blog.title,
          author: blog.author,
          description: blog.description || "",
          content: blog.content,
        });
      }
    } catch {
      toast.error("Failed to fetch blog");
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = toast.loading("Updating blog...");

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("author", formData.author);
      data.append("description", formData.description || formData.content.substring(0, 150));
      data.append("content", formData.content);
      if (thumbnail) data.append("thumbnail", thumbnail);
      if (media) data.append("media", media);

      const res = await fetch(`${API_BASE}/blogs/${id}`, {
        method: "PUT",
        body: data,
      });

      if (!res.ok) throw new Error("Failed to update blog");

      toast.success("Blog updated successfully!", { id: toastId });
      router.push("/admin/moshiur/blogs");
    } catch {
      toast.error("Failed to update blog", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f97316]" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/moshiur/blogs"
          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#1f2937] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Blog</h1>
          <p className="text-gray-400 text-sm">Update your blog post</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#111827] border border-[#1f2937] rounded-xl p-6 space-y-5">
        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
            required
            className="w-full px-4 py-3 rounded-xl bg-[#0a0f1e] border border-[#1f2937] text-white text-sm focus:outline-none focus:border-[#f97316] transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Author</label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData((p) => ({ ...p, author: e.target.value }))}
            required
            className="w-full px-4 py-3 rounded-xl bg-[#0a0f1e] border border-[#1f2937] text-white text-sm focus:outline-none focus:border-[#f97316] transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Description</label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl bg-[#0a0f1e] border border-[#1f2937] text-white text-sm focus:outline-none focus:border-[#f97316] transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Content</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData((p) => ({ ...p, content: e.target.value }))}
            required
            rows={10}
            className="w-full px-4 py-3 rounded-xl bg-[#0a0f1e] border border-[#1f2937] text-white text-sm focus:outline-none focus:border-[#f97316] transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">New Thumbnail (optional)</label>
          <div className="relative">
            <input type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files?.[0] || null)} className="hidden" id="thumbnail" />
            <label htmlFor="thumbnail" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0a0f1e] border border-[#1f2937] border-dashed cursor-pointer hover:border-[#f97316] transition-colors">
              <ImageIcon className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-400">{thumbnail ? thumbnail.name : "Click to upload new thumbnail"}</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">New Media (optional)</label>
          <div className="relative">
            <input type="file" accept="image/*,video/*" onChange={(e) => setMedia(e.target.files?.[0] || null)} className="hidden" id="media" />
            <label htmlFor="media" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0a0f1e] border border-[#1f2937] border-dashed cursor-pointer hover:border-[#f97316] transition-colors">
              <Video className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-400">{media ? media.name : "Click to upload new media"}</span>
            </label>
          </div>
        </div>

        <div className="pt-4">
          <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#f97316] to-[#ef4444] text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
            <Save className="w-4 h-4" />
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
