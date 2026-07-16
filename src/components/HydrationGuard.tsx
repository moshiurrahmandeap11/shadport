"use client";

import { useHydrated } from "@/lib/use-hydrated";

/**
 * HydrationGuard prevents its children from rendering until React hydration
 * is fully complete. Use this to wrap any component that reads browser-only
 * APIs (localStorage, matchMedia, window size, etc.) or that renders
 * different markup on server vs client (theme toggles, auth state, etc.).
 *
 * During SSR and the hydration pass the children are NOT rendered, avoiding
 * hydration mismatches. Once hydration finishes, the children mount normally.
 */
export function HydrationGuard({ children }: { children: React.ReactNode }) {
  const hydrated = useHydrated();
  if (!hydrated) return null;
  return <>{children}</>;
}
