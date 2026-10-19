---
name: UDD Tunnel Lab
description: Sitio estático del equipo de ingeniería UDD Tunnel Lab (Not-a-Boring Competition) — identidad técnica/industrial, oscura, tipo "bitácora de ingeniería" con un acento cian de laboratorio.
status: final
updated: 2026-10-14
colors:
  dark: '#0B0C1C'
  dark-2: '#14162E'
  dark-3: '#16193A'
  light: '#F5F4F0'
  light-2: '#EDEBE4'
  accent: '#2FE0C8'
  accent-dark: '#0E9E8C'
  accent-darker: '#0E7F72'
  warn: '#C08A00'
  linkedin: '#0A66C2'
typography:
  display:
    fontFamily: "'Archivo', sans-serif"
    fontWeight: '700–900'
    note: 'Titulares, valores numéricos grandes, CTAs — siempre mayúscula alta densidad de peso'
  mono:
    fontFamily: "'IBM Plex Mono', monospace"
    note: 'Eyebrows, etiquetas de estado, metadatos, cifras técnicas — la voz "de consola/bitácora"'
  sans:
    fontFamily: "'IBM Plex Sans', system-ui, sans-serif"
    note: 'Cuerpo de texto largo (párrafos, descripciones de integrantes)'
  h1-hero:
    fontSize: 'clamp(46px, 7.4vw, 108px)'
    fontWeight: '900'
    lineHeight: '0.92'
    letterSpacing: '-0.03em'
  h2-section:
    fontSize: 'clamp(34px, 4vw, 60px)'
    fontWeight: '900'
    lineHeight: '0.98'
    letterSpacing: '-0.03em'
  eyebrow:
    fontFamily: '{typography.mono.fontFamily}'
    fontSize: '11–12px'
    letterSpacing: '0.18–0.2em'
    textTransform: 'uppercase'
rounded:
  DEFAULT: '0px'
  note: 'El sitio es deliberadamente angular: no se usa border-radius en ningún componente salvo el punto de pulso (círculo) y los frente-tag (3px, casi imperceptible).'
spacing:
  container-max: '1240px'
  container-padding: '32px'
  section-padding-y: '96–110px'
  grid-line: '1px'
components:
  button-solid:
    background: '{colors.light}'
    color: '{colors.dark}'
    hover-background: '{colors.accent}'
    padding: '17px 30px'
    typography: '{typography.display}'
    textTransform: 'uppercase'
  button-outline:
    background: 'transparent'
    border: '1px solid rgba(245,244,240,.28)'
    hover-border: '{colors.accent}'
  button-accent:
    background: '{colors.accent}'
    color: '{colors.dark}'
    hover-background: '{colors.light}'
  stat-block:
    value-fontSize: '46–62px'
    value-typography: '{typography.display}'
    grid-gap: '1px'
    grid-gap-color: 'rgba(245,244,240,.13)'
  card-grid-cell:
    note: 'Patrón repetido (stats, badges, phases, roadmap, board, member, person): celdas de fondo sólido separadas por gaps de 1px que dejan ver una línea delgada — simula una grilla de laboratorio/plano técnico, no usa border tradicional.'
  status-dot:
    done: '{colors.accent-dark}'
    current: '{colors.dark-2}'
    blocked: '{colors.warn}'
    planned: 'transparent con borde'
---

# DESIGN.md — UDD Tunnel Lab

> Este documento describe el **lenguaje visual que el sitio tiene hoy** (extraído de `styles.css`, `index.html`, `equipo.html`), no una propuesta nueva. Sirve como ficha de identidad para pasarla a otra herramienta (Claude, Google AI Studio) que actualizará el diseño.

## Brand & Style

[ASSUMPTION] El sitio proyecta una identidad de **ingeniería de laboratorio / bitácora técnica**, no de "landing de producto" convencional. Señales en el código que sostienen esta lectura:

- Base **oscura** (`--dark: #0B0C1C`) con un único **acento cian de instrumento de laboratorio** (`--accent: #2FE0C8`) usado con disciplina: puntos de pulso animados, bordes en focus, resaltado de cifras clave.
- Tipografía mono (**IBM Plex Mono**) para todo lo que es "metadato" — eyebrows, timestamps, porcentajes, coordenadas — reforzando la sensación de consola/dashboard.
- Tipografía display (**Archivo**, peso 700–900) para titulares enormes y agresivos (`clamp(46px, 7.4vw, 108px)` en el hero), con *letter-spacing* negativo: look editorial/industrial, no corporativo-suave.
- Cero `border-radius` en casi todo el sistema: esquinas rectas en botones, tarjetas, inputs, chips. El único círculo es el punto de pulso del hero (`.pulse-dot`) y el único radio real son los `frente-tag` (3px). Esto es una decisión visual consistente, no un descuido.
- Patrón de "grilla con gaps de 1px" repetido en casi todo el sitio (detalle completo en *Components → Grid-cell card*) — evoca planos técnicos / hojas de especificación más que tarjetas de marketing.
- Scanlines, ruido de fondo y máscara radial sobre la foto del hero (`.hero-bg .scanlines`, `.gradient-*`) — textura de "transmisión" / monitor, coherente con el tono "consola de laboratorio".
- Dos temas de página conviven: **Home oscuro** (`body.page-home`, fondo `--dark`) y secciones "claras" intercaladas (`.section-light`, fondo `--light`) que cortan el ritmo oscuro para los bloques de contenido más denso (Competencia, Avances, Propuesta la deja oscura). **Equipo** vive enteramente en el tema claro (`body.page-equipo`, fondo `--light-2`).

## Colors

| Token | Hex | Uso real en el código | Qué NO es |
|---|---|---|---|
| `{colors.dark}` | `#0B0C1C` | Fondo base de Home y footers; texto sobre fondo claro de Únete | No se usa como color de texto sobre fondo oscuro |
| `{colors.dark-2}` | `#14162E` | Texto sobre `.section-light`; fondo de tabs activos, status "en curso", bloque Sumarse | — |
| `{colors.dark-3}` | `#16193A` | Fondo del contenedor del logo del equipo en el header | Uso muy puntual, un solo lugar |
| `{colors.light}` | `#F5F4F0` | Texto principal sobre fondo oscuro; fondo de botón sólido | No es blanco puro — es un "papel" cálido |
| `{colors.light-2}` | `#EDEBE4` | Fondo de la página Equipo completa | Variante aún más cálida/apagada que `light` |
| `{colors.accent}` | `#2FE0C8` | Único acento de marca: links en hover, CTAs, pulso en vivo, cifras destacadas, bordes de foco, fondo del bloque "Únete" | Nunca se usa como color de fondo grande salvo en `.unete` |
| `{colors.accent-dark}` | `#0E9E8C` | Status "completado"/"ok" sobre fondo claro | — |
| `{colors.accent-darker}` | `#0E7F72` | Links sobre fondo claro (más legible que el accent puro en fondo claro) | — |
| `{colors.warn}` | `#C08A00` | Único color de advertencia: status "bloqueado", barras de progreso en riesgo | No se reusa en ningún otro contexto — alerta exclusiva |

**Do:** usar `{colors.accent}` como la única señal de "esto está vivo / esto es importante ahora" (pulso, hover, cifra). **Don't:** diluirlo en botones secundarios o decoración — en el código actual aparece siempre con intención puntual.

## Typography

- **Display (`Archivo`, 700–900):** reservada a titulares (`h1`, `h2`), botones, valores numéricos grandes (stats, countdown, progreso). Siempre con *letter-spacing* negativo (-.01em a -.035em) y, en hero/section headers, `line-height` muy ajustado (0.92–0.98) — look de titular de prensa técnica, no de párrafo.
- **Mono (`IBM Plex Mono`):** la "voz de sistema" — eyebrows (`01 · La competencia`), fechas, estados, coordenadas, placeholders de imagen (`[ RENDER / CAD DE LA MÁQUINA ]`), notas al pie. Siempre en mayúsculas con *letter-spacing* amplio (.1–.22em) cuando actúa como etiqueta.
- **Sans (`IBM Plex Sans`):** cuerpo de texto largo — párrafos del hero, copy de secciones, descripciones de integrantes en el modal.
- Jerarquía de tamaño muy marcada: un `h1` de hero puede llegar a 108px mientras el cuerpo corre en 14–19px; no hay escalón intermedio "mediano" — es deliberadamente bimodal (gigante vs. detalle).

## Layout & Spacing

- Contenedor máximo `{spacing.container-max}` (1240px) con padding lateral `{spacing.container-padding}` (32px), consistente en ambas páginas.
- Secciones de contenido usan `padding: 110px 32px` como ritmo vertical estándar; el hero y bloques "cierre" (Únete, Socios) rompen esa norma con paddings propios más grandes.
- El patrón de grilla con `gap: 1px` (ver *Components → Grid-cell card*) es el recurso compositivo más repetido del sitio: funciona como un "borde compartido" entre celdas sin declarar `border` en cada una.
- Breakpoints observados: `1300px`, `1100px`, `1024px`, `900px`, `760px`, `700px`, `640px`, `560px`, `480px` — el sitio reduce columnas de grilla progresivamente (4→3→2→1 según el bloque) en vez de un sistema de breakpoints único; cada componente define el propio.
- Header: `sticky`, `backdrop-filter: blur(14px)`, fondo oscuro translúcido (`rgba(11,12,28,.82)`) — flota sobre el contenido en scroll.

## Elevation & Depth

No hay sistema de `box-shadow` como lenguaje general. Las únicas sombras del sitio son puntuales y funcionales:
- `.person-modal-card` — sombra de modal (`0 24px 64px rgba(6,7,17,.35)`) para despegarlo del fondo oscurecido.
- `.person:hover` — no es sombra sino `box-shadow: inset 0 0 0 1px {colors.accent-dark}` (un borde interno, no profundidad).
La "profundidad" del sitio se logra con **blur + overlay de color**, no con sombras: el fondo del hero combina blur, tint, 4 gradientes y scanlines en capas (`.hero-bg`), y los overlays oscuros (`backdrop-filter: blur`) en header, lightbox y modales — es un lenguaje de "cristal esmerilado sobre fondo oscuro", no de tarjetas elevadas.

## Shapes

`{rounded.DEFAULT}` = 0px en casi todo: botones, inputs, chips de filtro, tarjetas, barras de progreso — todas esquinas rectas. Única excepción real: `.pulse-dot` (círculo, 7px) y `.status .dot` (círculo, 6px) para simular un LED/indicador de estado; y `.frente-tag` con `border-radius: 3px` (prácticamente imperceptible). **Don't:** introducir esquinas redondeadas prominentes — rompería la lectura "instrumento técnico" que sostiene el resto del sistema.

## Components

- **Botones (`.btn`):** tres variantes — `solid` (claro sobre oscuro), `outline` (borde translúcido), `accent` (cian). Todos en mayúsculas, `font-display`, `letter-spacing: .1em`, sin radio. Hover siempre cambia a `{colors.accent}` o `{colors.light}`, nunca opacidad.
- **Eyebrow/label mono:** patrón repetido en casi cada sección (`01 · La competencia`, `FASE 01`, `Cuenta atrás · Texas 2027`) — numeración + separador `·` + texto en mayúsculas, mono, con *letter-spacing* amplio. Es el principal recurso de "wayfinding" dentro de la página.
- **Status dot + label (`.status`):** cuatro estados con color fijo — `done` (verde-teal), `current` (oscuro + pulso), `blocked` (ámbar), `planned` (outline gris) — usado en el roadmap de Avances.
- **Grid-cell card** *(patrón canónico — referenciado desde Brand & Style y Layout & Spacing)*: la unidad compositiva base (`.stats-grid`, `.badges-grid`, `.phases`, `.roadmap`, `.board`, `.equipo-grid`, `.roster`) — celdas de fondo sólido separadas por un `gap: 1px` sobre fondo semitransparente, sin borde propio (lo da la grilla contenedora). Simula una grilla de laboratorio/plano técnico más que tarjetas de marketing.
- **Countdown:** bloque de 2 columnas (etiqueta + 4 unidades numéricas gigantes) con separadores de 1px internos — mismo patrón de grilla aplicado a un widget en vivo.
- **Gallery + Lightbox:** carrusel con `transform: translateX` + overlay fullscreen con `backdrop-filter: blur(6px)` y fondo casi negro (`rgba(6,7,17,.94)`). Las fotos en miniatura llevan `filter: grayscale(.65) brightness(.8)` que se revierte a color pleno en hover — refuerza la idea de "material crudo de bitácora" que cobra vida al interactuar.
- **Tabs (`.tab`):** fondo claro por defecto, fondo `{colors.dark-2}` + texto claro cuando `aria-selected="true"` — contraste binario, sin subrayado ni indicador adicional.
- **Chip de filtro (`.chip`, página Equipo):** mismo patrón binario que las tabs pero en formato pastilla rectangular; estado activo invierte fondo/texto.
- **Person card / modal (Equipo):** tarjeta con foto 4:5 en escala de grises parcial si no es "real" (`opacity:.5`), tag de frente de trabajo en cápsula mono diminuta (`.frente-tag`, único radio real del sistema), modal de detalle con layout foto+info a dos columnas.
- **Formulario de contacto (`.contact-form`):** inputs transparentes con borde translúcido, foco cambia borde a `{colors.accent}` — sin fondo relleno, coherente con la estética "line art sobre oscuro".

## Do's and Don'ts

- **Do** reservar `{colors.accent}` para una sola señal por vista (vivo / activo / CTA principal).
- **Do** mantener el contraste binario en estados interactivos (tabs, chips, status) — el sitio no usa gradientes de estado, solo "activo vs. inactivo".
- **Do** usar mono+mayúsculas+letter-spacing amplio para cualquier metadato (fechas, cifras, etiquetas de estado).
- **Don't** introducir radios de esquina grandes ni sombras decorativas — rompe la identidad "plano técnico / consola".
- **Don't** mezclar los dos temas de fondo (oscuro Home / claro Equipo) dentro de la misma sección — el código los mantiene estrictamente separados por página (`body.page-home` vs `body.page-equipo`).
- **Don't** perder la numeración de eyebrow (`01 ·`, `02 ·`) al rediseñar — es el único sistema de orientación secuencial del sitio, no hay menú de "paso X de Y" en ningún otro lado.
