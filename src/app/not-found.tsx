import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center sm:px-6">
      <span className="grid h-16 w-16 place-items-center rounded-full bg-navy-100 text-navy-700">
        <Icon name="pin" size={26} />
      </span>
      <p className="eyebrow mt-6 text-gold-600">Error 404</p>
      <h1 className="mt-3 font-display text-4xl leading-tight text-navy-900">
        Esta propiedad no está en nuestro portafolio
      </h1>
      <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
        Puede haber sido vendida, arriendo retirado del mercado o el enlace
        está incompleto. Revisa nuestro portafolio actualizado.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/propiedades"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-navy-700 px-7 text-sm font-medium text-white transition hover:bg-navy-800"
        >
          Ver propiedades
          <Icon name="arrowRight" size={16} />
        </Link>
        <Link
          href="/contacto"
          className="inline-flex h-12 items-center gap-2 rounded-full border border-line bg-white px-7 text-sm text-navy-800 transition hover:border-navy-300"
        >
          Contactar
        </Link>
      </div>
    </div>
  );
}
