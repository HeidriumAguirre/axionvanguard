import { communeByName } from "./data/locations";
import { marketConfig } from "./site";
import type { PropertyCondition } from "./types";

export interface ValuationInput {
  comuna: string;
  barrio: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  condition: PropertyCondition;
  amenities: string[];
}

export interface ValuationResult {
  lowUF: number;
  midUF: number;
  highUF: number;
  lowCLP: number;
  midCLP: number;
  highCLP: number;
  ufPerSqm: number;
  comparables: number;
  factors: { label: string; impact: number }[];
}

const conditionFactor: Record<PropertyCondition, number> = {
  nuevo: 1.08,
  excelente: 1.04,
  bueno: 1,
  a_renovar: 0.82,
  para_entregar: 1.02,
};

const amenityFactor: Record<string, number> = {
  vista_al_mar: 0.14,
  piscina: 0.07,
  terraza: 0.04,
  jardin: 0.05,
  parking: 0.03,
  quincho: 0.03,
  gym: 0.02,
  sum: 0.02,
  ascensor: 0.02,
  seguridad_24_7: 0.02,
  amoblado: 0.05,
  solar: 0.02,
};

const barrioPremium: Record<string, number> = {
  Reñaca: 1.12,
  "Reñaca Alto": 1.06,
  "Las Salinas": 1.08,
  "Los Almendros": 1.1,
  Bellavista: 1.04,
  "Jardín del Mar": 1.06,
  Recreo: 1.02,
  "El Golf": 1.15,
  "Barrio Pueblo": 1.08,
  Manantial: 1.07,
  "Cerro Concepción": 1.06,
  "Cerro Alegre": 1.05,
  Concón: 1.05,
  "Concón Alto": 1.04,
  "Bosques de Montemar": 1.12,
  "Los Pinos": 1.05,
};

export function valueProperty(input: ValuationInput): ValuationResult {
  const commune = communeByName.get(input.comuna);
  const base = commune?.ufPerSqm ?? 40;

  const factors: { label: string; impact: number }[] = [];
  let multiplier = 1;

  const barrioFactor = barrioPremium[input.barrio] ?? 1;
  if (barrioFactor !== 1) {
    multiplier *= barrioFactor;
    factors.push({
      label: `Sector ${input.barrio}`,
      impact: barrioFactor - 1,
    });
  }

  const cond = conditionFactor[input.condition];
  multiplier *= cond;
  factors.push({
    label: "Estado de la propiedad",
    impact: cond - 1,
  });

  for (const amenity of input.amenities) {
    const impact = amenityFactor[amenity];
    if (impact) {
      multiplier *= 1 + impact;
      factors.push({
        label: amenity.replace(/_/g, " "),
        impact,
      });
    }
  }

  // Escalas: menos dormitorios por m² suele indicar mayor calidad.
  if (input.area > 0) {
    const rooms = Math.max(input.bedrooms + input.bathrooms, 1);
    const density = input.area / rooms;
    if (density > 60) {
      multiplier *= 0.96;
      factors.push({ label: "Amplio y de baja densidad", impact: -0.04 });
    } else if (density < 28) {
      multiplier *= 1.04;
      factors.push({ label: "Distribución eficiente", impact: 0.04 });
    }
  }

  const ufPerSqm = base * multiplier;
  const midUF = ufPerSqm * Math.max(input.area, 1);
  const lowUF = midUF * 0.93;
  const highUF = midUF * 1.08;

  const comparables = 8 + Math.round(input.area / 25) + input.bedrooms;

  return {
    lowUF,
    midUF,
    highUF,
    lowCLP: lowUF * marketConfig.ufCLP,
    midCLP: midUF * marketConfig.ufCLP,
    highCLP: highUF * marketConfig.ufCLP,
    ufPerSqm,
    comparables,
    factors: factors
      .sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact))
      .slice(0, 6),
  };
}
