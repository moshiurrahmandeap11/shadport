import { z } from "zod";

/**
 * Environment variable validation schema.
 * Add all required env vars here to fail fast at build time.
 */
const envSchema = z.object({
  // API
  NEXT_PUBLIC_API_BASE_URL: z.string().url().default("http://localhost:8080/api"),

  // Admin Auth
  NEXT_PUBLIC_ADMIN_EMAIL: z.string().email().default("admin@moshiurrahman.online"),
  ADMIN_PASSWORD_HASH: z.string().min(1).default("#moshiurrahaT5"),
  JWT_SECRET: z.string().min(16).default("moshiur-admin-secret-key-2026"),

  // Booking / Resume
  NEXT_PUBLIC_BOOKING_URL: z.string().url().optional(),
  NEXT_PUBLIC_RESUME_URL: z.string().url().optional(),

  // SEO
  NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: z.string().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://moshiurrahman.online"),

  // Analytics (optional)
  NEXT_PUBLIC_GA_ID: z.string().optional(),
});

/**
 * Parsed and validated environment variables.
 * Safe to use throughout the app.
 */
export const env = envSchema.parse({
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_ADMIN_EMAIL: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
  ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH,
  JWT_SECRET: process.env.JWT_SECRET,
  NEXT_PUBLIC_BOOKING_URL: process.env.NEXT_PUBLIC_BOOKING_URL,
  NEXT_PUBLIC_RESUME_URL: process.env.NEXT_PUBLIC_RESUME_URL,
  NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
});

/**
 * Client-safe env vars (prefixed with NEXT_PUBLIC_)
 * Use this in client components to avoid leaking server vars.
 */
export const clientEnv = {
  API_BASE_URL: env.NEXT_PUBLIC_API_BASE_URL,
  ADMIN_EMAIL: env.NEXT_PUBLIC_ADMIN_EMAIL,
  BOOKING_URL: env.NEXT_PUBLIC_BOOKING_URL,
  RESUME_URL: env.NEXT_PUBLIC_RESUME_URL,
  SITE_URL: env.NEXT_PUBLIC_SITE_URL,
  GA_ID: env.NEXT_PUBLIC_GA_ID,
};
