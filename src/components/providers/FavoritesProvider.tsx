"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { useLocalStorage } from "@/lib/useLocalStorage";

type FavoritesContextValue = {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  count: number;
};

const STORAGE_KEY = "av:favorites";

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

function parseFavorites(raw: string): string[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((v): v is string => typeof v === "string");
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useLocalStorage(STORAGE_KEY, "[]");

  const favorites = useMemo(() => parseFavorites(stored), [stored]);

  const toggleFavorite = useCallback(
    (id: string) => {
      const next = favorites.includes(id)
        ? favorites.filter((f) => f !== id)
        : [...favorites, id];
      setStored(JSON.stringify(next));
    },
    [favorites, setStored],
  );

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites],
  );

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite, count: favorites.length }),
    [favorites, isFavorite, toggleFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error("useFavorites debe usarse dentro de FavoritesProvider");
  return ctx;
}
