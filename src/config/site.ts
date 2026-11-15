// Datos generales del sitio. Cambiar aquí actualiza todas las páginas.
export const SITE = {
  nombre: "UDD Tunnel Lab",
  /** Total de integrantes del equipo (estudiantes y profesores). */
  totalEquipo: 40,
  subsistemas: 6,
  disciplinas: 7,
  /** Fecha límite de entrega en Bastrop, TX (cuenta atrás del hero). */
  deadline: "2027-02-01T09:00:00-06:00",
  formularioInscripcion: "https://forms.cloud.microsoft/r/rLkU1Ei4Jc?origin=lprLink",
  correoEquipo: "notaboringbicho@gmail.com",
  correoDudasInscripcion: "pablo.ortiz@udd.cl",
  youtubeCanal: "https://www.youtube.com/watch?v=jONJG6_QA3c",
} as const;

/** Menú principal: mismo orden que las secciones de la home y mismo set en todas las páginas. */
export const NAV_LINKS = [
  { href: "/#competencia", label: "Competencia" },
  { href: "/#propuesta", label: "Propuesta" },
  { href: "/#avances", label: "Avances" },
  { href: "/#galeria", label: "Galería" },
  { href: "/#socios", label: "Socios" },
  { href: "/#apoya", label: "Apoya" },
  { href: "/equipo", label: "Equipo" },
];
export const NAV_CTA = { href: "/#unete", label: "Únete" };
