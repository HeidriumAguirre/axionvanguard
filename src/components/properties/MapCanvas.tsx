"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useMemo } from "react";
import {
  MapContainer,
  Marker,
  Polygon,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import type { Property } from "@/lib/types";
import { formatUF } from "@/lib/format";

const DEFAULT_CENTER: [number, number] = [-33.0288, -71.6021];

function markerIcon(label: string, active: boolean) {
  return L.divIcon({
    className: "",
    html: `<div class="av-marker${active ? " av-marker--active" : ""}">${label}</div>`,
    iconSize: [74, 28],
    iconAnchor: [37, 14],
    popupAnchor: [0, -14],
  });
}

function ClickCapture({
  drawing,
  onPoint,
}: {
  drawing: boolean;
  onPoint: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      if (drawing) onPoint(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function FitBounds({
  properties,
  polygon,
}: {
  properties: Property[];
  polygon?: [number, number][];
}) {
  const map = useMap();
  useEffect(() => {
    const points: [number, number][] = [];
    if (polygon && polygon.length >= 3) points.push(...polygon);
    properties.forEach((p) => points.push([p.lat, p.lng]));
    if (points.length === 0) return;
    if (points.length === 1) {
      map.setView(points[0], 14);
      return;
    }
    map.fitBounds(L.latLngBounds(points), {
      padding: [48, 48],
      maxZoom: 15,
    });
  }, [map, properties, polygon]);
  return null;
}

export default function MapCanvas({
  properties,
  currency,
  onSelect,
  selectedId,
  drawing,
  draftPolygon,
  onPoint,
}: {
  properties: Property[];
  currency: "CLP" | "UF" | "USD";
  onSelect?: (id: string) => void;
  selectedId?: string | null;
  drawing: boolean;
  draftPolygon: [number, number][];
  onPoint: (lat: number, lng: number) => void;
}) {
  const labels = useMemo(
    () =>
      properties.map((p) => ({
        id: p.id,
        label:
          currency === "UF"
            ? formatUF(p.priceUF ?? 0)
            : p.operation === "arriendo"
              ? `$${Math.round((p.priceCLP ?? 0) / 1000)}k`
              : `US$${Math.round((p.priceUF ?? 0) * 39.85 / 1000)}k`,
        lat: p.lat,
        lng: p.lng,
        property: p,
      })),
    [properties, currency],
  );

  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={12}
      scrollWheelZoom
      className="h-full w-full"
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap"
      />
      <FitBounds properties={properties} polygon={draftPolygon} />
      <ClickCapture drawing={drawing} onPoint={onPoint} />

      {draftPolygon.length >= 2 ? (
        <Polygon
          positions={draftPolygon}
          pathOptions={{
            color: "#b08d4f",
            weight: 2,
            fillColor: "#b08d4f",
            fillOpacity: 0.12,
            dashArray: drawing ? "6 6" : undefined,
          }}
        />
      ) : null}

      {labels.map((item) => (
        <Marker
          key={item.id}
          position={[item.lat, item.lng]}
          icon={markerIcon(item.label, item.id === selectedId)}
          eventHandlers={{
            click: () => onSelect?.(item.id),
          }}
        >
          <Popup>
            <div className="overflow-hidden rounded-sm">
              <p className="px-3 pt-3 text-[0.6875rem] uppercase tracking-[0.14em] text-gold-600">
                {item.property.operation === "venta" ? "Venta" : "Arriendo"} ·{" "}
                {item.property.comuna}
              </p>
              <p className="px-3 pt-1 font-display text-lg text-navy-900">
                {item.property.title}
              </p>
              <p className="px-3 pb-3 pt-1 text-xs text-muted">
                {item.property.bedrooms} dorm · {item.property.bathrooms} baños ·{" "}
                {item.property.areaBuilt || item.property.areaTotal} m²
              </p>
              <a
                href={`/propiedades/${item.property.slug}`}
                className="block bg-navy-700 px-3 py-2 text-center text-xs font-medium text-white"
              >
                Ver ficha
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
