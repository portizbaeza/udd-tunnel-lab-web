// Hitos de la línea del tiempo de /avances.
//
// Para agregar un hito: copia un bloque { ... } y ponlo en el lugar que le corresponde
// (el orden de la lista es el orden en pantalla: de más antiguo a más reciente).
//   fecha        texto corto que se muestra como etiqueta (ej. "SEP 2026")
//   titulo       se muestra en Russo One, mayúsculas
//   descripcion  una o dos frases
//   imagen       opcional: ruta dentro de src/assets/ (ej. "bitacora/reunion-01.jpg" o "galeria/vista-planta.jpg")
//   alt          opcional: descripción de la foto para lectores de pantalla
//   estado       "hecho" (cuadrado naranjo lleno), "en-curso" o "proximo" (cuadrado hueco)
//   enlace       opcional: { href, texto } para un botón bajo la descripción
import { SITE } from "../config/site";

export type EstadoHito = "hecho" | "en-curso" | "proximo";

export interface Hito {
  fecha: string;
  titulo: string;
  descripcion: string;
  imagen?: string;
  alt?: string;
  estado?: EstadoHito;
  enlace?: { href: string; texto: string };
}

export const HITOS: Hito[] = [
  {
    fecha: "JUL 2026",
    titulo: "Nace UDD Tunnel Lab",
    descripcion: "La Facultad de Ingeniería impulsa el equipo y define su identidad: UDD Tunnel Lab, con B.I.C.H.O como nombre de la máquina.",
    imagen: "bitacora/reunion-01.jpg",
    alt: "Laboratorio de innovación de la UDD durante la primera reunión",
  },
  {
    fecha: "JUL 2026",
    titulo: `${SITE.totalEquipo} estudiantes se inscriben`,
    descripcion: `La convocatoria abierta a todas las carreras cierra con ${SITE.totalEquipo} inscritos: ingeniería, minería, geología, obras civiles, industrial e informática.`,
    imagen: "bitacora/equipo-selfie-taller.jpg",
    alt: "Selfie grupal del equipo en el taller",
  },
  {
    fecha: "AGO 2026",
    titulo: "Se forman los 6 frentes de trabajo",
    descripcion: "Cada subsistema queda con un equipo de estudiantes y un profesor guía. Empieza la investigación técnica en paralelo.",
    imagen: "bitacora/integrante-armando-oruga.jpg",
    alt: "Integrante del equipo armando piezas del prototipo",
  },
  {
    fecha: "AGO 2026",
    titulo: "Primer boceto de B.I.C.H.O",
    descripcion: "Consolidamos las propuestas de arquitectura de los equipos en un único boceto para presentar a los organizadores de la competencia.",
    imagen: "bitacora/equipo-soldando-electronica.jpg",
    alt: "Integrantes soldando electrónica en el taller",
  },
  {
    fecha: "AGO 2026",
    titulo: "Nacen B.I.C.H.O y MARK-O",
    descripcion: "Los dos primeros prototipos rodantes del equipo, construidos para iterar rápido sobre el sistema de tracción antes de comprometer el diseño final.",
    imagen: "bitacora/prototipo-bicho.jpg",
    alt: "Prototipo de tracción a escala bautizado B.I.C.H.O",
  },
  {
    fecha: "AGO 2026",
    titulo: "Primeros prototipos de tracción a escala",
    descripcion: "Construimos y probamos los primeros módulos de oruga a escala para validar el sistema de tracción antes de pasar al tamaño real.",
    imagen: "bitacora/prototipo-modulos-ensamblados.jpg",
    alt: "Módulos de oruga del prototipo ensamblados",
  },
  {
    fecha: "2026 · S2",
    titulo: "Diseño preliminar",
    descripcion: "Arquitectura por subsistemas y primer boceto formal para los organizadores.",
    estado: "en-curso",
  },
  {
    fecha: "2026 – 2027",
    titulo: "Fabricación",
    descripcion: "Mecanizado, estructura y componentes. Esta etapa depende del financiamiento que logremos reunir.",
    estado: "proximo",
    enlace: { href: "/#apoya", texto: "Ayúdanos a llegar" },
  },
  {
    fecha: "2027 · S1",
    titulo: "Pruebas en terreno",
    descripcion: "Excavación controlada, navegación y validación del sistema completo.",
    estado: "proximo",
  },
  {
    fecha: "FEB 2027",
    titulo: "Texas",
    descripcion: "Traslado de la máquina y competencia presencial en Bastrop.",
    estado: "proximo",
  },
];
