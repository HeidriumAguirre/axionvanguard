import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export function ValuationCta() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-800">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 20%, #b08d4f 0, transparent 42%), radial-gradient(circle at 85% 78%, #6d89c9 0, transparent 46%)",
        }}
      />
      <div className="relative mx-auto max-w-[1400px] px-4 py-20 sm:px-6 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow text-gold-400">Tasación instantánea</p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-white sm:text-5xl">
              ¿Cuánto vale tu propiedad
              <span className="block italic text-gold-400">hoy en día?</span>
            </h2>
            <p className="mt-6 max-w-lg text-[0.9375rem] leading-relaxed text-white/70">
              Ingresa la dirección y las características de tu propiedad y
              obtén un rango de valor de mercado en menos de dos minutos, con
              los comparables que usamos para colocar. Sin costo y sin
              compromiso.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Rango de valor en UF y pesos",
                "Comparables de tu comuna y barrio",
                "Estimación de gastos comunes",
                "Informe descargable en PDF",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-white/80">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-500/20 text-gold-400">
                    <Icon name="check" size={12} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/valoracion"
                className="inline-flex h-13 items-center gap-2 rounded-full bg-gold-500 px-8 text-[0.9375rem] font-medium text-navy-900 transition hover:bg-gold-400"
              >
                Tasar mi propiedad gratis
                <Icon name="arrowRight" size={17} />
              </Link>
              <Link
                href="/publicar"
                className="inline-flex h-13 items-center gap-2 rounded-full border border-white/25 px-8 text-[0.9375rem] text-white transition hover:border-white/60"
              >
                Publica con nosotros
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-white/12 bg-white/[0.06] p-8 backdrop-blur-sm">
            <p className="eyebrow text-white/50">Ejemplo de resultado</p>
            <p className="mt-4 font-display text-2xl text-white">
              Casa en Reñaca · 380 m²
            </p>
            <div className="mt-6 space-y-4">
              <div>
                <div className="flex items-baseline justify-between text-sm text-white/60">
                  <span>Valor inferior</span>
                  <span className="font-display text-lg text-white">UF 8.100</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-white/15">
                  <div className="h-full w-[28%] rounded-full bg-white/30" />
                </div>
              </div>
              <div>
                <div className="flex items-baseline justify-between text-sm text-white/60">
                  <span>Valor de mercado</span>
                  <span className="font-display text-lg text-gold-400">UF 9.450</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-white/15">
                  <div className="h-full w-[62%] rounded-full bg-gold-500" />
                </div>
              </div>
              <div>
                <div className="flex items-baseline justify-between text-sm text-white/60">
                  <span>Valor superior</span>
                  <span className="font-display text-lg text-white">UF 10.800</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-white/15">
                  <div className="h-full w-full rounded-full bg-white/30" />
                </div>
              </div>
            </div>
            <p className="mt-6 border-t border-white/10 pt-4 text-xs leading-relaxed text-white/50">
              Estimación basada en 14 comparables cerrados en Reñaca durante los
              últimos 90 días. La valorización formal se entrega tras visita a
              la propiedad.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    q: "¿En qué zonas trabajan?",
    a: "Nos concentramos en la franja costera de Viña del Mar —Reñaca, Las Salinas, Los Pinos, Bellavista y Jardín del Mar—, más Concón y el sector monumental de Valparaíso. En Santiago operamos Las Condes, Vitacura, Lo Barnechea y Providencia. Un número acotado de zonas nos permite conocer el precio real de cada cuadra.",
  },
  {
    q: "¿Cuál es la comisión?",
    a: "En venta trabajamos con una comisión pactada previamente, con un plan por niveles de servicio. En arriendo la comisión se cobra del arrendatario y el alcance incluye selección, contrato y entrega. En todos los casos el precio se acuerda por escrito antes de firmar cualquier cosa.",
  },
  {
    q: "¿Cuánto tarda una venta?",
    a: "El rango honesto es de 45 a 90 días para una propiedad bien posicionada y bien documentada. Publicar sin fotos profesionales ni un plan de difusión cuesta entre 30 y 40 días adicionales. Preferimos decir esto antes que prometer plazos imposibles.",
  },
  {
    q: "¿Haben tasado mi propiedad antes?",
    a: "Sí, de forma referencial y gratuita a través del simulador de tasación. La tasación formal —con visita, comparables documentados y responsable legal— se entrega dentro de las 48 horas siguientes a la visita.",
  },
  {
    q: "¿Trabajan con compradores del exterior?",
    a: "Sí. Firmamos poder especial para representar al propietario, coordinamos visitas fuera de Chile y enviamos el dossier digital completo. Cerca del 30% de nuestras operaciones cierran con compradores internacionales.",
  },
];

export function Faq() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow text-gold-600">Preguntas frecuentes</p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-navy-900 sm:text-4xl">
            Las dudas que nos hacen
            <span className="block italic text-navy-600"> antes de firmar</span>
          </h2>
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">
            Si tu pregunta no está aquí, escríbenos. Contestamos con la misma
            honestidad con la que respondemos las llamadas.
          </p>
          <Link
            href="/contacto"
            className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-navy-700 transition hover:text-navy-500"
          >
            Hacer una consulta
            <Icon name="arrowRight" size={16} />
          </Link>
        </div>

        <div className="divide-y divide-line border-y border-line">
          {faqs.map((faq) => (
            <details key={faq.q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl text-navy-900">
                {faq.q}
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-navy-600 transition group-open:rotate-45">
                  <Icon name="close" size={14} className="rotate-45" />
                </span>
              </summary>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ValuationCta;
