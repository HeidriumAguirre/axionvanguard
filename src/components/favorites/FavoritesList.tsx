"use client";

import Link from "next/link";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { Icon } from "@/components/ui/Icon";
import { useFavorites } from "@/components/providers/FavoritesProvider";
import { properties } from "@/lib/data/properties";

export function FavoritesList() {
  const { favorites } = useFavorites();
  const saved = properties.filter((p) => favorites.includes(p.id));

  if (saved.length === 0) {
    return (
      <div className="rounded-lg border border-line bg-white px-6 py-20 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-navy-100 text-navy-700">
          <Icon name="heart" size={22} />
        </span>
        <h2 className="mt-5 font-display text-2xl text-navy-900">
          Todavía no guardaste propiedades
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          Pulsa el corazón en cualquier ficha para guardar tus candidatas y
          compararlas con calma.
        </p>
        <Link
          href="/propiedades"
          className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-navy-700 px-6 text-sm font-medium text-white transition hover:bg-navy-800"
        >
          Explorar propiedades
          <Icon name="arrowRight" size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {saved.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}

export default FavoritesList;
