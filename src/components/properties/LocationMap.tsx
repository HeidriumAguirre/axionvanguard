"use client";

import dynamic from "next/dynamic";

const LocationMapClient = dynamic(
  () => import("./LocationMapInner").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-72 place-items-center rounded-lg border border-line bg-paper-deep text-sm text-muted">
        Cargando mapa…
      </div>
    ),
  },
);

export { LocationMapClient };
export default LocationMapClient;
