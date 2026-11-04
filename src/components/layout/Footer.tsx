import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";
import { navLinks, siteConfig } from "@/lib/site";

const servicios = [
  { href: "/servicios#compra-venta", label: "Compra y venta" },
  { href: "/servicios#arriendo", label: "Corretaje de arriendo" },
  { href: "/servicios#inversion", label: "Asesoría en inversión" },
  { href: "/servicios#administracion", label: "Administración de propiedades" },
  { href: "/valoracion", label: "Tasación de propiedades" },
  { href: "/publicar", label: "Publica tu propiedad" },
];

const zonas = [
  "Viña del Mar",
  "Reñaca",
  "Concón",
  "Valparaíso",
  "Las Condes",
  "Vitacura",
];

export function Footer() {
  return (
    <footer className="mt-24 bg-navy-900 text-white">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <Logo className="h-14 w-14" tone="gold" />
              <div>
                <p className="font-display text-xl leading-none">Axion Vanguard</p>
                <p className="eyebrow mt-1 text-[0.5625rem] text-gold-400">
                  Real Estate
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-gold-400 hover:text-gold-400"
              >
                <Icon name="instagram" size={16} />
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-gold-400 hover:text-gold-400"
              >
                <Icon name="linkedin" size={16} />
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="WhatsApp"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-gold-400 hover:text-gold-400"
              >
                <Icon name="whatsapp" size={16} />
              </a>
            </div>
          </div>

          <nav>
            <p className="eyebrow text-gold-400">Navegación</p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/panel"
                  className="text-sm text-white/70 transition hover:text-white"
                >
                  Panel del propietario
                </Link>
              </li>
            </ul>
          </nav>

          <nav>
            <p className="eyebrow text-gold-400">Servicios</p>
            <ul className="mt-5 space-y-3">
              {servicios.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-sm text-white/70 transition hover:text-white"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-gold-400">Contacto</p>
            <ul className="mt-5 space-y-4 text-sm text-white/70">
              <li className="flex gap-3">
                <Icon name="pin" size={16} className="mt-0.5 shrink-0 text-gold-400" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex gap-3">
                <Icon name="phone" size={16} className="mt-0.5 shrink-0 text-gold-400" />
                <a href={`tel:${siteConfig.phoneHref}`} className="hover:text-white">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Icon name="mail" size={16} className="mt-0.5 shrink-0 text-gold-400" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Icon name="calendar" size={16} className="mt-0.5 shrink-0 text-gold-400" />
                <span>{siteConfig.hours}</span>
              </li>
            </ul>

            <p className="eyebrow mt-8 text-gold-400">Zonas</p>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
              {zonas.map((z) => (
                <Link
                  key={z}
                  href={`/propiedades?comuna=${encodeURIComponent(z)}`}
                  className="text-sm text-white/70 transition hover:text-white"
                >
                  {z}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. Todos los derechos
            reservados.
          </p>
          <p className="flex flex-wrap gap-x-5 gap-y-1">
            <span>Corredores inscribed en ACOP</span>
            <Link href="/privacidad" className="hover:text-white/70">
              Política de privacidad
            </Link>
            <Link href="/terminos" className="hover:text-white/70">
              Términos y condiciones
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
