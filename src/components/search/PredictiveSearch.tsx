"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { communes } from "@/lib/data/locations";
import { properties } from "@/lib/data/properties";
import { Icon } from "@/components/ui/Icon";

type Suggestion = {
  label: string;
  sublabel: string;
  kind: "barrio" | "comuna" | "propiedad";
  href: string;
};

function buildIndex(): Suggestion[] {
  const items: Suggestion[] = [];

  for (const commune of communes) {
    for (const neighborhood of commune.neighborhoods) {
      items.push({
        label: neighborhood,
        sublabel: `Barrio · ${commune.name}`,
        kind: "barrio",
        href: `/propiedades?comuna=${encodeURIComponent(commune.name)}&barrio=${encodeURIComponent(neighborhood)}`,
      });
    }
    items.push({
      label: commune.name,
      sublabel: `Comuna · ${commune.region}`,
      kind: "comuna",
      href: `/propiedades?comuna=${encodeURIComponent(commune.name)}`,
    });
  }

  for (const property of properties) {
    items.push({
      label: property.title,
      sublabel: `${property.barrio}, ${property.comuna}`,
      kind: "propiedad",
      href: `/propiedades/${property.slug}`,
    });
  }

  return items;
}

const kindIcon = {
  barrio: "pin",
  comuna: "map",
  propiedad: "home",
} as const;

export function PredictiveSearch({
  variant = "full",
  className = "",
}: {
  variant?: "full" | "compact";
  className?: string;
}) {
  const router = useRouter();
  const index = useMemo(() => buildIndex(), []);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const scored = index
      .map((item) => {
        const haystack = `${item.label} ${item.sublabel}`.toLowerCase();
        const pos = haystack.indexOf(q);
        if (pos === -1) return null;
        const weight = item.label.toLowerCase().startsWith(q) ? 0 : 1;
        return { item, score: pos + weight };
      })
      .filter((v): v is { item: Suggestion; score: number } => v !== null)
      .sort((a, b) => a.score - b.score)
      .slice(0, 7);
    return scored.map((s) => s.item);
  }, [index, query]);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function go(href: string) {
    setOpen(false);
    setQuery("");
    router.push(href);
  }

  function submit() {
    const q = query.trim();
    if (!q) return;
    if (results.length > 0) {
      go(results[0].href);
      return;
    }
    go(`/propiedades?q=${encodeURIComponent(q)}`);
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        role="search"
      >
        <div
          className={`flex items-center gap-2 rounded-full border border-line bg-white transition focus-within:border-navy-300 focus-within:shadow-lift ${
            variant === "compact" ? "h-11 px-4" : "h-14 px-5"
          }`}
        >
          <Icon name="search" size={variant === "compact" ? 16 : 18} className="shrink-0 text-navy-300" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setHighlight(0);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder="Busca barrio, comuna o condominio…"
            aria-label="Buscar propiedades"
            className={`w-full bg-transparent outline-none placeholder:text-muted/70 ${
              variant === "compact" ? "text-sm" : "text-[0.9375rem]"
            }`}
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setOpen(false);
              }}
              aria-label="Limpiar búsqueda"
              className="shrink-0 text-muted transition hover:text-navy-700"
            >
              <Icon name="close" size={16} />
            </button>
          ) : null}
          {variant === "full" ? (
            <button
              type="submit"
              className="hidden shrink-0 rounded-full bg-navy-700 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-navy-800 sm:inline-block"
            >
              Buscar
            </button>
          ) : null}
        </div>
      </form>

      {open && results.length > 0 ? (
        <ul className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-lg border border-line bg-white shadow-lift-lg">
          {results.map((item, index) => (
            <li key={`${item.kind}-${item.label}`}>
              <button
                type="button"
                onMouseEnter={() => setHighlight(index)}
                onClick={() => go(item.href)}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left transition ${
                  index === highlight ? "bg-paper" : "hover:bg-paper"
                }`}
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-navy-100 text-navy-700">
                  <Icon name={kindIcon[item.kind]} size={15} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-navy-900">
                    {item.label}
                  </span>
                  <span className="block truncate text-xs text-muted">
                    {item.sublabel}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default PredictiveSearch;
