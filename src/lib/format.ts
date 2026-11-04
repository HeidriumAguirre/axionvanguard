import { marketConfig } from "./site";
import type { Currency, PropertyCondition, PropertyType, Operation, Amenity } from "./types";

const CLP = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

const CLP_PLAIN = new Intl.NumberFormat("es-CL", { maximumFractionDigits: 0 });

export function formatCLP(value: number): string {
  return CLP.format(Math.round(value)).replace("CLP", "$").replace(/\s/g, " ");
}

export function formatNumber(value: number): string {
  return CLP_PLAIN.format(Math.round(value));
}

export function formatUF(value: number): string {
  return `UF ${CLP_PLAIN.format(value)}`;
}

export function formatUSD(value: number): string {
  return `US$ ${CLP_PLAIN.format(Math.round(value))}`;
}

/** Convierte un valor en CLP a la moneda elegida. */
export function fromCLP(valueCLP: number, currency: Currency): number {
  switch (currency) {
    case "UF":
      return valueCLP / marketConfig.ufCLP;
    case "USD":
      return valueCLP / marketConfig.usdCLP;
    default:
      return valueCLP;
  }
}

/** Formatea un precio en CLP según la moneda activa. */
export function formatPrice(valueCLP: number, currency: Currency): string {
  switch (currency) {
    case "UF":
      return formatUF(fromCLP(valueCLP, "UF"));
    case "USD":
      return formatUSD(fromCLP(valueCLP, "USD"));
    default:
      return formatCLP(valueCLP);
  }
}

export const CURRENCY_SYMBOL: Record<Currency, string> = {
  CLP: "$",
  UF: "UF",
  USD: "US$",
};

export const operationLabels: Record<Operation, string> = {
  venta: "Venta",
  arriendo: "Arriendo",
};

export const propertyTypeLabels: Record<PropertyType, string> = {
  casa: "Casa",
  departamento: "Departamento",
  penthouse: "Penthouse",
  terreno: "Terreno",
  oficina: "Oficina",
  local: "Local comercial",
};

export const conditionLabels: Record<PropertyCondition, string> = {
  nuevo: "A estrenar",
  excelente: "Excelente estado",
  bueno: "Buen estado",
  a_renovar: "A reformar",
  para_entregar: "Para entregar",
};

export const amenityLabels: Record<Amenity, string> = {
  piscina: "Piscina",
  vista_al_mar: "Vista al mar",
  terraza: "Terraza",
  balcon: "Balcón",
  jardin: "Jardín",
  parking: "Estacionamiento",
  gimnasio: "Gimnasio",
  sum: "Salón de usos múltiples",
  ascensor: "Ascensor",
  seguridad_24_7: "Seguridad 24/7",
  aire_acondicionado: "Aire acondicionado",
  calefaccion: "Calefacción",
  lavado: "Lavandería",
  quincho: "Quincho",
  amoblado: "Amoblado",
  aire: "Bodega de aire",
  solar: "Placas solares",
};

export const amenityIcons: Record<Amenity, string> = {
  piscina: "M2 15c2 0 4-1.6 4-3.5S4 8 2 8s-4 1.6-4 3.5S0 15 2 15z",
  vista_al_mar: "M2 12c2.5-3 5.5-3 8 0s5.5 3 8 0",
  terraza: "M3 15V9m0 0h14v6M3 9l2-4h10l2 4",
  balcon: "M2 14h16M4 14V8h8v6",
  jardin: "M8 14v-4m0 0c-2 0-3-1.5-3-3s1.5-2 3-1 3 2 3 4m0 0c2 0 3-1.5 3-3s-1.5-2-3-1",
  parking: "M4 15V5h4l4 6H8v4",
  gimnasio: "M2 10h2m10 0h2M5 8v4m8-4v4",
  sum: "M3 9h14M3 12h14M7 6v9",
  ascensor: "M6 3h8v14H6zM10 6l-2 2h4z",
  seguridad_24_7: "M8 14s5-2.5 5-6V4L8 2 3 4v4c0 3.5 5 6 5 6z",
  aire_acondicionado: "M4 6h12v5H4zM6 14h2m2 0h2m2 0h2",
  calefaccion: "M8 2v14M5 6l3-4 3 4M5 10l3-4 3 4",
  lavado: "M4 4h12v12H4zM4 7h12M7 4v3",
  quincho: "M3 14h14M5 14v-4h10v4M3 10h14L10 5z",
  amoblado: "M3 13V7h14v6M3 7V5h14v2M5 10h2m3 0h2m3 0h2",
  aire: "M4 13h12v3H4zM6 13V6h8v7",
  solar: "M4 14h12l-2-8H6zM9 3v2m4-2v2M8 8h4",
};

export function formatSurface(value: number): string {
  return `${CLP_PLAIN.format(value)} m²`;
}

/** Fecha relativa en español, para "publicado hace X". */
export function timeSince(iso: string): string {
  const days = Math.round(
    (Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24),
  );
  if (days <= 0) return "hoy";
  if (days === 1) return "ayer";
  if (days < 7) return `hace ${days} días`;
  if (days < 31) return `hace ${Math.floor(days / 7)} semana(s)`;
  return `hace ${Math.floor(days / 30)} mes(es)`;
}

export function whatsappLink(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
