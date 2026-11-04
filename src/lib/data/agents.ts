import type { Agent } from "../types";

export const agents: Agent[] = [
  {
    id: "constanza-araya",
    name: "Constanza Araya",
    role: "Directora comercial · Corredora senior",
    phone: "+56 9 8765 4321",
    whatsapp: "56987654321",
    email: "constanza@axionvanguard.cl",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    bio: "Más de 11 años en corretaje de propiedades de autor en la zona norte de Viña del Mar. Cierra operaciones con compradores internacionales cada semana.",
    closedDeals: 187,
    rating: 4.9,
  },
  {
    id: "matias-ibarra",
    name: "Matías Ibarra",
    role: "Corredor · Especialista en inversión",
    phone: "+56 9 6123 8890",
    whatsapp: "56961238890",
    email: "matias@axionvanguard.cl",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    bio: "Estructura financiera, rentabilidad y due diligence. Especialista en activos de inversión y proyectos de hotelería boutique.",
    closedDeals: 134,
    rating: 4.9,
  },
  {
    id: "fernanda-castro",
    name: "Fernanda Castro",
    role: "Corredora · Arriendos y gestión",
    phone: "+56 9 7745 2210",
    whatsapp: "56977452210",
    email: "fernanda@axionvanguard.cl",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    bio: "Gestión integral de arriendos: selección de arrendatarios, redacción de contratos y cobranza. Respuesta en menos de dos horas.",
    closedDeals: 96,
    rating: 4.8,
  },
  {
    id: "julian-verdugo",
    name: "Julián Verdugo",
    role: "Corredor · Terrenos y proyectos",
    phone: "+56 9 4432 7785",
    whatsapp: "56944327785",
    email: "julian@axionvanguard.cl",
    avatar:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=400&q=80",
    bio: "Terrenos, macrolotes y desarrollo hotelero. Experiencia en zonificación y permisos dentro del plan regulador costero.",
    closedDeals: 78,
    rating: 4.9,
  },
];

export const agentById = new Map(agents.map((a) => [a.id, a]));
