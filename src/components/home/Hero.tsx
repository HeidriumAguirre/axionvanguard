import Image from "next/image";
import Link from "next/link";
import { PredictiveSearch } from "@/components/search/PredictiveSearch";
import { Icon } from "@/components/ui/Icon";

const chips = [
  { label: "Reñaca", href: "/propiedades?comuna=Viña%20del%20Mar&barrio=Reñaca" },
  { label: "Vista al mar", href: "/propiedades?caracteristicas=vista_al_mar" },
  { label: "Casas", href: "/propiedades?tipo=casa" },
  { label: "Arriendo amoblado", href: "/propiedades?operacion=arriendo&caracteristicas=amoblado" },
  { label: "Terrenos", href: "/propiedades?tipo=terreno" },
];

const stats = [
  { value: "240+", label: "Propiedades gestionadas" },
  { value: "6", label: "Comunas con presencia" },
  { value: "11", label: "Años en el mercado" },
  { value: "4,9", label: "Valoración promedio" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900">
      <Image
        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2200&q=80"
        alt="Casa de diseño frente al mar en la costa de Viña del Mar"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/70 to-navy-900/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/50 to-transparent" />

      <div className="relative mx-auto max-w-[1400px] px-4 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-28">
        <div className="max-w-3xl">
          <p className="eyebrow text-gold-400">
            Corredora de propiedades · Viña del Mar
          </p>
          <h1 className="mt-5 font-display text-[2.6rem] leading-[1.05] text-white sm:text-6xl lg:text-[4.25rem]">
            Propiedades de autor
            <span className="block italic text-gold-400">
              entre el mar y la ciudad
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-white/75">
            Representamos casas, departamentos y terrenos con carácter en Reñaca,
            Concón, Valparaíso y Santiago. Venta, arriendo, tasación y gestión con
            un equipo que conoce cada calle del litoral.
          </p>

          <div className="mt-9 max-w-2xl">
            <PredictiveSearch variant="full" />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {chips.map((chip) => (
              <Link
                key={chip.label}
                href={chip.href}
                className="rounded-full border border-white/20 px-4 py-1.5 text-xs text-white/80 transition hover:border-gold-400 hover:text-gold-400"
              >
                {chip.label}
              </Link>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/15 pt-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl text-white">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/50">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-navy-900/60 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="flex items-center gap-2 text-sm text-white/70">
            <Icon name="sparkle" size={16} className="text-gold-400" />
            ¿Cuánto vale tu propiedad? Obtén una tasación en menos de 24 horas.
          </p>
          <Link
            href="/valoracion"
            className="inline-flex h-11 items-center gap-2 self-start rounded-full bg-gold-500 px-6 text-sm font-medium text-navy-900 transition hover:bg-gold-400 sm:self-auto"
          >
            Tasar mi propiedad
            <Icon name="arrowRight" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
