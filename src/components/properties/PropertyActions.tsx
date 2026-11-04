"use client";

import { useFavorites } from "@/components/providers/FavoritesProvider";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { Icon } from "@/components/ui/Icon";
import { formatPrice, whatsappLink } from "@/lib/format";
import type { Property } from "@/lib/types";

export function PropertyActions({
  property,
  priceCLP,
}: {
  property: Property;
  priceCLP: number;
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { currency } = useCurrency();
  const active = isFavorite(property.id);

  const message =
    property.operation === "venta"
      ? `Hola, me interesa la propiedad "${property.title}" (${property.comuna}). ¿Podemos agendar una visita?`
      : `Hola, me interesa arrendar "${property.title}" (${property.comuna}). ¿Qué disponibilidad tienen?`;

  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={whatsappLink("56987654321", message)}
        target="_blank"
        rel="noreferrer noopener"
        className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[var(--whatsapp)] px-6 text-sm font-medium text-navy-900 transition hover:brightness-95"
      >
        <Icon name="whatsapp" size={18} />
        Contactar agente
      </a>
      <a
        href={`tel:+56987654321`}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-navy-700 px-5 text-sm font-medium text-navy-700 transition hover:bg-navy-700 hover:text-white"
      >
        <Icon name="phone" size={16} />
        Llamar
      </a>
      <button
        type="button"
        onClick={() => toggleFavorite(property.id)}
        aria-pressed={active}
        className={`grid h-12 w-12 place-items-center rounded-full border transition ${
          active
            ? "border-gold-500 bg-gold-200 text-gold-600"
            : "border-line text-navy-700 hover:border-navy-300"
        }`}
        aria-label={active ? "Quitar de favoritos" : "Guardar en favoritos"}
      >
        <Icon name="heart" size={18} />
      </button>
      <button
        type="button"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line px-5 text-sm text-navy-800 transition hover:border-navy-300"
      >
        <Icon name="download" size={16} />
        Ficha PDF
      </button>
      <span className="sr-only">
        Precio de referencia: {formatPrice(priceCLP, currency)}
      </span>
    </div>
  );
}

export default PropertyActions;
