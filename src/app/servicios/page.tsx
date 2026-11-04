import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Servicios de corretaje y gestión",
  description:
    "Corretaje de compra y venta, arriendo, asesoría en inversión y administración de propiedades. Plan de difusión, reportes al propietario y gestión integral.",
};

interface Servicio {
  id: string;
  icon: IconName;
  title: string;
  lead: string;
  body: string[];
  includes: string[];
  image: string;
}

const servicios: Servicio[] = [
  {
    id: "compra-venta",
    icon: "key",
    title: "Corretaje de compra y venta",
    lead:
      "Representamos al propietario con una estrategia de difusión definida antes de publicar, no después.",
    body: [
      "Partimos con un diagnóstico: visita a la propiedad, revisión documental y comparación con operaciones cerradas en el mismo sector. Ese informe define el precio de salida y el canal de difusión.",
      "La ficha que publicamos incluye fotografía de arquitectura, video corto, plano, ficha técnica y un texto que cuenta la propiedad como la contamos nosotros, en primera persona.",
      "Durante la campaña recibes un reporte semanal con visitas, consultas y señales de interés reales, para que puedas decidir si ajustar el precio o el mensaje.",
    ],
    includes: [
      "Diagnóstico y valorización con comparables",
      "Fotografía de arquitectura y video",
      "Publicación en portal y portales del sector",
      "Reportes semanales al propietario",
      "Coordinación de visitas y debido cuidado",
      "Asesoría legal para la firma",
    ],
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "arriendo",
    icon: "folder",
    title: "Corretaje de arriendo",
    lead:
      "Proceso 100% digital, con verificación de antecedentes antes de firmar.",
    body: [
      "Publicamos con fotos y video propios, coordinamos visitas virtuales o presenciales y filtramos a cada interesado con una ficha de evaluación que incluye ingresos, referencias y situación laboral.",
      "Redactamos el contrato, revisamos garantías y apoyamos en la entrega del inmueble. Tras la firma gestionamos el cobro mensual y reportamos cualquier incidencia.",
    ],
    includes: [
      "Publicación y reporte de visitas",
      "Verificación de antecedentes del arrendatario",
      "Redacción y firma de contrato",
      "Inventario y entrega del inmueble",
      "Cobranza y seguimiento mensual",
      "Gestión de mantenciones menores",
    ],
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "inversion",
    icon: "chart",
    title: "Asesoría en inversión",
    lead:
      "Decidir si conviene vender, arrendar o desarrollar, con números claros.",
    body: [
      "Trabajamos con una base de operaciones cerradas y precios de arriendo reales de la zona para calcular rentabilidad bruta y neta, plazo derepago y sensibilidad ante cambios de tasa.",
      "Presentamos el activo con un dossier para el inversionista: comparables, flujo de caja, plan de desarrollo y una recomendación explícita sobre el momento de vender.",
    ],
    includes: [
      "Estudio de comparables del sector",
      "Proyección de rentabilidad y sensibilidad",
      "Análisis de plusvalía histórica",
      "Dossier de presentación a inversionistas",
      "Evaluación de proyectos de desarrollo",
      "Asesoría en la estrategia de salida",
    ],
    image:
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "administracion",
    icon: "building",
    title: "Administración de propiedades",
    lead:
      "Control real de tu patrimonio, con un panel donde ves todo lo que pasa.",
    body: [
      "Cobramos el arriendo, emitimos recibos, coordinamos mantenciones y supervisamos visitas de contratistas. Cada movimiento queda registrado con fecha y respaldo.",
      "Los reportes mensuales incluyen flujo de caja, estado de cuenta, agenda de mantenciones y un resumen de cualquier incidencia, listo para descargar.",
    ],
    includes: [
      "Cobranza y emisión de recibos",
      "Mantenciones y supervisión de contratistas",
      "Reportes mensuales descargables",
      "Gestión de contratos y renovaciones",
      "Panel de documentos",
      "Coordinación con impuestos y seguros",
    ],
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-16">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold-600">Servicios</p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-navy-900 sm:text-5xl">
              Corretaje con criterio
              <span className="block italic text-navy-600">y cuentas claras</span>
            </h1>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">
              Trabajamos con un número acotado de propiedades para poder
              atenderlas como corresponde. Estos son los cuatro servicios que
              ofrecemos y qué incluye cada uno.
            </p>
          </div>
        </div>
      </section>

      {servicios.map((servicio, index) => (
        <section
          key={servicio.id}
          id={servicio.id}
          className={`scroll-mt-28 border-b border-line ${
            index % 2 === 0 ? "bg-paper" : "bg-white"
          }`}
        >
          <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-20">
            <div
              className={`grid gap-10 lg:grid-cols-2 lg:items-center ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div>
                <span className="grid h-12 w-12 place-items-center rounded-full bg-navy-700 text-white">
                  <Icon name={servicio.icon} size={20} />
                </span>
                <h2 className="mt-6 font-display text-3xl leading-tight text-navy-900 sm:text-4xl">
                  {servicio.title}
                </h2>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-navy-700">
                  {servicio.lead}
                </p>
                {servicio.body.map((parrafo) => (
                  <p
                    key={parrafo}
                    className="mt-4 text-[0.9375rem] leading-relaxed text-muted"
                  >
                    {parrafo}
                  </p>
                ))}

                <p className="eyebrow mt-8 text-gold-600">Qué incluye</p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {servicio.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-navy-800"
                    >
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-200 text-gold-600">
                        <Icon name="check" size={12} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-paper-deep">
                <Image
                  src={servicio.image}
                  alt={servicio.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading
          eyebrow="Trabajemos juntos"
          title="Cuéntanos qué necesitas y te proponemos un plan"
          description="Sin compromiso de exclusividad en la primera conversación. Revisamos tu caso y te entregamos una propuesta concreta."
          align="center"
        />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/contacto"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-navy-700 px-7 text-sm font-medium text-white transition hover:bg-navy-800"
          >
            Solicitar propuesta
            <Icon name="arrowRight" size={16} />
          </Link>
          <Link
            href="/valoracion"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-line bg-white px-7 text-sm text-navy-800 transition hover:border-navy-300"
          >
            Tasar mi propiedad
          </Link>
        </div>
      </section>
    </>
  );
}
