"use client";

import { useMemo } from "react";
import { Icon } from "@/components/ui/Icon";
import {
  amenityLabels,
  conditionLabels,
  operationLabels,
  propertyTypeLabels,
} from "@/lib/format";
import { communeByName, communes } from "@/lib/data/locations";
import { countActiveFilters, priceUnitFor } from "@/lib/filters";
import type {
  Amenity,
  Filters,
  PropertyCondition,
  PropertyType,
} from "@/lib/types";

const tipos: PropertyType[] = [
  "casa",
  "departamento",
  "penthouse",
  "terreno",
  "oficina",
  "local",
];

const estados: PropertyCondition[] = [
  "nuevo",
  "excelente",
  "bueno",
  "a_renovar",
  "para_entregar",
];

const caracteristicas: Amenity[] = [
  "vista_al_mar",
  "piscina",
  "terraza",
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
  "solar",
];

const dormitorios = [1, 2, 3, 4, 5];
const banos = [1, 2, 3, 4];

function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details open={defaultOpen} className="group border-b border-line py-5">
      <summary className="flex cursor-pointer list-none items-center justify-between text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-navy-900">
        {title}
        <Icon
          name="chevronDown"
          size={15}
          className="text-muted transition-transform group-open:rotate-180"
        />
      </summary>
      <div className="mt-4">{children}</div>
    </details>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
  count,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  count?: number;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 py-1.5 text-sm text-navy-800 transition hover:text-navy-600">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 shrink-0 rounded border-line text-navy-700 accent-navy-700"
      />
      <span className="flex-1">{label}</span>
      {count !== undefined ? (
        <span className="text-xs text-muted">{count}</span>
      ) : null}
    </label>
  );
}

export function FilterSidebar({
  filters,
  onChange,
  onReset,
  totalResults,
}: {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
  onReset: () => void;
  totalResults: number;
}) {
  const unit = priceUnitFor(filters.operation);
  const barrios = useMemo(() => {
    if (!filters.comuna) return [];
    return communeByName.get(filters.comuna)?.neighborhoods ?? [];
  }, [filters.comuna]);

  const active = countActiveFilters(filters);

  function toggle<T extends string>(list: T[], value: T): T[] {
    return list.includes(value)
      ? list.filter((v) => v !== value)
      : [...list, value];
  }

  return (
    <div className="px-5 py-2">
      <div className="flex items-center justify-between border-b border-line py-4">
        <p className="text-sm font-medium text-navy-900">
          Filtros
          {active > 0 ? (
            <span className="ml-2 rounded-full bg-navy-700 px-2 py-0.5 text-[0.6875rem] text-white">
              {active}
            </span>
          ) : null}
        </p>
        {active > 0 ? (
          <button
            type="button"
            onClick={onReset}
            className="text-xs text-muted underline underline-offset-4 transition hover:text-navy-700"
          >
            Limpiar
          </button>
        ) : null}
      </div>

      <Section title="Operación">
        <div className="grid grid-cols-2 gap-1 rounded-full border border-line p-1">
          {(["venta", "arriendo"] as const).map((op) => (
            <button
              key={op}
              type="button"
              onClick={() =>
                onChange({
                  operation: op,
                  minUF: undefined,
                  maxUF: undefined,
                })
              }
              className={`h-9 rounded-full text-sm transition ${
                filters.operation === op
                  ? "bg-navy-700 text-white"
                  : "text-muted hover:text-navy-800"
              }`}
            >
              {operationLabels[op]}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Tipo de propiedad">
        <div className="space-y-0.5">
          {tipos.map((tipo) => (
            <Checkbox
              key={tipo}
              label={propertyTypeLabels[tipo]}
              checked={filters.types.includes(tipo)}
              onChange={() => onChange({ types: toggle(filters.types, tipo) })}
            />
          ))}
        </div>
      </Section>

      <Section title="Ubicación">
        <label className="block text-xs uppercase tracking-[0.1em] text-muted">
          Comuna
          <select
            value={filters.comuna ?? ""}
            onChange={(e) =>
              onChange({ comuna: e.target.value || null, barrio: null })
            }
            className="mt-1.5 h-11 w-full rounded-md border border-line bg-white px-3 text-sm text-navy-900 outline-none transition focus:border-navy-300"
          >
            <option value="">Todas las comunas</option>
            {communes.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        {barrios.length > 0 ? (
          <label className="mt-4 block text-xs uppercase tracking-[0.1em] text-muted">
            Barrio
            <select
              value={filters.barrio ?? ""}
              onChange={(e) => onChange({ barrio: e.target.value || null })}
              className="mt-1.5 h-11 w-full rounded-md border border-line bg-white px-3 text-sm text-navy-900 outline-none transition focus:border-navy-300"
            >
              <option value="">Todos los barrios</option>
              {barrios.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </label>
        ) : null}
      </Section>

      <Section title="Precio">
        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="Mín."
            value={filters.minUF ?? ""}
            onChange={(e) =>
              onChange({
                minUF: e.target.value === "" ? undefined : Number(e.target.value),
              })
            }
            className="h-11 w-full rounded-md border border-line bg-white px-3 text-sm outline-none transition focus:border-navy-300"
          />
          <span className="text-muted">–</span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="Máx."
            value={filters.maxUF ?? ""}
            onChange={(e) =>
              onChange({
                maxUF: e.target.value === "" ? undefined : Number(e.target.value),
              })
            }
            className="h-11 w-full rounded-md border border-line bg-white px-3 text-sm outline-none transition focus:border-navy-300"
          />
        </div>
        <p className="mt-2 text-xs text-muted">
          Valores en {unit}
          {filters.operation === "arriendo" ? " mensuales" : ""}.
        </p>
      </Section>

      <Section title="Dormitorios">
        <div className="flex flex-wrap gap-1.5">
          {dormitorios.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() =>
                onChange({ bedrooms: filters.bedrooms === d ? null : d })
              }
              className={`h-10 min-w-10 rounded-full border px-3 text-sm transition ${
                filters.bedrooms === d
                  ? "border-navy-700 bg-navy-700 text-white"
                  : "border-line bg-white text-navy-800 hover:border-navy-300"
              }`}
            >
              {d === 5 ? "5+" : d}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Baños">
        <div className="flex flex-wrap gap-1.5">
          {banos.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() =>
                onChange({ bathrooms: filters.bathrooms === b ? null : b })
              }
              className={`h-10 min-w-10 rounded-full border px-3 text-sm transition ${
                filters.bathrooms === b
                  ? "border-navy-700 bg-navy-700 text-white"
                  : "border-line bg-white text-navy-800 hover:border-navy-300"
              }`}
            >
              {b === 4 ? "4+" : b}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Superficie (m²)">
        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="Mín."
            value={filters.minArea ?? ""}
            onChange={(e) =>
              onChange({
                minArea:
                  e.target.value === "" ? undefined : Number(e.target.value),
              })
            }
            className="h-11 w-full rounded-md border border-line bg-white px-3 text-sm outline-none transition focus:border-navy-300"
          />
          <span className="text-muted">–</span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="Máx."
            value={filters.maxArea ?? ""}
            onChange={(e) =>
              onChange({
                maxArea:
                  e.target.value === "" ? undefined : Number(e.target.value),
              })
            }
            className="h-11 w-full rounded-md border border-line bg-white px-3 text-sm outline-none transition focus:border-navy-300"
          />
        </div>
      </Section>

      <Section title="Estado">
        <div className="space-y-0.5">
          {estados.map((estado) => (
            <Checkbox
              key={estado}
              label={conditionLabels[estado]}
              checked={filters.condition.includes(estado)}
              onChange={() =>
                onChange({ condition: toggle(filters.condition, estado) })
              }
            />
          ))}
        </div>
      </Section>

      <Section title="Características">
        <div className="space-y-0.5">
          {caracteristicas.map((c) => (
            <Checkbox
              key={c}
              label={amenityLabels[c]}
              checked={filters.amenities.includes(c)}
              onChange={() =>
                onChange({ amenities: toggle(filters.amenities, c) })
              }
            />
          ))}
        </div>
      </Section>

      <p className="py-5 text-xs text-muted">
        {totalResults} {totalResults === 1 ? "propiedad coincide" : "propiedades coinciden"} con
        tu búsqueda.
      </p>
    </div>
  );
}

export default FilterSidebar;
