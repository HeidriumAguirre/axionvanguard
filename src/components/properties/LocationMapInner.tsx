"use client";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Icon } from "@/components/ui/Icon";

function Pin({ position }: { position: [number, number] }) {
  const icon = L.divIcon({
    className: "",
    html: `<div class="av-marker av-marker--active" style="width:14px;height:14px;border-radius:9999px"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
  return <Marker position={position} icon={icon} />;
}

export default function LocationMapInner({
  lat,
  lng,
  label,
}: {
  lat: number;
  lng: number;
  label: string;
}) {
  return (
    <div
      className="relative h-72 overflow-hidden rounded-lg border border-line"
      aria-label={label}
    >
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full"
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap"
        />
        <Pin position={[lat, lng]} />
      </MapContainer>
      <p className="absolute bottom-3 left-3 z-[500] inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[0.6875rem] text-navy-800 shadow-lift">
        <Icon name="shield" size={12} className="text-gold-500" />
        Ubicación aproximada por seguridad
      </p>
    </div>
  );
}
