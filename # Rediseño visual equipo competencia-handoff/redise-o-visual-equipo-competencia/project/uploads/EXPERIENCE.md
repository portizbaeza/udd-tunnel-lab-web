---
status: final
updated: 2026-10-14
---

# EXPERIENCE.md — UDD Tunnel Lab

> Describe **cómo funciona el sitio hoy** (extraído de `index.html`, `equipo.html`, `script.js`, `equipo.js`, `nav-toggle.js`), no un comportamiento propuesto. Las referencias visuales usan `{path.to.token}` de `DESIGN.md`.

## Foundation

- **Form-factor:** sitio web estático, responsive, un único repo sin backend (GitHub Pages / dominio propio `www.tunnel-lab.cl`). Dos páginas HTML: `index.html` (landing) y `equipo.html` (roster del equipo).
- **Sin framework ni UI-system:** HTML + CSS + JS vanilla, sin build step. Todo el estado vive en memoria del navegador (arrays en JS), no hay persistencia ni backend propio — los únicos puntos de salida de datos son `mailto:` y un formulario externo (Microsoft Forms).
- **Idioma:** español (Chile), `lang="es"`.
- **Plataforma:** no hay distinción de "app" — es contenido público indexable (meta OG/Twitter, sitemap, robots.txt).

## Information Architecture

```
index.html (Home)                          equipo.html (Equipo)
├── #inicio (hero + countdown + galería)    ├── header (contador de integrantes)
├── ticker (marquee informativo)            ├── #frentes (filtros por chip)
├── stats (4 cifras)                        ├── #planta (grilla de 80 fichas)
├── badges (3 sellos institucionales)       ├── #sumarse (CTA inscripción)
├── #competencia                            └── modal de detalle de persona
├── #propuesta
├── #avances (tabs: Roadmap / Subsistemas / Bitácora)
├── #socios
├── #equipo (teaser, 3 personas + "ver más")  → enlaza a equipo.html
├── #unete (CTA inscripción)
└── #contacto (formulario mailto)
```

- Navegación principal (header de Home): anclas internas (`#competencia`, `#propuesta`, `#avances`, `#socios`) + un salto de página externo (`equipo.html`) + un CTA fijo (`Únete`).
- `equipo.html` es una "sub-sección" promovida a página propia: el teaser en Home (3 personas reales + contador "+77") es la única puerta de entrada visible desde Home; `equipo.html` no tiene vuelta a anclas de Home salvo el logo y "← Volver al sitio" en el footer.
- Cada sección de Home lleva una numeración de eyebrow (`01` a `07`) que funciona como único "mapa" de progreso dentro de la página — no hay sidebar ni tabla de contenidos.
- `equipo.html` no reutiliza esa numeración; usa su propio micro-sistema (chips de filtro + contador de fichas).

## Voice and Tone

[ASSUMPTION — no hay guía de voz explícita en el código; se infiere del copy real]

- Primera persona plural, directa y sin jerga corporativa: *"Somos UDD Tunnel Lab"*, *"No buscamos un logo en una polera. Buscamos socios de ingeniería."*, *"No necesitas experiencia. Necesitas ganas."*
- Honestidad de estado de proyecto: el copy admite explícitamente etapas tempranas y huecos — *"Proyecto en etapa preliminar"*, *"Bloqueado · falta financiamiento"*, *"Solo 21 de las 80 fichas tienen rostro por ahora"*. El tono no infla el progreso.
- Humor técnico puntual: *"beat the snail"*, nombres de prototipos (*B.I.C.H.O*, *MARK-O*), frases personales de integrantes con registro informal junto a frases en latín.
- Metadatos (fechas, estados, porcentajes) siempre en formato "de bitácora/consola" — ver `{typography.mono}` en DESIGN.md — reforzando honestidad y trazabilidad por sobre marketing.

## Component Patterns

(Spec visual de cada componente vive en `DESIGN.md` → *Components*; aquí solo el comportamiento.)

- **Countdown en vivo:** cuenta regresiva a una fecha fija (`DEADLINE = 2027-02-01T09:00:00-06:00`, constante en `script.js`), recalculada cada segundo vía `setInterval`. Si el bloque `[data-cd-days]` no existe en la página, el script no inicializa nada (guard temprano) — es seguro incluirlo o quitarlo de una página sin romper el resto.
- **Galería + Lightbox (solo Home):** carrusel horizontal con `PHOTOS` hardcodeado en `script.js` (7 fotos). Columnas visibles responsivas por ancho de ventana (1 / 2 / 4, recalculado en `resize` con `requestAnimationFrame` para evitar jank). Click en una miniatura abre un lightbox fullscreen con navegación ← → circular (wrap-around) y cierre por click-fuera, botón "Cerrar ✕" o tecla `Escape`. Navegación también por teclado (`ArrowLeft`/`ArrowRight`) cuando el lightbox está abierto.
- **Tabs de Avances (solo Home):** 3 pestañas (`Roadmap`, `Subsistemas`, `Bitácora`) — click cambia `aria-selected` y oculta/muestra paneles vía atributo `hidden`. Una sola pestaña activa a la vez, contenido 100% estático (no hay fetch ni animación de transición).
- **Nav-toggle mobile (`nav-toggle.js`)** *(patrón canónico — referenciado desde Responsive & Platform)*: hamburguesa que alterna clase `is-open` en el panel y `aria-expanded` en el botón. Se cierra automáticamente al hacer click en cualquier link del panel, o con `Escape`. Asimetría real entre páginas: `equipo.html` no incluye `nav-toggle.js` ni un `.nav-toggle` — su header mobile no colapsa, los links quedan visibles/wrap en una fila (no es una decisión documentada, es una laguna del código actual).
- **Filtro de equipo por chip (solo Equipo):** chips generados dinámicamos desde `FRENTES` + `"Todos"`. Un solo filtro activo a la vez (no multi-select); click re-renderiza la grilla completa y el contador de fichas (`X fichas`). Estado activo = `aria-pressed="true"`.
- **Ficha de persona → modal (solo Equipo):** click (o `Enter`/`Space` con foco por teclado, `role="button" tabindex="0"`) sobre cualquier ficha abre un modal con foto grande, carrera, frentes, frase y descripción extendida (si existe `descripcion`; si no, placeholder *"La descripción pronto se subirá."*). Cierre por click fuera de la tarjeta, botón "Cerrar ✕" o `Escape`.
- **Formulario de contacto (solo Home):** `<form action="mailto:..." method="post" enctype="text/plain">` — sin JS, sin backend, sin validación más allá de `required`/`type="email"` nativos del navegador. Al enviar, abre el cliente de correo del usuario con los campos como cuerpo de texto plano.

## State Patterns

- **Roster generado, no solo listado:** `equipo.js` construye 80 fichas combinando `MIEMBROS_REALES` (datos reales, actualmente 21 personas) con relleno automático de "Cupo por completar" hasta `TOTAL_EQUIPO = 80`. Las fichas reales llevan clase `.is-real`; las de relleno se muestran atenuadas (`opacity:.5`, sube a `.85` en hover) — es un **estado visual explícito de "incompleto"**, no un placeholder oculto.
- **Foto ausente:** cualquier persona (real o relleno) sin `foto` muestra `<span>[ RETRATO ]</span>` sobre el fondo rayado en vez de romper el layout.
- **LinkedIn/correo ausentes:** el bloque de contacto de la ficha (y del modal) simplemente no se renderiza si ambos son `null` — no hay icono roto ni link vacío.
- **Descripción ausente (modal):** texto itálico de "pendiente" en vez de espacio vacío.
- **Countdown en cero:** `Math.max(0, DEADLINE - Date.now())` evita números negativos; al llegar la fecha, todas las unidades quedan en `00` indefinidamente (no hay mensaje de "evento en curso/finalizado").
- **Progreso de subsistemas (`#avances` → Subsistemas):** barras de progreso con porcentaje hardcodeado por subsistema; el color cambia a `{colors.warn}` cuando el subsistema está en riesgo (actualmente solo "Extracción de material", 15%, marcado `warn`) — es dato estático, no calculado.
- **Status de roadmap:** 4 estados fijos por hito (`done` / `current` / `blocked` / `planned`), hardcodeados por ítem en el HTML — no hay lógica de fecha que los derive automáticamente.

## Interaction Primitives

- **Click primario:** navegación por ancla (scroll suave, `html { scroll-behavior: smooth }`, con `scroll-margin-top: 110px` para no tapar el título bajo el header sticky), apertura de lightbox/modal, cambio de tab/chip.
- **Hover:** único lenguaje de intención en desktop — cambia color a `{colors.accent}`, revierte `grayscale`/`brightness` en fotos, sube `opacity` en fichas de relleno. No hay estados de "loading" ni microanimación de entrada de contenido (todo el contenido es estático al cargar).
- **Teclado:** soporte real pero puntual — `Escape` cierra lightbox, modal de persona y menú mobile; flechas navegan el lightbox; `Enter`/`Space` activan una ficha de persona con foco. El resto de los controles (tabs, chips, botones) son `<button>`/`<a>` nativos, por lo que heredan foco y activación estándar del navegador sin JS adicional.
- **Resize:** la única lógica reactiva a viewport en JS es el recálculo de `visibleCount` del carrusel (debounced con `requestAnimationFrame`); todo el resto del comportamiento responsive es CSS puro (media queries).
- **Scroll:** sticky header con blur; sin scroll-spy (el header no resalta la sección visible); sin infinite-scroll ni lazy-render de secciones (todo el DOM existe desde el `load`, las imágenes usan `loading="lazy"` nativo para diferir descarga, no renderizado).

## Accessibility Floor

- Roles/ARIA presentes en el código: `role="tablist"`/`role="tab"`/`aria-selected` (tabs de Avances), `aria-pressed` (chips de filtro), `aria-expanded`/`aria-controls` (nav-toggle), `aria-label` en botones icon-only (flechas de galería/lightbox, toggle de menú, cerrar modal), `role="button" tabindex="0"` + manejo de `Enter`/`Space` en fichas de persona (patrón custom porque la ficha es un `<div>`, no un `<button>` nativo).
- `::selection` con `{colors.accent}` sobre `{colors.dark}` — contraste cuidado también en el detalle de selección de texto.
- `:focus-visible` definido explícitamente en `.person` (outline cian, offset negativo) — pero es la única regla de focus-visible custom en toda la hoja de estilos; el resto de interactivos dependen del foco por defecto del navegador (no hay reset global de `outline`, así que no están "rotos", pero tampoco hay un anillo de foco consistente de marca en botones/links/inputs).
- Imágenes decorativas del hero llevan `alt=""` y el contenedor `aria-hidden="true"`; imágenes de contenido llevan `alt` descriptivo (fotos de bitácora, integrantes).
- Formulario de contacto usa `<label for>` ligado a cada input — accesible por lector de pantalla sin JS adicional.
- **Huecos conocidos (no resueltos en el código actual):** sin "skip to content" link; sin `aria-live` en el countdown (el lector de pantalla no anuncia el cambio por segundo, lo cual es correcto para no saturar, pero tampoco hay anuncio de llegada a cero); el modal de persona y el lightbox no atrapan el foco (`focus trap`) — `Tab` puede escapar del overlay hacia el resto de la página mientras está abierto.

## Key Flows

### 1. Pablo, mentor de la facultad, quiere mostrarle el proyecto a un posible socio en 2 minutos
1. Entra a `index.html`, el hero le confirma en una pantalla el qué/quién/por qué (*"único equipo sudamericano"*, 80 estudiantes, Not-a-Boring Competition) y el countdown le da urgencia real (fecha concreta a Texas).
2. Baja por el ticker y los `stats`/`badges` — refuerzo rápido de cifras y aval institucional (UDD, Chile, Sudamérica) sin tener que leer párrafos.
3. Llega a `#socios`, lee los 4 beneficios (Talento, Innovación, Visibilidad, Vinculación) y hace click en **"Conversemos"** → scroll suave a `#contacto`.
4. Completa el formulario; al enviar, se abre su cliente de correo con el mensaje pre-armado dirigido a `pablo.ortiz@udd.cl`. **Climax:** el socio potencial ya tiene un correo redactado listo para enviar, sin que el equipo haya tenido que hacer seguimiento manual.

### 2. Vicente, estudiante nuevo, busca su propia ficha para mandarle el link a su familia
1. Desde Home, hace click en "Ver los 80 rostros →" dentro del teaser de equipo → llega a `equipo.html`.
2. Usa el chip **"Software y control"** en `#frentes` para filtrar y encontrarse más rápido entre las 80 fichas; el contador (`X fichas`) le confirma cuántas quedan visibles.
3. Encuentra su ficha (`is-real`, con foto), hace click → se abre el modal con su frase, carrera y contacto.
4. **Climax:** copia el link de la página (o lo comparte tal cual) — como no hay deep-link por persona, comparte la URL de `equipo.html` completa; quien lo abra deberá volver a filtrar/buscar para llegar a la misma ficha. *(Hueco de UX actual: no hay anchor/hash por persona.)*

### 3. Visitante en celular en el taller, con poca señal, quiere inscribirse ahí mismo
1. Abre `index.html` en mobile; el header colapsa a hamburguesa (`.nav-toggle`), el hero se apila a una columna.
2. Abre el menú, toca **"Únete"** (CTA siempre visible al final del panel) → scroll a `#unete`.
3. Lee *"No necesitas experiencia. Necesitas ganas."* y toca **"Inscribirme al equipo →"**, que abre en pestaña nueva el formulario oficial de Microsoft Forms (fuera del sitio).
4. **Climax:** si el formulario externo tarda en cargar por la señal del taller, el visitante ya vio la nota de respaldo (*"Formulario oficial de Ingeniería UDD. Dudas: pablo.ortiz@udd.cl"*) y tiene un correo de contacto como plan B sin perder la intención de inscribirse.

## Responsive & Platform

- Mobile-first visualmente invertido: el diseño está construido desktop-first en el CSS (reglas base = desktop, `@media (max-width: …)` las adapta hacia abajo), con breakpoints independientes por componente (ver `DESIGN.md` → *Layout & Spacing*).
- Patrones de colapso: grillas de N columnas → menos columnas → 1 columna (nunca scroll horizontal excepto el carrusel de fotos y el ticker, que son horizontales *por diseño*).
- El header mobile de Equipo no colapsa — ver detalle en *Component Patterns → Nav-toggle mobile*.
- No hay modo oscuro/claro conmutable por el usuario: Home es oscuro y Equipo es claro por diseño fijo de marca/sección, no por preferencia de sistema.
