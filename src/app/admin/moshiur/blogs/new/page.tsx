"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, ImageIcon, Video } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import QuillEditor, { QuillEditorRef } from "@/components/editor/QuillEditor";
import { useCreateBlog } from "@/lib/blogs";
import { generateSlug } from "@/lib/slug";

export default function NewBlogPage() {
  const router = useRouter();
  const editorRef = useRef<QuillEditorRef>(null);
  const createMutation = useCreateBlog();

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    author: "Moshiur Rahman",
    description: "",
    status: "published" as "draft" | "published",
    metaTitle: "",
    metaDescription: "",
  });
  const [editorContent, setEditorContent] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [media, setMedia] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((p) => ({
      ...p,
      title,
      slug: p.slug || generateSlug(title),
      metaTitle: p.metaTitle || title,
    }));
  };

  const handleEditorChange = useCallback((content: string) => {
    setEditorContent(content);
    // Auto-generate description from content if not manually set
    setFormData((p) => ({
      ...p,
      description:
        p.description || content.replace(/<[^>]*>/g, "").substring(0, 150),
    }));
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
      data.append("slug", formData.slug || generateSlug(formData.title));
      data.append("author", formData.author);
      data.append("description", formData.description);
      data.append("content", content);
      data.append("status", formData.status);
      data.append("metaTitle", formData.metaTitle || formData.title);
      data.append("metaDescription", formData.metaDescription || formData.description);
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
            onChange={handleTitleChange}
            placeholder="Blog title"
            required
            className="w-full px-4 py-3 rounded-xl bg-[#0a0f1e] border border-[#1f2937] text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-[#f97316] transition-colors"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
            Slug
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) =>
              setFormData((p) => ({ ...p, slug: e.target.value }))
            }
            placeholder="url-friendly-slug"
            className="w-full px-4 py-3 rounded-xl bg-[#0a0f1e] border border-[#1f2937] text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-[#f97316] transition-colors"
          />
          <p className="text-xs text-gray-600 mt-1">Auto-generated from title. Edit if needed.</p>
        </div>

        {/* Status */}
        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
            Status
          </label>
          <div className="flex gap-3">
            {(["draft", "published"] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFormData((p) => ({ ...p, status }))}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  formData.status === status
                    ? status === "published"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                    : "bg-[#0a0f1e] text-gray-500 border border-[#1f2937] hover:text-gray-400"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
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
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((p) => ({ ...p, description: e.target.value }))
            }
            placeholder="Short description (auto-generated from content)"
            rows={3}
            maxLength={160}
            className="w-full px-4 py-3 rounded-xl bg-[#0a0f1e] border border-[#1f2937] text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-[#f97316] transition-colors resize-none"
          />
          <div className="flex justify-between mt-1">
            <p className="text-xs text-gray-600">Used for SEO and previews.</p>
            <p className={`text-xs ${formData.description.length > 150 ? "text-amber-400" : "text-gray-600"}`}>
              {formData.description.length}/160
            </p>
          </div>
        </div>

        {/* SEO Metadata */}
        <div className="border border-[#1f2937] rounded-xl p-4 space-y-4">
          <h3 className="text-sm font-semibold text-white">SEO Settings</h3>
          
          {/* Meta Title */}
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
              Meta Title
            </label>
            <input
              type="text"
              value={formData.metaTitle}
              onChange={(e) =>
                setFormData((p) => ({ ...p, metaTitle: e.target.value }))
              }
              placeholder="SEO title (defaults to blog title)"
              maxLength={60}
              className="w-full px-4 py-3 rounded-xl bg-[#0a0f1e] border border-[#1f2937] text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-[#f97316] transition-colors"
            />
            <p className={`text-xs mt-1 text-right ${formData.metaTitle.length > 55 ? "text-amber-400" : "text-gray-600"}`}>
              {formData.metaTitle.length}/60
            </p>
          </div>

          {/* Meta Description */}
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
              Meta Description
            </label>
            <textarea
              value={formData.metaDescription}
              onChange={(e) =>
                setFormData((p) => ({ ...p, metaDescription: e.target.value }))
              }
              placeholder="SEO description (defaults to blog description)"
              rows={2}
              maxLength={160}
              className="w-full px-4 py-3 rounded-xl bg-[#0a0f1e] border border-[#1f2937] text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-[#f97316] transition-colors resize-none"
            />
            <p className={`text-xs mt-1 text-right ${formData.metaDescription.length > 155 ? "text-amber-400" : "text-gray-600"}`}>
              {formData.metaDescription.length}/160
            </p>
          </div>

          {/* Google Preview */}
          <div className="bg-[#0a0f1e] rounded-lg p-3 border border-[#1f2937]">
            <p className="text-xs text-gray-500 mb-2">Google Search Preview</p>
            <p className="text-[#8ab4f8] text-sm truncate hover:underline cursor-pointer">
              {formData.metaTitle || formData.title || "Blog Title"}
            </p>
            <p className="text-[#dadce0] text-xs line-clamp-2 mt-0.5">
              {formData.metaDescription || formData.description || "Blog description will appear here..."}
            </p>
          </div>
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
