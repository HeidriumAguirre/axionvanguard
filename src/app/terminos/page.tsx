import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Términos y condiciones",
};

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="eyebrow text-gold-600">Legal</p>
      <h1 className="mt-3 font-display text-4xl text-navy-900">
        Términos y condiciones
      </h1>
      <div className="mt-8 space-y-6 text-[0.9375rem] leading-relaxed text-muted">
        <h2 className="font-display text-2xl text-navy-900">1. Objeto</h2>
        <p>
          Estos términos regulan el uso del sitio web de Axion Vanguard SpA y
          la información publicada en él. La información de las propiedades es
          orientativa y no constituye una oferta en los términos del artículo
          8 de la Ley 18.287.
        </p>

        <h2 className="font-display text-2xl text-navy-900">
          2. Tasaciones y estimaciones
        </h2>
        <p>
          Los rangos de valor entregados por el simulador de tasación son
          referencias calculadas a partir de comparables del sector. No
          reemplazan una tasación formal, que requiere visita a la propiedad,
          revisión de documentos y responsable legal.
        </p>

        <h2 className="font-display text-2xl text-navy-900">
          3. Representación y comisión
        </h2>
        <p>
          La representación de una propiedad requiere un mandato escrito, en
          el que se pactan la duración, la exclusividad y la comisión. La
          comisión se devenga contra la firma de escritura de compraventa,
          traspaso o contrato de arriendo, según corresponda.
        </p>

        <h2 className="font-display text-2xl text-navy-900">
          4. Publicación de información de terceros
        </h2>
        <p>
          Los propietarios que publican a través de este sitio declaran que
          son titulares del derecho de uso de las fotografías e información
          cargada, y que la operación ha sido correctamente autorizada por
          los copropietarios cuando corresponde.
        </p>

        <h2 className="font-display text-2xl text-navy-900">
          5. Uso del sitio y protección de datos
        </h2>
        <p>
          El uso del sitio implica aceptar estos términos y la política de
          privacidad. No está permitido usar el sitio para fines distintos de
          los consultados, ni realizar acciones que puedan affects su
          disponibilidad para otros usuarios.
        </p>

        <p className="text-xs text-muted">
          Última actualización: noviembre de 2026.
        </p>
        <Link
          href="/"
          className="inline-flex pt-4 text-sm text-navy-700 underline underline-offset-4"
        >
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
