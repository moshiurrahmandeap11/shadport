"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { clientEnv } from "./env";

interface AdminUser {
  email: string;
  token: string;
}

interface AdminContextType {
  admin: AdminUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  attempts: number;
  isLocked: boolean;
  lockoutTimeLeft: number;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Read from env vars (client-safe for email, server-only for password/secret)
const ADMIN_EMAIL = clientEnv.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD_HASH || "#moshiurrahaT5";
const JWT_SECRET = process.env.JWT_SECRET || "moshiur-admin-secret-key-2026";

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 5 * 60 * 1000; // 5 minutes

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
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTimeLeft, setLockoutTimeLeft] = useState(0);

  // Check for existing session and lockout on mount
  useEffect(() => {
    if (typeof window === "undefined") {
      setIsLoading(false);
      return;
    }

    // Check lockout
    const lockoutUntil = localStorage.getItem("admin_lockout_until");
    if (lockoutUntil) {
      const until = parseInt(lockoutUntil, 10);
      const now = Date.now();
      if (until > now) {
        setIsLocked(true);
        setLockoutTimeLeft(Math.ceil((until - now) / 1000));
      } else {
        localStorage.removeItem("admin_lockout_until");
        localStorage.removeItem("admin_attempts");
      }
    }

    // Check session
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

    // Check stored attempts
    const storedAttempts = localStorage.getItem("admin_attempts");
    if (storedAttempts) {
      setAttempts(parseInt(storedAttempts, 10));
    }

    setIsLoading(false);
  }, []);

  // Countdown timer for lockout
  useEffect(() => {
    if (!isLocked || lockoutTimeLeft <= 0) return;

    const timer = setInterval(() => {
      setLockoutTimeLeft((prev) => {
        if (prev <= 1) {
          setIsLocked(false);
          localStorage.removeItem("admin_lockout_until");
          localStorage.removeItem("admin_attempts");
          setAttempts(0);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isLocked, lockoutTimeLeft]);

  const login = async (email: string, password: string): Promise<boolean> => {
    if (isLocked) return false;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = generateToken(email);
      const session = { email, token };
      if (typeof window !== "undefined") {
        localStorage.setItem("admin_session", JSON.stringify(session));
        localStorage.removeItem("admin_attempts");
        localStorage.removeItem("admin_lockout_until");
      }
      setAdmin(session);
      setAttempts(0);
      setIsLocked(false);
      return true;
    }

    // Increment attempts
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    if (typeof window !== "undefined") {
      localStorage.setItem("admin_attempts", newAttempts.toString());
    }

    // Lockout after max attempts
    if (newAttempts >= MAX_ATTEMPTS) {
      const lockoutUntil = Date.now() + LOCKOUT_DURATION;
      setIsLocked(true);
      setLockoutTimeLeft(LOCKOUT_DURATION / 1000);
      if (typeof window !== "undefined") {
        localStorage.setItem("admin_lockout_until", lockoutUntil.toString());
      }
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
    <AdminContext.Provider
      value={{ admin, login, logout, isLoading, attempts, isLocked, lockoutTimeLeft }}
    >
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
