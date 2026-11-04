"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { FilterSidebar } from "./FilterSidebar";
import { PropertyMap } from "./PropertyMap";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { Icon } from "@/components/ui/Icon";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { properties } from "@/lib/data/properties";
import {
  applyFilters,
  countActiveFilters,
  defaultFilters,
  filtersToQuery,
} from "@/lib/filters";
import type { Filters, SortOption } from "@/lib/types";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "relevancia", label: "Más relevantes" },
  { value: "recientes", label: "Recién publicadas" },
  { value: "precio-asc", label: "Menor precio" },
  { value: "precio-desc", label: "Mayor precio" },
  { value: "superficie-desc", label: "Mayor superficie" },
];

export function PropertySearch({ initialFilters }: { initialFilters: Filters }) {
  const pathname = usePathname();
  const { currency } = useCurrency();
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [view, setView] = useState<"lista" | "mapa">("lista");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const results = useMemo(
    () => applyFilters(properties, filters),
    [filters],
  );

  const activeFilters = countActiveFilters(filters);

  // Mantiene la URL sincronizada para compartir búsquedas (patrón Zonaprop).
  useEffect(() => {
    const params = filtersToQuery(filters);
    const qs = params.toString();
    window.history.replaceState(
      null,
      "",
      qs ? `${pathname}?${qs}` : pathname,
    );
  }, [filters, pathname]);

  function patch(next: Partial<Filters>) {
    setFilters((current) => ({ ...current, ...next }));
  }

  function reset() {
    setFilters({ ...defaultFilters(), operation: filters.operation });
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-20 sm:px-6">
      {/* Barra de herramientas */}
      <div className="sticky top-[4.5rem] z-30 -mx-4 mb-8 border-b border-line bg-paper/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:top-[7.6rem]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm text-navy-800 transition hover:border-navy-300 lg:hidden"
            >
              <Icon name="sliders" size={15} />
              Filtros
              {activeFilters > 0 ? (
                <span className="grid h-5 w-5 place-items-center rounded-full bg-navy-700 text-[0.625rem] text-white">
                  {activeFilters}
                </span>
              ) : null}
            </button>
            <p className="text-sm text-navy-900">
              <span className="font-medium">{results.length}</span>{" "}
              <span className="text-muted">
                {results.length === 1 ? "propiedad" : "propiedades"}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="hidden items-center gap-2 text-sm text-muted sm:flex">
              <span className="hidden md:inline">Ordenar por</span>
              <select
                value={filters.sort}
                onChange={(e) =>
                  patch({ sort: e.target.value as SortOption })
                }
                className="h-10 rounded-full border border-line bg-white px-3 text-sm text-navy-900 outline-none transition focus:border-navy-300"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex items-center rounded-full border border-line bg-white p-0.5">
              <button
                type="button"
                onClick={() => setView("lista")}
                aria-pressed={view === "lista"}
                className={`inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-xs transition ${
                  view === "lista"
                    ? "bg-navy-700 text-white"
                    : "text-muted hover:text-navy-800"
                }`}
              >
                <Icon name="layers" size={13} />
                <span className="hidden sm:inline">Lista</span>
              </button>
              <button
                type="button"
                onClick={() => setView("mapa")}
                aria-pressed={view === "mapa"}
                className={`inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-xs transition ${
                  view === "mapa"
                    ? "bg-navy-700 text-white"
                    : "text-muted hover:text-navy-800"
                }`}
              >
                <Icon name="map" size={13} />
                <span className="hidden sm:inline">Mapa</span>
              </button>
            </div>

            <button
              type="button"
              className="hidden h-10 items-center gap-2 rounded-full border border-line bg-white px-4 text-xs text-navy-800 transition hover:border-navy-300 md:inline-flex"
            >
              <Icon name="bell" size={14} />
              Crear alerta
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-[9.5rem] max-h-[calc(100vh-10rem)] overflow-y-auto rounded-lg border border-line bg-white no-scrollbar">
            <FilterSidebar
              filters={filters}
              onChange={patch}
              onReset={reset}
              totalResults={results.length}
            />
          </div>
        </aside>

        <div
          className={
            view === "mapa"
              ? "grid gap-6 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
              : ""
          }
        >
          <div>
            {results.length === 0 ? (
              <div className="rounded-lg border border-line bg-white px-6 py-20 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-navy-100 text-navy-700">
                  <Icon name="search" size={22} />
                </span>
                <h3 className="mt-5 font-display text-2xl text-navy-900">
                  No encontramos propiedades con esos filtros
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted">
                  Prueba a ampliar el rango de precio, quitar la zona dibujada en
                  el mapa o buscar en otra comuna.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-navy-700 px-6 text-sm font-medium text-white transition hover:bg-navy-800"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div
                className={
                  view === "mapa"
                    ? "grid gap-5 sm:grid-cols-2 xl:grid-cols-1"
                    : "grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                }
              >
                {results.map((property, index) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    priority={index < 3}
                  />
                ))}
              </div>
            )}
          </div>

          {view === "mapa" ? (
            <div className="h-[32rem] xl:sticky xl:top-[9.5rem] xl:h-[calc(100vh-10rem)]">
              <PropertyMap
                properties={results}
                currency={currency}
                polygon={filters.polygon}
                onPolygonChange={(polygon) => patch({ polygon })}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            </div>
          ) : null}
        </div>
      </div>

      {/* Drawer móvil */}
      {drawerOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Cerrar filtros"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-navy-900/40 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 left-0 flex w-[min(88vw,22rem)] flex-col bg-white shadow-lift-lg">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <p className="font-display text-xl text-navy-900">Filtros</p>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Cerrar"
                className="grid h-9 w-9 place-items-center rounded-full border border-line text-navy-800"
              >
                <Icon name="close" size={16} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <FilterSidebar
                filters={filters}
                onChange={patch}
                onReset={reset}
                totalResults={results.length}
              />
            </div>
            <div className="border-t border-line p-4">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="h-12 w-full rounded-full bg-navy-700 text-sm font-medium text-white"
              >
                Ver {results.length}{" "}
                {results.length === 1 ? "propiedad" : "propiedades"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default PropertySearch;
