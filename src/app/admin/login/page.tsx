"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/lib/admin-context";
import { Shield, Eye, EyeOff, Lock, Mail } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isLocked, lockoutTimeLeft, attempts } = useAdmin();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) {
      toast.error(`Account locked. Try again in ${lockoutTimeLeft}s`);
      return;
    }
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Authenticating...");

    try {
      const success = await login(email, password);
      if (success) {
        toast.success("Welcome, Admin!", { id: toastId });
        router.push("/admin/moshiur");
      } else {
        const remaining = Math.max(0, 5 - (attempts + 1));
        toast.error(
          remaining > 0
            ? `Invalid credentials. ${remaining} attempts remaining.`
            : "Invalid credentials. Account locked for 5 minutes.",
          { id: toastId }
        );
      }
    } catch {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f1e] px-4">
      <div className="w-full max-w-md">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f97316] to-[#ef4444] mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Admin Panel</h1>
          <p className="text-sm text-gray-400">Moshiur Rahman Portfolio</p>
        </div>

        {/* Login Card */}
        <div className="bg-[#111827] border border-[#1f2937] rounded-2xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@moshiurrahman.online"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0a0f1e] border border-[#1f2937] text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-[#f97316] transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#0a0f1e] border border-[#1f2937] text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-[#f97316] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Lockout Warning */}
            {isLocked && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                Account locked. Try again in{" "}
                <span className="font-bold">{lockoutTimeLeft}s</span>.
              </div>
            )}

            {/* Attempts Warning */}
            {!isLocked && attempts > 0 && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm text-center">
                Warning: {attempts}/5 failed attempts.
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || isLocked}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#f97316] to-[#ef4444] text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLocked
                ? `Locked (${lockoutTimeLeft}s)`
                : isSubmitting
                ? "Authenticating..."
                : "Sign In"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-600 mt-6">
          Protected area. Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  );
}
