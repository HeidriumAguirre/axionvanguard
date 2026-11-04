"use client";

import { useCurrency } from "@/components/providers/CurrencyProvider";
import {
  formatCLP,
  formatNumber,
  formatPrice,
  formatUF,
} from "@/lib/format";
import { marketConfig } from "@/lib/site";
import type { Property } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";

export function PropertyPriceCard({ property }: { property: Property }) {
  const { currency } = useCurrency();
  const priceCLP =
    property.operation === "venta"
      ? (property.priceUF ?? 0) * marketConfig.ufCLP
      : (property.priceCLP ?? 0);

  const area = property.areaBuilt > 0 ? property.areaBuilt : property.areaTotal;
  const perSqmCLP = area > 0 ? priceCLP / area : 0;

  return (
    <div className="rounded-lg border border-line bg-white p-6">
      <p className="eyebrow text-muted">
        {property.operation === "venta" ? "Valor de venta" : "Canon de arriendo"}
      </p>
      <p className="mt-2 font-display text-4xl leading-none text-navy-900">
        {formatPrice(priceCLP, currency)}
      </p>
      {property.operation === "arriendo" ? (
        <p className="mt-1 text-sm text-muted">por mes</p>
      ) : null}

      <dl className="mt-6 divide-y divide-line border-t border-line text-sm">
        <div className="flex items-center justify-between py-3">
          <dt className="text-muted">Gastos comunes</dt>
          <dd className="font-medium text-navy-900">
            {property.expensesCLP
              ? `${formatCLP(property.expensesCLP)} / mes`
              : "No aplica"}
          </dd>
        </div>
        {area > 0 ? (
          <div className="flex items-center justify-between py-3">
            <dt className="text-muted">Valor por m²</dt>
            <dd className="font-medium text-navy-900">
              {currency === "UF"
                ? `${formatUF((property.priceUF ?? 0) / area)}/m²`
                : currency === "USD"
                  ? `US$ ${formatNumber(perSqmCLP / marketConfig.usdCLP)}/m²`
                  : `${formatCLP(perSqmCLP)}/m²`}
            </dd>
          </div>
        ) : null}
        <div className="flex items-center justify-between py-3">
          <dt className="text-muted">Superficie</dt>
          <dd className="font-medium text-navy-900">
            {property.areaBuilt > 0
              ? `${formatNumber(property.areaBuilt)} m² construidos`
              : `${formatNumber(property.areaTotal)} m² de terreno`}
          </dd>
        </div>
        <div className="flex items-center justify-between py-3">
          <dt className="text-muted">Fecha de publicación</dt>
          <dd className="font-medium text-navy-900">
            {new Date(property.publishedAt).toLocaleDateString("es-CL", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </dd>
        </div>
      </dl>

      <div className="mt-5 flex items-center gap-4 border-t border-line pt-4 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <Icon name="eye" size={13} />
          {property.views.toLocaleString("es-CL")} visitas
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Icon name="calendar" size={13} />
          {property.inquiries} consultas
        </span>
      </div>
    </div>
  );
}

export default PropertyPriceCard;
