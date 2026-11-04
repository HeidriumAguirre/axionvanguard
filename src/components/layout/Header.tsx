"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { useFavorites } from "@/components/providers/FavoritesProvider";
import { PredictiveSearch } from "@/components/search/PredictiveSearch";
import { Icon } from "@/components/ui/Icon";
import { navLinks, siteConfig } from "@/lib/site";
import type { Currency } from "@/lib/types";

const currencies: { value: Currency; label: string }[] = [
  { value: "UF", label: "UF" },
  { value: "CLP", label: "$" },
  { value: "USD", label: "US$" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { currency, setCurrency } = useCurrency();
  const { count } = useFavorites();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      {/* Barra superior */}
      <div className="hidden border-b border-line/70 bg-navy-900 text-white lg:block">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-2 text-xs">
          <p className="flex items-center gap-2 text-white/70">
            <Icon name="pin" size={13} />
            {siteConfig.addressShort} · {siteConfig.hours}
          </p>
          <div className="flex items-center gap-6">
            <a
              href={`tel:${siteConfig.phoneHref}`}
              className="flex items-center gap-2 text-white/80 transition hover:text-white"
            >
              <Icon name="phone" size={13} />
              {siteConfig.phone}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2 text-white/80 transition hover:text-white"
            >
              <Icon name="mail" size={13} />
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-2 text-white/80 transition hover:text-white"
            >
              <Icon name="instagram" size={13} />
              @axion.vanguard
            </a>
          </div>
        </div>
      </div>

      {/* Barra principal */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="flex h-[4.5rem] items-center gap-6">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5"
            aria-label="Axion Vanguard, inicio"
          >
            <Logo className="h-11 w-11" />
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-lg tracking-wide text-navy-900">
                Axion Vanguard
              </span>
              <span className="eyebrow mt-0.5 text-[0.5625rem] text-gold-600">
                Real Estate
              </span>
            </span>
          </Link>

          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-3.5 py-2 text-sm transition ${
                    active
                      ? "bg-navy-100 font-medium text-navy-800"
                      : "text-navy-800/80 hover:bg-navy-100/60 hover:text-navy-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <div
              className="hidden items-center rounded-full border border-line bg-white p-0.5 sm:flex"
              role="group"
              aria-label="Moneda"
            >
              {currencies.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setCurrency(c.value)}
                  aria-pressed={currency === c.value}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${
                    currency === c.value
                      ? "bg-navy-700 text-white"
                      : "text-muted hover:text-navy-800"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <Link
              href="/favoritos"
              aria-label={`Favoritos${count ? ` (${count})` : ""}`}
              className="relative hidden h-10 w-10 place-items-center rounded-full border border-line bg-white text-navy-700 transition hover:border-navy-300 sm:grid"
            >
              <Icon name="heart" size={16} />
              {count > 0 ? (
                <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-gold-500 text-[0.625rem] font-semibold text-navy-900">
                  {count}
                </span>
              ) : null}
            </Link>

            <Link
              href="/publicar"
              className="hidden h-10 items-center rounded-full bg-navy-700 px-5 text-sm font-medium text-white transition hover:bg-navy-800 sm:inline-flex"
            >
              Publica tu propiedad
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-navy-800 lg:hidden"
            >
              <Icon name={menuOpen ? "close" : "menu"} size={18} />
            </button>
          </div>
        </div>

        {/* Buscador compacto */}
        <div className="hidden pb-4 lg:block">
          <PredictiveSearch variant="compact" className="max-w-md ml-auto" />
        </div>
      </div>

      {/* Menú móvil */}
      {menuOpen ? (
        <div className="border-t border-line bg-white lg:hidden">
          <div className="space-y-4 px-4 py-5 sm:px-6">
            <PredictiveSearch variant="compact" />
            <nav className="grid gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-[0.9375rem] text-navy-800 transition hover:bg-paper"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/publicar"
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-navy-700 px-6 text-sm font-medium text-white"
              >
                Publica tu propiedad
              </Link>
            </nav>
            <div className="flex items-center justify-between border-t border-line pt-4">
              <span className="eyebrow text-muted">Moneda</span>
              <div className="flex items-center rounded-full border border-line bg-white p-0.5">
                {currencies.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setCurrency(c.value)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                      currency === c.value
                        ? "bg-navy-700 text-white"
                        : "text-muted"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
            <a
              href={`tel:${siteConfig.phoneHref}`}
              className="flex items-center gap-2 text-sm text-navy-800"
            >
              <Icon name="phone" size={15} />
              {siteConfig.phone}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export default Header;
