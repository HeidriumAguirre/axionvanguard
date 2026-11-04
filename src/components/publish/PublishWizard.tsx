"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { communes, communeByName } from "@/lib/data/locations";
import {
  amenityLabels,
  operationLabels,
  propertyTypeLabels,
} from "@/lib/format";
import type { Amenity, Operation, PropertyType } from "@/lib/types";

const types: PropertyType[] = [
  "casa",
  "departamento",
  "penthouse",
  "terreno",
  "oficina",
  "local",
];

const amenities: Amenity[] = [
  "vista_al_mar",
  "piscina",
  "terraza",
  "balcon",
  "jardin",
  "parking",
  "gimnasio",
  "sum",
  "ascensor",
  "seguridad_24_7",
  "aire_acondicionado",
  "calefaccion",
  "lavado",
  "quincho",
  "amoblado",
];

const wizardSteps = [
  { n: 1, label: "Tipo de propiedad" },
  { n: 2, label: "Ubicación" },
  { n: 3, label: "Características" },
  { n: 4, label: "Fotos" },
  { n: 5, label: "Precio" },
  { n: 6, label: "Contacto" },
];

export function PublishWizard() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [operation, setOperation] = useState<Operation>("venta");
  const [type, setType] = useState<PropertyType>("casa");
  const [comuna, setComuna] = useState("");
  const [barrio, setBarrio] = useState("");
  const [address, setAddress] = useState("");
  const [areaBuilt, setAreaBuilt] = useState(120);
  const [areaTotal, setAreaTotal] = useState(200);
  const [bedrooms, setBedrooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(2);
  const [parking, setParking] = useState(1);
  const [selected, setSelected] = useState<Amenity[]>([]);
  const [photos, setPhotos] = useState<string[]>([]);
  const [priceUF, setPriceUF] = useState(3500);
  const [expenses, setExpenses] = useState(85000);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    exclusive: true,
  });

  const barrios = comuna ? (communeByName.get(comuna)?.neighborhoods ?? []) : [];

  const progress = useMemo(
    () => ((step - 1) / wizardSteps.length) * 100,
    [step],
  );

  function toggleAmenity(id: Amenity) {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((a) => a !== id)
        : [...current, id],
    );
  }

  function handleFiles(files: FileList | null) {
    if (!files) return;
    const urls = Array.from(files)
      .slice(0, 12)
      .map((file) => URL.createObjectURL(file));
    setPhotos((current) => [...current, ...urls].slice(0, 12));
  }

  if (done) {
    return (
      <div className="mx-auto max-w-2xl rounded-lg border border-line bg-white px-8 py-16 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold-200 text-gold-600">
          <Icon name="check" size={26} />
        </span>
        <h2 className="mt-6 font-display text-3xl text-navy-900">
          Recibimos tu propiedad
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Un corredor de Axion Vanguard revisará la ficha en menos de 24 horas
          hábiles y te contactará para completar la valorización y acordar el
          plan de difusión.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/propiedades"
            className="inline-flex h-12 items-center rounded-full bg-navy-700 px-7 text-sm font-medium text-white transition hover:bg-navy-800"
          >
            Ver propiedades
          </Link>
          <Link
            href="/contacto"
            className="inline-flex h-12 items-center rounded-full border border-line px-7 text-sm text-navy-800 transition hover:border-navy-300"
          >
            Hablar con un corredor
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      {/* Progreso */}
      <div className="mb-8">
        <div className="h-1 w-full overflow-hidden rounded-full bg-paper-deep">
          <div
            className="h-full rounded-full bg-gold-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <ol className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {wizardSteps.map((s) => (
            <li key={s.n}>
              <button
                type="button"
                onClick={() => setStep(s.n)}
                className={`inline-flex items-center gap-1.5 text-xs transition ${
                  step === s.n
                    ? "font-medium text-navy-900"
                    : s.n < step
                      ? "text-navy-600"
                      : "text-muted"
                }`}
              >
                <span
                  className={`grid h-5 w-5 place-items-center rounded-full text-[0.625rem] ${
                    s.n < step
                      ? "bg-navy-100 text-navy-700"
                      : s.n === step
                        ? "bg-navy-700 text-white"
                        : "bg-paper-deep text-muted"
                  }`}
                >
                  {s.n < step ? <Icon name="check" size={10} /> : s.n}
                </span>
                {s.label}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-lg border border-line bg-white p-6 sm:p-10">
        {step === 1 ? (
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-3xl text-navy-900">
                ¿Qué quieres publicar?
              </h2>
              <p className="mt-1 text-sm text-muted">
                Empezamos por lo básico. Podrás revisar todo antes de enviar.
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.1em] text-muted">
                Tipo de operación
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {(["venta", "arriendo"] as const).map((op) => (
                  <button
                    key={op}
                    type="button"
                    onClick={() => setOperation(op)}
                    className={`rounded-lg border p-5 text-left transition ${
                      operation === op
                        ? "border-navy-700 bg-navy-100/60"
                        : "border-line hover:border-navy-300"
                    }`}
                  >
                    <p className="font-display text-xl text-navy-900">
                      {operationLabels[op]}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      {op === "venta"
                        ? "Publicamos y coordinamos el proceso de venta completo."
                        : "Publicamos y gestionamos el arriendo con verificación de antecedentes."}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.1em] text-muted">
                Tipo de propiedad
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {types.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`rounded-full border px-5 py-2.5 text-sm transition ${
                      type === t
                        ? "border-navy-700 bg-navy-700 text-white"
                        : "border-line text-navy-800 hover:border-navy-300"
                    }`}
                  >
                    {propertyTypeLabels[t]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-7">
            <div>
              <h2 className="font-display text-3xl text-navy-900">
                ¿Dónde está la propiedad?
              </h2>
              <p className="mt-1 text-sm text-muted">
                La dirección exacta la mantenemos privada hasta agendar visita.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
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
                  className="mt-1.5 h-12 w-full rounded-md border border-line bg-white px-3 text-sm outline-none transition focus:border-navy-300"
                >
                  <option value="">Selecciona</option>
                  {communes.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-xs uppercase tracking-[0.1em] text-muted">
                  Barrio
                </span>
                <select
                  value={barrio}
                  onChange={(e) => setBarrio(e.target.value)}
                  disabled={!barrios.length}
                  className="mt-1.5 h-12 w-full rounded-md border border-line bg-white px-3 text-sm outline-none transition focus:border-navy-300 disabled:bg-paper"
                >
                  <option value="">Selecciona</option>
                  {barrios.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block sm:col-span-2">
                <span className="text-xs uppercase tracking-[0.1em] text-muted">
                  Dirección o referencia
                </span>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Av. Borgoño 3000, Reñaca"
                  className="mt-1.5 h-12 w-full rounded-md border border-line px-3 text-sm outline-none transition focus:border-navy-300"
                />
              </label>
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-7">
            <div>
              <h2 className="font-display text-3xl text-navy-900">
                Características
              </h2>
              <p className="mt-1 text-sm text-muted">
                Mientras más preciso, mejor es el precio al que colocamos.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="flex items-baseline justify-between text-xs uppercase tracking-[0.1em] text-muted">
                  Superficie construida
                  <span className="font-display text-lg text-navy-900">
                    {areaBuilt} m²
                  </span>
                </span>
                <input
                  type="range"
                  min={20}
                  max={1500}
                  step={5}
                  value={areaBuilt}
                  onChange={(e) => setAreaBuilt(Number(e.target.value))}
                  className="mt-3 w-full accent-navy-700"
                />
              </label>

              <label className="block">
                <span className="flex items-baseline justify-between text-xs uppercase tracking-[0.1em] text-muted">
                  Superficie total / terreno
                  <span className="font-display text-lg text-navy-900">
                    {areaTotal} m²
                  </span>
                </span>
                <input
                  type="range"
                  min={20}
                  max={20000}
                  step={20}
                  value={areaTotal}
                  onChange={(e) => setAreaTotal(Number(e.target.value))}
                  className="mt-3 w-full accent-navy-700"
                />
              </label>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {(
                [
                  ["Dormitorios", bedrooms, setBedrooms, [0, 1, 2, 3, 4, 5]],
                  ["Baños", bathrooms, setBathrooms, [1, 2, 3, 4]],
                  ["Estacionamientos", parking, setParking, [0, 1, 2, 3, 4, 5]],
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
                            : "border-line text-navy-800 hover:border-navy-300"
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
                Amenities
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {amenities.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => toggleAmenity(a)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      selected.includes(a)
                        ? "border-gold-500 bg-gold-200 text-navy-900"
                        : "border-line text-navy-800 hover:border-navy-300"
                    }`}
                  >
                    {amenityLabels[a]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {step === 4 ? (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-3xl text-navy-900">
                Fotografías
              </h2>
              <p className="mt-1 text-sm text-muted">
                Las propiedades con fotografía profesional se venden hasta un 40%
                más rápido. Podemos coordinar el servicio si lo necesitas.
              </p>
            </div>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-line bg-paper px-6 py-14 text-center transition hover:border-navy-300">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-navy-100 text-navy-700">
                <Icon name="camera" size={20} />
              </span>
              <span className="mt-4 text-sm font-medium text-navy-900">
                Sube tus fotografías
              </span>
              <span className="mt-1 text-xs text-muted">
                JPG o PNG, hasta 12 archivos. La primera será la portada.
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </label>

            {photos.length > 0 ? (
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {photos.map((src, index) => (
                  <div
                    key={src}
                    className="relative aspect-[4/3] overflow-hidden rounded-md bg-paper-deep"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`Fotografía ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                    {index === 0 ? (
                      <span className="absolute left-2 top-2 rounded-full bg-navy-900/85 px-2 py-0.5 text-[0.625rem] uppercase tracking-[0.1em] text-white">
                        Portada
                      </span>
                    ) : null}
                    <button
                      type="button"
                      onClick={() =>
                        setPhotos((current) => current.filter((_, i) => i !== index))
                      }
                      aria-label="Quitar fotografía"
                      className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-white/90 text-navy-800"
                    >
                      <Icon name="close" size={12} />
                    </button>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        {step === 5 ? (
          <div className="space-y-7">
            <div>
              <h2 className="font-display text-3xl text-navy-900">
                Precio y gastos
              </h2>
              <p className="mt-1 text-sm text-muted">
                Puedes dejar el precio en blanco: lo precisamos contigo en la
                tasación.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs uppercase tracking-[0.1em] text-muted">
                  {operation === "venta" ? "Precio de venta (UF)" : "Canon mensual ($)"}
                </span>
                <input
                  type="number"
                  min={0}
                  value={operation === "venta" ? priceUF : expenses}
                  onChange={(e) =>
                    operation === "venta"
                      ? setPriceUF(Number(e.target.value))
                      : setExpenses(Number(e.target.value))
                  }
                  className="mt-1.5 h-12 w-full rounded-md border border-line px-3 text-sm outline-none transition focus:border-navy-300"
                />
              </label>

              <label className="block">
                <span className="text-xs uppercase tracking-[0.1em] text-muted">
                  Gastos comunes ($ / mes)
                </span>
                <input
                  type="number"
                  min={0}
                  value={expenses}
                  onChange={(e) => setExpenses(Number(e.target.value))}
                  className="mt-1.5 h-12 w-full rounded-md border border-line px-3 text-sm outline-none transition focus:border-navy-300"
                />
              </label>
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-line p-4">
              <input
                type="checkbox"
                checked={contact.exclusive}
                onChange={(e) =>
                  setContact({ ...contact, exclusive: e.target.checked })
                }
                className="mt-1 h-4 w-4 accent-navy-700"
              />
              <span>
                <span className="block text-sm font-medium text-navy-900">
                  Exclusividad con Axion Vanguard
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-muted">
                  Representamos tu propiedad en exclusiva, con plan de
                  difusión profesional. Si prefieres repartir, también podemos
                  trabajar en conjunto.
                </span>
              </span>
            </label>
          </div>
        ) : null}

        {step === 6 ? (
          <div className="space-y-7">
            <div>
              <h2 className="font-display text-3xl text-navy-900">
                ¿A quién contactamos?
              </h2>
              <p className="mt-1 text-sm text-muted">
                Un corredor te escribe en menos de 24 horas hábiles.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs uppercase tracking-[0.1em] text-muted">
                  Nombre
                </span>
                <input
                  value={contact.name}
                  onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  className="mt-1.5 h-12 w-full rounded-md border border-line px-3 text-sm outline-none transition focus:border-navy-300"
                />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-[0.1em] text-muted">
                  Correo
                </span>
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  className="mt-1.5 h-12 w-full rounded-md border border-line px-3 text-sm outline-none transition focus:border-navy-300"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs uppercase tracking-[0.1em] text-muted">
                  Teléfono
                </span>
                <input
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  className="mt-1.5 h-12 w-full rounded-md border border-line px-3 text-sm outline-none transition focus:border-navy-300"
                />
              </label>
            </div>

            <div className="rounded-lg bg-paper p-5 text-sm text-navy-800">
              <p className="font-medium">Resumen de la publicación</p>
              <ul className="mt-3 space-y-1.5 text-xs text-muted">
                <li>
                  {operationLabels[operation]} · {propertyTypeLabels[type]}
                </li>
                <li>
                  {comuna || "Comuna por definir"}
                  {barrio ? `, ${barrio}` : ""}
                </li>
                <li>
                  {areaBuilt} m² construidos · {bedrooms} dormitorios ·{" "}
                  {bathrooms} baños
                </li>
                <li>
                  {photos.length} fotografías ·{" "}
                  {contact.exclusive ? "Exclusividad" : "Representación compartida"}
                </li>
              </ul>
            </div>
          </div>
        ) : null}

        {/* Navegación */}
        <div className="mt-10 flex items-center justify-between gap-3 border-t border-line pt-6">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className="inline-flex h-12 items-center gap-2 rounded-full border border-line px-6 text-sm text-navy-800 transition hover:border-navy-300 disabled:opacity-40"
          >
            <Icon name="arrowLeft" size={16} />
            Atrás
          </button>

          {step < wizardSteps.length ? (
            <button
              type="button"
              onClick={() => setStep((s) => Math.min(wizardSteps.length, s + 1))}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-navy-700 px-7 text-sm font-medium text-white transition hover:bg-navy-800"
            >
              Continuar
              <Icon name="arrowRight" size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setDone(true)}
              disabled={!contact.email || !contact.name}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-gold-500 px-7 text-sm font-medium text-navy-900 transition hover:bg-gold-400 disabled:opacity-40"
            >
              Enviar publicación
              <Icon name="arrowRight" size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PublishWizard;
