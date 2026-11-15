# UDD Tunnel Lab · B.I.C.H.O — sitio web

Sitio de UDD Tunnel Lab para la Not-a-Boring Competition, con la identidad corporativa
**B.I.C.H.O by Tunnel Lab** (azul marino `#010D63`, naranjo `#EF8B01`, Russo One + Blinker).

- **Stack:** [Astro 7](https://astro.build) (páginas estáticas) + funciones serverless en **Vercel**.
- **Páginas:** `/` (home) y `/equipo`. `/equipo.html` redirige a `/equipo`.
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
  config/site.ts        Cifras (40 integrantes, 6 subsistemas…), fecha de la cuenta atrás, links y correos
  config/videos.ts      Video del hero, videos de la banda y lista de videos de YouTube
  config/packs.ts       Packs de apoyo (fase 2, contenido de ejemplo)
  styles/global.css     Tokens de marca y estilos base
  components/           Una sección por archivo (Hero, Propuesta, Avances, Galeria, Apoyo…)
  pages/index.astro     Home (orden de las secciones)
  pages/equipo.astro    Página del equipo (filtros por frente + ficha ampliada)
  pages/api/contacto.ts Función serverless del formulario
  data/miembros.json    Integrantes (generado desde el CSV, ver abajo)
  data/galeria.json     Fotos de la galería y del carrusel (título, categoría)
  assets/               Imágenes optimizadas (Astro genera WebP en varios tamaños)
public/videos/          Videos comprimidos (MP4 + WebM) y posters
scripts/build-media.mjs Procesa fotos, videos y el CSV desde material/
```

## Tareas comunes

**Cambiar una cifra, la fecha límite o un correo:** `src/config/site.ts`.

**Actualizar el roster del equipo:**
1. Exporta las respuestas del formulario y guárdalas como `src/data/miembros.csv` (no se sube a git: contiene correos de login).
2. Descomprime la carpeta de fotos del formulario en `material/_extract/fotos/Question/`.
3. `npm run miembros` → regenera `src/data/miembros.json` y las fotos en `src/assets/team/`.
4. Correcciones manuales (typos, nombre a mostrar): `src/data/miembros-correcciones.json`, indexado por la columna *Email* del CSV.

Las fichas muestran la columna **"Correo de Contacto"** del CSV, no el correo de login.

**Agregar fotos a la galería:** copia la foto a `material/_extract/Galería/`, agrega una entrada en
`src/data/galeria.json` (`"carrusel": true` para que salga también en el carrusel) y corre `npm run media galeria`.

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
