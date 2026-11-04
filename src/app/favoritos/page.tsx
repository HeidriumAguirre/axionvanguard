import type { Metadata } from "next";
import { FavoritesList } from "@/components/favorites/FavoritesList";

export const metadata: Metadata = {
  title: "Mis favoritos",
  description: "Propiedades que guardaste para comparar con calma.",
};

export default function FavoritesPage() {
  return (
    <>
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 sm:py-14">
          <p className="eyebrow text-gold-600">Mi selección</p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-navy-900">
            Propiedades guardadas
          </h1>
          <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-muted">
            Tu selección se guarda en este dispositivo. Si quieres que un
            corredor la revise y te diga cuál conviene, escríbenos.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-16">
        <FavoritesList />
      </section>
    </>
  );
}
