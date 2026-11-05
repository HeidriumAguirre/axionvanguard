import Image from "next/image";
import Link from "next/link";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { featuredProperties, properties } from "@/lib/data/properties";
import { formatUF } from "@/lib/format";

export function FeaturedGrid() {
  const hero = featuredProperties[0];
  const secondary = featuredProperties.slice(1, 3);
  const rest = properties.filter((p) => p.featured).slice(3, 7);

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading
        eyebrow="Portafolio seleccionado"
        title={
          <>
            Propiedades que no se
            <span className="italic text-navy-600"> homogenizan</span>
          </>
        }
        description="Una selección de homes con criterio: ubicación, proporción, luz y terminaciones. Publicamos pocas propiedades, pero las publicamos bien."
        action={
          <ButtonLink href="/propiedades" variant="secondary" icon="arrowRight">
            Ver todo el portafolio
          </ButtonLink>
        }
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-12">
        <article className="group flex flex-col overflow-hidden rounded-lg border border-line bg-white lg:col-span-7">
          <Link
            href={`/propiedades/${hero.slug}`}
            className="flex flex-1 flex-col"
            aria-label={`Ver ${hero.title}`}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-navy-800 sm:aspect-[16/11] lg:aspect-auto lg:min-h-[20rem] lg:flex-1">
              <Image
                src={hero.images[0]}
                alt={hero.title}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                <Badge tone="gold">Editorial</Badge>
              </div>
            </div>
          </Link>

          <div className="p-5 sm:p-8">
            <p className="eyebrow text-navy-600">
              {hero.barrio}, {hero.comuna}
            </p>
            <h3 className="mt-2 font-display text-[1.75rem] leading-tight text-navy-900 sm:mt-3 sm:text-4xl">
              <Link
                href={`/propiedades/${hero.slug}`}
                className="transition-colors hover:text-navy-600"
              >
                {hero.title}
              </Link>
            </h3>
            <p className="mt-2 max-w-xl text-[0.8125rem] leading-relaxed text-muted sm:text-sm">
              {hero.tagline}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.8125rem] text-navy-800 sm:text-sm">
              <span className="font-display text-xl text-navy-900">
                {formatUF(hero.priceUF ?? 0)}
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="ruler" size={14} className="text-navy-600" />
                {hero.areaTotal.toLocaleString("es-CL")} m² de terreno
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="bed" size={14} className="text-navy-600" />
                {hero.bedrooms} dormitorios
              </span>
            </div>
          </div>
        </article>

        <div className="grid gap-6 lg:col-span-5">
          {secondary.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>

      {rest.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((property) => (
            <PropertyCard key={property.id} property={property} compact />
          ))}
        </div>
      ) : null}
    </section>
  );
}

export default FeaturedGrid;
