"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, CheckCircle, Circle, Trash2, Download } from "lucide-react";
import toast from "react-hot-toast";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    try {
      const res = await fetch(`${API_BASE}/contacts`);
      const data = await res.json();
      setContacts(data.data || []);
    } catch {
      toast.error("Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  }

  async function handleMarkRead(id: string) {
    try {
      const res = await fetch(`${API_BASE}/contacts/${id}/read`, { method: "PATCH" });
      if (!res.ok) throw new Error("Failed");
      setContacts((prev) =>
        prev.map((c) => (c._id === id ? { ...c, isRead: true } : c))
      );
      toast.success("Marked as read");
    } catch {
      toast.error("Failed to mark as read");
    }
  }

  async function handleDelete(id: string) {
    const toastId = toast.loading("Deleting...");
    try {
      const res = await fetch(`${API_BASE}/contacts/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      toast.success("Contact deleted", { id: toastId });
      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch {
      toast.error("Failed to delete", { id: toastId });
    } finally {
      setDeleteId(null);
    }
  }

  function downloadCSV() {
    const headers = ["Name", "Email", "Message", "Date", "Read"];
    const rows = contacts.map((c) => [
      `"${c.name}"`,
      `"${c.email}"`,
      `"${c.message.replace(/"/g, '""')}"`,
      new Date(c.createdAt).toLocaleString(),
      c.isRead ? "Yes" : "No",
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contacts-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Contacts downloaded!");
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
      <div className="flex items-center justify-between flex-wrap gap-4">
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

      {/* Contacts List */}
      <div className="bg-[#111827] border border-[#1f2937] rounded-xl overflow-hidden">
        {contacts.length === 0 ? (
          <div className="p-12 text-center">
            <Mail className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No contacts yet</p>
          </div>
        ) : (
          <div className="divide-y divide-[#1f2937]">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className={`p-5 hover:bg-[#1f2937]/30 transition-colors ${
                  !contact.isRead ? "border-l-2 border-l-[#f97316]" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3 mb-2">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-6 max-w-sm w-full">
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
