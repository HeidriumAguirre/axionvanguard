import type { Metadata } from "next";
import { PublishWizard } from "@/components/publish/PublishWizard";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Publica tu propiedad",
  description:
    "Publica tu propiedad con Axion Vanguard en cinco pasos: ubicación, características, fotos, precio y contacto. Diagnóstico, fotografía profesional y plan de difusión incluidos.",
};

export default function PublishPage() {
  return (
    <>
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-16">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold-600">Captación</p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-navy-900 sm:text-5xl">
              Publica tu propiedad
              <span className="block italic text-navy-600">
                con un corredor, no con un formulario
              </span>
            </h1>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">
              Completa la ficha en cinco pasos. Un corredor de Axion Vanguard la
              revisa, la valoriza con comparables reales y propone un plan de
              difusión antes de publicarla.
            </p>
            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
              {[
                "Diagnóstico y valorización incluida",
                "Fotografía de arquitectura",
                "Difusión en portales y redes",
                "Sin costo de publicación",
              ].map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2 text-sm text-navy-800"
                >
                  <Icon name="check" size={14} className="text-gold-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-16">
        <PublishWizard />
      </section>
    </>
  );
}
