# UDD Tunnel Lab · B.I.C.H.O — sitio web

Sitio de UDD Tunnel Lab para la Not-a-Boring Competition, con la identidad corporativa
**B.I.C.H.O by Tunnel Lab** (azul marino `#010D63`, naranjo `#EF8B01`, Russo One + Blinker).

- **Stack:** [Astro 7](https://astro.build) (páginas estáticas) + funciones serverless en **Vercel**.
- **Páginas:** `/` (inicio), `/conocenos`, `/funcionamiento`, `/propuesta` y `/avances`. `/equipo` y `/equipo.html` redirigen a `/conocenos`.
- **Formulario de contacto:** `POST /api/contacto` → correo a `notaboringbicho@gmail.com` vía [Resend](https://resend.com).

## Desarrollo

Requisitos: Node.js 24 y ffmpeg (solo para regenerar medios).

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # genera .vercel/output (lo que publica Vercel)
```

Para probar el formulario en local, copia `.env.example` a `.env` y completa `RESEND_API_KEY`.

## Estructura

```
src/
  config/site.ts        Cifras, correos, menú, link del botón APOYAR, URL del simulador y redes sociales
  config/donaciones.ts  Datos de la cuenta para donaciones (sección Apoyo)
  config/videos.ts      Videos de la banda, video de YouTube de la máquina (VIDEO_MAQUINA_URL) y lista de YouTube
  config/packs.ts       Packs de apoyo (fase 2, contenido de ejemplo; hoy sin uso)
  styles/global.css     Tokens de marca, estilos base y animación .reveal
  components/           Una sección por archivo (BichoHero, Pionero, Competencia, Apoyo, Redes, Timeline…)
  pages/index.astro     Inicio: B.I.C.H.O → Primer equipo (Elon + video) → Competencia → Apoyo → Síguenos
  pages/conocenos.astro Capitanes + equipo (filtros por frente + ficha ampliada)
  pages/funcionamiento.astro  Simulador de la máquina en iframe
  pages/propuesta.astro Propuesta B.I.C.H.O
  pages/avances.astro   Probar, fallar, iterar (VideoBand) → línea del tiempo → galería
  pages/api/contacto.ts Función serverless del formulario
  data/miembros.json    Integrantes (generado desde el CSV, ver abajo)
  data/galeria.json     Fotos de la galería de /avances (título, categoría)
  data/avances.ts       Hitos de la línea del tiempo
  data/capitanes.json   Capitanes de /conocenos (slug del integrante + rol)
  assets/               Imágenes optimizadas (Astro genera WebP en varios tamaños)
public/img/             logo-bicho.png o .svg (logotipo de la portada, fondo transparente)
public/videos/          Videos comprimidos (MP4 + WebM) y posters
scripts/build-media.mjs Procesa fotos, videos y el CSV desde material/
```

## Tareas comunes

**Cambiar una cifra, un correo, el link de APOYAR o las redes:** `src/config/site.ts`.

**Datos para donaciones:** `src/config/donaciones.ts` (reemplaza los valores entre corchetes).

**Portada:** video `public/videos/hero-bicho.mp4` de fondo (portada `hero-bicho-poster.jpg`), logotipo encima y botón APÓYANOS que baja a la tarjeta de transferencia (`#donaciones`). Para cambiar el video, comprímelo a 1080p H.264 sin audio (ej. `ffmpeg -i video.mp4 -an -c:v libx264 -crf 30 -maxrate 800k -bufsize 1600k -movflags +faststart public/videos/hero-bicho.mp4`). Copia `logo-bicho.png` (o `logo-bicho.svg`, con fondo transparente) a `public/img/`; mientras no esté se usa `src/assets/brand/logo-negativo.png`.

**Agregar un hito a la línea del tiempo:** `src/data/avances.ts` — copia un bloque y ponlo en orden (de más antiguo a más reciente). La foto es opcional y se indica como ruta dentro de `src/assets/`.

**Capitanes:** `src/data/capitanes.json` — agrega `{ "slug": "<slug del integrante>", "rol": "Capitán · Propulsión" }`. El slug es el nombre del archivo de su foto en `src/assets/team/`.

**Actualizar el roster del equipo:**
1. Exporta las respuestas del formulario y guárdalas como `src/data/miembros.csv` (no se sube a git: contiene correos de login).
2. Descomprime la carpeta de fotos del formulario en `material/_extract/fotos/Question/`.
3. `npm run miembros` → regenera `src/data/miembros.json` y las fotos en `src/assets/team/`.
4. Correcciones manuales (typos, nombre a mostrar): `src/data/miembros-correcciones.json`, indexado por la columna *Email* del CSV.

Las fichas muestran la columna **"Correo de Contacto"** del CSV, no el correo de login.

**Agregar fotos a la galería:** copia la foto a `material/_extract/Galería/`, agrega una entrada en
`src/data/galeria.json` y corre `npm run media galeria`. Las 6 primeras de la lista son las que se ven sin apretar "Ver más".

**Agregar un video de YouTube:** súbelo al canal y agrega su ID en `YOUTUBE_VIDEOS` (`src/config/videos.ts`).

**Packs de apoyo / pagos:** ver `src/lib/payments/README.md`.

## Identidad visual (resumen del manual)

- Colores sólidos y contrastes fuertes. Sin degradados, sombras, brillos ni esquinas redondeadas.
- Títulos en **Russo One** (mayúsculas); textos en **Blinker**. Pattanakarn solo dentro del logotipo.
- El naranjo no se usa para texto pequeño sobre blanco.
- Fotos de contexto en blanco y negro (recuperan su color al pasar el mouse); retratos en color natural.
- Logotipo en versión negativa sobre azul y positiva sobre blanco; no se deforma ni se recolorea.

## Despliegue en Vercel

1. En [vercel.com](https://vercel.com), **Add New → Project** e importa el repositorio de GitHub. Vercel detecta Astro solo.
2. En **Settings → Environment Variables** agrega `RESEND_API_KEY` (y opcionalmente `CONTACT_FROM` y `CONTACT_TO`).
   En Resend, verifica el dominio `tunnel-lab.cl` para enviar desde una dirección propia; mientras tanto sirve `onboarding@resend.dev`.
3. En **Settings → Domains** agrega `www.tunnel-lab.cl` y `tunnel-lab.cl`, y actualiza el DNS según indique Vercel.
4. Desactiva GitHub Pages en el repositorio (el archivo `CNAME` ya no se usa).

## Flujo de trabajo con Git

- **Cambios chicos** (textos, datos de integrantes, fotos): commit directo a `main`.
- **Cambios grandes** (diseño, estructura, lógica): rama `feature/…` → Pull Request → revisión de otra persona → merge.
  Vercel crea una URL de vista previa para cada PR.
