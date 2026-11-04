import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { agents } from "@/lib/data/agents";
import { siteConfig } from "@/lib/site";

export function Team() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading
        eyebrow="El equipo"
        title="Corredores, no un call center"
        description="Cada propiedad tiene una persona con nombre, teléfono y responsabilidad. Eso es lo que cambia una operación de un mes a otro."
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
                className="object-cover transition-transform duration-[900ms] ease-out hover:scale-[1.04]"
              />
            </div>
            <h3 className="mt-5 font-display text-2xl text-navy-900">
              {agent.name}
            </h3>
            <p className="mt-1 text-xs uppercase tracking-[0.12em] text-gold-600">
              {agent.role}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{agent.bio}</p>
            <div className="mt-4 flex items-center gap-4 border-t border-line pt-4 text-xs text-navy-800">
              <span className="inline-flex items-center gap-1.5">
                <Icon name="star" size={13} className="text-gold-600" />
                {agent.rating.toFixed(1)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="key" size={13} />
                {agent.closedDeals} operaciones
              </span>
              <a
                href={`tel:${agent.phone.replace(/\s/g, "")}`}
                className="ml-auto inline-flex items-center gap-1.5 text-navy-700 transition hover:text-navy-500"
              >
                <Icon name="phone" size={13} />
                Contactar
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-14 flex flex-col items-center gap-4 rounded-lg border border-line bg-white p-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-display text-2xl text-navy-900">
            ¿Prefieres hablar con una persona concreta?
          </p>
          <p className="mt-1 text-sm text-muted">
            Escríbenos por WhatsApp al {siteConfig.phone} y te respondemos en
            menos de dos horas hábiles.
          </p>
        </div>
        <a
          href={`https://wa.me/${siteConfig.whatsapp}`}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-[var(--whatsapp)] px-7 text-sm font-medium text-navy-900 transition hover:brightness-95"
        >
          <Icon name="whatsapp" size={17} />
          Escribir por WhatsApp
        </a>
      </div>
    </section>
  );
}

const testimonios = [
  {
    quote:
      "Vendimos una casa en Reñaca en 41 días. Nos terciaron con comparables reales de cada visita, sin promesas. Eso es lo que más valoramos.",
    name: "Familia Errázuriz",
    detail: "Venta · Reñaca, Viña del Mar",
  },
  {
    quote:
      "Teníamos un departamento arrendado desde el extranjero y nunca sabíamos quién estaba en el contrato. Con el panel de tasaciones lo vemos todo, incluidos los pagos.",
    name: "Andrea y Rodrigo",
    detail: "Administración · Las Condes, Santiago",
  },
  {
    quote:
      "Compramos una propiedad para desarrollar un hotel boutique. El corredor nos explicó el potencial de desarrollo, la zonificación y los plazos reales. Todo con números, sin vender humo.",
    name: "Jorge Ettchart",
    detail: "Inversión · Concón",
  },
];

export function Testimonials() {
  return (
    <section className="border-y border-line bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading
          eyebrow="Clientes"
          title="Lo que dicen después de cerrar"
          align="center"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonios.map((t) => (
            <figure
              key={t.name}
              className="flex h-full flex-col rounded-lg border border-line bg-paper p-8"
            >
              <Icon name="quote" size={28} className="text-gold-400" />
              <blockquote className="mt-5 flex-1 font-display text-xl leading-relaxed text-navy-900">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-line pt-4">
                <p className="text-sm font-medium text-navy-900">{t.name}</p>
                <p className="mt-0.5 text-xs uppercase tracking-[0.12em] text-muted">
                  {t.detail}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;
