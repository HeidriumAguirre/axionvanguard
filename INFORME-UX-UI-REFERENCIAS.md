# Informe UX/UI — 7 plataformas de corretaje como referencia para Axion Vanguard

**Objetivo:** patrón de navegación, filtros, precios/unidades, ficha de propiedad, lead magnets y rasgos de diseño replicables para un sitio nuevo de corredora chilena (segmento medio-alto/lujo) en Viña del Mar, Reñaca, Concón y Santiago.

**Fecha de investigación:** 4 de noviembre de 2026.
**Método:** `webfetch` directo sobre los dominios indicados + `websearch` de documentación oficial, páginas indexadas y Wayback Machine. Se marca explícitamente lo no verificable.

---

## ⚠️ Notas de verificación (leer primero)

| Plataforma | Estado de la fuente | Qué NO pude verificar |
|---|---|---|
| **Idealista** | `idealista.com` devuelve **HTTP 403** al fetch directo. Filtros verificados en `idealista.pt` (mismo código, versión en portugués) y en páginas `idealista.com` obtenidas por búsqueda indexada. | Panel de filtros renderizado en vivo; cifras de conversión. |
| **Zonaprop** | `zonaprop.com.ar` devuelve **HTTP 403**. Verificado vía captura de **Wayback Machine (18-sep-2025)** + contenido indexado en buscadores. | Contenido expandido del panel "Más filtros" (superficie, estado). **La ruta `/_property/` NO existe como patrón de URL de Zonaprop** (ver §2.a). |
| **Housell** | **El dominio `housell.com` hoy está estacionado y muestra contenido de spam** (juego de slots en indonesio). La sociedad "Housell Inmo Online Services SLU" figura **"en liquidación"** en registros mercantiles. Todos los datos de abajo provienen de **capturas de Wayback Machine** (home jun-2023; tasación feb-2024). | Listado de compra activo, ficha de detalle de propiedad, panel completo de filtros. |
| **Portal Inmobiliario** | Fetch directo OK (home, landing de publicación, ficha de propiedad, páginas de listado). | Campo de gastos comunes en ficha; filtros de dormitorios/baños/superficie como facetas del panel lateral. |
| **The Agency** | Fetch directo OK (home + ficha de 1357 Laurel Way). | Valores de la tabla "Property Details" (se renderizan por JS; solo se verificaron las **categorías**). |
| **Zillow** | `zillow.com` fetch OK en home, FAQ 3D Home y news; el listado y la ficha son JS/anti-bot. Verificado vía **Zillow Help Center + zillow.com/learn + zillow.com/news + zillow.com/3d-home** (todo de primera línea). | Panel de filtros renderizado en vivo; cifra de HOA en la ficha. |
| **Houm** | Fetch directo OK (home + ficha de propiedad). El listado es 100 % JS. | **Panel de filtros del buscador** (precio/dormitorios/superficie/amenities/estado). |

---

## 1. Idealista (España)

### (a) Estructura de navegación y páginas
- **Nav superior:** `Comprar | Alquilar | Obra nueva` como control segmentado (no un menú de catálogo) + buscador global. Debajo, en listados: `Relevancia | Mapa` (alternancia lista/mapa), `Filtros`, y un bloque de chips de filtros activos (`Filtros 2 → Ver X viviendas → Borrar filtros`).
- **Filtros en columna izquierda, plegables** ("Desplegar / Ver más / Ver menos"), con contador de resultados por faceta (`Zonas en Madrid`, `Chueca-Justicia 39`).
- **Taxonomía jerárquica:** provincia → distrito → barrio → zona. Cada barrio tiene su propia landing `/venta-viviendas/madrid-corredor-del-henares/mapa`.
- **Páginas:** ficha de anuncio, mapa por zona (`/mapa`), landing de barrio, landing de ciudad, landing de tipo ("Pisos y casas de lujo"), páginas por estación (Renfe Cercanías), páginas de providers ("Inmobiliarias en Madrid provincia"), y un bloque SEO de enlaces a barrios/zonas.
- **Servicios en footer:** buscador principal, app, Pisos de bancos, Vivienda protegida/VPO, Pisos compartidos, Certificado de inquilino no moroso, Oportunidades de inversión, Rentalia, Informe de precios, idealista maps, Pisos y casas de lujo, Seguro Garantía de Inquilino.
- **Herramientas separadas:** `idealista/maps`, `idealista/data`, `idealista/news`, `certificadoenergetico`, simulador de tasación.

### (b) Controles de filtrado del listado (verificados, `idealista.com/pro/*` y `idealista.pt`)
| Faceta | Opciones |
|---|---|
| **Tipo de operación** | Comprar · Alquilar · Obra nueva |
| **Tipo de inmueble** | Obra nueva · Viviendas · Oficinas · Locales o naves · Traspasos · Garajes · Terrenos · Trasteros · Edificios |
| **Precio** | Min/Max con escala predefinida (60.000 → 3 millones → "Sin límite") |
| **Tamaño (superficie)** | Min/Max m² (60 → 600 m², sin límite) |
| **Tipo de vivienda** | Pisos/Áticos/Dúplex; Casas: Independientes/Pareados/Adosados/Rústicas/Finca/Chalet terreno |
| **Situación de la vivienda** | Nuda propiedad · Alquilada con inquilinos · Ocupada ilegalmente · Disponible |
| **Habitaciones** | 0 (estudios) · 1 · 2 · 3 · 4+ (o T0–T4+) |
| **Baños** | 1 · 2 · 3+ |
| **Estado** | **Obra nueva · Buen estado · A reformar** |
| **Características (amenities)** | Aire acondicionado · Armarios empotrados · Ascensor · Balcón/Terraza · Exterior · Garaje · Jardín · Piscina · Trastero · Vivienda accesible · **Vivienda de lujo** · **Vistas al mar** |
| **Planta** | Última planta · Plantas intermedias · Bajos |
| **Eficiencia energética** | Alta · Media · Baja |
| **Multimedia** | Con plano · Con visita virtual |
| **Tipo de anunciante** | De bancos |
| **Fecha de publicación** | Indiferente · Últimas 48 h · Última semana · Último mes |
| **Orden** | Relevancia · Baratos · Recientes · Precio más alto · Precio más bajo · (demanda alta/baja, bajada de precio) |

### (c) Precios y unidades
- **Moneda:** EUR. En la tarjeta se muestra precio + **precio por m²** (ej. `180.000 €` / `905 €/m²`).
- **Gastos:** la ficha tiene línea propia: **`Gastos de comunidad: 35 €/mes`** (o "Gastos de comunidad incluidos" en arriendo).
- **Simulador de hipoteca embebido** en la ficha: Precio → Ahorro aportado → Plazo en años → Tipo de interés (fijo/variable) → cuota mensual. Convierte el precio en "cuota mensual", que es lavariable de decisión real del comprador.
- **Dos CTAs de precio en la ficha:** `Hacer una contraoferta` y `Recibir aviso si baja de precio`.

### (d) Ficha de detalle
Galería (fotos · vídeos · planos · visita 3D) → cabecera (precio, €/m², m², hab., planta, ascensor) → **Características básicas** (m² construidos/útiles, hab., baños, estado "Segunda mano/buen estado" o "para reformar", año de construcción) → **Edificio** (planta, ascensor, exterioridad) → **Equipamiento** → **Certificado energético** (kWh/m²·año + kg CO₂/m²·año + etiqueta visual) → bloque **Precio** (precio, €/m², gastos de comunidad, contraoferta, aviso) → **Ubicación** (mapa + jerarquía) → **Estadísticas** (nº de visitas y contactos del anuncio) → **Pregunta al anunciante** (chat con nombre de persona) → **Anunciante** (profesional, teléfono, chat, `Recibir inmuebles similares a este`) → enlaces SEO a otras viviendas del barrio.

### (e) Lead magnets
1. **"Dibujar tu zona de búsqueda"** — polígono dibujado sobre el mapa (herramienta `Dibujar`) + `Zonas de interés` predefinidas con conteo de anuncios.
2. **Simulador de tasación** (`Valora gratis cualquier inmueble`) — lead magnet de Proprietarios.
3. **Alertas / Guardar búsqueda** — activación de avisos por cambios de precio o nuevos anuncios.
4. **Servicios monetizados como captura:** certificado energético gestionado (pago), "Pon tu anuncio gratis" / Área del propietario, informe de precios, idealista maps, seguro de garantía de inquilino.
5. **Anti-fricción de contacto:** chat con nombre real, contraoferta en 1 clic, "Recibir inmuebles similares", perfil de contacto del usuario (control de privacidad).

### (f) 2–3 rasgos de diseño a copiar
1. **Dibujo de zona sobre el mapa** con polígono editable + polygons de "Zonas de interés" ya definidos. Convierte la búsqueda por commune/barrio (irrelevante para Reñaca/Concón) en "la zona que dibujé". Es la mejor defensa frente a un catálogo plano.
2. **"Estado" como faceta de primer nivel de 3 valores** (Obra nueva / Buen estado / A reformar) + booleanos de valor separate (**Vivienda de lujo**, **Vistas al mar**). En un mercado de stock tan heterogéneo como Viña del Mar, el estado es la faceta que más reduce el lote irrelevante; los booleanos de valor capturan el segmento lujo sin separar el sitio.
3. **Precio + €/m² + gastos de comunidad visibles en la misma pantalla y simulador de cuota embebido.** En Chile el equivalente es **UF + $ + gastos comunes + cuota de crédito**.

---

## 2. Zonaprop (Argentina)

> **Corrección sobre la ruta solicitada:** `https://www.zonaprop.com.ar/_property/` **no es un patrón de URL real de Zonaprop** (404 en Wayback, 403 en vivo). Los patrones reales son `/casas-venta-escobar.html`, `/departamentos-alquiler-escobar.html`, `/inmuebles-venta-loma-verde.html`, `/inmuebles-alquiler-escobar-mas-de-5-ambientes.html`, y las fichas en `/propiedades/clasificado/<slug>-<id>.html` y `/propiedades/emprendimiento/<slug>-<id>.html`.

### (a) Estructura de navegación y páginas
- **Mega-menú superior con 3 ramas de operación:** `Comprar` (Ubicación / Tipo de propiedad / Ambientes / Otras operaciones) · `Alquilar` (mismas ramas + `Temporal`) · `Servicios`.
- **Navegación por embudo, no por taxonomía plana:** `Servicios` (Ayuda, **Publicá tu aviso**, **¿Cuánto vale tu propiedad?**, **Guía de barrios**) → `Zonaprop te explica` (guías para comprar/vender/alquilar) → `Números del mercado` (ZP Index de CABA, GBA, Rosario, Córdoba) → `Novedades`.
- **Barra de cuenta:** Notificaciones · Mis contactos · Publicar · Ingresar. + `Buscar inmobiliarias` (directorio de agencias).
- **SEO de barrio:** bloque "Principales barrios con casas en venta en Escobar" con `X casas disponibles` y **precio medio en USD por barrio** — cada barrio es una landing indexable.
- **Toolbar del listado:** `Comprar` (operación) · `Casa` (tipo) · `Amb | Dorm` · `Precio` · **Más filtros** + `Crear alerta` + `Ordenar` + `Ver mapa`.

### (b) Controles de filtrado del listado (verificados en captura 18-sep-2025)
| Faceta | Controles |
|---|---|
| **Operación** | Comprar · Alquilar · Temporal (rama propia en el mega-menú) |
| **Tipo de propiedad** | Casa · Departamento · Terrenos · Local Comercial · PH · Quinta Vacacional · Bodega-Galpón · Depósito · Oficina comercial |
| **Ambientes** | 1 · 2 · 3 · 4 · 5+ |
| **Dormitorios** | Combinado con ambientes en un solo control: `Amb \| Dorm` |
| **Precio** | Control dedicado `Precio` |
| **Superficie** | Presente como dato en tarjeta (`604 m² tot.`); **no verifiqué su control en el panel expandido** |
| **Amenities** | Secciones SEO de facetas verificadas: *"Números de baños y estacionamientos"* (1+ baños, 1+ cocheras) y *"Características y amenidades"* (balcón, jardín, patio, terraza, pileta, solarium, gimnasio, parrilla, SUM, laundry, calefacción, quincho, cochera, etc.) |
| **Estado** | Existe la faceta **`a estrenar`** como parámetro de URL (`...-a-estrenar-orden-precio-ascendente.html`); **no verifiqué un control de "estado" completo** (bueno/para reformar) |
| **Orden** | Precio ascendente/descendente, relevantes, etc. (`orden-precio-ascendente`) |
| **Alertas** | `Crear alerta` en el listado |

### (c) Precios y unidades — el hallazgo central
- **Multi-moneda real con etiqueta explícita por línea:** el precio de venta se publica en **USD** (`USD 249.000`) y las **expensas en pesos** (`$ 350.000 Expensas`) — a veces en la **misma tarjeta**, con símbolos distintos y en **líneas separadas**.
- En alquiler conviven los tres: canon en USD, expensas en ARS, y avisos de temporada con precios por período.
- **Precio medio por barrio en USD** en los bloques SEO (`Precio medio USD 400.517`) y **USD/m²** en los informes ZP Index (`USD 2.471 por m²`).
- **Desconto de precio visible:** flecha con `11%` sobre la tarjeta cuando el vendedor bajó el precio.
- **Precio oculto:** `Consultar precio` en lugar de un número (trigger de contacto).
- **Gastos comunes NO se mezclan con el precio:** "Expensas" siempre es una línea separada con su propio símbolo y la coletilla "sujeto a verificación".

### (d) Ficha de detalle
Galería con contador (`1/31`, `50 fotos`) → badges (`Super destacado`) → precio + expensas → **spec string de una línea**: `604 m² tot. 6 amb. 3 dorm. 2 baños 3 coch.` → `Ver mapa` → descripción larga → **logo de la inmobiliaria + nombre del corredor + matrícula** (cucicba / cmcpsi) → `WhatsApp` + `Contactar` (datos ocultos tras clic, "Ver datos") → **aviso legal extenso** (medidas, expensas y fotos "no contractuales", Ley 25.028, etc.) → CTA de financiamiento embebido en el cuerpo: *"Comprá la casa que querés... hasta el 30%... Simulá tu cuota en Lendar"*.

### (e) Lead magnets
1. **`¿Cuánto vale tu propiedad?`** (valuador) — tasación gratuita como puerta de entrada de propietarios.
2. **`Crear alerta`** — captura por suscripción con umbral de precio.
3. **`Mis contactos`** — bandeja central de conversaciones con interesados.
4. **`Guía de barrios`** y **ZP Index** — contenido de datos gratuito que genera tráfico orgánico y posiciona la marca ("Zonaprop te explica").
5. **Directorio `Buscar inmobiliarias`** — captura de DPS de corretores.
6. **CTA de crédito en la ficha** (Lendar) —rating de preaprobación como calificador de la oportunidad.
7. **WhatsApp** como canal de respuesta inmediata (no solo formulario).

### (f) 2–3 rasgos de diseño a copiar
1. **Gastos comunes como línea separada con moneda propia en cada tarjeta.** En Chile: `UF 3.900` + `$ 85.000 Gastos comunes`. Nunca fusionar el total mensual con el precio de venta sin etiquetar.
2. **Spec string compacta de una línea** (`m² tot. · amb. · dorm. · baños · coch.`) que permite escanear 20 tarjetas sin abrir cada una. Altamente copiable y muy superior a las viñetas largas.
3. **URLs de filtro legibles y compartibles + "Crear alerta" en la misma toolbar.** Cada combinación de filtros es una URL indexable (`/departamentos-venta-villa-dominico-con-dormitorio-en-suite-3-ambientes.html`), lo que multiplica el SEO sin costo.

---

## 3. Housell (España) — **referencia archivada**

> ⚠️ **Housell está en liquidación.** El dominio `housell.com` fue estacionado y hoy muestra contenido de spam. **No existe sitio activo que auditar.** Todo lo que sigue proviene de capturas del **Wayback Machine** (home 01-jun-2023; `/valoracion-inmuebles/` 25-feb-2024). Sirve como **referencia de mecánica de lead magnet**, no de producto.

### (a) Estructura de navegación y páginas
- **Mega-menú en 3 bloques, orientado al vendedor:**
  - `Vender` → Planes (Óptima / Alianza / Flex) · Nuestros expertos inmobiliarios · Casos de éxito · **Vender en tu zona** (landing por ciudad: Madrid, Barcelona, Valencia, Granada, Zaragoza…).
  - `Comprar` → Pisos y casas en venta (landing por ciudad/provincia) · Ventajas de comprar con Housell · **Visitas virtuales**.
  - Servicios (Nuestra app · Partners) · **Hipotecas** (calculadora) · Nosotros (Quiénes somos · Trabaja · Blog · FAQ · Sala de prensa).
- **CTA global permanente:** `Valora tu casa` (aparece en el menú y como botón en el hero).
- **SEO masivo y programático:** `/pisos-en-venta/{provincia}/` + `/pisos-en-venta/{provincia}/{municipio}/` + `/pisos-en-venta/{provincia}/{municipio}/piso/` — cientos de landings, más un bloque "Ubicaciones más vendidas".
- **Separación vendedor/comprador** con páginas de planes, casos de éxito y FAQs distintas por intención.

### (b) Controles de filtrado del listado
**Verificado** en las URLs indexadas de `/pisos-en-venta/`: parámetros `i` (id de búsqueda), `n` (nombre de zona), `o` (orden, p. ej. `sale_price_asc`), `p` (página), `pr` (**rango de precio**, p. ej. `160000-1100000`), `t` (tipo de búsqueda, p. ej. `geo_city`).
- **Lo verificado:** rango de precio, orden por precio, paginación, búsqueda geográfica por ciudad/provincia.
- **NO verificado:** panel de filtros con dormitorios, superficie, amenities o estado en el buscador de compra. **No lo puedo afirmar.**
- Donde sí es verificable el **estado** es en el **simulador de tasación**: `Buen estado / A reformar / Obra nueva`.

### (c) Precios y unidades
- **EUR exclusivamente.** Sin multi-moneda ni UF.
- El eje de precio real de Housell no era la propiedad sino el **costo del servicio**, y ahí era extremamente explícito:
  - `Plan Flex` — desde **29 €/mes** (suscripción, sin permanencia)
  - `Plan Óptima` — desde **1.990 €** (pago al inicio, incluye firma en notaría)
  - `Plan Alianza` — desde **4.995 €** (se paga **solo si vendes**, incluye gestión de visitas)
  - Calculadora "Ahorra más de 12.000 €" comparando **"Comisión de agencia tradicional" vs. "Con nosotros desde 29 € (IVA incluido)"**.
- **Calculadora de hipoteca** con cuadro de amortización (gratuita, en el menú).

### (d) Ficha de detalle de propiedad
**No verificada.** Housell operaba con un modelo seller-first; la ficha de venta era servicio. Lo que sí quedó documentado en el contenido de los planes (captura home): `Creación y publicación del anuncio en los principales portales`, `Acceso a la app`, `Filtrado de llamadas para que solo te lleguen compradores de calidad`, `Reportaje fotográfico profesional + plano`, `Negociación del precio de venta`, `Gestión de todo el papeleo y la documentación`, `Gestión de visitas` (solo Alianza), `hasta la firma en notaría`. La existencia de la sección `Visitas virtuales` confirma tours virtuales en las fichas.

### (e) Lead magnets — **el corazón de Housell**
**"¿Cuánto vale mi casa? Simula la tasación online"** (`/valoracion-inmuebles/`), como wizard de 7 pasos:
1. **Dirección** — autocomplete ("empieza a escribir tipo, nombre y número") · botón `Empezar`
2. **Tipo de vivienda** — Piso · Dúplex · Ático · Casa · Adosado · Pareado · Casa de pueblo · Otro
3. **Metros cuadrados**
4. **Estado de la vivienda** — Buen estado · A reformar · Obra nueva
5. **Nº de habitaciones**
6. **Nº de baños**
7. **¿Quieres vender o comprar?** — Comprar · Vender · Ambas → botón `VALORAR`

**El resultado está bloqueado**: la pantalla "Valoración realizada" exige **crear cuenta** (nombre, email, teléfono, contraseña) o iniciar sesión antes de ver la cifra. El valor se calcula con **UrbanData Analytics (UDA)** sobre **25 inmuebles comparables de la misma tipología a menos de 700 m y con superficie ±30 %**.

Lead magnets secundarios: calculadora de hipoteca con amortización, calculadora de ahorro vs. comisión tradicional, Trustpilot (4,6/5 sobre +4.400 opiniones), "Casos de éxito" con testimonios, landings "Vender en tu zona" por ciudad, planes con precios visibles (el precio público es el gancho).

### (f) 2–3 rasgos de diseño a copiar
1. **Tasación instantánea con resultado gated detrás de un registro.** El usuario entrega dirección + datos, ve el resultado y tiene que crear cuenta para verlo. Es el patrón de lead magnet más rentable de toda la lista y es **directamente transferible a Chile** (estimador de "precio de salida de venta" y "precio de arriendo" en Viña/Reñaca/Concón, con comparables por radio y superficie).
2. **Pregunta de intención "¿Quieres vender o comprar?" dentro del wizard.** Bifurca la experiencia y asigna un CTA distinto (vender → agendar visita / comprar → ver propiedades). Evita que el tasador reciba demanda y el comprador reciba oferta.
3. **Transparencia radical de costos cuantificada en euros** (29 €/mes vs. 15.980 € de comisión tradicional). En Chile: "Comisión de corretaje tradicional 5% vs. Axion Vanguard: fee fijo" en un bloque interactivo. Convierte objeción de precio en argumento.
   > Nota: copiar la mecánica, **nunca la marca** (Housell está en liquidación y su modelo de comisión fija no es transferible al mercado chileno sin revisión legal).

---

## 4. Portal Inmobiliario (Chile)

### (a) Estructura de navegación y páginas
- **Nav superior:** `Inicio` · `Historial` (búsquedas guardadas) · `Planes para profesionales` · `Ayuda`; a la derecha `Crea tu cuenta` · `Ingresa` · **`Publica tu propiedad`**.
- **Home:** hero slider (patrocinado: "Subsidio a la tasa", Santander crédito hipotecario, Realtors, Inversión VIP-TRX, Subsidios al dividendo) → **bloque de búsqueda** con `Tipo de operación` (Venta) + `Tipo de propiedad` (Departamentos) + `Buscar` + **`Buscar en Mapa`** → **`Busca con el asistente`** (lenguaje natural: *"Descríbelo como quieras: barrio, habitaciones, precio"*) → **`Buscar por código de propiedad`** → `Proyectos destacados` → `Propiedades destacadas` → `Las mejores inmobiliarias` → `Las mejores corredoras` → `Descubre` → `Consejos inmobiliarios` (blog) → `Propiedades en Chile` (tiles por ciudad: **Viña del Mar, Concón, Santiago…**) → `Lo más buscado` (bloque SEO de largos).
- **URLs de listado por dimensión:** `/venta/departamento/vina-del-mar-valparaiso`, `/arriendo/oficina/providencia-metropolitana`, `/arriendo-de-temporada/departamento/...`. Landing de corredora: `/tienda/<nombre>` y `/tiendas-oficiales/show`.
- **Ficha de detalle:** breadcrumb de 6 niveles (`… > Venta > Propiedades usadas > RM > Las Condes > Barrio El Golf`).
- **Flow de publicación:** landing dedicada "Publica tu propiedad" que anuncia explícitamente **"4 pasos para publicar"** con una ilustración por paso, y enlaza al formulario `/publicar-inmueble/new` (que exige login de Mercado Libre).

### (b) Controles de filtrado del listado (verificados en páginas `_Desde_..._NoIndex_True_PROPERTY*AGE_...`)
| Faceta | Controles |
|---|---|
| **Inmueble** | Departamento · Casas · Oficinas · Locales · Sitios · Parcelas · Terrenos · Bodegas · Industriales (+ "Mostrar más"), **con conteo por tipo** |
| **Operación** | Venta · Arriendo · Arriendo temporal (con conteo) |
| **Modalidad** | Propiedades usadas · Proyectos |
| **Ubicación** | RM · Valparaíso · Los Lagos · La Araucanía · Biobío · Coquimbo · Maule · Los Ríos… (con conteo) |
| **Precio** | Selector de **moneda `$` / `UF` / `US$`** + rangos con conteo ("Hasta $ 70.000.000 (84.402)") |
| **Detalles de la publicación** | Publicados hoy (942) |
| **Multimedia** | Con tour virtual (223) |
| **Visita al inmueble** | Con solicitud de visita · Coordinar con el vendedor |
| **Amenities** | Parámetros de URL del tipo `HAS*GYM`, `HAS*HALF*BATH`, `HAS*GUEST*PARKING` → **facetas booleanas de amenidades** verificadas |
| **Antigüedad** | `PROPERTY*AGE_2a-10años`, `3a-4años`, `4a-10años`, `7a-50años` → **rango de antigüedad** verificado |
| **Orden** | Más relevantes · Publicados esta semana · Destacados |
- **No verificado:** si dormitorios, baños y superficie tienen control propio en el panel lateral (los tres aparecen sí o sí en la tarjeta). Quedan dentro del bucket "Más filtros" y del sistema de atributos.

### (c) Precios y unidades
- **Multi-moneda con selector explícito `$ / UF / US$`** en el filtro de precio. La tarjeta muestra la unidad tal como la define el vendedor: `UF 3.900`, `$ 2.300.000`, `Desde UF 2.483`.
- **Referencia de precios en la ficha:** la ficha muestra un bloque **"Referencia de precios"** con 4 precios comparables en UF (`UF 5.175 / 1.739 / 5.864 / 9.990`) y un bloque **"Precio por m²"** que contrasta `Esta propiedad: 136 UF/m²` contra `Promedio en la zona: 152 UF/m²`.
- **Gastos comunes:** no pude confirmar un campo de gastos comunes en tarjeta o ficha de PI. **Queda como verificación pendiente.**
- **Financiamiento:** "Simula tu Crédito Hipotecario" (Santander) con % a financiar y valor final del dividendo.

### (d) Ficha de detalle (verificada: MLC-2191203197)
Breadcrumb de 6 niveles → `Compartir` / `Agregar a favoritos` → galería (`Imagen N de 12`, `12 Fotos`) → botón **WhatsApp** → `Publicado por Yelcho Propiedades` → **Referencia de precios** (4 comparables en UF) → **Precio por m²** (propiedad vs. promedio de zona) → **Información de la corredora** (logo, nombre, reseñas —incluye el caso "No tenemos suficientes opiniones.") → **Simulador de crédito hipotecario** (Santander) → tabs de **contexto de barrio: Transporte / Educación / Áreas verdes / Comercios / Salud**, con **Estaciones de metro y distancia real** (`Alcántara 4 mins - 344 metros`, `Escuela Militar 7 mins - 512 metros`) → `Publicación #2191203197` → `Denunciar` → bloque de **consejos de seguridad anti-fraude** (nunca adelantes de dinero sin ver, no uses servicios de pago anónimos) → **inmuebles similares**.

### (e) Lead magnets
1. **Simulador de crédito hipotecario embebido en la ficha**, con la promesa explícita *"un ejecutivo se pondrá en contacto contigo"* → conversor de velocidad a reunión comercial.
2. **"Referencia de precios" + "Precio por m² vs. promedio de la zona"** — inteligencia de mercado gratuita que da credibilidad inmediata al precio y evita el ida y vuelta por WhatsApp.
3. **Buscador en lenguaje natural** ("Descríbelo como quieras: barrio, habitaciones, precio") + búsqueda por código de propiedad.
4. **Cuentas con historial y favoritos** (retención / lead recurrente).
5. **Contenido de Density de demanda:** banners de suscribidios al dividendo, crédito hipotecario Santander, y "Compra y reserva tu propiedad online" — capturan demanda masiva y la derivan al producto.
6. **Oferta a DPS:** "Planes para profesionales", "Publica tu propiedad", tiendas de inmobiliarias y corredoras.

### (f) 2–3 rasgos de diseño a copiar
1. **Publicación en 4 pasos ilustrados** (`4 pasos para publicar`) en la landing, con una imagen por paso. Reduce la fricción del lado de la oferta (los propietarios de Axion Vanguard) y, por lo tanto, la profundidad del inventario. Es la columna vertebral del marketplace.
2. **Precio por m² propio vs. promedio de la zona, más 4 precios comparables en UF.** Convierte un dato aislado en una tesis de inversión. Imprescindible para un cliente medio-alto que compara seis propiedades en el mismo jornada.
3. **Módulo de entorno con distancias reales a metro, escuelas y áreas verdes** (`4 mins - 344 metros`). En Reñaca/Concón/Viña, el acceso a Costanera y aSansana es el factor de decisión #1; mostrarlo en la ficha es un diferenciador directo.
4. *(Extra)* **Selector de moneda `$ / UF / US$`** en el filtro de precio con **UF como unidad mostrada por defecto en la tarjeta**.

---

## 5. The Agency (EE.UU.)

### (a) Estructura de navegación y páginas
- **Nav superior en 6 entradas + burger:** `BUY · SELL · RENT · AGENTS · REGIONS · SERVICES · CAREERS`.
- **Taxonomía de listados codificada en la URL:** `/properties/sale/rental-false/status-active;pending/type-Single%20Family;Condominium;Townhouse;Co_op;Condop;Apartment;Multi_Family;Land;Commercial;Farm/dsort-cl` → cada combinación es una landing indexable (patrón `;` y `%20`).
- **Páginas:** home, `/sell` (captación de propietarios), `/real-estate-agents`, `/real-estate-offices`, `/regions` (landing por región: Vancouver, The Netherlands, San Francisco & Marin, Marbella, Sotogrande, Providenciales…), `/new-developments`, `/our-services`, `/about-us`, `/press`, `/magazine`, `/blog`, y landings `/region/<slug>`.
- **Hero con un solo campo de búsqueda** que acepta *"a location, address, listing ID, or agent"*.
- **Secciones editoriales:** `GLOBAL REGIONS`, `FEATURED LISTINGS` (con copy "We'll find the *home,* you'll write the *stories*"), `The Agency *Art House*`, `The Agency *Magazine*`, `FEATURED NEW DEVELOPMENTS`, `FEATURED *PRESS*`, `From *The Agency Journal*`.

### (b) Controles de filtrado del listado
**Verificado a partir de la sintaxis de URL del sitio en vivo** (no abrí el panel renderizado):
- `rental-true|false` → operación (venta / arriendo)
- `status-active;pending` → estado del anuncio
- `type-<lista>` → tipo: Single Family, Condominium, Townhouse, Co-op, Condo, Apartment, Multi Family, Land, Commercial, Farm
- `price-10000000` → rango de precio
- `dsort-cl` / `dsort-n` → orden (precio asc / novedades)
- `corpowned` → propiedades corporativos
- `lat-<min>-<max>/lon-<min>-<max>` → **bounding box de mapa** (búsqueda por área dibujada)
- **No verificado:** si el panel renderizado expone dormitorios, baños, superficie, amenities o antigüedad de forma explícita.

### (c) Precios y unidades
- **USD exclusivamente** (`$32,800,000`, `$10,995,000`, `$3,900,000`). Sin UF ni CLP.
- La ficha muestra el precio **junto al MLS# y a los specs en una sola franja**: `5 Bed · 9 Bath · 13,400 Sqft. · Single Family · Active · 26846365 MLS#`.
- **Gastos/HOA:** la ficha tiene una tabla "Property Details" cuya última categoría es **`Financial Considerations`** — es donde deberían ir HOA e impuestos. **No pude verificar su contenido** (los valores se renderizan por JS y llegaron como placeholders). **Queda pendiente.**
- **Precios de propiedades vendidas:** se ocultan tras `Sign In or Sign Up for a free account to view Sold listings` — registro como peaje para el histórico.

### (d) Ficha de detalle (verificada: 1357 Laurel Way)
Barra superior: `Property Info | Map | Photos | Print | Saved | Share Listing` → H1 con dirección y `(Sold on )` → precio → `Source MLS Verified` → `Listing Broker` → galería **1/65** → franja de specs → **"Property Description"** (2 párrafos narrativos: enclave, materialidad, luz, niveles, amenidades — sin lista de specs) → **"Property Videos and Tours"** → **"Floor Plan"** → **"Property Details"** agrupada en 11 categorías (General · Amenities · Overview · Interior Features · Exterior Features · Structure · Size & Lot · Utilities · Schools · Building Features · Financial Considerations) → **"Flyers"** (PDF descargable) → **"Presented by"** (card de agente: nombre, título, celular, oficina, email) → **"Request Info / Schedule a Property Tour"** (nombre, email, teléfono, mensaje, checkbox *"I am currently working with an agent"*, fecha + slots de 30 min de 8:00 a 20:00) → `Property Map` → `Similar Listings` → **bloque "Discover the Luxury Lifestyle"** (Press / Magazine / Blog) → `Similar Listings` con badges (`Open House`, `Price Reduced`, `New Listing`, `Exclusive`, `Virtual Tour`, `Rental`).

### (e) Lead magnets
1. **Newsletter "Join The Club"** (cadencia semanal) — captura de email de topo.
2. **"Let's Connect"** con campo **"Best Time to Call"** (cualquier momento / mañana / tarde / noche) y selector de agente → califica preferencia de contacto.
3. **"Request Info / Schedule a Property Tour"** con slots de media hora → agendamiento, no solo formulario.
4. **"Red Paper Annual Report"** — informe anual como activo derelations y de posicionamiento.
5. **Magazine** (`theagencymagazine.com`) + **Art House** — contenido de marca que atrae demanda no transactiva.
6. **Landing por región global** (`/regions`) — capta interés internacional de alta capacidad de gasto.
7. **Branding de prensa y cultura** (*Buying Beverly Hills* en Netflix, press releases) — autoridad de marca.

### (f) 2–3 rasgos de diseño a copiar
1. **Dirección de arte editorial, no de clasificados:** titulares con cursiva serigrafiada incrustada en el cuerpo (`Your window to the *world's finest* real estate`, `We'll find the *home,* you'll write the *stories*`, `Real estate isn't *just business.* *It's personal.*`), mucho espacio en blanco, paleta restringida y fotografía a sangre completa. Para un segmento medio-alto/lujo esto es lo que separa "corredora" de "portal". **Es la referencia #1 para la home de Axion Vanguard.**
2. **Un solo campo de búsqueda que acepta 4 intenciones** (ubicación, dirección, listing ID o agente). Elimina la fricción del primer paso.
3. **Descripción de propiedad como narrativa, no como ficha de specs** (contexto del barrio → materialidad → luz → niveles → amenidades). En el mercado chileno medio-alto, donde los listings son técnicamente correctos pero anónimos, este es el copy que genera el "wow" y las visitas.
4. *(Extra)* **"Presented by" con agenda de visitas en slots de 30 minutos** — convierte el lead en reunión agendada, con un checkbox que captura la etapa del comprador.

---

## 6. Zillow (EE.UU.)

### (a) Estructura de navegación y páginas
- **Nav superior:** `Buy · Rent · Sell · Get a mortgage · Find an agent` + `Manage rentals · Advertise · Get help · Sign in · Join`.
- **Footer-mega con ~70 ciudades** por producto (homes for sale, apartments for rent, mortgage rates) -> landings `/browse/homes/{state}/`, `/region-insights/`, `/zestimate/`, `/news/`, `/research/`, `/learn/`, `/tech/`.
- **Buscador:** mapa + lista simultáneos; el mapa es el centro (búsqueda por área, por escuela, por tipo de mapa).
- **Zillow 3D Home como producto con navegación propia:** `3D Home App · Interactive Floor Plans · Instructions · FAQ · 360 Camera Guide · Dashboard`.
- **Cuentas:** `Search · Updates · Favorites · Plan · Inbox` (barra flotante) — guardado de búsqueda y notificaciones.

### (b) Controles de filtrado del listado (verificados en Zillow Help Center + zillow.com/learn)
| Faceta | Controles |
|---|---|
| **Operación** | For Sale / For Rent / Sold + toggle de **agente vs. particular** ("Agent Listings / Other Listings") |
| **Listing Type** | Todas, obra nueva, foreclosures, "coming soon", for sale by owner |
| **Precio** | Rango (y, en arriendo, "Payment" mensual) |
| **Dormitorios / Baños** | Cualquiera / Studio / 1+ / 2+ / 3+ / 4+ / 5+ / 6+ |
| **Tipo de vivienda** | Casa, condo, townhouse, multi-family, manufactured, lot/land |
| **Más filtros ("More")** | **Vistas** (waterfront), **amenities** (aire acondicionado, lavandería in-unit, pileta, garaje, basement, estacionamiento, mascotas), **open houses**, **superficie (sq ft)**, **superficie de lote**, **año de construcción**, **días en mercado**, **max HOA**, **palabras clave** (chimenea, acabados de alta gama…) |
| **Mapa** | Zoom, tipo de mapa, **agregar áreas escribiendo en la barra**, **herramienta de dibujo (Draw) para delimitar tu propia área de búsqueda**, capa de **Schools** con nivel (elementary/middle/high), tipo (público/privado/charter), rating (GreatSchools) y **"View homes this school serves"** |
| **Orden** | Price high→low, Price low→high, Newest, Bedrooms, Bathrooms, Square Feet, Lot Size, Homes for You (recomendado) |
| **Presupuesto** | **BuyAbility** (filtra por capacidad de pago mensual) |

### (c) Precios y unidades
- **USD exclusivamente**; superficie en **sq ft** (13,400 Sqft.) y lote en acres/lot size.
- **Zestimate®** = estimación automatizada de valor de mercado (no tasación). Modelo estadístico + machine learning sobre **+110 millones de homes en EE.UU.**, con ~104 millones de Zestimates publicados. Entradas: características (sq ft, ubicación, dorm/baños), información en el mercado (precio, descripción, comparables, días en mercado) y fuera del mercado (tasaciones, ventas previas, registros públicos), más tendencias estacionales. **Rent Zestimate®** para canon mensual.
- **Precio por sq ft** visible en tarjeta y ficha.
- **HOA:** aparece como **filtro** ("max HOA"). El valor en la ficha no lo pude verificar.

### (d) Ficha de detalle
Galería de fotos + **Zillow 3D Home® tour** + **plano interactivo** + **Virtual Staging** + **SkyTour** (vuelo 3D del entorno) + vídeos. Precio + $/sqft + dorm/baños/sqft + lote + año de construcción + **Zestimate** + **historial de precios** + **historial de impuestos/avalúos** + **escuelas** (con rating) + **contacto del agente** + **"Request a tour"** + **calculadora de crédito (BuyAbility)** + **casas similares**. En **Zillow Showcase** (nivel premium): las fotos se agrupan lógicamente por habitación y **cada foto se enlaza a su posición en el plano interactivo**; las pestañas de media (fotos / plano / tour / video) **persisten visibles durante el scroll**; el tour 3D admite **navegación clic-en-cualquier-lugar**; cada tour incluye **link sin marca para el MLS** y **código iframe para embeber en el sitio del agente**.

### (e) Lead magnets
1. **Zestimate®** — el lead magnet histórico del sector: un dato gratuito que el usuario consulta una y otra vez y que además trae de vuelta a la ficha ( donde está el formulario de tour).
2. **Save Search + alertas instantáneas** (nuevos anuncios, bajas de precio) con frecuencia configurable — convierte la búsqueda en suscripción recurrente.
3. **Homes for You** — recomendaciones aprendidas del comportamiento del usuario (vista, guardado, filtros usados).
4. **BuyAbility** — el usuario declara su presupuesto de pago y el sistema filtra; no es un lead magnet en si, pero transforma la UX de búsqueda.
5. **Zillow Showcase** — producto premium que el agente paga, y que el comprador consume gratis; el Incentivo comercial del agente es la media enriquecida.
6. **Zillow 3D Home gratuito + embebible** — el agente lo usa como herramienta de captación en su propio sitio (lead magnet transferible a Axion Vanguard: tours embebibles en el landing del corredor).
7. **Find an agent + reviews de agentes** y **Get a mortgage / pre-approval** — embudos de servicio hacia comisión.

### (f) 2–3 rasgos de diseño a copiar
1. **Plano interactivo que enlaza cada foto con su lugar en el plano.** Convierte una galería en una herramienta de comprensión espacial, que es exactamente lo que necesita un comprador de 120–300 m² en Reñaca. **Dato propio de Zillow: los anuncios con plano interactivo generaron +49 % de guardados y +43 % de visitas de página vs. los que no lo tienen.** Ese es el argumento de negocio para invertir en esto.
2. **Pestañas de media persistentes + navegación clic-en-cualquier-lugar en el tour 3D**, para que cambiar de foto a plano a recorrido nunca pierda el punto de lectura.
3. **Herramienta "Draw" para dibujar tu propia área de búsqueda en el mapa** (misma idea que Idealista) —_copy de la mejor práctica de filtrado geográfico_.
4. *(Extra)* **Zestimate junto al precio**: un ancla de valor gratuita que da confianza inmediata y evita la objeción de "está caro".

---

## 7. Houm (Chile)

### (a) Estructura de navegación y páginas
- **Nav superior:** `Buscar propiedades` · **`Publicar para arriendo`** · **`Publicar para venta`** · `Más de Houm` (Ayuda, **Pagar arriendo**).
- **Home:** hero con claim (`Arrienda, vende, compra e invierte...`), **tabs `Arrendar | Comprar | Invertir`**, buscador de zona, carrusel de propiedades, tres pilares de propuesta (`Comodidad` / `Confianza` / `Simplicidad`), banda de cifras (**3 países**, **+20.000 propietarios**, **15 días**, **+600 publicaciones/semana**), bloque de beneficios al propietario, bloque de beneficios al inquilino, reseñas de Google (**4,4 / +1.700**).
- **Footer con navegación de servicio y de negocio:** `Publica para arrendar` · `Publica para vender` · **`¡Refiere y gana!`** · `¿Quiénes somos?` · **`Calcular arriendo o venta`** (`/cl/algoritmo-precio`) · **`Simulador de crédito`** (`/cl/simular-credito`) · `Un hogar para todos` (blog) · `Beneficios de clientes Houm` · **`Conviértete en un agente inmobiliario`** · **`Houm Aliados · Canje Corredores`** · **`Sé un Houmer fotógrafo`** · landings por ciudad `/cl/inmobiliaria-en-{santiago,concepcion,vina-del-mar,coquimbo,temuco}` · selector de país CL / CO / MX.

### (b) Controles de filtrado del listado
**No pude extraer el panel de filtros**: las páginas de listado son renderizadas íntegramente por JavaScript y el fetch devolvió solo el título. Lo que **sí** está verificado:
- **Operación y tipo** codificados en la URL: `/cl/arriendo-departamento-región-metropolitana/santiago/183446`, `/cl/arriendo-departamentos-region-metropolitana/santiago`, `/cl/arriendo-casa-región-metropolitana/maipú/161496`.
- **Geografía granular:** comuna + región (`Santiago`, `Ñuñoa`, `Recoleta`, `Maipú`, `La Cisterna`, `San Joaquín`).
- **Ficha con campos estructurados:** m² totales/útiles, dormitorios, baños, orientación, estacionamiento, bodega, mascotas, conexión a lavadora.
- **Amenities como lista explícita** en la ficha: cocina equipada, piscina, gimnasio, lavandería, quincho, salón de eventos, conserjería, ascensor.
- **NO verificado:** panel de filtrado por precio, dormitorios, superficie, amenities y estado en el buscador.

### (c) Precios y unidades
- **CLP** (`$455.000`, `$455.000/mes`). Sin UF en el precio de arriendo.
- **Gastos comunes como línea fija separada, con etiqueta y la palabra "aprox."** tanto en la tarjeta (`$110.000 Gastos comunes aprox.`) como en la ficha (bajo `Valor arriendo`).
- **UF sí aparece, pero para las comisiones**, y con IVA explícito:
  - `Pago único de 0.8 UF + IVA por Gastos Operacionales`
  - `El primer mes correspondiente al 50% del valor del arriendo + IVA por corretaje`
- **Costo total de Aragular explicitado en la ficha** — el usuario sabe exactamente cuánto le cuesta el servicio antes de hablar con nadie.
- **Test de i'd incomes:** `Puedes arrendar si tienes un ingreso mensual líquido de $1.274.000 (2.8 veces el arriendo)`.

### (d) Ficha de detalle (verificada: ID 183446)
Galería (fotos + video + "Ver más fotos") → breadcrumb → H1 → `Valor arriendo $455.000` → **`Gastos comunes aprox. $110.000`** → `Compartir` → `ID 183446` → `Reciente` → bloque **Características** (`45 m² totales / 43 m² útiles / 2 dormitorios / Norte / 2 baños / Admite mascotas / 1 estacionamiento / Sin bodega / Con conexión a lavadora`) → bloque **Amenidades** (8 ítems) → Descripción con `Leer más` → bloque sticky con precio + gastos + **`Agendar visita`** + badge **`Arrienda sin aval`** → módulo **`Conoce más de tu próximo arriendo en Santiago`** (Transporte / Supermercado / Áreas verdes / Hospital / Educación) → bloque **`Arrienda 100% sin aval`** → **`¿Qué necesito para arrendar?`** (ingreso mínimo 2,8× arriendo + ingresos complementarios de hasta 2 personas) → **`Documentos que necesitamos`** (3 últimas liquidaciones de renta; certificado de antigüedad laboral o contrato; últimas cotizaciones AFP; Carnet de Identidad Chileno; si eres independiente: F22 de los últimos 2 años + 3 últimas boletas de honorarios) → **`¿Cuánto cobra Houm por arrendar esta propiedad?`** (0.8 UF + IVA y 50% + IVA) → `Propiedades similares` → footer.

### (e) Lead magnets
1. **Simulador de precio de arriendo/venta** (`/cl/algoritmo-precio`) y **simulador de crédito** (`/cl/simular-credito`) como CTAs de navegación permanente — el sesgo de la casa es "dueño que quiere saber cuánto vale".
2. **"¡Refiere y gana!"** — referidos con recompensa.
3. **Publicación gratuitita sin exclusividad** + **sesión de fotos profesionales gratis** — captura de oferta con bajo costo de entrada.
4. **"Arrienda sin aval"** — elimina la barrera #1 del inquilino y, simultáneamente, el lead queda atrapado en el proceso de evaluación de riesgo de Houm.
5. **Agendar visita 100 % online** — el prospecto no espera respuesta.
6. **Programas de canal:** `Conviértete en un agente inmobiliario` (captación de DPS), `Houm Aliados · Canje Corredores` (alianzas), `Sé un Houmer fotógrafo` (fotógrafos como canal de distribución).
7. **Reseñas de Google verificables** (4,4 / +1.700) y **métricas de escala** (+20.000 propietarios, 15 días) — prueba social cuantificada en la home.

### (f) 2–3 rasgos de diseño a copiar
1. **Cero notaría en el flujo completo:** postulación → evaluación → reserva online → firma digital → entrega de llaves, con la estructura de costos en UF + IVA escrita en la ficha. En Chile esto es un diferenciador enorme frente al flujo notarial tradicional de arriendo.
2. **Gastos comunes siempre visibles como línea propia y rotulada** (`Gastos comunes aprox.`) en tarjeta y ficha. Para el inquilino chileno el número que decide es el flujo mensual total, no el canon.
3. **Auto-calificación del lead antes del contacto humano:** el bloque "necesitas $1.274.000 de ingreso (2,8× arriendo)" + la lista exacta de 5 documentos. Filtra y califica sin gastar minutos de corredor, y da al usuario una checklist accionable.
4. *(Extra)* **"Arrienda sin aval" como claim de portada** — convierte una fricción del mercado en producto.

---

# TOP 12 PRÁCTICAS A REPLICAR — ordenadas por impacto en conversión

| # | Práctica | Por qué convierte | Fuente | Implementación en Axion Vanguard |
|---|---|---|---|---|
| **1** | **Simulador de tasación instantánea con resultado gated tras registro** | Convierte tráfico anónimo en lead identificado con un micro-lead de altísima intención (¿cuánto vale mi casa?) sin coste de CAC. | **Housell** (`/valoracion-inmuebles/`) | Landing `/valoracion` con wizard: dirección (autocomplete de barrios Viña/Reñaca/Concón/Las Condes/Lo Barnechea) → tipo → m² → estado → dorm/baños → *¿quieres vender o comprar?* → resultado **bloqueado hasta crear cuenta**. Modelo: comparables reales del propio inventario por radio 700 m y ±30 % de superficie. Dos variantes: "precio de salida de venta" y "precio de arriendo mensual". |
| **2** | **Gastos comunes siempre visibles, con su propia etiqueta y moneda, en tarjeta y ficha** | Elimina la fricción #1 del comprador e inquilino chileno y evita el "va más caro que lo que dice" — que en el segmento medio-alto destruye la confianza en la corredora. | **Zonaprop** (expensas con moneda propia, línea separada) + **Houm** (`Gastos comunes aprox.`) + **Idealista** (`Gastos de comunidad: 35 €/mes`) | En cada tarjeta: `UF 3.900` + `$ 85.000 Gastos comunes`. En la ficha, bloque "Costo mensual total" con arriendo + gastos + IVA. |
| **3** | **Precio en multi-moneda con selector explícito `$ / UF / US$` y UF como unidad de عرض por defecto** | El comprador de 5.000–50.000 UF razona en UF; el inversionista estadounidense en USD; el arriendo en CLP. Mostrar la moneda correcta evita recálculos y filtra mejor al usuario. | **Portal Inmobiliario** (selector `$ / UF / US$`; tarjetas en `UF 3.900`) | Filtro de precio con toggle de 3 monedas y persistencia de la preferencia en cookie + URL. Mostrar precio en UF y, en la ficha, el equivalente en CLP con la UF del día. |
| **4** | **Dibujo de zona sobre el mapa (polígono) + zonas de interés predefinidas** | Es la única forma de capturar la intención real en Viña/Reñaca/Concón, donde "comuna" es demasiado gruesa y "barrio" no existe como en Santiago. Filtra mejor que cualquier faceta de atributos. | **Idealista** (herramienta `Dibujar` + `Zonas de interés`) + **Zillow** (`Draw` tool) | Polígono dibujable en el mapa con snapping a calles + polígonos predefinidos: "Costanera de Reñaca", "Playa Reñaca–Concón", "Viña Alta", "Las Condes–El Golf", "La Dehesa". El filtro se serializa en la URL. |
| **5** | **Dirección de arte editorial de lujo (no de clasificados)** | En el segmento medio-alto/lujo, la percepción de exclusividad es un filtro de entrada antes del precio. Sitúa a Axion Vanguard como *broker de lujo*, no como un portal más. | **The Agency** (cursiva serigrafiada en titulares, mucho aire, paleta restringida, fotografía a sangre) | Página de portada con hero tipográfico, titulares en itálica serif, ficha de propiedad con descripción narrativa, fondo crudo y fotografía horizontal a sangre. **Es la mayor palanca de percepción de marca del informe.** |
| **6** | **Plano interactivo que enlaza cada foto con su posición en el plano** | Convierte la galería en herramienta de comprensión espacial — el factor de decisión en deptos de 120–300 m². Métrica propia: **+49 % de guardados y +43 % de visitas** con plano vs. sin plano. | **Zillow Showcase** | Plano por planta (materia prima: plano del arquitecto o escaneo LiDAR) con hotspots que abren la foto de ese ambiente. Priorizar en fichas de +100 m². |
| **7** | **Precio por m² propio vs. promedio de la zona + 3-4 comparables en UF** | Da una tesis de inversión instantánea y mata la objeción de precio sin una llamada. Además es una hoja de contenido indexable por barrio. | **Portal Inmobiliario** (`136 UF/m²` vs `152 UF/m²` + "Referencia de precios") + **Zonaprop** (precio medio USD por barrio) | Bloque "Referencia de precios" en cada ficha con 4 comparables en UF + línea "Esta propiedad X UF/m² vs. promedio del sector Y UF/m²" (datos propios del inventario de Axion). |
| **8** | **Bloque "necesitas $X de ingreso (2,8× arriendo) + lista de 5 documentos"** | Auto-califica y auto-sirve: filtra calidad sin gastar minutos de corredor, y da al usuario una checklist concreta que reduce el abandono. | **Houm** (`¿Qué necesito para arrendar?` + `Documentos que necesitamos`) | Calculadora de elegibilidad en la ficha y en el postulador, con la lista de documentos (liquidaciones, certificado de antigüedad laboral, cotizaciones AFP, CI, F22 si independiente). |
| **9** | **Tasación online como puerta de entrada de propietarios ("Valora tu casa")** | El tasador y el vendedor son el lead de mayor valor; además el tasador es un motor de SEO en páginas por barrio. | **Housell** (wizard + `Crear cuenta` gate + 25 comparables en 700 m) + **Zonaprop** (`¿Cuánto vale tu propiedad?`) | Ver #1. Complementar con landings `/valoracion/[barrio]` que entreguen un informe de rango de precio de la zona (UF/m², 12 meses) a cambio de email. |
| **10** | **Publicación en 4 pasos ilustrados, con el onboarding de DPS como oferta** | Reduce la fricción del lado de la oferta; sin inventario no hay marketplace. Y la oferta de planes (`Publicar` / `Planes para profesionales`) capta DPS que compiten con los portales. | **Portal Inmobiliario** (`4 pasos para publicar` + `Planes para profesionales`) + **Houm** (`Publica gratis y sin exclusividad` + `Sé un Houmer fotógrafo`) | Wizard de 4 pasos: 1) datos y ubicación 2) fotos y video 3) precio (sugerido por el algoritmo, editable) 4) publicación y PLAN. Incluir sesión de fotos profesionales incluida. |
| **11** | **Módulo de entorno con distancias reales a metro, playa, colegios y áreas verdes** | En Viña/Reñaca/Concón la conectividad y la cercanía al mar son el factor de decisión #1 y casi ningún portal chileno los muestra bien. | **Portal Inmobiliario** (`Alcántara 4 mins - 344 metros`) + **Houm** (`Transporte / Supermercado / Áreas verdes / Hospital / Educación`) | Ficha con "Costanera a X min a pie", "Metro X a Y min / Z m", "Escuela/colegio más cercano", "Playa más cercana", calculado con datos reales de tiempo walking. |
| **12** | **Alertas guardadas + ficha de contacto de agente con agenda de visitas en slots** | Convierte la búsqueda en suscripción recurrente y el lead en reunión agendada en vez de mensaje perdido. | **Idealista** (`Guardar búsqueda`, avisos de bajada de precio, `Hacer una contraoferta`) + **Zillow** (Save Search + Updates) + **The Agency** (Request a Tour con slots de 30 min + "Best Time to Call") | `Guardar búsqueda` con alerta por email/WhatsApp ante nueva publicación y baja de precio. En la ficha: selector de agente con foto, "Mejor horario para contactarte" y agenda con slots (09:00–19:00), más **contraoferta** en 1 clic. |

## Bonus — 3 prácticas de implementación rápida (menor esfuerzo, impacto inmediato)

| Práctica | Fuente | Nota |
|---|---|---|
| **Spec string de una línea en la tarjeta** (`45 m² · 2 dorm. · 2 baños · 1 estac.`) | **Zonaprop** (`604 m² tot. 6 amb. 3 dorm. 2 baños 3 coch.`) | Permite escanear 20 resultados sin abrir. Sustituye a las viñetas largas de los portales chilenos. |
| **Buscador en lenguaje natural** ("Descríbelo como quieras: barrio, habitaciones, precio") | **Portal Inmobiliario** (`Busca con el asistente`) | Implementación barata sobre un parser de barrio + dormitorios + rango de precio. Reduce fricción de entrada y captura consultas que un dropdown no puede. |
| **WhatsApp como canal de contacto primario en la ficha**, no solo formulario | **Zonaprop** (`WhatsApp` + `Contactar`) + **Portal Inmobiliario** (`WhatsApp` en ficha) | En Chile el lead se cierra por WhatsApp. Botón con mensaje pre-cargado con el ID de la propiedad. |

---

## Pendientes de verificación (priorizados)

1. **Panel de filtros de Houm** (renderizado por JavaScript) — confirmar si existe filtro de precio, dormitorios, superficie, amenities y estado, y en qué formato.
2. **Gastos comunes en Portal Inmobiliario** — confirmar si el campo existe y si se muestra en tarjeta o solo en la ficha.
3. **Contenido de "Financial Considerations" en The Agency** — confirmar si incluye HOA, impuestos y seguro, y con qué formato.
4. **Filtro de dormitorios/baños/superficie de Portal Inmobiliario** como faceta del panel lateral vs. dentro del bloque "Más filtros".
5. **Panel expandido "Más filtros" de Zonaprop** — confirmar controles de superficie y estado (además de la faceta `a estrenar` ya verificada).
6. **Ficha de detalle de Housell** — solo accesible por Wayback; de bajo valor dado el estado de la empresa.
