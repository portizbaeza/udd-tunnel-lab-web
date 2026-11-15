// Integrantes del equipo para las páginas del sitio.
//
// Fuente: src/data/miembros.json, generado con `npm run miembros` a partir del CSV del
// formulario (src/data/miembros.csv, que NO se versiona porque trae correos de login y fechas).
// Las fotos viven en src/assets/team/<slug>.jpg (las genera el mismo comando).
import type { ImageMetadata } from "astro";
import data from "../data/miembros.json";

export interface Miembro {
  slug: string;
  num: string;
  nombre: string;
  carreras: string[];
  frentes: string[];
  frase: string;
  descripcion: string | null;
  linkedin: string | null;
  correo: string | null;
  foto: ImageMetadata | null;
}

type MiembroJson = Omit<Miembro, "num" | "foto">;

const fotos = import.meta.glob<{ default: ImageMetadata }>("../assets/team/*.{jpg,jpeg,png,webp}", { eager: true });
const fotoPorSlug = new Map(
  Object.entries(fotos).map(([path, mod]) => [path.split("/").pop()!.replace(/\.[a-z]+$/, ""), mod.default]),
);

// Orden de aparición: primero quienes lideran el proyecto, luego el resto en orden de inscripción.
const PRIMEROS = ["pablo-ortiz-baeza", "bruno-grossi-cordova"];

let cache: Miembro[] | null = null;

export function getMiembros(): Miembro[] {
  if (cache) return cache;
  const base = [...(data as MiembroJson[])].sort((a, b) => {
    const ia = PRIMEROS.indexOf(a.slug), ib = PRIMEROS.indexOf(b.slug);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });
  cache = base.map((m, i) => ({
    ...m,
    num: String(i + 1).padStart(2, "0"),
    foto: fotoPorSlug.get(m.slug) ?? null,
  }));
  return cache;
}

export function getFrentes(miembros: Miembro[]): string[] {
  const orden = ["Cabezal erosionador", "Propulsión", "Muck removal", "Casing/Soporte", "Software y control", "Dirección", "Gestión y sponsors", "Redes sociales", "Consultores"];
  const set = new Set(miembros.flatMap((m) => m.frentes));
  return [...orden.filter((f) => set.has(f)), ...[...set].filter((f) => !orden.includes(f))];
}
