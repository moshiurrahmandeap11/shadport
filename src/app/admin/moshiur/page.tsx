"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Mail, Eye, TrendingUp } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

interface Stats {
  totalBlogs: number;
  totalContacts: number;
  unreadContacts: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({ totalBlogs: 0, totalContacts: 0, unreadContacts: 0 });
  const [recentContacts, setRecentContacts] = useState<any[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      const [blogsRes, contactsRes] = await Promise.all([
        fetch(`${API_BASE}/blogs?limit=5`),
        fetch(`${API_BASE}/contacts`),
      ]);

      const blogsData = await blogsRes.json();
      const contactsData = await contactsRes.json();

      const contacts = contactsData.data || [];
      const blogs = blogsData.data || [];

      setStats({
        totalBlogs: blogsData.pagination?.totalItems || blogs.length,
        totalContacts: contacts.length,
        unreadContacts: contacts.filter((c: any) => !c.isRead).length,
      });

      setRecentContacts(contacts.slice(0, 5));
      setRecentBlogs(blogs.slice(0, 5));
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }

  const statCards = [
    { label: "Total Blogs", value: stats.totalBlogs, icon: FileText, href: "/admin/moshiur/blogs" },
    { label: "Total Contacts", value: stats.totalContacts, icon: Mail, href: "/admin/moshiur/contacts" },
    { label: "Unread Messages", value: stats.unreadContacts, icon: Eye, href: "/admin/moshiur/contacts" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f97316]" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
        <p className="text-gray-400 text-sm">Overview of your portfolio</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="bg-[#111827] border border-[#1f2937] rounded-xl p-6 hover:border-[#f97316]/30 transition-colors group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#f97316]/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#f97316]" />
                </div>
                <TrendingUp className="w-4 h-4 text-gray-600 group-hover:text-[#f97316] transition-colors" />
              </div>
              <p className="text-2xl font-bold text-white">{card.value}</p>
              <p className="text-sm text-gray-400 mt-1">{card.label}</p>
            </Link>
          );
        })}
      </div>

      {/* Recent Contacts */}
      <div className="bg-[#111827] border border-[#1f2937] rounded-xl overflow-hidden">
        <div className="p-6 border-b border-[#1f2937] flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Recent Contacts</h2>
          <Link
            href="/admin/moshiur/contacts"
            className="text-sm text-[#f97316] hover:underline"
          >
            View All
          </Link>
        </div>
        {recentContacts.length === 0 ? (
          <div className="p-6 text-center text-gray-500 text-sm">No contacts yet</div>
        ) : (
          <div className="divide-y divide-[#1f2937]">
            {recentContacts.map((contact: any) => (
              <div key={contact._id} className="p-4 flex items-center justify-between hover:bg-[#1f2937]/30 transition-colors">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">{contact.name}</p>
                  <p className="text-xs text-gray-500 truncate">{contact.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  {!contact.isRead && (
                    <span className="w-2 h-2 rounded-full bg-[#f97316]" />
                  )}
                  <span className="text-xs text-gray-600">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Blogs */}
      <div className="bg-[#111827] border border-[#1f2937] rounded-xl overflow-hidden">
        <div className="p-6 border-b border-[#1f2937] flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Recent Blogs</h2>
          <Link
            href="/admin/moshiur/blogs"
            className="text-sm text-[#f97316] hover:underline"
          >
            View All
          </Link>
        </div>
        {recentBlogs.length === 0 ? (
          <div className="p-6 text-center text-gray-500 text-sm">No blogs yet</div>
        ) : (
          <div className="divide-y divide-[#1f2937]">
            {recentBlogs.map((blog: any) => (
              <div key={blog._id} className="p-4 flex items-center justify-between hover:bg-[#1f2937]/30 transition-colors">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">{blog.title}</p>
                  <p className="text-xs text-gray-500">By {blog.author}</p>
                </div>
                <span className="text-xs text-gray-600">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
