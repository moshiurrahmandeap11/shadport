"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FileText, Plus, Pencil, Trash2, Eye, ArrowLeft, Search } from "lucide-react";
import toast from "react-hot-toast";
import { useBlogs, useDeleteBlog } from "@/lib/blogs";

export default function BlogsListPage() {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, error } = useBlogs(1);
  const deleteMutation = useDeleteBlog();

  const blogs = data?.data ?? [];

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch blogs");
    }
  }, [error]);

  const filteredBlogs = searchQuery.trim()
    ? blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : blogs;

  async function handleDelete(id: string) {
    const toastId = toast.loading("Deleting blog...");
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Blog deleted", { id: toastId });
    } catch {
      toast.error("Failed to delete blog", { id: toastId });
    } finally {
      setDeleteId(null);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f97316]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#f97316] text-white text-sm font-medium hover:bg-[#f97316]/90 transition-colors shadow-lg shadow-[#f97316]/20"
        >
          <Plus className="w-4 h-4" />
          New Blog
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search blogs..."
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#111827]/60 border border-[#1f2937]/60 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-[#f97316]/50 transition-colors"
        />
      </div>

      {/* Blogs Table */}
      <div className="bg-[#111827]/60 border border-[#1f2937]/60 rounded-xl overflow-hidden">
        {filteredBlogs.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">
              {searchQuery ? "No blogs match your search." : "No blogs yet"}
            </p>
            {!searchQuery && (
              <Link
                href="/admin/moshiur/blogs/new"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#f97316] text-white text-sm font-medium hover:bg-[#f97316]/90 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Create your first blog
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1f2937]/60">
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Author</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Date</th>
                  <th className="text-right px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f2937]/40">
                {filteredBlogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-[#1f2937]/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-white truncate max-w-[200px] sm:max-w-xs">{blog.title}</p>
                      <p className="text-xs text-gray-500 truncate max-w-[200px] sm:max-w-xs">{blog.description}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400 hidden sm:table-cell">{blog.author}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-6 max-w-sm w-full shadow-2xl">
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
