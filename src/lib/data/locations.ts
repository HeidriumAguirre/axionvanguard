import type { Commune } from "../types";

export const communes: Commune[] = [
  {
    name: "Viña del Mar",
    region: "Valparaíso",
    lat: -33.0459,
    lng: -71.6198,
    ufPerSqm: 62,
    neighborhoods: [
      "Reñaca",
      "Reñaca Alto",
      "Las Salinas",
      "Los Almendros",
      "Bellavista",
      "Jardín del Mar",
      "Recreo",
      "Caleta Abarca",
      "Las Torpederas",
      "San Martín",
      "Miramar",
      "Aguada",
      "El Sol",
    ],
  },
  {
    name: "Concón",
    region: "Valparaíso",
    lat: -33.038,
    lng: -71.639,
    ufPerSqm: 48,
    neighborhoods: ["Concón", "Los Oasis", "Concón Alto", "Cochoa"],
  },
  {
    name: "Valparaíso",
    region: "Valparaíso",
    lat: -33.0367,
    lng: -71.627,
    ufPerSqm: 55,
    neighborhoods: [
      "Cerro Alegre",
      "Cerro Concepción",
      "Puerto",
      "Almendral",
      "San Juan",
      "Plan",
    ],
  },
  {
    name: "Quilpué",
    region: "Valparaíso",
    lat: -33.045,
    lng: -71.681,
    ufPerSqm: 32,
    neighborhoods: ["El Kursal", "Los Tribunales", "Vida Alegre", "El Sol"],
  },
  {
    name: "Limache",
    region: "Valparaíso",
    lat: -33.028,
    lng: -71.662,
    ufPerSqm: 30,
    neighborhoods: ["Limache", "La Cruz", "Independencia"],
  },
  {
    name: "Villa Alemana",
    region: "Valparaíso",
    lat: -33.043,
    lng: -71.674,
    ufPerSqm: 33,
    neighborhoods: ["Villa Alemana", "Gran Avenida", "Florida"],
  },
  {
    name: "Las Condes",
    region: "Metropolitana",
    lat: -33.408,
    lng: -70.6,
    ufPerSqm: 112,
    neighborhoods: ["El Golf", "Barrio Pueblo", "Los Alpes", "San Clemente"],
  },
  {
    name: "Vitacura",
    region: "Metropolitana",
    lat: -33.39,
    lng: -70.57,
    ufPerSqm: 104,
    neighborhoods: ["Vitacura", "Manantial", "Bosques de Manantial"],
  },
  {
    name: "Lo Barnechea",
    region: "Metropolitana",
    lat: -33.355,
    lng: -70.529,
    ufPerSqm: 96,
    neighborhoods: ["Lo Barnechea", "La Ciudadela", "Elgly"],
  },
  {
    name: "Providencia",
    region: "Metropolitana",
    lat: -33.434,
    lng: -70.645,
    ufPerSqm: 95,
    neighborhoods: ["Providencia", "Juan de Dios", "El Nogal"],
  },
  {
    name: "Santiago Centro",
    region: "Metropolitana",
    lat: -33.45,
    lng: -70.67,
    ufPerSqm: 72,
    neighborhoods: ["Centro", "Lastarria", "Almex", "Parque Bustamante"],
  },
];

export const communeByName = new Map(communes.map((c) => [c.name, c]));

export const regions = Array.from(new Set(communes.map((c) => c.region)));

/** Zonas de interés predefinidas para el buscador por mapa (Idealista → "zonas"). */
export interface InterestZone {
  id: string;
  name: string;
  subtitle: string;
  polygon: [number, number][];
}

export const interestZones: InterestZone[] = [
  {
    id: "primera-linea-reñaca",
    name: "Primera línea Reñaca",
    subtitle: "Desde la arena hacia el mar",
    polygon: [
      [-32.9946, -71.5985],
      [-32.9946, -71.5605],
      [-33.0235, -71.5605],
      [-33.0235, -71.5985],
    ],
  },
  {
    id: "bosques-montemar",
    name: "Bosques de Montemar",
    subtitle: "Viña del Mar · exclusive",
    polygon: [
      [-33.0145, -71.6265],
      [-33.0145, -71.5905],
      [-33.0405, -71.5905],
      [-33.0405, -71.6265],
    ],
  },
  {
    id: "cerro-porto",
    name: "Cerro Puerto",
    subtitle: "Valparaíso histórico",
    polygon: [
      [-33.0185, -71.6345],
      [-33.0185, -71.6105],
      [-33.0455, -71.6105],
      [-33.0455, -71.6345],
    ],
  },
  {
    id: "condominio-el-golf",
    name: "El Golf",
    subtitle: "Las Condes · Santiago",
    polygon: [
      [-33.4095, -70.6165],
      [-33.4095, -70.5865],
      [-33.4345, -70.5865],
      [-33.4345, -70.6165],
    ],
  },
];
