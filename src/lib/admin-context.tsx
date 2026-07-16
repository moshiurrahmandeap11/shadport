"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AdminUser {
  email: string;
  token: string;
}

interface AdminContextType {
  admin: AdminUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_EMAIL = "admin@moshiurrahman.online";
const ADMIN_PASSWORD = "#moshiurrahaT5";
const JWT_SECRET = "moshiur-admin-secret-key-2026";

function generateToken(email: string): string {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      email,
      iat: Date.now(),
      exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    })
  );
  const signature = btoa(`${header}.${payload}.${JWT_SECRET}`);
  return `${header}.${payload}.${signature}`;
}

function verifyToken(token: string): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;
    const payload = JSON.parse(atob(parts[1]));
    if (payload.exp < Date.now()) return false;
    const expectedSignature = btoa(`${parts[0]}.${parts[1]}.${JWT_SECRET}`);
    return parts[2] === expectedSignature;
  } catch {
    return false;
  }
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") {
      setIsLoading(false);
      return;
    }
    const stored = localStorage.getItem("admin_session");
    if (stored) {
      try {
        const session = JSON.parse(stored);
        if (verifyToken(session.token)) {
          setAdmin(session);
        } else {
          localStorage.removeItem("admin_session");
        }
      } catch {
        localStorage.removeItem("admin_session");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = generateToken(email);
      const session = { email, token };
      if (typeof window !== "undefined") {
        localStorage.setItem("admin_session", JSON.stringify(session));
      }
      setAdmin(session);
      return true;
    }
    return false;
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_session");
    }
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{ admin, login, logout, isLoading }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
