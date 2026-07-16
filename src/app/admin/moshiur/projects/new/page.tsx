"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  ImageIcon,
  X,
  Save,
  Link as LinkIcon,
  GripVertical,
} from "lucide-react";
import toast from "react-hot-toast";
import QuillEditor, { QuillEditorRef } from "@/components/editor/QuillEditor";
import { useCreateProject } from "@/lib/projects";

export default function NewProjectPage() {
  const router = useRouter();
  const editorRef = useRef<QuillEditorRef>(null);
  const createMutation = useCreateProject();

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    short_description: "",
    order: "0",
  });
  const [editorContent, setEditorContent] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  // Dynamic arrays
  const [techStack, setTechStack] = useState<string[]>([""]);
  const [features, setFeatures] = useState<string[]>([""]);
  const [challenges, setChallenges] = useState<string[]>([""]);
  const [learnings, setLearnings] = useState<string[]>([""]);
  const [screenshots, setScreenshots] = useState<string[]>([""]);
  const [links, setLinks] = useState<{ name: string; url: string }[]>([
    { name: "", url: "" },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEditorChange = useCallback((content: string) => {
    setEditorContent(content);
  }, []);

  // Array helpers
  const addItem = (setter: React.Dispatch<React.SetStateAction<string[]>>) =>
    setter((prev) => [...prev, ""]);
  const removeItem = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number
  ) => setter((prev) => prev.filter((_, i) => i !== index));
  const updateItem = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string
  ) => setter((prev) => prev.map((item, i) => (i === index ? value : item)));

  const addLink = () => setLinks((prev) => [...prev, { name: "", url: "" }]);
  const removeLink = (index: number) =>
    setLinks((prev) => prev.filter((_, i) => i !== index));
  const updateLink = (
    index: number,
    field: "name" | "url",
    value: string
  ) =>
    setLinks((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );

  // Auto-generate slug from title
  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleTitleChange = (title: string) => {
    setFormData((p) => ({
      ...p,
      title,
      slug: p.slug || generateSlug(title),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = editorRef.current?.getContent() || editorContent;
    if (!formData.title || !formData.slug || !content) {
      toast.error("Title, slug and description are required");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Creating project...");

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("slug", formData.slug);
      data.append("short_description", formData.short_description || content.replace(/<[^>]*>/g, "").substring(0, 150));
      data.append("description", content);
      data.append("order", formData.order);

      data.append("techStack", JSON.stringify(techStack.filter(Boolean)));
      data.append("features", JSON.stringify(features.filter(Boolean)));
      data.append("challenges", JSON.stringify(challenges.filter(Boolean)));
      data.append("learnings", JSON.stringify(learnings.filter(Boolean)));
      data.append("screenshots", JSON.stringify(screenshots.filter(Boolean)));
      data.append(
        "links",
        JSON.stringify(links.filter((l) => l.name && l.url))
      );

      if (thumbnail) data.append("thumbnail", thumbnail);

      await createMutation.mutateAsync(data);

      toast.success("Project created successfully!", { id: toastId });
      router.push("/admin/moshiur/projects");
    } catch {
      toast.error("Failed to create project", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/moshiur/projects"
          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#1f2937] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">New Project</h1>
          <p className="text-gray-400 text-sm">Add a new portfolio project</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-[#111827]/60 border border-[#1f2937]/60 rounded-xl p-6 space-y-6"
      >
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Project title"
              required
              className="w-full px-4 py-3 rounded-xl bg-[#0a0f1e] border border-[#1f2937] text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-[#f97316] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
              Slug *
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) =>
                setFormData((p) => ({ ...p, slug: e.target.value }))
              }
              placeholder="project-slug"
              required
              className="w-full px-4 py-3 rounded-xl bg-[#0a0f1e] border border-[#1f2937] text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-[#f97316] transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
            Short Description *
          </label>
          <input
            type="text"
            value={formData.short_description}
            onChange={(e) =>
              setFormData((p) => ({ ...p, short_description: e.target.value }))
            }
            placeholder="Brief description for cards and previews"
            required
            className="w-full px-4 py-3 rounded-xl bg-[#0a0f1e] border border-[#1f2937] text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-[#f97316] transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
            Full Description *
          </label>
          <QuillEditor
            ref={editorRef}
            defaultValue=""
            placeholder="Write detailed project description..."
            onChange={handleEditorChange}
          />
        </div>

        {/* Order */}
        <div className="max-w-xs">
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
            Display Order
          </label>
          <input
            type="number"
            value={formData.order}
            onChange={(e) =>
              setFormData((p) => ({ ...p, order: e.target.value }))
            }
            placeholder="0"
            className="w-full px-4 py-3 rounded-xl bg-[#0a0f1e] border border-[#1f2937] text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-[#f97316] transition-colors"
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
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0a0f1e] border border-[#1f2937] border-dashed cursor-pointer hover:border-[#f97316] transition-colors max-w-md"
            >
              <ImageIcon className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-400">
                {thumbnail ? thumbnail.name : "Click to upload thumbnail"}
              </span>
            </label>
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
            Tech Stack
          </label>
          <div className="space-y-2">
            {techStack.map((tech, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={tech}
                  onChange={(e) => updateItem(setTechStack, index, e.target.value)}
                  placeholder="e.g. React.js"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#0a0f1e] border border-[#1f2937] text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-[#f97316] transition-colors"
                />
                {techStack.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(setTechStack, index)}
                    className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => addItem(setTechStack)}
            className="mt-2 inline-flex items-center gap-1.5 text-sm text-[#f97316] hover:text-[#f97316]/80 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add tech
          </button>
        </div>

        {/* Features */}
        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
            Features
          </label>
          <div className="space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => updateItem(setFeatures, index, e.target.value)}
                  placeholder="Feature description"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#0a0f1e] border border-[#1f2937] text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-[#f97316] transition-colors"
                />
                {features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(setFeatures, index)}
                    className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => addItem(setFeatures)}
            className="mt-2 inline-flex items-center gap-1.5 text-sm text-[#f97316] hover:text-[#f97316]/80 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add feature
          </button>
        </div>

        {/* Challenges */}
        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
            Challenges
          </label>
          <div className="space-y-2">
            {challenges.map((challenge, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={challenge}
                  onChange={(e) => updateItem(setChallenges, index, e.target.value)}
                  placeholder="Challenge faced"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#0a0f1e] border border-[#1f2937] text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-[#f97316] transition-colors"
                />
                {challenges.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(setChallenges, index)}
                    className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => addItem(setChallenges)}
            className="mt-2 inline-flex items-center gap-1.5 text-sm text-[#f97316] hover:text-[#f97316]/80 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add challenge
          </button>
        </div>

        {/* Learnings */}
        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
            Learnings
          </label>
          <div className="space-y-2">
            {learnings.map((learning, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={learning}
                  onChange={(e) => updateItem(setLearnings, index, e.target.value)}
                  placeholder="What you learned"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#0a0f1e] border border-[#1f2937] text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-[#f97316] transition-colors"
                />
                {learnings.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(setLearnings, index)}
                    className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => addItem(setLearnings)}
            className="mt-2 inline-flex items-center gap-1.5 text-sm text-[#f97316] hover:text-[#f97316]/80 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add learning
          </button>
        </div>

        {/* Screenshots */}
        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
            Screenshot URLs
          </label>
          <div className="space-y-2">
            {screenshots.map((url, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => updateItem(setScreenshots, index, e.target.value)}
                  placeholder="https://..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#0a0f1e] border border-[#1f2937] text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-[#f97316] transition-colors"
                />
                {screenshots.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(setScreenshots, index)}
                    className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => addItem(setScreenshots)}
            className="mt-2 inline-flex items-center gap-1.5 text-sm text-[#f97316] hover:text-[#f97316]/80 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add screenshot URL
          </button>
        </div>

        {/* Links */}
        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
            Links
          </label>
          <div className="space-y-3">
            {links.map((link, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={link.name}
                  onChange={(e) => updateLink(index, "name", e.target.value)}
                  placeholder="Name (e.g. Live Demo)"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#0a0f1e] border border-[#1f2937] text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-[#f97316] transition-colors"
                />
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => updateLink(index, "url", e.target.value)}
                  placeholder="URL"
                  className="flex-[2] px-4 py-2.5 rounded-xl bg-[#0a0f1e] border border-[#1f2937] text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-[#f97316] transition-colors"
                />
                {links.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLink(index)}
                    className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addLink}
            className="mt-2 inline-flex items-center gap-1.5 text-sm text-[#f97316] hover:text-[#f97316]/80 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add link
          </button>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-[#1f2937]">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#f97316] to-[#ef4444] text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#f97316]/20"
          >
            <Save className="w-4 h-4" />
            {isSubmitting ? "Creating..." : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
}
