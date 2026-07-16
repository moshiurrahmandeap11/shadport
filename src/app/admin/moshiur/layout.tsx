"use client";

import { useAdmin } from "@/lib/admin-context";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";

export default function MoshiurLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useAdmin();

  return (
    <ProtectedRoute>
      <AdminLayout>{children}</AdminLayout>
    </ProtectedRoute>
  );
}
