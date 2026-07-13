"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Plus, Pencil, Trash2, Eye, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

interface Blog {
  _id: string;
  title: string;
  author: string;
  description: string;
  createdAt: string;
}

export default function BlogsListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    try {
      const res = await fetch(`${API_BASE}/blogs?limit=100`);
      const data = await res.json();
      setBlogs(data.data || []);
    } catch (error) {
      toast.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const toastId = toast.loading("Deleting blog...");
    try {
      const res = await fetch(`${API_BASE}/blogs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Blog deleted", { id: toastId });
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch {
      toast.error("Failed to delete blog", { id: toastId });
    } finally {
      setDeleteId(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f97316]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/moshiur"
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#1f2937] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Blogs</h1>
            <p className="text-gray-400 text-sm">Manage your blog posts</p>
          </div>
        </div>
        <Link
          href="/admin/moshiur/blogs/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#f97316] text-white text-sm font-medium hover:bg-[#f97316]/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Blog
        </Link>
      </div>

      {/* Blogs Table */}
      <div className="bg-[#111827] border border-[#1f2937] rounded-xl overflow-hidden">
        {blogs.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">No blogs yet</p>
            <Link
              href="/admin/moshiur/blogs/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#f97316] text-white text-sm font-medium hover:bg-[#f97316]/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create your first blog
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1f2937]">
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Date</th>
                  <th className="text-right px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f2937]">
                {blogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-[#1f2937]/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-white truncate max-w-[200px] sm:max-w-xs">{blog.title}</p>
                      <p className="text-xs text-gray-500 truncate max-w-[200px] sm:max-w-xs">{blog.description}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">{blog.author}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/blogs/${blog._id}`}
                          target="_blank"
                          className="p-2 rounded-lg text-gray-400 hover:text-[#f97316] hover:bg-[#f97316]/10 transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/moshiur/blogs/edit/${blog._id}`}
                          className="p-2 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteId(blog._id)}
                          className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-white mb-2">Delete Blog?</h3>
            <p className="text-sm text-gray-400 mb-6">
              This action cannot be undone. The blog will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl border border-[#1f2937] text-gray-400 text-sm font-medium hover:text-white hover:border-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
