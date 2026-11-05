# Axion Vanguard — Corretaje inmobiliario

Sitio web de **Axion Vanguard**, corredora de propiedades con base en Viña del Mar, Chile.
Venta, arriendo, tasación y gestión de propiedades de autor en Reñaca, Concón,
Valparaíso y Santiago.

**Producción:** https://axionvanguard.vercel.app

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19 + TypeScript + Tailwind CSS v4 |
| Mapas | Leaflet + react-leaflet (OpenStreetMap) |
| Tipografía | `next/font` — Cormorant Garamond (display) + Inter (UI) |
| Deploy | Vercel |

## Comandos

```bash
npm install
npm run dev              # servidor de desarrollo en http://localhost:3000
npm run build            # build de producción
npm run start            # sirve el build
npm run lint             # ESLint
npm run typecheck        # tsc --noEmit
npm run audit:contrast   # auditoría WCAG de contraste sobre un sitio en vivo
npm run shots            # capturas de escritorio y móvil
```

### Herramientas de QA visual

Con Playwright se incluye un verificador de contraste que recorre el DOM,
resuelve el color de fondo efectivo de cada texto (incluidos fondos
translúcidos) y calcula la relación WCAG 2.1. Sirve para detectar regresiones
como texto blanco sobre fotografía clara.

```bash
npm run audit:contrast -- https://axionvanguard.vercel.app "/,/propiedades" mobile
npm run shots -- https://axionvanguard.vercel.app
```

`audit:contrast` acepta la URL base, las rutas separadas por comas y
`desktop` o `mobile`.

## Rutas

| Ruta | Descripción |
|---|---|
| `/` | Home editorial: hero, destacados, servicios, zonas, equipo, FAQ |
| `/propiedades` | Listado con filtros avanzados, buscador por mapa y *draw zone* |
| `/propiedades/[slug]` | Ficha: galería, precio, calculadora hipotecaria, mapa, agente |
| `/valoracion` | Simulador de tasación (lead magnet) con resultado *gated* |
| `/publicar` | Wizard de publicación en 6 pasos |
| `/servicios` | Compra-venta, arriendo, inversión y administración |
| `/nosotros` | Equipo, valores y cifras |
| `/contacto` | Formulario y datos de contacto |
| `/panel` | Panel del propietario (métricas, leads, reportes) |
| `/favoritos` | Propiedades guardadas en localStorage |

## Decisiones de producto

Patrones tomados de los mejores portales de corretaje (ver
[`INFORME-UX-UI-REFERENCIAS.md`](./INFORME-UX-UI-REFERENCIAS.md)):

- **Idealista** — buscador por mapa con dibujo de zona poligonal y estado de la
  propiedad como faceta de primer nivel.
- **Zonaprop** — gastos comunes siempre en línea separada con su propia moneda;
  *spec string* compacta de una línea; URLs de filtro legibles y compartibles.
- **Housell** — simulador de tasación como imán de leads, con resultado
  bloqueado hasta entregar los datos de contacto.
- **Portal Inmobiliario** — publicación paso a paso para evitar el abandono.
- **The Agency** — dirección de arte editorial: hero a pantalla completa, serif
  de display y foco en estilo de vida.
- **Zillow** — galería con visor a pantalla completa y datos estructurados.
- **Houm** — flujo 100% online con firma y gestión de arriendos.

## Estructura

```
src/
  app/                 rutas (App Router)
  components/
    brand/             logo (SVG)
    home/              secciones de la home
    layout/            header y footer
    properties/        tarjetas, filtros, mapa, galería, calculadora
    providers/         contexto de moneda y favoritos
    publish/           wizard de publicación
    search/            buscador predictivo
    valuation/         simulador de tasación
  lib/
    data/               propiedades, comunas, agentes
    filters.ts          lógica de filtrado y serialización a URL
    valuation.ts        motor de tasación
    format.ts           formato de moneda (CLP / UF / USD)
```

## Datos

La capa de datos vive en `src/lib/data/` y está aislada del resto de la
aplicación para poder reemplazarse por una API o CMS sin tocar los componentes.
Los valores de UF y dólar se centralizan en `src/lib/site.ts` (`marketConfig`).

## Antes de producción

- [ ] Conectar el backend real (propiedades, tasaciones, leads).
- [ ] Reemplazar los datos de contacto de ejemplo por los reales.
- [ ] Reemplazar las fotografías de muestra por material de la operación.
- [ ] Configurar el dominio definitivo y los registros DNS.
- [ ] Revisar los textos legales con asesoría jurídica.
