"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, CheckCircle, Circle, Trash2, Download, Search } from "lucide-react";
import toast from "react-hot-toast";
import { useContacts, useMarkContactRead, useDeleteContact } from "@/lib/hooks";

export default function ContactsPage() {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, error } = useContacts();
  const markReadMutation = useMarkContactRead();
  const deleteMutation = useDeleteContact();

  const contacts = data?.data ?? [];

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch contacts");
    }
  }, [error]);

  const filteredContacts = searchQuery.trim()
    ? contacts.filter(
        (c: any) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.message.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : contacts;

  async function handleMarkRead(id: string) {
    try {
      await markReadMutation.mutateAsync(id);
      toast.success("Marked as read");
    } catch {
      toast.error("Failed to mark as read");
    }
  }

  async function handleDelete(id: string) {
    const toastId = toast.loading("Deleting...");
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Contact deleted", { id: toastId });
    } catch {
      toast.error("Failed to delete", { id: toastId });
    } finally {
      setDeleteId(null);
    }
  }

  function downloadCSV() {
    const headers = ["Name", "Email", "Message", "Date", "Read"];
    const rows = contacts.map((c: any) => [
      `"${c.name}"`,
      `"${c.email}"`,
      `"${c.message.replace(/"/g, '""')}"`,
      new Date(c.createdAt).toLocaleString(),
      c.isRead ? "Yes" : "No",
    ]);
    const csv = [headers.join(","), ...rows.map((r: any) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contacts-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Contacts downloaded!");
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
            <h1 className="text-2xl font-bold text-white">Contacts</h1>
            <p className="text-gray-400 text-sm">{contacts.length} total messages</p>
          </div>
        </div>
        <button
          onClick={downloadCSV}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1f2937] border border-[#374151] text-white text-sm font-medium hover:bg-[#374151] transition-colors"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search contacts..."
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#111827]/60 border border-[#1f2937]/60 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-[#f97316]/50 transition-colors"
        />
      </div>

      {/* Contacts List */}
      <div className="bg-[#111827]/60 border border-[#1f2937]/60 rounded-xl overflow-hidden">
        {filteredContacts.length === 0 ? (
          <div className="p-12 text-center">
            <Mail className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-400">
              {searchQuery ? "No contacts match your search." : "No contacts yet"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#1f2937]/40">
            {filteredContacts.map((contact: any) => (
              <div
                key={contact._id}
                className={`p-5 hover:bg-[#1f2937]/30 transition-colors ${
                  !contact.isRead ? "border-l-2 border-l-[#f97316]" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-sm font-semibold text-white">{contact.name}</h3>
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-xs text-[#f97316] hover:underline"
                      >
                        {contact.email}
                      </a>
                      <span className="text-xs text-gray-600">
                        {new Date(contact.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 whitespace-pre-wrap">{contact.message}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {!contact.isRead && (
                      <button
                        onClick={() => handleMarkRead(contact._id)}
                        className="p-2 rounded-lg text-gray-400 hover:text-[#f97316] hover:bg-[#f97316]/10 transition-colors"
                        title="Mark as read"
                      >
                        <Circle className="w-4 h-4" />
                      </button>
                    )}
                    {contact.isRead && (
                      <span className="p-2 text-green-400">
                        <CheckCircle className="w-4 h-4" />
                      </span>
                    )}
                    <button
                      onClick={() => setDeleteId(contact._id)}
                      className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-semibold text-white mb-2">Delete Contact?</h3>
            <p className="text-sm text-gray-400 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl border border-[#1f2937] text-gray-400 text-sm font-medium hover:text-white transition-colors"
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
