"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

export function PropertyGallery({
  images,
  title,
  badges,
}: {
  images: string[];
  title: string;
  badges: { label: string; tone: "gold" | "dark" }[];
}) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      <div className="grid gap-2 overflow-hidden rounded-lg sm:grid-cols-4 sm:grid-rows-2 sm:gap-3">
        <button
          type="button"
          onClick={() => setLightbox(0)}
          className="group relative col-span-2 row-span-2 aspect-[4/3] overflow-hidden bg-paper-deep sm:aspect-auto"
        >
          <Image
            src={images[0]}
            alt={title}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]"
          />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span
                key={badge.label}
                className={`rounded-full px-3 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.12em] ${
                  badge.tone === "gold"
                    ? "bg-gold-500 text-navy-900"
                    : "bg-navy-900 text-white"
                }`}
              >
                {badge.label}
              </span>
            ))}
          </div>
        </button>

        {images.slice(1, 5).map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setLightbox(index + 1)}
            className="group relative hidden aspect-[4/3] overflow-hidden bg-paper-deep sm:block"
          >
            <Image
              src={src}
              alt={`${title} · foto ${index + 2}`}
              fill
              sizes="25vw"
              className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.05]"
            />
            {index === 3 && images.length > 5 ? (
              <span className="absolute inset-0 grid place-items-center bg-navy-900/55 text-sm font-medium text-white">
                +{images.length - 5} fotos
              </span>
            ) : null}
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <Icon name="camera" size={14} />
          {images.length} fotos
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Icon name="play" size={14} />
          Tour virtual disponible
        </span>
        <button
          type="button"
          onClick={() => setLightbox(0)}
          className="inline-flex items-center gap-1.5 text-navy-700 transition hover:text-navy-500"
        >
          <Icon name="expand" size={14} />
          Ver galería completa
        </button>
      </div>

      {lightbox !== null ? (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-navy-900/95 p-4">
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Cerrar galería"
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
          >
            <Icon name="close" size={18} />
          </button>
          <button
            type="button"
            onClick={() =>
              setLightbox((i) => (i === null ? null : (i - 1 + images.length) % images.length))
            }
            aria-label="Foto anterior"
            className="absolute left-4 grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
          >
            <Icon name="chevronLeft" size={20} />
          </button>
          <button
            type="button"
            onClick={() =>
              setLightbox((i) => (i === null ? null : (i + 1) % images.length))
            }
            aria-label="Foto siguiente"
            className="absolute right-4 grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
          >
            <Icon name="chevronRight" size={20} />
          </button>
          <div className="relative h-[75vh] w-full max-w-5xl">
            <Image
              src={images[lightbox]}
              alt={`${title} · foto ${lightbox + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <p className="absolute bottom-6 text-xs text-white/60">
            {lightbox + 1} / {images.length}
          </p>
        </div>
      ) : null}
    </>
  );
}

export default PropertyGallery;
