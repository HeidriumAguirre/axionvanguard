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
        <article className="group relative overflow-hidden rounded-lg lg:col-span-7">
          <Link
            href={`/propiedades/${hero.slug}`}
            className="block"
            aria-label={`Ver ${hero.title}`}
          >
            <div className="relative aspect-[16/11] overflow-hidden bg-paper-deep">
              <Image
                src={hero.images[0]}
                alt={hero.title}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-navy-900/20 to-transparent" />
            </div>
          </Link>
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="gold">Editorial</Badge>
              <Badge tone="dark">
                {hero.barrio}, {hero.comuna}
              </Badge>
            </div>
            <h3 className="mt-4 font-display text-3xl leading-tight text-white sm:text-4xl">
              <Link href={`/propiedades/${hero.slug}`} className="hover:text-gold-400">
                {hero.title}
              </Link>
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">
              {hero.tagline}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/80">
              <span className="font-display text-xl text-gold-400">
                {formatUF(hero.priceUF ?? 0)}
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="ruler" size={14} />
                {hero.areaTotal.toLocaleString("es-CL")} m² de terreno
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="bed" size={14} />
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
