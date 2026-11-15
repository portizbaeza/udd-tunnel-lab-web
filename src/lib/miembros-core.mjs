// Lectura y normalización del CSV exportado desde Microsoft Forms ("Miembros Competencia").
// Este módulo es JS puro para que lo usen tanto Astro (src/lib/miembros.ts) como
// el script de medios (scripts/build-media.mjs).

/** Decodifica el CSV: intenta UTF-8 estricto y si falla usa Windows-1252 (export de Excel). */
export function decodeCsv(buffer) {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes).replace(/^﻿/, "");
  } catch {
    return new TextDecoder("windows-1252").decode(bytes);
  }
}

/** Parser CSV que respeta comillas (""), saltos de línea dentro de comillas y separador configurable. */
export function parseCsv(text, sep = ";") {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === sep) { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); field = "";
      if (row.some((v) => v.trim() !== "")) rows.push(row);
      row = [];
    } else field += c;
  }
  row.push(field);
  if (row.some((v) => v.trim() !== "")) rows.push(row);
  const [header, ...data] = rows;
  return data.map((r) => Object.fromEntries(header.map((h, i) => [h.trim(), (r[i] ?? "").trim()])));
}

/** "Juan Agustín Muxi" -> "juan-agustin-muxi" */
export function slugify(s) {
  return s
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const FRENTES_CANON = {
  "cabezal erosionador": "Cabezal erosionador",
  "propulsion": "Propulsión",
  "muck removal": "Muck removal",
  "casing/soporte": "Casing/Soporte",
  "software y control": "Software y control",
  "gestion y sponsors": "Gestión y sponsors",
  "redes sociales": "Redes sociales",
  "direccion": "Dirección",
  "consultores": "Consultores",
};

const CARRERAS_CANON = {
  "ingenieria informatica": "Ingeniería Informática",
};

const key = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

/** Divide campos multivalor de Forms: "A;B;" -> ["A","B"] */
function splitMulti(v) {
  return v.split(";").map((s) => s.trim()).filter(Boolean);
}

function cleanLinkedin(v) {
  if (!v) return null;
  let s = v.trim();
  if (!/linkedin\.com\/in\//i.test(s)) return null; // "no tengo", ".", páginas de configuración, etc.
  s = s.split("?")[0].replace(/\/+$/, "");
  if (!/^https?:\/\//i.test(s)) s = "https://" + s;
  return s;
}

function cleanCorreo(v) {
  if (!v) return null;
  const first = v.split(/[\/,\s]+/).map((s) => s.trim().toLowerCase()).find((s) => s.includes("@"));
  return first || null;
}

/** Nombre del archivo de foto subido a Forms (último segmento de la URL de SharePoint, decodificado). */
export function photoFileName(url) {
  if (!url) return null;
  const last = url.split("/").pop();
  try { return decodeURIComponent(last); } catch { return last; }
}

/**
 * Convierte las filas del CSV en integrantes normalizados.
 * - Deduplica por correo de login (columna "Email"), quedándose con la respuesta más reciente.
 * - Aplica correcciones manuales (objeto indexado por correo de login).
 */
export function normalizeMembers(rows, correcciones = {}) {
  const byLogin = new Map();
  for (const r of rows) {
    const login = (r["Email"] || r["Nombre completo"]).toLowerCase();
    byLogin.set(login, r); // las filas vienen en orden de envío: la última gana
  }
  const out = [];
  for (const [login, r] of byLogin) {
    const nombre = r["Nombre completo"].replace(/\s+/g, " ").trim();
    const fix = correcciones[login] || {};
    const carreras = splitMulti(r["Carrera"]).map((c) => CARRERAS_CANON[key(c)] || c);
    const frentes = splitMulti(r["Sección de trabajo (Las dos principales)"])
      .map((f) => FRENTES_CANON[key(f)] || f.charAt(0).toUpperCase() + f.slice(1));
    const m = {
      slug: slugify(nombre),
      nombre,
      carreras,
      frentes,
      frase: r["Frase que te represente, para la competencia"].trim(),
      descripcion: r["Descripción perfil completo (Piensa en como describirte ante los organizadores de la competencia)"] || null,
      linkedin: cleanLinkedin(r["Link Linkedin"]),
      correo: cleanCorreo(r["Correo de Contacto"]),
      fotoArchivo: photoFileName(r["Foto perfil"]),
      ...fix,
    };
    if (!m.descripcion) m.descripcion = null;
    out.push(m);
  }
  return out;
}
