const DEADLINE = new Date("2027-02-01T09:00:00-06:00").getTime();

const PHOTOS = [
  { src: "assets/reunion-06.jpeg", title: "El equipo completo en la primera reunión general" },
  { src: "assets/reunion-09.jpeg", title: "Demostración del modelo de casing de la tuneladora" },
  { src: "assets/reunion-04.jpeg", title: "Cabezales de corte reales y primeras maquetas de papel" },
  { src: "assets/reunion-03.jpeg", title: "Charla de apertura en el Maker Campus" },
  { src: "assets/reunion-01.jpeg", title: "Vista general del laboratorio de innovación" },
  { src: "assets/reunion-08.jpeg", title: "Profesor guía explicando el plan de trabajo" },
  { src: "assets/reunion-10.jpeg", title: "Revisión del prototipo de estructura flexible" },
];

function initCountdown() {
  const days = document.querySelector("[data-cd-days]");
  const hours = document.querySelector("[data-cd-hours]");
  const minutes = document.querySelector("[data-cd-minutes]");
  const seconds = document.querySelector("[data-cd-seconds]");
  if (!days) return;

  const pad = (n) => String(n).padStart(2, "0");

  function tick() {
    const diff = Math.max(0, DEADLINE - Date.now());
    const s = Math.floor(diff / 1000);
    days.textContent = String(Math.floor(s / 86400));
    hours.textContent = pad(Math.floor(s / 3600) % 24);
    minutes.textContent = pad(Math.floor(s / 60) % 60);
    seconds.textContent = pad(s % 60);
  }

  tick();
  setInterval(tick, 1000);
}

function initGalleryAndLightbox() {
  const track = document.querySelector("[data-gallery-track]");
  if (!track) return;

  const posLabel = document.querySelector("[data-gallery-pos]");
  const prevBtn = document.querySelector("[data-gallery-prev]");
  const nextBtn = document.querySelector("[data-gallery-next]");
  const visibleCount = 4;
  const maxIndex = Math.max(0, PHOTOS.length - visibleCount);
  let galleryIndex = 0;

  track.innerHTML = PHOTOS.map((photo, i) => `
    <button type="button" class="gallery-item" data-index="${i}">
      <div class="gallery-frame">
        <img src="${photo.src}" alt="${photo.title}" loading="lazy">
        <span class="gallery-num">${String(i + 1).padStart(2, "0")}</span>
        <span class="gallery-zoom">⤢</span>
      </div>
      <div class="gallery-title">${photo.title}</div>
    </button>
  `).join("");

  function renderGallery() {
    track.style.transform = `translateX(-${galleryIndex * 25}%)`;
    posLabel.textContent = `${galleryIndex + 1}–${Math.min(PHOTOS.length, galleryIndex + visibleCount)} / ${PHOTOS.length}`;
    prevBtn.disabled = galleryIndex === 0;
    nextBtn.disabled = galleryIndex === maxIndex;
  }

  prevBtn.addEventListener("click", () => {
    galleryIndex = Math.max(0, galleryIndex - 1);
    renderGallery();
  });
  nextBtn.addEventListener("click", () => {
    galleryIndex = Math.min(maxIndex, galleryIndex + 1);
    renderGallery();
  });

  const lightbox = document.querySelector("[data-lightbox]");
  const lightboxStage = document.querySelector("[data-lightbox-stage]");
  const lightboxNum = document.querySelector("[data-lightbox-num]");
  const lightboxTitle = document.querySelector("[data-lightbox-title]");
  const lightboxPos = document.querySelector("[data-lightbox-pos]");
  let lightboxIndex = null;

  function renderLightbox() {
    const open = lightboxIndex !== null;
    lightbox.hidden = !open;
    if (!open) return;
    const photo = PHOTOS[lightboxIndex];
    lightboxStage.innerHTML = `<img src="${photo.src}" alt="${photo.title}">`;
    lightboxNum.textContent = `Registro ${String(lightboxIndex + 1).padStart(2, "0")}`;
    lightboxTitle.textContent = photo.title;
    lightboxPos.textContent = `${lightboxIndex + 1} / ${PHOTOS.length}`;
  }

  function openLightbox(i) {
    lightboxIndex = i;
    renderLightbox();
  }
  function closeLightbox() {
    lightboxIndex = null;
    renderLightbox();
  }
  function stepLightbox(delta) {
    lightboxIndex = (lightboxIndex + delta + PHOTOS.length) % PHOTOS.length;
    renderLightbox();
  }

  track.addEventListener("click", (e) => {
    const item = e.target.closest("[data-index]");
    if (item) openLightbox(Number(item.dataset.index));
  });

  lightbox.addEventListener("click", closeLightbox);
  document.querySelector("[data-lightbox-close]").addEventListener("click", closeLightbox);
  document.querySelector("[data-lightbox-prev]").addEventListener("click", (e) => {
    e.stopPropagation();
    stepLightbox(-1);
  });
  document.querySelector("[data-lightbox-next]").addEventListener("click", (e) => {
    e.stopPropagation();
    stepLightbox(1);
  });

  document.addEventListener("keydown", (e) => {
    if (lightboxIndex === null) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") stepLightbox(1);
    if (e.key === "ArrowLeft") stepLightbox(-1);
  });

  renderGallery();
}

function initTabs() {
  const tabs = document.querySelectorAll("[data-tab]");
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;
      tabs.forEach((t) => t.setAttribute("aria-selected", String(t === tab)));
      document.querySelectorAll("[data-tab-panel]").forEach((panel) => {
        panel.hidden = panel.dataset.tabPanel !== target;
      });
    });
  });
}

initCountdown();
initGalleryAndLightbox();
initTabs();
