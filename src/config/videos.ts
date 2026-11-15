// Videos del sitio.
// - "local": archivos livianos en public/videos (generados con `npm run media`), se usan en puntos clave.
// - "youtube": el resto de los videos del equipo. Para agregar uno, súbelo al canal y pega aquí su ID
//   (lo que va después de "watch?v=" en el link de YouTube).

export const HERO_VIDEO = {
  mp4: "/videos/hero.mp4",
  webm: "/videos/hero.webm",
  poster: "/videos/hero-poster.jpg",
  descripcion: "Mecanizado de piezas y visita técnica a planta",
};

export const BANDA_VIDEOS = [
  {
    mp4: "/videos/bolsa-toroidal.mp4",
    webm: "/videos/bolsa-toroidal.webm",
    poster: "/videos/bolsa-toroidal-poster.jpg",
    etiqueta: "Prueba 01",
    titulo: "Bolsa toroidal",
    texto: "Primera manipulación de la bolsa toroidal en el laboratorio.",
  },
  {
    mp4: "/videos/prototipo-carton.mp4",
    webm: "/videos/prototipo-carton.webm",
    poster: "/videos/prototipo-carton-poster.jpg",
    etiqueta: "Prototipo 01",
    titulo: "B.I.C.H.O en cartón",
    texto: "El primer prototipo de tracción, construido para iterar rápido.",
  },
];

export interface YoutubeVideo { id: string; titulo: string }

export const YOUTUBE_VIDEOS: YoutubeVideo[] = [
  { id: "jONJG6_QA3c", titulo: "UDD Tunnel Lab en video" },
  // { id: "XXXXXXXXXXX", titulo: "Título del video" },
];
