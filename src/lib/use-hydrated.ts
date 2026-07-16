"use client";

import { useState, useEffect } from "react";

/**
 * Returns true only after React has finished hydrating on the client.
 * Use this to guard any client-only logic (GSAP, DOM measurements,
 * localStorage, theme toggles, etc.) that must not run during SSR or
 * during the initial hydration pass.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Schedule after the current paint so React hydration is guaranteed done
    const id = requestAnimationFrame(() => setHydrated(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return hydrated;
}
