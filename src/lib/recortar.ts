// Recorta en el build los márgenes vacíos (transparentes o blancos) de una imagen PNG/JPG, sin
// redibujarla ni deformarla: solo quita el espacio sobrante alrededor del dibujo.
// Devuelve la imagen como data URI con su ancho y alto reales.
//
// Usa sharp (viene instalado con Astro). Si no se puede cargar, devuelve null y quien llama usa la
// imagen sin recortar.
import { readFileSync } from "node:fs";
import { join } from "node:path";

export interface Recorte { src: string; width: number; height: number }

/**
 * @param rutaDesdeRaiz ruta desde la raíz del proyecto (ej. "public/img/logo-bicho.png")
 * @param quitarBorde píxeles a descartar en cada borde antes de recortar (para imágenes con un marco fino)
 */
export async function recortarMargenes(rutaDesdeRaiz: string, quitarBorde = 0): Promise<Recorte | null> {
  try {
    const sharp = (await import("sharp")).default;
    let buffer = readFileSync(join(process.cwd(), rutaDesdeRaiz));
    if (quitarBorde > 0) {
      const meta = await sharp(buffer).metadata();
      if (meta.width && meta.height) {
        buffer = await sharp(buffer)
          .extract({ left: quitarBorde, top: quitarBorde, width: meta.width - 2 * quitarBorde, height: meta.height - 2 * quitarBorde })
          .png()
          .toBuffer();
      }
    }
    const { data, info } = await sharp(buffer).trim({ threshold: 20 }).png().toBuffer({ resolveWithObject: true });
    return { src: `data:image/png;base64,${data.toString("base64")}`, width: info.width, height: info.height };
  } catch (err) {
    console.warn(`[recortar] No se pudo recortar ${rutaDesdeRaiz}:`, (err as Error).message);
    return null;
  }
}
