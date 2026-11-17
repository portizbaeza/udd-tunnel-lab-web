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

/** Menú principal: cada botón lleva a su propia página. */
export const NAV_LINKS = [
  { href: "/conocenos", label: "Conócenos" },
  { href: "/funcionamiento", label: "Funcionamiento" },
  { href: "/propuesta", label: "Propuesta" },
  { href: "/avances", label: "Avances" },
];

/** Destino del botón APOYAR del inicio. Cambiar aquí si se usa un link externo de donaciones. */
export const APOYAR_HREF = "/#apoya";

/** Muestra visual de la máquina (página /funcionamiento). */
export const SIMULADOR_URL = "https://simulador-maquina-tunnel-lab.vercel.app/";

/** Redes sociales (sección SÍGUENOS y footer). */
export const REDES = [
  { red: "instagram", nombre: "Instagram", usuario: "@notaboringbicho", href: "https://www.instagram.com/notaboringbicho" },
  { red: "tiktok", nombre: "TikTok", usuario: "@notaboringbicho1", href: "https://www.tiktok.com/@notaboringbicho1" },
] as const;
