import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import { properties } from "@/lib/data/properties";
import { formatCLP, formatNumber, formatUF, timeSince } from "@/lib/format";
import { agentById } from "@/lib/data/agents";

export const metadata: Metadata = {
  title: "Panel del propietario",
  description:
    "Sigue el desempeño de tus propiedades: visitas, consultas, guardados, comparación con el mercado y reportes descargables.",
};

const kpis: { label: string; value: string; delta: string; icon: IconName }[] = [
  { label: "Visitas totales", value: "6.412", delta: "+18%", icon: "eye" },
  { label: "Consultas recibidas", value: "147", delta: "+9%", icon: "mail" },
  { label: "Propiedades guardadas", value: "583", delta: "+24%", icon: "heart" },
  { label: "Días en el mercado", value: "38", delta: "-6", icon: "calendar" },
];

const weekly = [42, 58, 51, 74, 69, 88, 96, 81, 104, 97, 118, 126];

const leads = [
  { name: "Camila Ferrer", interest: "Casa en Reñaca", channel: "WhatsApp", date: "Hoy 09:24", status: "Visita agendada" },
  { name: "Rodrigo Paredes", interest: "Depto en primera línea", channel: "Formulario", date: "Ayer 18:02", status: "Nuevo" },
  { name: "Andrea Salas", interest: "Casa en Reñaca", channel: "Email", date: "Ayer 11:47", status: "En negociación" },
  { name: "Familia Contreras", interest: "Macrolote Hacienda", channel: "WhatsApp", date: "12 nov", status: "Tasación solicitada" },
  { name: "Javiera Soto", interest: "Depto en primera línea", channel: "Instagram", date: "11 nov", status: "Nuevo" },
];

export default function DashboardPage() {
  const mine = properties.filter((p) => p.agentId === "constanza-araya").slice(0, 3);
  const max = Math.max(...weekly);

  return (
    <>
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 sm:py-14">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow text-gold-600">Panel del propietario</p>
              <h1 className="mt-3 font-display text-4xl leading-tight text-navy-900">
                Hola, Constanza
              </h1>
              <p className="mt-3 text-[0.9375rem] text-muted">
                Desempeño de tus propiedades · actualizado hoy a las 09:12
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-white px-5 text-sm text-navy-800 transition hover:border-navy-300"
              >
                <Icon name="download" size={15} />
                Reporte mensual
              </button>
              <Link
                href="/publicar"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-navy-700 px-5 text-sm font-medium text-white transition hover:bg-navy-800"
              >
                <Icon name="plus" size={15} />
                Publicar propiedad
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-16">
        {/* KPIs */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-lg border border-line bg-white p-6"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-navy-100 text-navy-700">
                  <Icon name={kpi.icon} size={16} />
                </span>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                  {kpi.delta}
                </span>
              </div>
              <p className="mt-4 font-display text-3xl text-navy-900">
                {kpi.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.1em] text-muted">
                {kpi.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          {/* Gráfico */}
          <div className="rounded-lg border border-line bg-white p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl text-navy-900">
                  Visitas por semana
                </h2>
                <p className="mt-1 text-xs text-muted">
                  Últimas 12 semanas · todas tus propiedades
                </p>
              </div>
              <span className="rounded-full bg-navy-100 px-3 py-1 text-xs text-navy-800">
                +24% vs. periodo anterior
              </span>
            </div>

            <div className="mt-8 flex h-48 items-end gap-2">
              {weekly.map((value, index) => (
                <div
                  key={index}
                  className="group relative flex-1"
                  style={{ height: `${(value / max) * 100}%` }}
                >
                  <div className="h-full w-full rounded-t-sm bg-navy-300 transition-colors group-hover:bg-navy-600" />
                  <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rounded bg-navy-900 px-2 py-0.5 text-[0.625rem] text-white opacity-0 transition group-hover:opacity-100">
                    {value}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex justify-between text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
              <span>Sem 1</span>
              <span>Sem 6</span>
              <span>Sem 12</span>
            </div>
          </div>

          {/* Ranking */}
          <div className="rounded-lg border border-line bg-white p-6 sm:p-8">
            <h2 className="font-display text-2xl text-navy-900">
              Tus propiedades
            </h2>
            <p className="mt-1 text-xs text-muted">Por rendimiento en visitas</p>
            <ul className="mt-6 space-y-5">
              {mine.map((property, index) => (
                <li key={property.id} className="flex gap-4">
                  <span className="font-display text-2xl text-navy-400">
                    0{index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/propiedades/${property.slug}`}
                      className="block truncate text-sm font-medium text-navy-900 hover:text-navy-600"
                    >
                      {property.title}
                    </Link>
                    <p className="mt-0.5 text-xs text-muted">
                      {property.barrio}, {property.comuna}
                    </p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-navy-800">
                      <span className="inline-flex items-center gap-1">
                        <Icon name="eye" size={12} />
                        {property.views.toLocaleString("es-CL")}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Icon name="mail" size={12} />
                        {property.inquiries}
                      </span>
                      <span className="text-muted">
                        {timeSince(property.publishedAt)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href="/propiedades"
              className="mt-7 inline-flex items-center gap-2 text-sm text-navy-700 transition hover:text-navy-500"
            >
              Ver todas las propiedades
              <Icon name="arrowRight" size={15} />
            </Link>
          </div>
        </div>

        {/* Leads */}
        <div className="mt-6 rounded-lg border border-line bg-white">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line p-6 sm:p-8">
            <div>
              <h2 className="font-display text-2xl text-navy-900">
                Consultas recientes
              </h2>
              <p className="mt-1 text-xs text-muted">
                147 consultas en los últimos 30 días
              </p>
            </div>
            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-xs text-navy-800 transition hover:border-navy-300"
            >
              <Icon name="download" size={14} />
              Exportar
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-[0.1em] text-muted">
                  <th className="px-6 py-4 font-medium sm:px-8">Contacto</th>
                  <th className="px-6 py-4 font-medium">Propiedad</th>
                  <th className="px-6 py-4 font-medium">Canal</th>
                  <th className="px-6 py-4 font-medium">Fecha</th>
                  <th className="px-6 py-4 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {leads.map((lead) => (
                  <tr key={lead.name} className="transition hover:bg-paper">
                    <td className="px-6 py-4 font-medium text-navy-900 sm:px-8">
                      {lead.name}
                    </td>
                    <td className="px-6 py-4 text-muted">{lead.interest}</td>
                    <td className="px-6 py-4 text-muted">{lead.channel}</td>
                    <td className="px-6 py-4 text-muted">{lead.date}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-navy-100 px-3 py-1 text-xs text-navy-800">
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Propiedad destacada en panel */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {properties.slice(0, 2).map((property) => {
            const agent = agentById.get(property.agentId);
            return (
              <div
                key={property.id}
                className="overflow-hidden rounded-lg border border-line bg-white"
              >
                <div className="relative aspect-[16/9] bg-paper-deep">
                  <Image
                    src={property.images[0]}
                    alt={property.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="eyebrow text-muted">
                    {property.barrio}, {property.comuna}
                  </p>
                  <h3 className="mt-2 font-display text-xl text-navy-900">
                    {property.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {property.priceUF
                      ? formatUF(property.priceUF)
                      : formatCLP(property.priceCLP ?? 0)}
                    {property.areaBuilt > 0
                      ? ` · ${formatNumber(property.areaBuilt)} m²`
                      : ` · ${formatNumber(property.areaTotal)} m²`}
                  </p>
                  {agent ? (
                    <p className="mt-4 border-t border-line pt-4 text-xs text-muted">
                      Corredor: {agent.name} · {agent.phone}
                    </p>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
