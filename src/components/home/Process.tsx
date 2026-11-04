import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

const pasos = [
  {
    n: "01",
    title: "Diagnóstico",
    text: "Visitamos la propiedad, revisamos documentación y comparamos con el mercado real de tu comuna. Te entregamos una valorización con rango, no un número vacío.",
  },
  {
    n: "02",
    title: "Preparación",
    text: "Fotografía de arquitectura, video en vertical, plano y ficha técnica. Publicamos en nuestro portal y en los portales del sector, con un solo origen de verdad.",
  },
  {
    n: "03",
    title: "Difusión y seguimiento",
    text: "Campañas pagadas segmentadas por zona y presupuesto. Te enviamos un reporte semanal con visitas, consultas y señales de interés reales.",
  },
  {
    n: "04",
    title: "Negociación y cierre",
    text: "Presentamos ofertas calificadas, coordinamos la due diligence y acompañamos hasta la firma. Si vendemos, gestionamos el arriendo posterior y dejamos el activo preparado para el siguiente paso.",
  },
];

export function Process() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 sm:py-28">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="eyebrow text-gold-600">Cómo trabajamos</p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-navy-900 sm:text-4xl">
            Un proceso corto,
            <span className="block italic text-navy-600">sin letra chica</span>
          </h2>
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">
            Publicar bien cuesta tiempo, y ese tiempo se paga. Trabajamos con un
            número acotado de propiedades para que cada una tenga la difusión que
            merece.
          </p>
          <Link
            href="/servicios"
            className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-navy-700 transition hover:text-navy-500"
          >
            Conocer todos los servicios
            <Icon name="arrowRight" size={16} />
          </Link>
        </div>

        <ol className="relative">
          <span
            aria-hidden
            className="absolute left-[21px] top-6 bottom-6 w-px bg-line sm:left-[23px]"
          />
          {pasos.map((paso) => (
            <li key={paso.n} className="relative flex gap-5 pb-10 last:pb-0">
              <span className="z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-paper font-display text-base text-navy-700 sm:h-12 sm:w-12 sm:text-lg">
                {paso.n}
              </span>
              <div className="min-w-0 flex-1 pt-0.5 sm:pt-1">
                <h3 className="font-display text-2xl leading-tight text-navy-900">
                  {paso.title}
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
                  {paso.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ZonesGrid() {
  const zonas = [
    {
      name: "Reñaca",
      region: "Viña del Mar",
      text: "Primera línea, Sil Harbor y Los Pinos. El extremo norte del litoral, con la mayor plusvalía de la comuna.",
      image:
        "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Concón",
      region: "Valparaíso",
      text: "Casas de 600 a 1.200 m² de terreno y proyectos de hotelería boutique frente a Cochoa.",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Valparaíso",
      region: "Cerros y plan",
      text: "Casas patrimoniales, departamentos con vista a la bahía y locales en el plan.",
      image:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Las Condes",
      region: "Santiago",
      text: "Departamentos de diseño en Barrio Pueblo y el Golf, con gestión de arriendo y amenities premium.",
      image:
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  return (
    <section className="bg-navy-900 text-white">
      <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 sm:py-28">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold-400">Dónde operamos</p>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
              Cuatro zonas, un mismo estándar de cuidado
            </h2>
          </div>
          <Link
            href="/propiedades"
            className="inline-flex items-center gap-2 text-sm text-gold-400 transition hover:text-gold-200"
          >
            Ver propiedades por zona
            <Icon name="arrowRight" size={16} />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {zonas.map((zona) => (
            <Link
              key={zona.name}
              href={`/propiedades?comuna=${encodeURIComponent(zona.name)}`}
              className="group flex flex-col overflow-hidden rounded-lg bg-navy-800"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-navy-800">
                <Image
                  src={zona.image}
                  alt={zona.name}
                  fill
                  sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover opacity-80 transition-transform duration-[1200ms] ease-out group-hover:scale-105 group-hover:opacity-100"
                />
              </div>
              <div className="flex-1 p-5">
                <p className="eyebrow text-gold-400">{zona.region}</p>
                <h3 className="mt-2 font-display text-2xl text-white">{zona.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/80">
                  {zona.text}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Process;
