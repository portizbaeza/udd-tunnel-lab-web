// Genera los medios optimizados del sitio a partir de la carpeta material/ (no versionada).
// Uso: npm run media   (requiere ffmpeg en el PATH)
//
//  - Fotos del equipo  : material/_extract/fotos/Question/*  -> src/assets/team/<slug>.jpg
//  - Galería           : material/_extract/Galería/*         -> src/assets/galeria/<archivo>
//  - Bitácora / taller : material/_extract/assets/*          -> src/assets/bitacora/*
//  - Videos            : material/_extract/Galería/*.mp4     -> public/videos/*.mp4|webm + posters
//
// Antes de correrlo, descomprime los .zip de material/ en material/_extract/.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { decodeCsv, parseCsv, normalizeMembers } from "../src/lib/miembros-core.mjs";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const SRC = join(ROOT, "material", "_extract");
const p = (...a) => join(ROOT, ...a);
const only = process.argv[2]; // opcional: team | galeria | bitacora | videos

function ff(args) {
  execFileSync("ffmpeg", ["-v", "error", "-y", ...args], { stdio: "inherit" });
}
function ensure(dir) { mkdirSync(dir, { recursive: true }); }

// Imagen JPG con lado mayor <= max (ffmpeg aplica la rotación EXIF automáticamente).
function jpg(input, output, max) {
  ff(["-i", input, "-vf", `scale='if(gt(iw,ih),min(${max},iw),-2)':'if(gt(iw,ih),-2,min(${max},ih))'`, "-q:v", "3", "-frames:v", "1", output]);
}

function team() {
  const out = p("src", "assets", "team"); ensure(out);
  const corr = JSON.parse(readFileSync(p("src", "data", "miembros-correcciones.json"), "utf8"));
  const miembros = normalizeMembers(parseCsv(decodeCsv(readFileSync(p("src", "data", "miembros.csv")))), corr);
  const dir = join(SRC, "fotos", "Question");
  // JSON público para el sitio: solo los campos que se muestran (sin correos de login ni fechas).
  const publico = miembros.map(({ fotoArchivo, ...m }) => m);
  writeFileSync(p("src", "data", "miembros.json"), JSON.stringify(publico, null, 2) + "\n");
  console.log(`  src/data/miembros.json: ${publico.length} integrantes`);
  if (!existsSync(dir)) { console.warn("  (sin carpeta de fotos: solo se actualizó el JSON)"); return; }
  const files = readdirSync(dir);
  for (const m of miembros) {
    if (!m.fotoArchivo) { console.log(`  sin foto: ${m.nombre}`); continue; }
    const match = files.find((f) => f.normalize("NFC") === m.fotoArchivo.normalize("NFC"));
    if (!match) { console.warn(`  ! no se encontró ${m.fotoArchivo} (${m.nombre})`); continue; }
    jpg(join(dir, match), join(out, `${m.slug}.jpg`), 900);
    console.log(`  ok ${m.slug}`);
  }
}

function galeria() {
  const out = p("src", "assets", "galeria"); ensure(out);
  const { fotos } = JSON.parse(readFileSync(p("src", "data", "galeria.json"), "utf8"));
  const extra = [
    { origen: "PHOTO-2026-11-13-20-07-40[1].jpg", archivo: "render-cad-bicho.jpg" },
    { origen: "PHOTO-2026-11-13-20-07-40.jpg", archivo: "diagrama-direccion.jpg" },
  ];
  for (const f of [...fotos, ...extra]) {
    jpg(join(SRC, "Galería", f.origen), join(out, f.archivo), 1600);
    console.log(`  ok ${f.archivo}`);
  }
}

function bitacora() {
  const out = p("src", "assets", "bitacora"); ensure(out);
  const list = [
    "prototipo-modulos-ensamblados.jpeg", "prototipo-bicho.jpeg", "prototipo-mark-o.jpeg",
    "equipo-soldando-electronica.jpeg", "integrante-armando-oruga.jpeg", "equipo-selfie-taller.jpeg",
    "reunion-01.jpeg", "reunion-03.jpeg", "reunion-04.jpeg", "reunion-06.jpeg", "reunion-08.jpeg",
    "reunion-09.jpeg", "reunion-10.jpeg",
  ];
  for (const f of list) {
    jpg(join(SRC, "assets", f), join(out, f.replace(".jpeg", ".jpg")), 1600);
    console.log(`  ok ${f}`);
  }
}

function videos() {
  const out = p("public", "videos"); ensure(out);
  const g = (n) => join(SRC, "Galería", n);
  const enc = (inputs, filter, name, h) => {
    const base = join(out, name);
    const inArgs = inputs.flatMap((i) => ["-i", i]);
    ff([...inArgs, "-filter_complex", filter, "-map", "[v]", "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "26",
      "-pix_fmt", "yuv420p", "-movflags", "+faststart", `${base}.mp4`]);
    ff([...inArgs, "-filter_complex", filter, "-map", "[v]", "-an", "-c:v", "libvpx-vp9", "-crf", "38", "-b:v", "0",
      "-row-mt", "1", `${base}.webm`]);
    ff(["-ss", "1", "-i", `${base}.mp4`, "-frames:v", "1", "-q:v", "3", `${base}-poster.jpg`]);
    console.log(`  ok ${name} (${h}p)`);
  };
  // Hero: mecanizado + visita a planta (ambos 832x384), en loop.
  enc([g("VIDEO-2026-11-13-20-06-44.mp4"), g("VIDEO-2026-11-13-20-06-44[1].mp4")],
    "[0:v]scale=832:384,setsar=1,fps=30[a];[1:v]scale=832:384,setsar=1,fps=30[b];[a][b]concat=n=2:v=1:a=0[v]", "hero", 384);
  // Banda: prueba de la bolsa toroidal y prototipo de cartón (verticales).
  enc([g("VIDEO-2026-11-13-20-05-40.mp4")], "[0:v]scale=-2:832,fps=30[v]", "bolsa-toroidal", 832);
  enc([g("VIDEO-2026-11-13-20-05-40[1].mp4")], "[0:v]scale=-2:832,fps=30[v]", "prototipo-carton", 832);
}

if (!existsSync(SRC) && only !== "team") {
  console.error("Falta material/_extract. Descomprime los .zip de material/ ahí primero.");
  process.exit(1);
}
const tasks = { team, galeria, bitacora, videos };
for (const [name, fn] of Object.entries(tasks)) {
  if (only && only !== name) continue;
  console.log(`> ${name}`);
  fn();
}
