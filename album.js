// Álbum mecánico: datos de las 6 salas (una por frente de trabajo) y sus piezas.
// Para sumar un video: agregar { url: "https://youtu.be/XXXX", titulo, descripcion } al arreglo
// `videos` de la sala correspondiente. Mientras el arreglo esté vacío se muestra un aviso.
const SALAS = [
  {
    id: "sala-01", nombre: "Cabezal erosionador", frente: "Frente Cabezal",
    videos: [],
    piezas: [
      {
        img: "assets/tuneladora/cabezal-hidroescudo.png",
        titulo: "Cabezal hidroescudo, corte frontal",
        version: "Referencia", fecha: "Oct 2026", tecnica: "Render 3D oficial",
        descripcion: "Disco oscuro con reborde de brida. Ocho piezas de erosión naranjas en patrón de cruz — cuatro internas y cuatro en el borde exterior — con filos escalonados. Los chorros de agua erosionan el terreno a través de aberturas curvas y boquillas triangulares en el disco.",
      },
      {
        img: "assets/cabezal-frontal.jpg",
        titulo: "Cara de corte, vista frontal",
        version: "v1.2", fecha: "Oct 2026", tecnica: "Modelo CAD · render",
        descripcion: "Ocho ranuras curvas guían el material erosionado hacia el centro mientras el disco gira. Los cuatro pares de insertos triangulares fijan la posición de las herramientas de corte.",
      },
    ],
  },
  {
    id: "sala-02", nombre: "Propulsión", frente: "Frente Propulsión",
    videos: [],
    piezas: [
      {
        img: "assets/tuneladora/bolsa-toroidal.png",
        titulo: "Bolsa toroidal, Ø500 × 1500 mm",
        version: "Referencia", fecha: "Oct 2026", tecnica: "Render 3D oficial",
        descripcion: "Tela translúcida amarillo dorada con textura tejida tipo aramida. Un collar de anillo azul acero en el extremo delantero la une al direccionador. Al avanzar, la bolsa rueda sobre las paredes del túnel.",
      },
      {
        img: "assets/tuneladora/propulsor-orugas.png",
        titulo: "Propulsor: 10 orugas, 5 motores",
        version: "Referencia", fecha: "Oct 2026", tecnica: "Render 3D oficial",
        descripcion: "Cilindro plateado con ventanas por donde asoman las orugas, de eslabones alternados azul y naranja. Va en el interior de la bolsa, que se mueve gracias a él.",
      },
    ],
  },
  {
    id: "sala-03", nombre: "Dirección", frente: "Frente Dirección",
    videos: [],
    piezas: [
      {
        img: "assets/tuneladora/direccionador.png",
        titulo: "Direccionador: 2 anillos en cuña",
        version: "Referencia", fecha: "Oct 2026", tecnica: "Render 3D oficial",
        descripcion: "Dos anillos en cuña separados por una línea diagonal. Esa junta permite inclinar el eje hasta 10° en todas direcciones, uniendo el cabezal con la bolsa y curvando la trayectoria.",
      },
      {
        img: "assets/tuneladora/direccionador-accion.png",
        titulo: "Entra a 45° y se endereza",
        version: "Referencia", fecha: "Oct 2026", tecnica: "Render 3D oficial · animación",
        descripcion: "El direccionador guía la curva de entrada y corrige el rumbo hasta enderezar la trayectoria del túnel.",
      },
    ],
  },
  {
    id: "sala-04", nombre: "Muck removal", frente: "Frente Muck removal",
    videos: [],
    piezas: [
      {
        img: "assets/tuneladora/propulsor-accion.png",
        titulo: "El propulsor avanza",
        version: "Referencia", fecha: "Oct 2026", tecnica: "Render 3D oficial · animación",
        descripcion: "La bolsa rueda sobre las paredes del túnel: no hay tornillo de extracción, el material erosionado se desplaza por el propio rodado de la bolsa toroidal.",
      },
      {
        img: "assets/mock-removal.jpg",
        titulo: "Cámara de extracción, vista isométrica",
        version: "v1.0", fecha: "Oct 2026", tecnica: "Modelo CAD · render",
        descripcion: "La cámara cónica recibe el material del cabezal y lo concentra hacia el conducto central. La brida perimetral une el conjunto al casing mediante doce pernos.",
      },
    ],
  },
  {
    id: "sala-05", nombre: "Casing / Soporte", frente: "Frente Casing",
    videos: [],
    piezas: [
      {
        img: "assets/tuneladora/casing-soporte.png",
        titulo: "Casing y soporte",
        version: "Referencia", fecha: "Oct 2026", tecnica: "Render 3D oficial",
        descripcion: "Tubo de acero plateado con nervaduras helicoidales (roscado) en el interior. Se extiende hasta 6 veces su largo — telescópico. Es la parte trasera de la máquina y por ahí sale el cordón umbilical.",
      },
    ],
  },
  {
    id: "sala-06", nombre: "Software y control", frente: "Software y control",
    videos: [],
    piezas: [
      {
        img: null, placeholder: "INTERFAZ DE OPERACIÓN",
        titulo: "Consola de operación",
        version: "v0.1", fecha: "Pendiente", tecnica: "Captura de software",
        descripcion: "Panel desde el que se monitorea presión, torque y posición en tiempo real durante la excavación.",
      },
      {
        img: null, placeholder: "TABLERO ELÉCTRICO",
        titulo: "Tablero de control",
        version: "v0.1", fecha: "Pendiente", tecnica: "Fotografía de taller",
        descripcion: "Controlador, drivers y protecciones montados en un único tablero accesible para mantenimiento.",
      },
    ],
  },
];

const FLAT = SALAS.flatMap((sala, si) => sala.piezas.map((pieza, pi) => ({ ...pieza, sala, si, pi, id: String(si + 1).padStart(2, "0") + "." + (pi + 1) })));

function renderPiezaFrame(pieza, flatIndex) {
  const inner = pieza.img
    ? `<img src="${pieza.img}" alt="${pieza.titulo}" loading="lazy">`
    : `<div class="placeholder">[ ${pieza.placeholder || "PIEZA PENDIENTE"} ]</div>`;
  return `
    <figure style="margin:0">
      <button type="button" class="pieza-frame" data-pieza-idx="${flatIndex}" aria-label="Ampliar ${pieza.titulo}">${inner}</button>
      <figcaption class="pieza-caption">
        <span class="pnum">Nº ${pieza.id}</span>
        <span class="ptitle">${pieza.titulo}</span>
        <span class="pmeta">${pieza.version} · ${pieza.fecha} · ${pieza.tecnica}</span>
        <span class="pdesc">${pieza.descripcion}</span>
      </figcaption>
    </figure>
  `;
}

function renderVideoRow(sala) {
  if (!sala.videos.length) {
    return `<div class="video-placeholder-card">[ Videos de ${sala.nombre.toLowerCase()} pendientes — se agregarán próximamente ]</div>`;
  }
  return sala.videos.map((v, i) => `
    <figure class="video-card" style="margin:0">
      <div class="video-frame">
        <a class="video-play" href="${v.url}" target="_blank" rel="noopener" aria-label="Ver ${v.titulo} en YouTube">
          <span class="video-play-tag">▶ Ver en YouTube</span>
        </a>
      </div>
      <figcaption class="video-caption">
        <span class="vnum">V${i + 1}</span>
        <span class="vtitle">${v.titulo}</span>
        <span class="vdesc">${v.descripcion || ""}</span>
      </figcaption>
    </figure>
  `).join("");
}

function initAlbum() {
  const grids = document.querySelectorAll("[data-piezas-grid]");
  if (!grids.length) return;

  document.querySelectorAll("[data-piezas-total]").forEach((el) => { el.textContent = FLAT.length; });

  grids.forEach((grid) => {
    const si = Number(grid.dataset.sala);
    const offset = FLAT.findIndex((p) => p.si === si);
    const count = SALAS[si].piezas.length;
    grid.innerHTML = FLAT.slice(offset, offset + count).map((p, pi) => renderPiezaFrame(p, offset + pi)).join("");
  });

  document.querySelectorAll("[data-piezas-count]").forEach((el) => {
    const si = Number(el.dataset.sala);
    el.textContent = `${SALAS[si].piezas.length} PIEZAS`.toUpperCase();
  });

  document.querySelectorAll("[data-videos]").forEach((el) => {
    const si = Number(el.dataset.sala);
    el.innerHTML = renderVideoRow(SALAS[si]);
  });

  const modal = document.querySelector("[data-pieza-modal]");
  if (!modal) return;
  const stage = modal.querySelector("[data-pieza-modal-stage]");
  const salaLabel = modal.querySelector("[data-pieza-modal-sala]");
  const idLabel = modal.querySelector("[data-pieza-modal-id]");
  const titulo = modal.querySelector("[data-pieza-modal-titulo]");
  const meta = modal.querySelector("[data-pieza-modal-meta]");
  const desc = modal.querySelector("[data-pieza-modal-desc]");
  const pos = modal.querySelector("[data-pieza-modal-pos]");

  let current = null;

  function render() {
    const p = FLAT[current];
    stage.innerHTML = p.img
      ? `<img src="${p.img}" alt="${p.titulo}">`
      : `<div class="pieza-frame" style="cursor:default;height:100%"><div class="placeholder">[ ${p.placeholder || "PIEZA PENDIENTE"} ]</div></div>`;
    salaLabel.textContent = `Sala ${String(p.si + 1).padStart(2, "0")} · ${p.sala.nombre}`;
    idLabel.textContent = "Nº " + p.id;
    titulo.textContent = p.titulo;
    meta.innerHTML = [
      ["Sala", p.sala.nombre], ["Versión", p.version], ["Fecha", p.fecha],
      ["Técnica", p.tecnica], ["Autoría", p.sala.frente],
    ].map(([k, v]) => `<div class="pieza-meta-row"><dt>${k}</dt><dd>${v}</dd></div>`).join("");
    desc.textContent = p.descripcion;
    pos.textContent = String(current + 1).padStart(2, "0") + " / " + String(FLAT.length).padStart(2, "0");
  }

  function open(i) { current = i; render(); modal.hidden = false; }
  function close() { modal.hidden = true; }
  function step(d) { current = (current + d + FLAT.length) % FLAT.length; render(); }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-pieza-idx]");
    if (btn) open(Number(btn.dataset.piezaIdx));
  });

  modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
  modal.querySelector("[data-pieza-modal-close]").addEventListener("click", close);
  modal.querySelector("[data-pieza-prev]").addEventListener("click", () => step(-1));
  modal.querySelector("[data-pieza-next]").addEventListener("click", () => step(1));

  document.addEventListener("keydown", (e) => {
    if (modal.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  });
}

initAlbum();
