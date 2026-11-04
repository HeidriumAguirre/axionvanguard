import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CurrencyProvider } from "@/components/providers/CurrencyProvider";
import { FavoritesProvider } from "@/components/providers/FavoritesProvider";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Corretaje inmobiliario en Viña del Mar, Reñaca y Santiago`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "corredora de propiedades",
    "casas en venta Reñaca",
    "departamentos Viña del Mar",
    "arriendo Concón",
    "tasación de propiedades",
    "inmobiliaria Chile",
    "propiedades frente al mar",
  ],
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Propiedades de autor en la costa`,
    description: siteConfig.description,
  },
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-CL"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <CurrencyProvider>
          <FavoritesProvider>
            <a
              href="#contenido"
              className="sr-only-focusable absolute left-4 top-4 z-[100] rounded-sm bg-navy-700 px-4 py-2 text-sm text-white"
            >
              Saltar al contenido
            </a>
            <Header />
            <main id="contenido" className="flex-1">
              {children}
            </main>
            <Footer />
          </FavoritesProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
