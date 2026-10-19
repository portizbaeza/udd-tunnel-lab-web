// Anatomía de B.I.C.H.O: la figura es estática (generada por la skill /anatomy,
// ver assets/anatomy-build/build.mjs) y cada pieza es un <a> real — el click ya
// navega sin JS. Este script solo anima el readout de la tarjeta: muestra el
// nombre de la pieza bajo el cursor, o recorre las 5 piezas cuando está inactivo.
function initAnatomiaReadout() {
  const stage = document.querySelector("[data-anatomia-figure] .iso-stage");
  if (!stage) return;

  const readout = stage.closest(".iso-plate")?.querySelector("[data-readout]");
  const hotspots = Array.from(stage.querySelectorAll(".anatomy-hotspot"));
  if (!readout || !hotspots.length) return;

  const defaultText = readout.textContent;
  let tourIndex = 0;
  let tourTimer = null;
  const still = matchMedia("(prefers-reduced-motion: reduce)");

  function show(part) {
    const hint = part.dataset.hint;
    readout.textContent = hint ? `${part.dataset.part} · ${hint}` : defaultText;
  }

  function tour() {
    show(hotspots[tourIndex % hotspots.length]);
    tourIndex++;
  }

  function startTour() {
    if (still.matches) return;
    stopTour();
    tourTimer = setInterval(tour, 3200);
    tour();
  }
  function stopTour() {
    if (tourTimer) clearInterval(tourTimer);
    tourTimer = null;
  }

  hotspots.forEach((hotspot) => {
    hotspot.addEventListener("pointerenter", () => { stopTour(); show(hotspot); });
    hotspot.addEventListener("focus", () => { stopTour(); show(hotspot); });
    hotspot.addEventListener("pointerleave", startTour);
    hotspot.addEventListener("blur", startTour);
  });

  new IntersectionObserver((entries) => {
    if (entries[entries.length - 1].isIntersecting) startTour();
    else stopTour();
  }, { rootMargin: "120px 0px" }).observe(stage);
}

initAnatomiaReadout();
