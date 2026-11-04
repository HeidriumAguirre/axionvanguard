import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { FeaturedGrid } from "@/components/home/FeaturedGrid";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { Process, ZonesGrid } from "@/components/home/Process";
import { ValuationCta, Faq } from "@/components/home/ValuationCta";
import { Team, Testimonials } from "@/components/home/Team";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { properties } from "@/lib/data/properties";

export const metadata: Metadata = {
  title: "Axion Vanguard — Corredora de propiedades en Viña del Mar y Santiago",
  description:
    "Venta, arriendo y tasación de propiedades de autor en Reñaca, Concón, Valparaíso y Santiago. Asesoría boutique con fotografía de arquitectura y revisión de cada comparable.",
};

export default function HomePage() {
  const recientes = [...properties]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, 4);

  return (
    <>
      <Hero />
      <FeaturedGrid />
      <ServicesGrid />
      <Process />
      <ZonesGrid />

      <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading
          eyebrow="Recién publicadas"
          title="Lo último que subió al portafolio"
          action={
            <ButtonLink
              href="/propiedades?orden=recientes"
              variant="secondary"
              icon="arrowRight"
            >
              Ver todas
            </ButtonLink>
          }
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recientes.map((property, index) => (
            <PropertyCard key={property.id} property={property} priority={index < 2} />
          ))}
        </div>
      </section>

      <ValuationCta />
      <Team />
      <Testimonials />
      <Faq />
    </>
  );
}
