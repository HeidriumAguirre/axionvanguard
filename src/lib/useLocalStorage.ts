"use client";

import { useCallback, useSyncExternalStore } from "react";

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function readValue(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * Estado sincronizado con localStorage usando useSyncExternalStore.
 * Evita setState dentro de un efecto (regla react-hooks/set-state-in-effect).
 */
export function useLocalStorage(key: string, fallback: string) {
  const subscribe = useCallback((callback: () => void) => {
    listeners.add(callback);
    window.addEventListener("storage", callback);
    return () => {
      listeners.delete(callback);
      window.removeEventListener("storage", callback);
    };
  }, []);

  const value = useSyncExternalStore(
    subscribe,
    () => readValue(key) ?? fallback,
    () => fallback,
  );

  const setValue = useCallback(
    (next: string) => {
      try {
        window.localStorage.setItem(key, next);
      } catch {
        /* localStorage no disponible: el estado vive solo en memoria */
      }
      emit();
    },
    [key],
  );

  return [value, setValue] as const;
}

export default useLocalStorage;
