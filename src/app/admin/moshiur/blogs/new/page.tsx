"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, ImageIcon, Video } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import QuillEditor, { QuillEditorRef } from "@/components/editor/QuillEditor";
import { useCreateBlog } from "@/lib/blogs";

export default function NewBlogPage() {
  const router = useRouter();
  const editorRef = useRef<QuillEditorRef>(null);
  const createMutation = useCreateBlog();

  const [formData, setFormData] = useState({
    title: "",
    author: "Moshiur Rahman",
    description: "",
  });
  const [editorContent, setEditorContent] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [media, setMedia] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEditorChange = useCallback((content: string) => {
    setEditorContent(content);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = editorRef.current?.getContent() || editorContent;
    if (!formData.title || !content || !formData.author) {
      toast.error("Title, content and author are required");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Creating blog...");

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("author", formData.author);
      data.append(
        "description",
        formData.description || content.replace(/<[^>]*>/g, "").substring(0, 150)
      );
      data.append("content", content);
      if (thumbnail) data.append("thumbnail", thumbnail);
      if (media) data.append("media", media);

      await createMutation.mutateAsync(data);

      toast.success("Blog created successfully!", { id: toastId });
      router.push("/admin/moshiur/blogs");
    } catch {
      toast.error("Failed to create blog", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/moshiur/blogs"
          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#1f2937] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">New Blog</h1>
          <p className="text-gray-400 text-sm">Create a new blog post</p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#111827] border border-[#1f2937] rounded-xl p-6 space-y-5"
      >
        {/* Title */}
        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData((p) => ({ ...p, title: e.target.value }))
            }
            placeholder="Blog title"
            required
            className="w-full px-4 py-3 rounded-xl bg-[#0a0f1e] border border-[#1f2937] text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-[#f97316] transition-colors"
          />
        </div>

        {/* Author */}
        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
            Author
          </label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) =>
              setFormData((p) => ({ ...p, author: e.target.value }))
            }
            placeholder="Author name"
            required
            className="w-full px-4 py-3 rounded-xl bg-[#0a0f1e] border border-[#1f2937] text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-[#f97316] transition-colors"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
            Description
          </label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) =>
              setFormData((p) => ({ ...p, description: e.target.value }))
            }
            placeholder="Short description (optional)"
            className="w-full px-4 py-3 rounded-xl bg-[#0a0f1e] border border-[#1f2937] text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-[#f97316] transition-colors"
          />
        </div>

        {/* Rich Text Content - Quill */}
        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
            Content
          </label>
          <QuillEditor
            ref={editorRef}
            defaultValue=""
            placeholder="Write your blog content here..."
            onChange={handleEditorChange}
          />
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
            Thumbnail
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
              className="hidden"
              id="thumbnail"
            />
            <label
              htmlFor="thumbnail"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0a0f1e] border border-[#1f2937] border-dashed cursor-pointer hover:border-[#f97316] transition-colors"
            >
              <ImageIcon className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-400">
                {thumbnail ? thumbnail.name : "Click to upload thumbnail"}
              </span>
            </label>
          </div>
        </div>

        {/* Media */}
        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
            Media (Image or Video)
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setMedia(e.target.files?.[0] || null)}
              className="hidden"
              id="media"
            />
            <label
              htmlFor="media"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0a0f1e] border border-[#1f2937] border-dashed cursor-pointer hover:border-[#f97316] transition-colors"
            >
              <Video className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-400">
                {media ? media.name : "Click to upload media"}
              </span>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#f97316] to-[#ef4444] text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            {isSubmitting ? "Creating..." : "Create Blog"}
          </button>
        </div>
      </form>
    </div>
  );
}
