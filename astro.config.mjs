// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

// Sitio estático (todas las páginas se prerenderizan). Solo los endpoints de
// src/pages/api/ con `export const prerender = false` corren como funciones de Vercel.
export default defineConfig({
  site: "https://www.tunnel-lab.cl",
  output: "static",
  adapter: vercel(),
  redirects: {
    "/equipo": "/conocenos",
    "/equipo.html": "/conocenos",
    "/index.html": "/",
  },
});
