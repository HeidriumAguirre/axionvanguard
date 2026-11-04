import type {
  Amenity,
  Filters,
  Operation,
  Property,
  PropertyCondition,
  PropertyType,
  SortOption,
} from "./types";
import { marketConfig } from "./site";

export const defaultFilters = (): Filters => ({
  operation: "venta",
  types: [],
  comuna: null,
  barrio: null,
  minUF: undefined,
  maxUF: undefined,
  bedrooms: null,
  bathrooms: null,
  minArea: undefined,
  maxArea: undefined,
  condition: [],
  amenities: [],
  sort: "relevancia",
});

/** Precio de referencia de una propiedad en la moneda del filtro. */
export function filterPrice(p: Property): number {
  return p.operation === "venta" ? (p.priceUF ?? 0) : (p.priceCLP ?? 0);
}

export function priceUnitFor(operation: Operation): "UF" | "CLP" {
  return operation === "venta" ? "UF" : "CLP";
}

export function applyFilters(list: Property[], filters: Filters): Property[] {
  const result = list.filter((p) => {
    if (p.operation !== filters.operation) return false;
    if (filters.types.length && !filters.types.includes(p.type)) return false;
    if (filters.comuna && p.comuna !== filters.comuna) return false;
    if (filters.barrio && p.barrio !== filters.barrio) return false;
    if (filters.bedrooms !== null && p.bedrooms < filters.bedrooms) return false;
    if (filters.bathrooms !== null && p.bathrooms < filters.bathrooms) return false;

    const price = filterPrice(p);
    if (filters.minUF !== undefined && price < filters.minUF) return false;
    if (filters.maxUF !== undefined && price > filters.maxUF) return false;

    const area = p.areaBuilt > 0 ? p.areaBuilt : p.areaTotal;
    if (filters.minArea !== undefined && area < filters.minArea) return false;
    if (filters.maxArea !== undefined && area > filters.maxArea) return false;

    if (filters.condition.length && !filters.condition.includes(p.condition))
      return false;

    if (
      filters.amenities.length &&
      !filters.amenities.every((a) => p.amenities.includes(a))
    )
      return false;

    if (filters.polygon && filters.polygon.length >= 3) {
      if (!pointInPolygon(p.lat, p.lng, filters.polygon)) return false;
    }

    return true;
  });

  return sortProperties(result, filters.sort);
}

export function sortProperties(list: Property[], sort: SortOption): Property[] {
  const copy = [...list];
  switch (sort) {
    case "precio-asc":
      return copy.sort((a, b) => filterPrice(a) - filterPrice(b));
    case "precio-desc":
      return copy.sort((a, b) => filterPrice(b) - filterPrice(a));
    case "recientes":
      return copy.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      );
    case "superficie-desc":
      return copy.sort(
        (a, b) =>
          (b.areaBuilt || b.areaTotal) - (a.areaBuilt || a.areaTotal),
      );
    default:
      return copy.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return b.views - a.views;
      });
  }
}

/** Ray casting: determina si un punto está dentro de un polígono. */
export function pointInPolygon(
  lat: number,
  lng: number,
  polygon: [number, number][],
): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [yi, xi] = polygon[i];
    const [yj, xj] = polygon[j];
    const intersects =
      yi > lat !== yj > lat &&
      lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
    if (intersects) inside = !inside;
  }
  return inside;
}

export function countActiveFilters(f: Filters): number {
  let n = 0;
  if (f.types.length) n += f.types.length;
  if (f.comuna) n += 1;
  if (f.barrio) n += 1;
  if (f.minUF !== undefined) n += 1;
  if (f.maxUF !== undefined) n += 1;
  if (f.bedrooms !== null) n += 1;
  if (f.bathrooms !== null) n += 1;
  if (f.minArea !== undefined) n += 1;
  if (f.maxArea !== undefined) n += 1;
  if (f.condition.length) n += f.condition.length;
  if (f.amenities.length) n += f.amenities.length;
  if (f.polygon && f.polygon.length >= 3) n += 1;
  return n;
}

export function filtersToQuery(f: Filters, extra?: Record<string, string>) {
  const params = new URLSearchParams();
  if (f.operation !== "venta") params.set("operacion", f.operation);
  if (f.types.length) params.set("tipo", f.types.join(","));
  if (f.comuna) params.set("comuna", f.comuna);
  if (f.barrio) params.set("barrio", f.barrio);
  if (f.minUF !== undefined) params.set("precioMin", String(f.minUF));
  if (f.maxUF !== undefined) params.set("precioMax", String(f.maxUF));
  if (f.bedrooms !== null) params.set("dorm", String(f.bedrooms));
  if (f.bathrooms !== null) params.set("banos", String(f.bathrooms));
  if (f.minArea !== undefined) params.set("supMin", String(f.minArea));
  if (f.maxArea !== undefined) params.set("supMax", String(f.maxArea));
  if (f.condition.length) params.set("estado", f.condition.join(","));
  if (f.amenities.length) params.set("caracteristicas", f.amenities.join(","));
  if (f.sort !== "relevancia") params.set("orden", f.sort);
  if (extra) {
    for (const [k, v] of Object.entries(extra)) params.set(k, v);
  }
  return params;
}

export function queryToFilters(
  params: Record<string, string | string[] | undefined>,
): Filters {
  const get = (key: string) => {
    const value = params[key];
    return Array.isArray(value) ? value[0] : value;
  };
  const list = (key: string) =>
    (get(key) ?? "")
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);

  const num = (key: string) => {
    const raw = get(key);
    if (raw === undefined || raw === "") return undefined;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : undefined;
  };

  const operation = get("operacion") === "arriendo" ? "arriendo" : "venta";
  const types = list("tipo").filter((t): t is PropertyType =>
    ["casa", "departamento", "penthouse", "terreno", "oficina", "local"].includes(
      t,
    ),
  );
  const condition = list("estado").filter((c): c is PropertyCondition =>
    ["nuevo", "excelente", "bueno", "a_renovar", "para_entregar"].includes(c),
  );
  const amenities = list("caracteristicas").filter((a): a is Amenity =>
    [
      "piscina",
      "vista_al_mar",
      "terraza",
      "balcon",
      "jardin",
      "parking",
      "gimnasio",
      "sum",
      "ascensor",
      "seguridad_24_7",
      "aire_acondicionado",
      "calefaccion",
      "lavado",
      "quincho",
      "amoblado",
      "aire",
      "solar",
    ].includes(a),
  );

  const dorm = num("dorm");
  const banos = num("banos");

  return {
    operation,
    types,
    comuna: get("comuna") ?? null,
    barrio: get("barrio") ?? null,
    minUF: num("precioMin"),
    maxUF: num("precioMax"),
    bedrooms: dorm === undefined ? null : dorm,
    bathrooms: banos === undefined ? null : banos,
    minArea: num("supMin"),
    maxArea: num("supMax"),
    condition,
    amenities,
    sort: (get("orden") as SortOption) ?? "relevancia",
  };
}

/** Convierte un precio en UF a CLP. */
export function ufToCLP(uf: number): number {
  return uf * marketConfig.ufCLP;
}
