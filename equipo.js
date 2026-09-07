const TOTAL_EQUIPO = 80;

// Frentes reales tomados de "Sección de trabajo" en data/miembrosList1.csv.
const FRENTES = [
  "Cabezal erosionador", "Propulsión", "Muck removal", "Casing/Soporte",
  "Software y control", "Gestión y sponsors", "Redes sociales", "Dirección",
];

// Carreras que participan en el equipo (ver index.html #competencia).
const CARRERAS = [
  "Ingeniería Civil Industrial", "Ingeniería Civil en Minería", "Geología",
  "Ingeniería en Obras Civiles", "Ingeniería Civil Informática", "Diseño",
  "Ingeniería Comercial", "Ingeniería Informática", "Global Business Administration",
  "Profesor/Consultor",
];

// Inscritos reales via formulario (data/miembrosList1.csv). Fotos en assets/team/.
// El correo es el de "Correo de Contacto" del CSV (el que la persona escribió), no el
// de la columna "Email" (login automático del formulario).
// Para sumar gente nueva: agregar su fila al CSV y una entrada aquí (Lucas Riquelme
// se agregó solo aquí, sin fila nueva en el CSV).
const MIEMBROS_REALES = [
  {

    {
    nombre: "Pablo Ortiz Baeza", carreras: ["Ingeniería Informática"],
    frase: "Conectando sensores, datos, terreno y personas.", frentes: ["Software y control", "Dirección"],
    foto: "assets/team/pablo-ortiz.jpg", linkedin: "https://www.linkedin.com/in/pablo-ortiz-baeza-13450a36",
    correo: "pablo.ortiz@udd.cl",
    descripcion: "Soy ingeniero informático y Team Leader de UDD Tunnel Lab. Trabajo en el Centro C+, donde participo en proyectos vinculados a calidad de aire y calidad de agua, liderando el desarrollo técnico de sistemas basados en sensores, comunicaciones, bases de datos y plataformas de visualización. Además, soy electricista certificado, guía de montaña, rescatista, técnico en trabajos verticales y paramédico. Mi perfil combina tecnología, trabajo en terreno, seguridad operacional y resolución práctica de problemas, con especial interés en desarrollar soluciones aplicadas que conecten la ingeniería con desafíos reales de la sociedad y el medio ambiente.",
  },
  {
    nombre: "Bruno Grossi Córdova", carreras: ["Profesor/Consultor"],
    frase: "innovación", frentes: ["Propulsión", "Redes sociales"],
    foto: "assets/team/bruno-grossi.png", linkedin: null,
    correo: "bruno.grossi@udd.cl",
    descripcion: "Soy Bruno Grossi, Doctor en Biología con postdoctorado en metamateriales, experto en tecnologías bioinspiradas y académico de la Facultad de Ingeniería de la Universidad del Desarrollo. Mi trabajo integra investigación, innovación y desarrollo tecnológico interdisciplinario.",
  },
    nombre: "Daniel Merino Dezar", carreras: ["Ingeniería Civil Industrial"],
    frase: "There is no path; you build it", frentes: ["Gestión y sponsors", "Software y control"],
    foto: "assets/team/daniel-merino-dezar.jpg", linkedin: "https://www.linkedin.com/in/daniel-eduardo-merino-dézar-969601201",
    correo: "danielmerino2003@gmail.com",
  },
  {
    nombre: "Sofía Matus Prades", carreras: ["Ingeniería Civil Industrial"],
    frase: "El futuro es algo que uno mismo hace, tienes que creer en el", frentes: ["Cabezal erosionador"],
    foto: null, linkedin: null, correo: "s.matusp@gmail.com",
  },
  {
    nombre: "Constanza Villanueva Pampilioni", carreras: ["Ingeniería Civil Industrial"],
    frase: "Con prueba y error, ¡la humanidad siempre seguirá avanzando!", frentes: ["Cabezal erosionador"],
    foto: "assets/team/constanza-villanueva.jpg", linkedin: null, correo: "constanza.villap@gmail.com",
  },
  {
    nombre: "Constanza Chandia Martinez", carreras: ["Ingeniería Civil Industrial"],
    frase: "La creatividad me trajo hasta acá, la ingeniería me impulsa hacia adelante.", frentes: ["Redes sociales", "Muck removal"],
    foto: "assets/team/constanza-chandia.jpg", linkedin: "https://www.linkedin.com/in/cony-chandia-m-a40161388",
    correo: "conychandiamartinez@gmail.com",
    descripcion: "Me considero una persona creativa, con muchas ganas de aprender y siempre motivada por descubrir cosas nuevas. Disfruto trabajar en equipo, escuchar nuevas ideas y aportar desde mi propia perspectiva para encontrar soluciones en conjunto. Siempre estoy abierta a nuevos desafíos y aventuras que me permitan salir de mi zona de confort, vivir nuevas experiencias y seguir creciendo tanto personal como profesionalmente.",
  },
  {
    nombre: "Vicente Seckel", carreras: ["Ingeniería Civil Industrial", "Ingeniería Civil Informática"],
    frase: "Codificador en python que busca grandes desafíos.", frentes: ["Software y control", "Gestión y sponsors"],
    foto: "assets/team/vicente-seckel.jpeg", linkedin: "https://www.linkedin.com/in/vicente-seckel-ticona-b77285334",
    correo: "vseckelt@udd.cl",
  },
  {
    nombre: "Renato Riquelme Muñoz", carreras: ["Ingeniería Civil Industrial"],
    frase: "Construir algo que valga la pena", frentes: ["Software y control", "Gestión y sponsors"],
    foto: "assets/team/renato-riquelme.jpg", linkedin: "https://cl.linkedin.com/in/renato-riquelme-mu%C3%B1oz-b1a890228",
    correo: "r.riquelmem@udd.cl",
  },
  {
    nombre: "Juan Andres Mavarez Ponce", carreras: ["Ingeniería Civil Informática"],
    frase: "Sin software, la máquina es metal ciego.", frentes: ["Software y control"],
    foto: "assets/team/juan-mavarez.jpeg", linkedin: "https://www.linkedin.com/in/juan-undefined-38025b433",
    correo: "J.mavarezp@udd.cl",
  },
  {
    nombre: "María Fernanda Zúñiga Hernández", carreras: ["Ingeniería en Obras Civiles"],
    frase: "Solo hace falta intentarlo para tenerlo todo por ganar.", frentes: ["Gestión y sponsors", "Casing/Soporte"],
    foto: "assets/team/fernanda-zuniga.jpeg", linkedin: "https://www.linkedin.com/in/fernanda-z%C3%BA%C3%B1iga-363b70332",
    correo: "Mazunigah@udd.cl",
  },
  {
    nombre: "Diego Martín Medina Barrera", carreras: ["Ingeniería Civil Industrial"],
    frase: "Las mejores lecciones ocurren cuando uno se tropieza.", frentes: ["Muck removal", "Casing/Soporte"],
    foto: "assets/team/diego-medina.jpeg", linkedin: "https://cl.linkedin.com/in/diego-medina-a59387251",
    correo: "d.medinab@udd.cl",
  },
  {
    nombre: "Juan Ignacio Rodríguez Niño", carreras: ["Ingeniería Civil Informática", "Ingeniería Comercial"],
    frase: "Toda gran idea comienza cuando alguien se atreve.", frentes: ["Software y control"],
    foto: "assets/team/juan-rodriguez.jpg", linkedin: "https://www.linkedin.com/in/juan-ignacio-rodr%C3%ADguez-ni%C3%B1o-a46804271",
    correo: "ju.rodriguezn@udd.cl",
  },
  {
    nombre: "Macarena Ines Alonso Flores", carreras: ["Ingeniería Civil Industrial"],
    frase: "Si no lo intentas, nunca verás la posibilidad que te espera", frentes: ["Propulsión", "Gestión y sponsors"],
    foto: "assets/team/macarena-alonso.jpeg", linkedin: null, correo: "m.alonsof@udd.cl",
  },
  {
    nombre: "Lucas Riquelme Torres", carreras: ["Ingeniería Civil Informática", "Ingeniería Civil Industrial"],
    frase: "Nos esse quasi nanos gigantum humeris insidentes", frentes: ["Gestión y sponsors", "Software y control"],
    foto: "assets/team/lucas-riquelme.jpg", linkedin: "https://www.linkedin.com/in/lucas-riquelme-133378343",
    correo: "l.riquelmet@udd.cl",
  },
  {
    nombre: "Andrés Edgardo Henry Guerrero", carreras: ["Ingeniería Civil Informática", "Ingeniería Civil Industrial"],
    frase: "No tengo tiempo para rendirme. Apenas estamos comenzando", frentes: ["Propulsión", "Dirección"],
    foto: "assets/team/andres-henry.jpeg", linkedin: "https://www.linkedin.com/in/andr%C3%A9s-henry-0032b8321",
    correo: "A.henryg@udd.cl",
  },
  {
    nombre: "Joaquín Matías Almeida Aguayo", carreras: ["Ingeniería Civil Informática"],
    frase: "La curiosidad me lleva más lejos que la certeza", frentes: ["Software y control", "Dirección"],
    foto: "assets/team/joaquin-almeida.jpg", linkedin: "https://www.linkedin.com/in/joaqu%C3%ADn-mat%C3%ADas-almeida-aguayo-b233a8433",
    correo: "joacoflooalmeida@gmail.com",
  },
  {
    nombre: "Juan Agustín Muxi", carreras: ["Ingeniería Civil en Minería"],
    frase: "De Chile para el mundo", frentes: ["Casing/Soporte", "Cabezal erosionador"],
    foto: "assets/team/juan-muxi.jpg", linkedin: null,
    correo: "J.muxif@udd.cl",
  },
  {
    nombre: "David Alfonso Sánchez Ramírez", carreras: ["Ingeniería Civil Informática"],
    frase: "El esfuerzo y perseverancia son la base de todo", frentes: ["Software y control", "Dirección"],
    foto: "assets/team/david-sanchez.jpg", linkedin: "https://www.linkedin.com/in/david-sanchez-ramirez-11b9b1401",
    correo: "davo.san.ram@gmail.com",
  },
  {
    nombre: "Aleksander Constanzo Belmar", carreras: ["Ingeniería Civil Informática"],
    frase: "Aprendiendo, construyendo y cavando el futuro", frentes: ["Software y control"],
    foto: "assets/team/aleksander-constanzo.jpeg", linkedin: "https://www.linkedin.com/in/aleksander-constanzo",
    correo: "aleksanderconstanzo60@gmail.com",
  },
  {
    nombre: "Antonia Paz Herrera Espiñeira", carreras: ["Ingeniería Civil Industrial"],
    frase: "Cada obstáculo es una oportunidad para mejorar el diseño", frentes: ["Propulsión", "Casing/Soporte"],
    foto: "assets/team/antonia-herrera.jpg", linkedin: "https://www.linkedin.com/in/antonia-paz-herrera-espiñeira-b584b238a",
    correo: "A.herrerae@udd.cl",
  },
  {
    nombre: "Franco Salinas Theler", carreras: ["Global Business Administration"],
    frase: "Sleep is fleeting, glory is eternal", frentes: ["Gestión y sponsors", "Redes sociales"],
    foto: "assets/team/franco-salinas.jpeg", linkedin: "https://www.linkedin.com/in/franco-salinas-theler",
    correo: "f.salinast@udd.cl",
  },
  {
    nombre: "María Emilia Salinas Theler", carreras: ["Ingeniería Comercial"],
    frase: "Running on caffeine and ambitious", frentes: ["Gestión y sponsors", "Redes sociales"],
    foto: "assets/team/maria-salinas.jpg", linkedin: "https://www.linkedin.com/in/maria-emilia-salinas-theler",
    correo: "Emisalinas2612@gmail.com",
  },
];

const LINKEDIN_ICON = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`;
const MAIL_ICON = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 4h20v16H2V4zm2 2.24V18h16V6.24l-8 5.99-8-5.99zM4.5 6l7.5 5.63L19.5 6h-15z"/></svg>`;

function buildRoster() {
  const roster = MIEMBROS_REALES.map((p) => ({ ...p, real: true }));
  for (let i = roster.length; i < TOTAL_EQUIPO; i++) {
    roster.push({
      nombre: "Cupo por completar",
      carreras: [CARRERAS[i % CARRERAS.length]],
      frentes: [FRENTES[i % FRENTES.length]],
      frase: "Reemplazar por la frase de este integrante.",
      foto: null, linkedin: null, correo: null, real: false,
    });
  }
  return roster.map((p, i) => ({ ...p, num: String(i + 1).padStart(2, "0") }));
}

function initEquipoPage() {
  const chipsWrap = document.querySelector("[data-filter-chips]");
  const rosterWrap = document.querySelector("[data-roster]");
  const countLabel = document.querySelector("[data-roster-count]");
  const headerCount = document.querySelector("[data-equipo-count]");
  const personModal = document.querySelector("[data-person-modal]");
  if (!chipsWrap || !rosterWrap) return;

  const roster = buildRoster();
  const filters = ["Todos", ...FRENTES];
  let activeFilter = "Todos";

  if (headerCount) {
    const carrerasUnicas = new Set(roster.flatMap((p) => p.carreras)).size;
    const frentesUnicos = new Set(roster.flatMap((p) => p.frentes)).size;
    headerCount.textContent = `${roster.length} integrantes · ${carrerasUnicas} carreras · ${frentesUnicos} frentes`;
  }

  function renderChips() {
    chipsWrap.innerHTML = filters.map((label) => `
      <button type="button" class="chip" data-filter="${label}" aria-pressed="${label === activeFilter}">${label}</button>
    `).join("");
  }

  function renderRoster() {
    const people = activeFilter === "Todos" ? roster : roster.filter((p) => p.frentes.includes(activeFilter));
    countLabel.textContent = `${people.length} fichas`;
    rosterWrap.innerHTML = people.map((p) => `
      <div class="person${p.real ? " is-real" : ""}" data-person-idx="${Number(p.num) - 1}" role="button" tabindex="0">
        <div class="person-photo">
          ${p.foto ? `<img src="${p.foto}" alt="${p.nombre}" loading="lazy">` : `<span>[ RETRATO ]</span>`}
          <span class="person-num">${p.num}</span>
        </div>
        <div class="person-body">
          <h3>${p.nombre}</h3>
          <div class="person-carrera">${p.carreras.join(" · ")}</div>
          <div class="person-frentes">${p.frentes.map((f) => `<span class="frente-tag">${f}</span>`).join("")}</div>
          <p class="person-frase">${p.frase}</p>
          ${p.linkedin || p.correo ? `
            <div class="person-contact">
              ${p.linkedin ? `<a class="person-linkedin" href="${p.linkedin}" target="_blank" rel="noopener">${LINKEDIN_ICON}LinkedIn</a>` : ""}
              ${p.correo ? `<a class="person-email" href="mailto:${p.correo}">${MAIL_ICON}Correo</a>` : ""}
            </div>
          ` : ""}
        </div>
      </div>
    `).join("");
  }

  function renderPersonModal(idx) {
    if (!personModal) return;
    const p = roster[idx];
    if (!p) return;
    personModal.querySelector("[data-person-modal-photo]").innerHTML = p.foto
      ? `<img src="${p.foto}" alt="${p.nombre}" loading="lazy">`
      : `<span>[ RETRATO ]</span>`;
    personModal.querySelector("[data-person-modal-num]").textContent = `Ficha ${p.num}`;
    personModal.querySelector("[data-person-modal-nombre]").textContent = p.nombre;
    personModal.querySelector("[data-person-modal-carrera]").textContent = p.carreras.join(" · ");
    personModal.querySelector("[data-person-modal-frentes]").innerHTML =
      p.frentes.map((f) => `<span class="frente-tag">${f}</span>`).join("");
    personModal.querySelector("[data-person-modal-frase]").textContent = p.frase;
    personModal.querySelector("[data-person-modal-desc]").innerHTML = p.descripcion
      ? `<p class="person-modal-desc">${p.descripcion}</p>`
      : `<p class="person-modal-desc is-pending">La descripción pronto se subirá.</p>`;
    personModal.querySelector("[data-person-modal-contact]").innerHTML = p.linkedin || p.correo ? `
      ${p.linkedin ? `<a class="person-linkedin" href="${p.linkedin}" target="_blank" rel="noopener">${LINKEDIN_ICON}LinkedIn</a>` : ""}
      ${p.correo ? `<a class="person-email" href="mailto:${p.correo}">${MAIL_ICON}Correo</a>` : ""}
    ` : "";
  }

  function openPersonModal(idx) {
    if (!personModal) return;
    renderPersonModal(idx);
    personModal.hidden = false;
  }

  function closePersonModal() {
    if (!personModal) return;
    personModal.hidden = true;
  }

  chipsWrap.addEventListener("click", (e) => {
    const chip = e.target.closest("[data-filter]");
    if (!chip) return;
    activeFilter = chip.dataset.filter;
    renderChips();
    renderRoster();
  });

  rosterWrap.addEventListener("click", (e) => {
    const card = e.target.closest("[data-person-idx]");
    if (!card) return;
    openPersonModal(Number(card.dataset.personIdx));
  });

  rosterWrap.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const card = e.target.closest("[data-person-idx]");
    if (!card) return;
    e.preventDefault();
    openPersonModal(Number(card.dataset.personIdx));
  });

  if (personModal) {
    personModal.addEventListener("click", (e) => {
      if (e.target === personModal) closePersonModal();
    });
    personModal.querySelector("[data-person-modal-close]").addEventListener("click", closePersonModal);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !personModal.hidden) closePersonModal();
    });
  }

  renderChips();
  renderRoster();
}

initEquipoPage();
