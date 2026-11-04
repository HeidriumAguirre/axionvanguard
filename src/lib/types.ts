export type Operation = "venta" | "arriendo";

export type PropertyType =
  | "casa"
  | "departamento"
  | "penthouse"
  | "terreno"
  | "oficina"
  | "local";

export type PropertyCondition =
  | "nuevo"
  | "excelente"
  | "bueno"
  | "a_renovar"
  | "para_entregar";

export type Amenity =
  | "piscina"
  | "vista_al_mar"
  | "terraza"
  | "balcon"
  | "jardin"
  | "parking"
  | "gimnasio"
  | "sum"
  | "ascensor"
  | "seguridad_24_7"
  | "aire_acondicionado"
  | "calefaccion"
  | "lavado"
  | "quincho"
  | "amoblado"
  | "aire"
  | "solar";

export interface Agent {
  id: string;
  name: string;
  role: string;
  phone: string;
  whatsapp: string;
  email: string;
  avatar: string;
  bio: string;
  closedDeals: number;
  rating: number;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  operation: Operation;
  type: PropertyType;
  condition: PropertyCondition;
  comuna: string;
  barrio: string;
  region: string;
  address: string;
  /** Precio de venta en UF o canon mensual de arriendo en pesos */
  priceUF?: number;
  priceCLP?: number;
  /** Gastos comunes mensuales */
  expensesCLP?: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  /** m² construidos / habitables */
  areaBuilt: number;
  /** m² de terreno o superficie total */
  areaTotal: number;
  lat: number;
  lng: number;
  amenities: Amenity[];
  description: string;
  highlights: string[];
  images: string[];
  agentId: string;
  featured?: boolean;
  isNew?: boolean;
  /** Variación de precio respecto al precio original, en % */
  priceDrop?: number;
  publishedAt: string;
  views: number;
  inquiries: number;
  tour360?: boolean;
  floorPlan?: boolean;
  /** Etiqueta editorial para ficha de proyecto */
  project?: string;
}

export interface Commune {
  name: string;
  region: string;
  lat: number;
  lng: number;
  /** Precio referencial de venta en UF por m² construido */
  ufPerSqm: number;
  neighborhoods: string[];
}

export interface Filters {
  operation: Operation;
  types: PropertyType[];
  comuna: string | null;
  barrio: string | null;
  minUF?: number;
  maxUF?: number;
  bedrooms: number | null;
  bathrooms: number | null;
  minArea?: number;
  maxArea?: number;
  condition: PropertyCondition[];
  amenities: Amenity[];
  sort: SortOption;
  polygon?: [number, number][];
}

export type SortOption =
  | "relevancia"
  | "precio-asc"
  | "precio-desc"
  | "recientes"
  | "superficie-desc";

export type Currency = "CLP" | "UF" | "USD";
