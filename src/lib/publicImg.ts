// Utilidades para imágenes que el equipo deja en /public (no pasan por el optimizador de Astro).
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ruta = (r: string) => join(process.cwd(), "public", r.replace(/^\/+/, ""));

/**
 * Devuelve la URL pública de una imagen de /public si el archivo existe al momento del build;
 * si no existe, devuelve null para que la página use un respaldo o un recuadro gris.
 */
export function publicImg(r: string): string | null {
  const limpia = r.replace(/^\/+/, "");
  return existsSync(ruta(limpia)) ? `/${limpia}` : null;
}

/** Primera imagen que exista de la lista (por ejemplo, ["img/logo-bicho.svg", "img/logo-bicho.png"]). */
export function primeraPublicImg(rutas: string[]): string | null {
  for (const r of rutas) {
    const url = publicImg(r);
    if (url) return url;
  }
  return null;
}

/**
 * Ancho y alto de un PNG o SVG de /public, leídos del archivo (para mantener su proporción exacta).
 * Devuelve null si no se puede leer.
 */
export function publicImgSize(url: string): { width: number; height: number } | null {
  try {
    const buf = readFileSync(ruta(url));
    if (url.toLowerCase().endsWith(".png") && buf.length > 24) {
      return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
    }
    if (url.toLowerCase().endsWith(".svg")) {
      const svg = buf.toString("utf8");
      const vb = svg.match(/viewBox="\s*[-\d.]+[\s,]+[-\d.]+[\s,]+([\d.]+)[\s,]+([\d.]+)\s*"/i);
      if (vb) return { width: Number(vb[1]), height: Number(vb[2]) };
      const w = svg.match(/\swidth="([\d.]+)/i), h = svg.match(/\sheight="([\d.]+)/i);
      if (w && h) return { width: Number(w[1]), height: Number(h[1]) };
    }
  } catch { /* sin datos: se usa el respaldo */ }
  return null;
}
