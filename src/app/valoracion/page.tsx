import type { Metadata } from "next";
import { ValuationSimulator } from "@/components/valuation/ValuationSimulator";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Tasación de propiedades online",
  description:
    "Calcula el valor de mercado de tu propiedad en menos de dos minutos. Rango en UF y pesos, comparables reales de tu comuna e informe descargable, sin costo.",
};

export default function ValuationPage() {
  return (
    <>
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-16">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold-600">Tasación instantánea</p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-navy-900 sm:text-5xl">
              Descubre cuánto vale
              <span className="block italic text-navy-600">tu propiedad hoy</span>
            </h1>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">
              Usamos los mismos comparables que aplicamos al colocar una
              propiedad: operaciones cerradas, no Asking prices. La estimación
              es referencial y se entrega con el detalle de los factores que la
              componen.
            </p>
            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
              {[
                "Sin costo",
                "Resultado en 2 minutos",
                "Comparables documentados",
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
        <ValuationSimulator />
      </section>
    </>
  );
}
