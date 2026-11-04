"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { communes, communeByName } from "@/lib/data/locations";
import { formatCLP, formatUF } from "@/lib/format";
import { valueProperty } from "@/lib/valuation";
import type { PropertyCondition } from "@/lib/types";

const conditions: { value: PropertyCondition; label: string }[] = [
  { value: "nuevo", label: "A estrenar" },
  { value: "excelente", label: "Excelente estado" },
  { value: "bueno", label: "Buen estado" },
  { value: "a_renovar", label: "A reformar" },
  { value: "para_entregar", label: "Para entregar" },
];

const quickAmenities = [
  { id: "vista_al_mar", label: "Vista al mar" },
  { id: "piscina", label: "Piscina" },
  { id: "terraza", label: "Terraza" },
  { id: "jardin", label: "Jardín" },
  { id: "parking", label: "Estacionamiento" },
  { id: "amoblado", label: "Amoblado" },
];

type Step = 1 | 2 | 3 | 4;

export function ValuationSimulator() {
  const [step, setStep] = useState<Step>(1);
  const [comuna, setComuna] = useState("");
  const [barrio, setBarrio] = useState("");
  const [area, setArea] = useState(120);
  const [bedrooms, setBedrooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(2);
  const [parking, setParking] = useState(1);
  const [condition, setCondition] = useState<PropertyCondition>("excelente");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [revealed, setRevealed] = useState(false);

  const barrios = comuna
    ? (communeByName.get(comuna)?.neighborhoods ?? [])
    : [];

  const result = useMemo(
    () =>
      valueProperty({
        comuna: comuna || "Viña del Mar",
        barrio: barrio || "",
        area,
        bedrooms,
        bathrooms,
        parking,
        condition,
        amenities,
      }),
    [comuna, barrio, area, bedrooms, bathrooms, parking, condition, amenities],
  );

  function toggleAmenity(id: string) {
    setAmenities((current) =>
      current.includes(id)
        ? current.filter((a) => a !== id)
        : [...current, id],
    );
  }

  const steps = [
    { n: 1, label: "Ubicación" },
    { n: 2, label: "Características" },
    { n: 3, label: "Estado" },
    { n: 4, label: "Tus datos" },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px]">
      <div className="rounded-lg border border-line bg-white p-6 sm:p-8">
        {/* Paso */}
        <ol className="flex flex-wrap gap-2 border-b border-line pb-6">
          {steps.map((s) => (
            <li key={s.n}>
              <button
                type="button"
                onClick={() => setStep(s.n as Step)}
                className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs transition ${
                  step === s.n
                    ? "bg-navy-700 text-white"
                    : step > s.n
                      ? "bg-navy-100 text-navy-800"
                      : "text-muted"
                }`}
              >
                <span className="font-medium">{s.n}</span>
                {s.label}
              </button>
            </li>
          ))}
        </ol>

        {step === 1 ? (
          <div className="mt-8 space-y-6">
            <div>
              <h2 className="font-display text-2xl text-navy-900">
                ¿Dónde está tu propiedad?
              </h2>
              <p className="mt-1 text-sm text-muted">
                El sector es el factor que más pesa en el valor de una propiedad.
              </p>
            </div>

            <label className="block">
              <span className="text-xs uppercase tracking-[0.1em] text-muted">
                Comuna
              </span>
              <select
                value={comuna}
                onChange={(e) => {
                  setComuna(e.target.value);
                  setBarrio("");
                }}
                className="mt-1.5 h-12 w-full rounded-md border border-line bg-white px-3 text-sm text-navy-900 outline-none transition focus:border-navy-300"
              >
                <option value="">Selecciona una comuna</option>
                {communes.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>

            {barrios.length > 0 ? (
              <label className="block">
                <span className="text-xs uppercase tracking-[0.1em] text-muted">
                  Barrio o sector
                </span>
                <select
                  value={barrio}
                  onChange={(e) => setBarrio(e.target.value)}
                  className="mt-1.5 h-12 w-full rounded-md border border-line bg-white px-3 text-sm text-navy-900 outline-none transition focus:border-navy-300"
                >
                  <option value="">Todo el sector</option>
                  {barrios.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}

            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={!comuna}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-navy-700 px-7 text-sm font-medium text-white transition hover:bg-navy-800 disabled:opacity-40"
            >
              Continuar
              <Icon name="arrowRight" size={16} />
            </button>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="mt-8 space-y-7">
            <div>
              <h2 className="font-display text-2xl text-navy-900">
                Características de la propiedad
              </h2>
              <p className="mt-1 text-sm text-muted">
                Cuantos más datos entregues, más precisa es la estimación.
              </p>
            </div>

            <label className="block">
              <span className="flex items-baseline justify-between text-xs uppercase tracking-[0.1em] text-muted">
                Superficie construida
                <span className="font-display text-lg text-navy-900">
                  {area} m²
                </span>
              </span>
              <input
                type="range"
                min={30}
                max={1200}
                step={5}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="mt-3 w-full accent-navy-700"
              />
            </label>

            <div className="grid gap-6 sm:grid-cols-3">
              {(
                [
                  ["Dormitorios", bedrooms, setBedrooms, [1, 2, 3, 4, 5, 6]],
                  ["Baños", bathrooms, setBathrooms, [1, 2, 3, 4]],
                  ["Estacionamientos", parking, setParking, [0, 1, 2, 3, 4]],
                ] as const
              ).map(([label, value, setter, options]) => (
                <div key={label}>
                  <p className="text-xs uppercase tracking-[0.1em] text-muted">
                    {label}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {options.map((o) => (
                      <button
                        key={o}
                        type="button"
                        onClick={() => setter(o)}
                        className={`h-10 min-w-10 rounded-full border px-3 text-sm transition ${
                          value === o
                            ? "border-navy-700 bg-navy-700 text-white"
                            : "border-line bg-white text-navy-800 hover:border-navy-300"
                        }`}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.1em] text-muted">
                Características especiales
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {quickAmenities.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => toggleAmenity(a.id)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      amenities.includes(a.id)
                        ? "border-gold-500 bg-gold-200 text-navy-900"
                        : "border-line bg-white text-navy-800 hover:border-navy-300"
                    }`}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex h-12 items-center rounded-full border border-line px-6 text-sm text-navy-800 transition hover:border-navy-300"
              >
                Atrás
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-navy-700 px-7 text-sm font-medium text-white transition hover:bg-navy-800"
              >
                Continuar
                <Icon name="arrowRight" size={16} />
              </button>
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="mt-8 space-y-7">
            <div>
              <h2 className="font-display text-2xl text-navy-900">
                Estado de la propiedad
              </h2>
              <p className="mt-1 text-sm text-muted">
                Un buen estado de conservación puede marcar la diferencia
                entre dos propiedades comparables.
              </p>
            </div>

            <div className="space-y-2">
              {conditions.map((c) => (
                <label
                  key={c.value}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-line px-4 py-3.5 transition hover:border-navy-300"
                >
                  <input
                    type="radio"
                    name="condition"
                    checked={condition === c.value}
                    onChange={() => setCondition(c.value)}
                    className="h-4 w-4 accent-navy-700"
                  />
                  <span className="text-sm text-navy-900">{c.label}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex h-12 items-center rounded-full border border-line px-6 text-sm text-navy-800 transition hover:border-navy-300"
              >
                Atrás
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-navy-700 px-7 text-sm font-medium text-white transition hover:bg-navy-800"
              >
                Ver estimación
                <Icon name="arrowRight" size={16} />
              </button>
            </div>
          </div>
        ) : null}

        {step === 4 ? (
          <div className="mt-8 space-y-6">
            <div>
              <h2 className="font-display text-2xl text-navy-900">
                ¿Dónde te enviamos el informe?
              </h2>
              <p className="mt-1 text-sm text-muted">
                Te enviamos el rango de valor con los comparables usados y la
                ficha técnica de la propiedad.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs uppercase tracking-[0.1em] text-muted">
                  Nombre
                </span>
                <input
                  value={contact.name}
                  onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  className="mt-1.5 h-12 w-full rounded-md border border-line px-3 text-sm outline-none transition focus:border-navy-300"
                  placeholder="Tu nombre"
                />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-[0.1em] text-muted">
                  Correo
                </span>
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) =>
                    setContact({ ...contact, email: e.target.value })
                  }
                  className="mt-1.5 h-12 w-full rounded-md border border-line px-3 text-sm outline-none transition focus:border-navy-300"
                  placeholder="tu@correo.cl"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs uppercase tracking-[0.1em] text-muted">
                  Teléfono (opcional)
                </span>
                <input
                  value={contact.phone}
                  onChange={(e) =>
                    setContact({ ...contact, phone: e.target.value })
                  }
                  className="mt-1.5 h-12 w-full rounded-md border border-line px-3 text-sm outline-none transition focus:border-navy-300"
                  placeholder="+56 9 ..."
                />
              </label>
            </div>

            <button
              type="button"
              onClick={() => setRevealed(true)}
              disabled={!contact.email}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-navy-700 px-7 text-sm font-medium text-white transition hover:bg-navy-800 disabled:opacity-40"
            >
              Ver el valor de mi propiedad
              <Icon name="sparkle" size={16} />
            </button>
            <p className="text-center text-xs text-muted">
              Al enviar aceptas que te contactemos con la tasación formal.
            </p>
          </div>
        ) : null}
      </div>

      {/* Resultado */}
      <aside className="lg:sticky lg:top-[9.5rem] lg:h-fit">
        <div className="rounded-lg border border-line bg-white p-6">
          <p className="eyebrow text-muted">Estimación de valor</p>

          {revealed ? (
            <>
              <p className="mt-4 font-display text-4xl leading-none text-navy-900">
                {formatUF(result.midUF)}
              </p>
              <p className="mt-1 text-sm text-muted">
                ≈ {formatCLP(result.midCLP)}
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-baseline justify-between text-sm">
                  <span className="text-muted">Rango inferior</span>
                  <span className="font-medium text-navy-900">
                    {formatUF(result.lowUF)}
                  </span>
                </div>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="text-muted">Rango superior</span>
                  <span className="font-medium text-navy-900">
                    {formatUF(result.highUF)}
                  </span>
                </div>
                <div className="flex items-baseline justify-between text-sm border-t border-line pt-3">
                  <span className="text-muted">Valor referencial por m²</span>
                  <span className="font-medium text-navy-900">
                    {formatUF(result.ufPerSqm)}
                  </span>
                </div>
              </div>

              <div className="mt-6 border-t border-line pt-4">
                <p className="text-xs uppercase tracking-[0.1em] text-muted">
                  Factores aplicados
                </p>
                <ul className="mt-3 space-y-2">
                  {result.factors.map((f) => (
                    <li
                      key={f.label}
                      className="flex items-center justify-between text-sm text-navy-800"
                    >
                      <span className="capitalize">{f.label}</span>
                      <span
                        className={
                          f.impact >= 0
                            ? "font-medium text-emerald-700"
                            : "font-medium text-red-700"
                        }
                      >
                        {f.impact >= 0 ? "+" : ""}
                        {(f.impact * 100).toFixed(0)}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-6 rounded-md bg-paper p-4 text-xs leading-relaxed text-muted">
                Estimación basada en {result.comparables} comparables cerrados
                en {comuna || "la comuna"} durante los últimos 90 días. La
                valorización formal requiere visita a la propiedad.
              </p>

              <Link
                href="/contacto"
                className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gold-500 text-sm font-medium text-navy-900 transition hover:bg-gold-400"
              >
                Agendar visita de tasación
                <Icon name="arrowRight" size={16} />
              </Link>
            </>
          ) : (
            <div className="mt-4">
              <div className="space-y-3 opacity-40 blur-[3px] select-none">
                <div className="h-10 w-3/4 rounded bg-paper-deep" />
                <div className="h-3 w-full rounded bg-paper-deep" />
                <div className="h-3 w-5/6 rounded bg-paper-deep" />
                <div className="h-3 w-2/3 rounded bg-paper-deep" />
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted">
                Completa los pasos para desbloquear el rango de valor de tu
                propiedad, con los comparables que usamos en cada operación.
              </p>
            </div>
          )}
        </div>

        <ul className="mt-5 space-y-3">
          {[
            "Rango de valor en UF y pesos",
            "Comparables reales de tu comuna",
            "Informe descargable en PDF",
            "Sin costo ni compromiso",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-sm text-navy-800">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-gold-200 text-gold-600">
                <Icon name="check" size={12} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

export default ValuationSimulator;
