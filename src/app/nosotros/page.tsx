import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { agents } from "@/lib/data/agents";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Axion Vanguard es una corredora boutique con base en Viña del Mar. Más de once años, cuatro corredores senior y foco en el litoral de Reñaca, Concón y Valparaíso.",
};

const valores = [
  {
    icon: "target" as const,
    title: "Un número, no un rango de promesas",
    text: "Cuando tasamos una propiedad damos un valor con comparables que puedes revisar. Cuando dudamos, lo decimos antes de firmar nada.",
  },
  {
    icon: "shield" as const,
    title: "Confidencialidad por defecto",
    text: "La dirección exacta de una propiedad solo se comparte con personas que han confirmado visita. El resto del mercado ve el sector, no la casa.",
  },
  {
    icon: "eye" as const,
    title: "Transparencia en los números",
    text: "Visitas, consultas y señales de interés van en un reporte semanal. Si no hay interés, prefieres saberlo temprano para ajustar precio o mensaje.",
  },
  {
    icon: "sparkle" as const,
    title: "Cuidado en el detalle",
    text: "Desde la fotografía hasta la última visita. El valor de una operación está en los detalles que el cliente nunca ve, pero que nota.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy-900">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=80"
          alt="Casa de arquitectura en la costa de Chile"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/75 to-navy-900/40" />
        <div className="relative mx-auto max-w-[1400px] px-4 py-20 sm:px-6 sm:py-28">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold-400">Sobre nosotros</p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-white sm:text-5xl">
              Una corredora boutique
              <span className="block italic text-gold-400">en la costa de Chile</span>
            </h1>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-white/75">
              Axion Vanguard nació en Viña del Mar con una idea poco común para
              el rubro: trabajar con pocas propiedades y tratarlas como si
              fueran propias. Hoy representamos a propietarios de primera
              línea en Reñaca, Concón y Valparaíso, y a inversionistas que
              buscan activos con historial en la costa.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Nuestra forma de trabajar"
              title="Menos propiedades, mejor representadas"
            />
            <div className="mt-8 space-y-4 text-[0.9375rem] leading-relaxed text-muted">
              <p>
                En un mercado donde cualquiera publica, el diferencial está en
                la profundidad con la que se prepara cada propiedad: fotografía,
                texto, ficha técnica, comparables y una campaña pensada para un
                comprador concreto, no para todo el mundo.
              </p>
              <p>
                Nos especializamos en un corredor. Si su propiedad es una casa
                frente al mar en Reñaca, el comprador que la va a valorar
                busca privacidad, luz y una arquitectura que se sostenga en el
                tiempo. Eso define la fotografía, el precio y a quién
                llamamos.
              </p>
              <p>
                Tenemos oficina en el centro de Viña del Mar, y también, y también
                presentes en Santiago cuando el cliente está en la capital.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { value: "2015", label: "Año de inicio" },
              { value: "240+", label: "Propiedades publicadas" },
              { value: "11", label: "Años de mercado" },
              { value: "4,9/5", label: "Valoración promedio" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-line bg-white p-7"
              >
                <p className="font-display text-4xl text-navy-900">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.12em] text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 sm:py-24">
          <SectionHeading eyebrow="Valores" title="Cuatro principios no negociables" />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {valores.map((valor) => (
              <div key={valor.title}>
                <span className="grid h-11 w-11 place-items-center rounded-full bg-navy-100 text-navy-700">
                  <Icon name={valor.icon} size={18} />
                </span>
                <h3 className="mt-5 font-display text-xl leading-snug text-navy-900">
                  {valor.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {valor.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading
          eyebrow="Equipo"
          title="Las personas que firman la operación"
          description="Sin call center. Si escribes, te responde quien va a visitar tu propiedad."
        />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {agents.map((agent) => (
            <article key={agent.id}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-paper-deep">
                <Image
                  src={agent.avatar}
                  alt={agent.name}
                  fill
                  sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-5 font-display text-2xl text-navy-900">
                {agent.name}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-[0.12em] text-gold-600">
                {agent.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{agent.bio}</p>
              <a
                href={`tel:${agent.phone.replace(/\s/g, "")}`}
                className="mt-4 inline-flex items-center gap-2 text-sm text-navy-700 transition hover:text-navy-500"
              >
                <Icon name="phone" size={14} />
                {agent.phone}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-navy-900 text-white">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="eyebrow text-gold-400">Oficina</p>
              <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">
                Visítanos en el centro de Viña del Mar
              </h2>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-white/70">
                Estamos a pasos de la Plaza Victoria, con estacionamiento a
                media cuadra. Si prefieres, coordinamos la visita a tu
                propiedad en cualquier punto de la comuna.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-white/70">
                <li className="flex gap-3">
                  <Icon name="pin" size={16} className="shrink-0 text-gold-400" />
                  {siteConfig.address}
                </li>
                <li className="flex gap-3">
                  <Icon name="calendar" size={16} className="shrink-0 text-gold-400" />
                  {siteConfig.hours}
                </li>
                <li className="flex gap-3">
                  <Icon name="phone" size={16} className="shrink-0 text-gold-400" />
                  {siteConfig.phone}
                </li>
              </ul>
            </div>
            <div className="rounded-lg border border-white/12 bg-white/[0.05] p-8">
              <p className="font-display text-2xl">
                ¿Tienes una propiedad en mente?
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                La tasación es gratuita y no te compromete a nada. Te damos un
                rango de valor con comparables reales en menos de 48 horas.
              </p>
              <Link
                href="/valoracion"
                className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-gold-500 px-7 text-sm font-medium text-navy-900 transition hover:bg-gold-400"
              >
                Tasar mi propiedad
                <Icon name="arrowRight" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
