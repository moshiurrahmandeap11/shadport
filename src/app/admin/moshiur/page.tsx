"use client";

import Link from "next/link";
import {
  FileText,
  Mail,
  TrendingUp,
  Plus,
  ArrowUpRight,
  Eye,
} from "lucide-react";
import { useBlogs } from "@/lib/hooks";

export default function AdminDashboardPage() {
  const { data: blogsData, isLoading: blogsLoading } = useBlogs(1);

  const blogs = blogsData?.data ?? [];
  const totalBlogs = blogsData?.pagination?.totalItems ?? blogs.length;

  const isLoading = blogsLoading;

  const statCards = [
    {
      label: "Total Blogs",
      value: totalBlogs,
      icon: FileText,
      href: "/admin/moshiur/blogs",
      color: "from-[#f97316]/20 to-orange-500/20",
      iconColor: "text-[#f97316]",
      borderColor: "border-[#f97316]/20",
    },
    {
      label: "Total Contacts",
      value: "—",
      icon: Mail,
      href: "/admin/moshiur/contacts",
      color: "from-emerald-500/20 to-green-500/20",
      iconColor: "text-emerald-400",
      borderColor: "border-emerald-500/20",
    },
  ];

  const quickActions = [
    { label: "New Blog", href: "/admin/moshiur/blogs/new", icon: Plus, color: "bg-[#f97316]/10 text-[#f97316] border-[#f97316]/20 hover:bg-[#f97316]/20" },
    { label: "View Contacts", href: "/admin/moshiur/contacts", icon: Eye, color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f97316]" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
        <p className="text-gray-400 text-sm">Overview of your portfolio content</p>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              href={action.href}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${action.color}`}
            >
              <Icon className="w-4 h-4" />
              {action.label}
            </Link>
          );
        })}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className={`group relative overflow-hidden rounded-xl p-6 border ${card.borderColor} bg-gradient-to-br ${card.color} hover:scale-[1.02] transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center border border-white/10`}>
                  <Icon className={`w-5 h-5 ${card.iconColor}`} />
                </div>
                <TrendingUp className="w-4 h-4 text-gray-600 group-hover:text-white/40 transition-colors" />
              </div>
              <p className="text-3xl font-bold text-white">{card.value}</p>
              <p className="text-sm text-gray-400 mt-1 font-medium">{card.label}</p>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-4 h-4 text-white/30" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Blogs */}
      <div className="bg-[#111827]/60 border border-[#1f2937]/60 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-[#1f2937]/60 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Recent Blogs</h2>
          <Link
            href="/admin/moshiur/blogs"
            className="text-sm text-[#f97316] hover:underline font-medium"
          >
            View All
          </Link>
        </div>
        {blogs.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">
            <FileText className="w-10 h-10 mx-auto mb-3 text-gray-700" />
            <p>No blogs yet</p>
          </div>
        ) : (
          <div className="divide-y divide-[#1f2937]/40">
            {blogs.slice(0, 5).map((blog: any) => (
              <Link
                key={blog._id}
                href={`/admin/moshiur/blogs/edit/${blog._id}`}
                className="p-4 flex items-center gap-4 hover:bg-[#1f2937]/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#1f2937] flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {blog.thumbnail?.url ? (
                    <img src={blog.thumbnail.url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <FileText className="w-5 h-5 text-gray-600" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white truncate group-hover:text-[#f97316] transition-colors">{blog.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">By {blog.author}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
