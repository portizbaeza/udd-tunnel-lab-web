import type { ImageMetadata } from "astro";
import data from "../data/galeria.json";

export interface Foto { archivo: string; titulo: string; categoria: string; carrusel: boolean; img: ImageMetadata }

const imgs = import.meta.glob<{ default: ImageMetadata }>("../assets/galeria/*.jpg", { eager: true });
const porArchivo = new Map(Object.entries(imgs).map(([p, m]) => [p.split("/").pop()!, m.default]));

export const CATEGORIAS: Record<string, string> = data.categorias;

export function getFotos(): Foto[] {
  return data.fotos
    .filter((f) => porArchivo.has(f.archivo))
    .map((f) => ({ archivo: f.archivo, titulo: f.titulo, categoria: f.categoria, carrusel: Boolean((f as { carrusel?: boolean }).carrusel), img: porArchivo.get(f.archivo)! }));
}

export function getImagen(archivo: string): ImageMetadata {
  const img = porArchivo.get(archivo);
  if (!img) throw new Error(`Falta src/assets/galeria/${archivo} (corre npm run media galeria)`);
  return img;
}
