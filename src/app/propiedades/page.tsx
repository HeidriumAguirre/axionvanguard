import type { Metadata } from "next";
import Link from "next/link";
import { PropertySearch } from "@/components/properties/PropertySearch";
import { PredictiveSearch } from "@/components/search/PredictiveSearch";
import { Icon } from "@/components/ui/Icon";
import { queryToFilters } from "@/lib/filters";
import { operationLabels } from "@/lib/format";

export const metadata: Metadata = {
  title: "Propiedades en venta y arriendo",
  description:
    "Busca casas, departamentos, penthouses y terrenos en Reñaca, Concón, Valparaíso y Santiago. Filtros por precio en UF, superficie, estado y vista al mar, con buscador por mapa.",
};

export default async function PropertiesPage({
  searchParams,
}: PageProps<"/propiedades">) {
  const params = await searchParams;
  const filters = queryToFilters(params as Record<string, string | string[]>);
  const query =
    typeof params.q === "string" ? params.q : undefined;

  const heading =
    filters.comuna && filters.barrio
      ? `${filters.barrio}, ${filters.comuna}`
      : filters.comuna
        ? filters.comuna
        : "Todas nuestras propiedades";

  return (
    <>
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 sm:py-14">
          <nav className="flex items-center gap-2 text-xs text-muted">
            <Link href="/" className="transition hover:text-navy-700">
              Inicio
            </Link>
            <Icon name="chevronRight" size={12} />
            <span className="text-navy-800">{operationLabels[filters.operation]}</span>
          </nav>

          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow text-gold-600">
                {operationLabels[filters.operation]} · Axion Vanguard
              </p>
              <h1 className="mt-3 font-display text-4xl leading-tight text-navy-900 sm:text-5xl">
                {query ? (
                  <>
                    Resultados para{" "}
                    <span className="italic text-navy-600">“{query}”</span>
                  </>
                ) : (
                  heading
                )}
              </h1>
              <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-muted">
                Usa los filtros para acotar el rango y dibuja tu zona en el mapa
                para encontrar exactamente el sector que buscas. Todos los
                precios se muestran con sus gastos comunes y su valor por m².
              </p>
            </div>

            <div className="w-full max-w-md">
              <PredictiveSearch variant="compact" />
            </div>
          </div>
        </div>
      </section>

      <PropertySearch initialFilters={filters} />
    </>
  );
}
