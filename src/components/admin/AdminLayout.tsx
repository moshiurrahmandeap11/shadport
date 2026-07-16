"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdmin } from "@/lib/admin-context";
import {
  LayoutDashboard,
  FileText,
  Mail,
  FolderKanban,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin/moshiur", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/moshiur/projects", icon: FolderKanban },
  { label: "Blogs", href: "/admin/moshiur/blogs", icon: FileText },
  { label: "Contacts", href: "/admin/moshiur/contacts", icon: Mail },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin, logout } = useAdmin();
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#0a0f1e] flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#111827]/95 backdrop-blur-xl border-r border-[#1f2937]/80 transform transition-transform duration-300 ease-out lg:transform-none flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-[#1f2937]/60">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#f97316] to-[#ef4444] flex items-center justify-center shadow-lg shadow-[#f97316]/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-sm tracking-tight">Moshiur.dev</h2>
              <p className="text-gray-500 text-xs font-medium">Portfolio CMS</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 flex-1">
          <p className="px-4 py-2 text-[10px] font-semibold text-gray-600 uppercase tracking-widest">
            Management
          </p>
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-[#f97316]/15 to-transparent text-[#f97316] border border-[#f97316]/20"
                    : "text-gray-400 hover:text-white hover:bg-[#1f2937]/60 border border-transparent"
                }`}
              >
                <Icon className={`w-4.5 h-4.5 transition-colors ${isActive ? "text-[#f97316]" : "text-gray-500 group-hover:text-gray-300"}`} />
                <span>{item.label}</span>
                {isActive && <ChevronRight className="w-4 h-4 ml-auto animate-pulse" />}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#1f2937]/60">
          <div className="mb-3 px-4 py-2 rounded-lg bg-[#1f2937]/40">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">Signed in as</p>
            <p className="text-sm text-white truncate mt-0.5 font-medium">{admin?.email}</p>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400/80 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200 border border-transparent hover:border-red-400/20"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 border-b border-[#1f2937]/60 bg-[#111827]/60 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-[#1f2937] transition-all"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 hidden sm:inline font-medium">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
