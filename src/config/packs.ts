// Packs de apoyo al equipo (FASE 2 — aún sin cobro en línea).
//
// ⚠️ CONTENIDO DE EJEMPLO: nombres, montos y beneficios deben reemplazarse por los
// packs definitivos que apruebe el equipo. Mientras `pagosActivos` sea false, cada
// pack muestra "Próximamente" y el botón lleva al formulario de contacto.
// Cómo conectar un medio de pago: ver src/lib/payments/README.md

export const pagosActivos = false;

export interface Pack {
  id: string;
  nombre: string;
  /** Monto en CLP. null = "Por definir". */
  monto: number | null;
  beneficios: string[];
  destacado?: boolean;
}

export const PACKS: Pack[] = [
  {
    id: "explorador",
    nombre: "Explorador",
    monto: null,
    beneficios: ["Agradecimiento en la bitácora del proyecto", "Boletín con los avances de B.I.C.H.O"],
  },
  {
    id: "perforador",
    nombre: "Perforador",
    monto: null,
    beneficios: ["Pack Explorador completo", "Saludo del equipo en redes sociales"],
  },
  {
    id: "tunelero",
    nombre: "Tunelero",
    monto: null,
    beneficios: ["Pack Perforador completo", "Nombre en el registro audiovisual de la competencia"],
    destacado: true,
  },
  {
    id: "frente",
    nombre: "Frente de obra",
    monto: null,
    beneficios: ["Pack Tunelero completo", "Visita guiada al taller y a la máquina"],
  },
];

export const formatCLP = (n: number) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(n);
