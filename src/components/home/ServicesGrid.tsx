import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

const servicios: {
  href: string;
  icon: IconName;
  title: string;
  description: string;
  points: string[];
}[] = [
  {
    href: "/servicios#compra-venta",
    icon: "key",
    title: "Corretaje de compra y venta",
    description:
      "Representamos al propietario con fotografía de arquitectura, video, ficha técnica completa y una estrategia de difusión bien definida. No publicamos y esperamos: planificamos el circuito antes de poner la propiedad en el mercado.",
    points: ["Valorización con comparables reales", "Reportes de visitas al propietario"],
  },
  {
    href: "/servicios#arriendo",
    icon: "folder",
    title: "Corretaje de arriendo",
    description:
      "Selección de arrendatarios con verificación de antecedentes, redacción y firma de contrato, entrega y seguimiento del pago. El canon se cobra puntualmente, con administración del edificio si corresponde.",
    points: ["Verificación de ingresos y referencias", "Contrato y garantía de pago"],
  },
  {
    href: "/servicios#inversion",
    icon: "chart",
    title: "Asesoría en inversión",
    description:
      "Analizamos rentabilidad, costo de mantención y demanda efectiva para decidir si conviene vender, arrendar o desarrollar. Presentamos el activo con un dossier para el inversionista.",
    points: ["Flujo de caja y CAPE estimado", "Comparables de la zona"],
  },
  {
    href: "/servicios#administracion",
    icon: "building",
    title: "Administración de propiedades",
    description:
      "Cobranza, mantención, inspecciones y reportes mensuales en un solo panel. Ideal para propietarios que no residen en Chile y necesitan control real de su patrimonio.",
    points: ["Reportes mensuales descargables", "Pagos a proveedores centralizados"],
  },
];

export function ServicesGrid() {
  return (
    <section className="border-y border-line bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading
          eyebrow="Qué hacemos"
          title={
            <>
              Un corredor que se ocupa
              <span className="italic text-navy-600"> de todo</span>
            </>
          }
          description="Cuatro servicios, un mismo estándar: transparencia de números, comunicación directa y plazos que se cumplen."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {servicios.map((servicio) => (
            <Link
              key={servicio.title}
              href={servicio.href}
              className="group flex flex-col bg-white p-8 transition-colors hover:bg-paper"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-navy-100 text-navy-700 transition group-hover:bg-navy-700 group-hover:text-white">
                <Icon name={servicio.icon} size={20} />
              </span>
              <h3 className="mt-6 font-display text-2xl leading-snug text-navy-900">
                {servicio.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {servicio.description}
              </p>
              <ul className="mt-6 space-y-2 border-t border-line pt-4">
                {servicio.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-xs text-navy-800"
                  >
                    <Icon
                      name="check"
                      size={13}
                      className="mt-0.5 shrink-0 text-gold-500"
                    />
                    {point}
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-navy-700">
                Saber más
                <Icon
                  name="arrowRight"
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesGrid;
