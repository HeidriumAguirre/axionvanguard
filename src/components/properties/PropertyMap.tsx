"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { Property } from "@/lib/types";
import type { Currency } from "@/lib/types";
import { interestZones } from "@/lib/data/locations";

const MapCanvas = dynamic(() => import("./MapCanvas"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center bg-paper-deep text-sm text-muted">
      Cargando mapa…
    </div>
  ),
});

export function PropertyMap({
  properties,
  currency,
  polygon,
  onPolygonChange,
  selectedId,
  onSelect,
}: {
  properties: Property[];
  currency: Currency;
  polygon?: [number, number][];
  onPolygonChange: (polygon?: [number, number][]) => void;
  selectedId?: string | null;
  onSelect?: (id: string) => void;
}) {
  const [drawing, setDrawing] = useState(false);
  const [draft, setDraft] = useState<[number, number][]>(polygon ?? []);

  function toggleDrawing() {
    if (drawing) {
      setDrawing(false);
      return;
    }
    setDraft([]);
    onPolygonChange(undefined);
    setDrawing(true);
  }

  function applyPolygon() {
    setDrawing(false);
    if (draft.length >= 3) onPolygonChange(draft);
  }

  function clearPolygon() {
    setDraft([]);
    setDrawing(false);
    onPolygonChange(undefined);
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg border border-line">
      <MapCanvas
        properties={properties}
        currency={currency}
        drawing={drawing}
        draftPolygon={draft}
        onPoint={(lat, lng) => setDraft((d) => [...d, [lat, lng] as [number, number]])}
        selectedId={selectedId}
        onSelect={onSelect}
      />

      {/* Controles de zona */}
      <div className="absolute left-3 top-3 z-[500] flex flex-col gap-2">
        <button
          type="button"
          onClick={toggleDrawing}
          className={`inline-flex h-10 items-center gap-2 rounded-full px-4 text-xs font-medium shadow-lift transition ${
            drawing
              ? "bg-gold-500 text-navy-900"
              : "bg-white text-navy-800 hover:bg-paper"
          }`}
        >
          <Icon name="pen" size={14} />
          {drawing ? "Terminar dibujo" : "Dibujar zona"}
        </button>

        {drawing ? (
          <div className="w-56 rounded-lg border border-line bg-white p-3 shadow-lift">
            <p className="text-[0.6875rem] leading-relaxed text-muted">
              Haz clic en el mapa para marcar los vértices de la zona. Con tres
              o más puntos, pulsa “Aplicar”.
            </p>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={applyPolygon}
                disabled={draft.length < 3}
                className="inline-flex h-8 flex-1 items-center justify-center rounded-full bg-navy-700 text-xs font-medium text-white transition disabled:opacity-40"
              >
                Aplicar
              </button>
              <button
                type="button"
                onClick={clearPolygon}
                className="inline-flex h-8 items-center justify-center rounded-full border border-line px-3 text-xs text-muted transition hover:text-navy-800"
              >
                <Icon name="close" size={13} />
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {/* Zonas de interés predefinidas */}
      <div className="absolute bottom-3 left-3 z-[500] max-w-[min(92%,22rem)]">
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          {interestZones.map((zone) => {
            const active =
              polygon &&
              polygon.length === zone.polygon.length &&
              polygon.every((point, i) => point[0] === zone.polygon[i][0]);
            return (
              <button
                key={zone.id}
                type="button"
                onClick={() =>
                  onPolygonChange(
                    active ? undefined : (zone.polygon as [number, number][]),
                  )
                }
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs shadow-lift transition ${
                  active
                    ? "border-navy-700 bg-navy-700 text-white"
                    : "border-line bg-white text-navy-800 hover:bg-paper"
                }`}
              >
                {zone.name}
              </button>
            );
          })}
        </div>
      </div>

      {polygon && polygon.length >= 3 && !drawing ? (
        <button
          type="button"
          onClick={() => onPolygonChange(undefined)}
          className="absolute right-3 top-3 z-[500] inline-flex h-9 items-center gap-2 rounded-full bg-navy-900/90 px-4 text-xs font-medium text-white shadow-lift transition hover:bg-navy-900"
        >
          <Icon name="close" size={13} />
          Quitar zona
        </button>
      ) : null}
    </div>
  );
}

export default PropertyMap;
