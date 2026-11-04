"use client";

import Image from "next/image";
import Link from "next/link";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { useFavorites } from "@/components/providers/FavoritesProvider";
import {
  formatCLP,
  formatNumber,
  formatPrice,
  formatUF,
  operationLabels,
  propertyTypeLabels,
} from "@/lib/format";
import { marketConfig } from "@/lib/site";
import type { Property } from "@/lib/types";
import { Icon } from "./Icon";

function priceInCLP(p: Property) {
  if (p.operation === "venta") return (p.priceUF ?? 0) * marketConfig.ufCLP;
  return p.priceCLP ?? 0;
}

export function PropertyCard({
  property,
  priority = false,
  compact = false,
}: {
  property: Property;
  priority?: boolean;
  compact?: boolean;
}) {
  const { currency } = useCurrency();
  const { isFavorite, toggleFavorite } = useFavorites();

  const priceCLP = priceInCLP(property);
  const perSqm =
    property.areaBuilt > 0 ? (property.priceUF ?? 0) / property.areaBuilt : null;
  const active = isFavorite(property.id);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white transition-shadow duration-300 hover:shadow-lift-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-paper-deep">
        <Link
          href={`/propiedades/${property.slug}`}
          className="absolute inset-0 z-10"
          aria-label={`Ver ${property.title}`}
        />
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        />

        <div className="absolute left-3 top-3 z-20 flex flex-wrap gap-1.5">
          {property.isNew ? (
            <span className="rounded-full bg-gold-500 px-2.5 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-navy-900">
              Nuevo
            </span>
          ) : null}
          {property.featured ? (
            <span className="rounded-full bg-navy-900/85 px-2.5 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-white backdrop-blur-sm">
              Destacado
            </span>
          ) : null}
          {property.priceDrop ? (
            <span className="rounded-full bg-emerald-700 px-2.5 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-white">
              -{property.priceDrop}%
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => toggleFavorite(property.id)}
          aria-pressed={active}
          aria-label={
            active
              ? `Quitar ${property.title} de favoritos`
              : `Guardar ${property.title} en favoritos`
          }
          className="absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-navy-700 shadow-sm transition hover:bg-white hover:text-gold-600"
        >
          <Icon name="heart" size={16} />
        </button>

        {property.images.length > 1 ? (
          <span className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-1 rounded-full bg-navy-900/75 px-2.5 py-1 text-[0.6875rem] text-white backdrop-blur-sm">
            <Icon name="camera" size={12} />
            {property.images.length}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="eyebrow text-navy-600">
            {operationLabels[property.operation]} ·{" "}
            {propertyTypeLabels[property.type]}
          </p>
          {property.tour360 ? (
            <span
              className="flex items-center gap-1 text-[0.6875rem] text-gold-600"
              title="Tour virtual disponible"
            >
              <Icon name="play" size={12} />
              360°
            </span>
          ) : null}
        </div>

        <p className="mt-1.5 font-display text-[1.6rem] leading-none text-navy-900">
          {formatPrice(priceCLP, currency)}
          {property.operation === "arriendo" ? (
            <span className="ml-1 text-sm font-normal text-muted">/ mes</span>
          ) : null}
        </p>

        {/* Gastos comunes en línea separada, con su propia moneda (patrón Zonaprop) */}
        {property.expensesCLP ? (
          <p className="mt-1 text-[0.8125rem] text-muted">
            Gastos comunes{" "}
            <span className="font-medium text-navy-800">
              {formatCLP(property.expensesCLP)}
            </span>
            <span className="text-muted"> / mes</span>
          </p>
        ) : (
          <p className="mt-1 text-[0.8125rem] text-muted">
            Sin gastos comunes
          </p>
        )}

        {perSqm && property.operation === "venta" ? (
          <p className="mt-0.5 text-[0.8125rem] text-muted">
            {currency === "UF"
              ? `${formatUF(perSqm)}/m²`
              : currency === "USD"
                ? `US$ ${formatNumber(perSqm / marketConfig.ufCLP * marketConfig.usdCLP)}/m²`
                : `$${formatNumber((perSqm * marketConfig.ufCLP) / property.areaBuilt)}/m²`}
          </p>
        ) : null}

        <h3 className="mt-4 font-display text-xl leading-snug text-navy-900">
          <Link
            href={`/propiedades/${property.slug}`}
            className="transition-colors hover:text-navy-600"
          >
            {property.title}
          </Link>
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-[0.8125rem] text-muted">
          <Icon name="pin" size={13} />
          {property.barrio}, {property.comuna}
        </p>

        {/* Spec string de una línea: escaneo rápido sin abrir la ficha */}
        {!compact ? (
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line pt-3 text-[0.8125rem] text-navy-800">
            {property.areaBuilt > 0 ? (
              <span className="inline-flex items-center gap-1">
                <Icon name="ruler" size={13} />
                {formatNumber(property.areaBuilt)} m²
              </span>
            ) : (
              <span className="inline-flex items-center gap-1">
                <Icon name="ruler" size={13} />
                {formatNumber(property.areaTotal)} m²
              </span>
            )}
            {property.bedrooms > 0 ? (
              <span className="inline-flex items-center gap-1">
                <Icon name="bed" size={13} />
                {property.bedrooms} dorm.
              </span>
            ) : null}
            {property.bathrooms > 0 ? (
              <span className="inline-flex items-center gap-1">
                <Icon name="bath" size={13} />
                {property.bathrooms} baños
              </span>
            ) : null}
            {property.parking > 0 ? (
              <span className="inline-flex items-center gap-1">
                <Icon name="car" size={13} />
                {property.parking}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default PropertyCard;
