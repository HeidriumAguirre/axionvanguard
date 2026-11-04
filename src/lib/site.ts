export const siteConfig = {
  name: "Axion Vanguard",
  legalName: "Axion Vanguard SpA",
  tagline: "Propiedades de autor en la costa y la ciudad",
  description:
    "Corredora inmobiliaria en Viña del Mar, Reñaca, Concón y Santiago. Venta, arriendo, tasación y gestión de propiedades de autor con asesoría boutique.",
  url: "https://axionvanguard.cl",
  phone: "+56 9 8765 4321",
  phoneHref: "+56987654321",
  whatsapp: "56987654321",
  email: "hola@axionvanguard.cl",
  address: "Av. Libertad 1355, Of. 802, Viña del Mar, Valparaíso",
  addressShort: "Viña del Mar · Santiago",
  instagram: "https://www.instagram.com/axion.vanguard/",
  linkedin: "https://www.linkedin.com/",
  hours: "Lunes a viernes 09:00 – 19:00 · Sábado 10:00 – 14:00",
} as const;

/** Valores de referencia del mercado. Ajustar con la UF y el dólar del día en producción. */
export const marketConfig = {
  ufCLP: 39_850,
  usdCLP: 935,
  /** Tasa referencial de crédito hipotecario (anual, %) */
  mortgageRate: 5.4,
} as const;

export const navLinks = [
  { href: "/propiedades", label: "Propiedades" },
  { href: "/servicios", label: "Servicios" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/valoracion", label: "Tasación" },
  { href: "/contacto", label: "Contacto" },
] as const;
