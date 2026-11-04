import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PropertyGallery } from "@/components/properties/PropertyGallery";
import { PropertyPriceCard } from "@/components/properties/PropertyPriceCard";
import { PropertyActions } from "@/components/properties/PropertyActions";
import { MortgageCalculator } from "@/components/properties/MortgageCalculator";
import { LocationMapClient } from "@/components/properties/LocationMap";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { agentById } from "@/lib/data/agents";
import { properties, propertyBySlug } from "@/lib/data/properties";
import {
  amenityLabels,
  conditionLabels,
  formatNumber,
  operationLabels,
  propertyTypeLabels,
} from "@/lib/format";
import { marketConfig } from "@/lib/site";

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/propiedades/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const property = propertyBySlug.get(slug);
  if (!property) return { title: "Propiedad no encontrada" };

  const price =
    property.operation === "venta"
      ? `UF ${property.priceUF?.toLocaleString("es-CL")}`
      : `$${property.priceCLP?.toLocaleString("es-CL")} al mes`;

  return {
    title: `${property.title} · ${property.barrio}, ${property.comuna}`,
    description: `${property.tagline} ${property.bedrooms} dormitorios, ${property.bathrooms} baños, ${property.areaBuilt || property.areaTotal} m². ${price}.`,
    openGraph: {
      images: [property.images[0]],
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: PageProps<"/propiedades/[slug]">) {
  const { slug } = await params;
  const property = propertyBySlug.get(slug);
  if (!property) notFound();

  const agent = agentById.get(property.agentId);
  const priceCLP =
    property.operation === "venta"
      ? (property.priceUF ?? 0) * marketConfig.ufCLP
      : (property.priceCLP ?? 0);

  const similares = properties
    .filter(
      (p) =>
        p.id !== property.id &&
        (p.comuna === property.comuna ||
          p.type === property.type ||
          p.operation === property.operation),
    )
    .slice(0, 3);

  const specs = [
    { icon: "bed", label: "Dormitorios", value: property.bedrooms },
    { icon: "bath", label: "Baños", value: property.bathrooms },
    { icon: "car", label: "Estacionamientos", value: property.parking },
    {
      icon: "ruler",
      label: property.areaBuilt > 0 ? "M² construidos" : "M² totales",
      value: property.areaBuilt > 0 ? property.areaBuilt : property.areaTotal,
    },
  ] as const;

  return (
    <article>
      {/* Encabezado */}
      <div className="border-b border-line bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 sm:py-10">
          <nav className="flex flex-wrap items-center gap-2 text-xs text-muted">
            <Link href="/" className="transition hover:text-navy-700">
              Inicio
            </Link>
            <Icon name="chevronRight" size={12} />
            <Link
              href="/propiedades"
              className="transition hover:text-navy-700"
            >
              Propiedades
            </Link>
            <Icon name="chevronRight" size={12} />
            <Link
              href={`/propiedades?comuna=${encodeURIComponent(property.comuna)}`}
              className="transition hover:text-navy-700"
            >
              {property.comuna}
            </Link>
          </nav>

          <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="navy">
                  {operationLabels[property.operation]} ·{" "}
                  {propertyTypeLabels[property.type]}
                </Badge>
                <Badge tone="paper">{conditionLabels[property.condition]}</Badge>
                {property.isNew ? <Badge tone="gold">Nuevo</Badge> : null}
              </div>
              <h1 className="mt-4 font-display text-4xl leading-tight text-navy-900 sm:text-5xl">
                {property.title}
              </h1>
              <p className="mt-3 flex items-center gap-2 text-sm text-muted">
                <Icon name="pin" size={15} />
                {property.address}
              </p>
              <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-muted">
                {property.tagline}
              </p>
            </div>

            <div className="w-full max-w-md">
              <PropertyActions property={property} priceCLP={priceCLP} />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 sm:py-14">
        <PropertyGallery
          images={property.images}
          title={property.title}
          badges={[
            ...(property.isNew
              ? [{ label: "Nuevo", tone: "gold" as const }]
              : []),
            { label: property.comuna, tone: "dark" as const },
          ]}
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0">
            {/* Specs */}
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4">
              {specs.map((spec) => (
                <div key={spec.label} className="bg-white p-5">
                  <Icon name={spec.icon} size={18} className="text-navy-300" />
                  <p className="mt-3 font-display text-2xl text-navy-900">
                    {formatNumber(spec.value)}
                  </p>
                  <p className="mt-0.5 text-xs uppercase tracking-[0.1em] text-muted">
                    {spec.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Descripción */}
            <section className="mt-12">
              <h2 className="font-display text-3xl text-navy-900">
                Sobre la propiedad
              </h2>
              <p className="mt-4 max-w-3xl text-[0.9375rem] leading-relaxed text-muted">
                {property.description}
              </p>
            </section>

            {/* Puntos destacados */}
            {property.highlights.length > 0 ? (
              <section className="mt-10">
                <h2 className="font-display text-3xl text-navy-900">
                  Puntos destacados
                </h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {property.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-3 rounded-lg border border-line bg-white p-4 text-sm text-navy-800"
                    >
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-200 text-gold-600">
                        <Icon name="check" size={12} />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {/* Características */}
            {property.amenities.length > 0 ? (
              <section className="mt-10">
                <h2 className="font-display text-3xl text-navy-900">
                  Características y amenities
                </h2>
                <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
                  {property.amenities.map((a) => (
                    <li
                      key={a}
                      className="flex items-center gap-2.5 text-sm text-navy-800"
                    >
                      <Icon name="check" size={14} className="text-gold-500" />
                      {amenityLabels[a]}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {/* Mapa */}
            <section className="mt-12">
              <h2 className="font-display text-3xl text-navy-900">Ubicación</h2>
              <p className="mt-2 text-sm text-muted">
                {property.barrio}, {property.comuna} · {property.region}
              </p>
              <div className="mt-5">
                <LocationMapClient
                  lat={property.lat}
                  lng={property.lng}
                  label={property.address}
                />
              </div>
            </section>

            {/* Calculadora */}
            <section className="mt-12">
              <MortgageCalculator priceCLP={priceCLP} />
            </section>
          </div>

          {/* Columna lateral */}
          <aside className="lg:sticky lg:top-[9.5rem] lg:h-fit lg:space-y-5">
            <PropertyPriceCard property={property} />

            {agent ? (
              <div className="rounded-lg border border-line bg-white p-6">
                <p className="eyebrow text-muted">Corredor responsable</p>
                <div className="mt-4 flex items-center gap-4">
                  <Image
                    src={agent.avatar}
                    alt={agent.name}
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-display text-xl text-navy-900">
                      {agent.name}
                    </p>
                    <p className="text-xs uppercase tracking-[0.1em] text-gold-600">
                      {agent.role}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {agent.bio}
                </p>
                <div className="mt-5 space-y-2 text-sm">
                  <a
                    href={`tel:${agent.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-2 text-navy-800 transition hover:text-navy-600"
                  >
                    <Icon name="phone" size={15} />
                    {agent.phone}
                  </a>
                  <a
                    href={`mailto:${agent.email}`}
                    className="flex items-center gap-2 text-navy-800 transition hover:text-navy-600"
                  >
                    <Icon name="mail" size={15} />
                    {agent.email}
                  </a>
                </div>
                <div className="mt-5 flex items-center gap-4 border-t border-line pt-4 text-xs text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="star" size={13} className="text-gold-500" />
                    {agent.rating.toFixed(1)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="key" size={13} />
                    {agent.closedDeals} operaciones cerradas
                  </span>
                </div>
              </div>
            ) : null}

            <div className="rounded-lg bg-navy-900 p-6 text-white">
              <p className="eyebrow text-gold-400">¿Quieres vender?</p>
              <p className="mt-3 font-display text-2xl leading-snug">
                Valora tu propiedad sin costo
              </p>
              <p className="mt-2 text-sm text-white/65">
                Te entregamos un rango de valor de mercado con comparables reales
                de tu comuna, en menos de 48 horas.
              </p>
              <Link
                href="/valoracion"
                className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-gold-500 text-sm font-medium text-navy-900 transition hover:bg-gold-400"
              >
                Solicitar tasación
                <Icon name="arrowRight" size={16} />
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* Similares */}
      {similares.length > 0 ? (
        <section className="border-t border-line bg-white">
          <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-20">
            <div className="flex items-end justify-between gap-6">
              <h2 className="font-display text-3xl text-navy-900">
                Propiedades similares
              </h2>
              <Link
                href={`/propiedades?comuna=${encodeURIComponent(property.comuna)}`}
                className="inline-flex items-center gap-2 text-sm text-navy-700 transition hover:text-navy-500"
              >
                Ver todo en {property.comuna}
                <Icon name="arrowRight" size={16} />
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similares.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}
