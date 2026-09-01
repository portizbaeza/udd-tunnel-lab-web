# UDD Tunnel Lab Web

Sitio estático de UDD Tunnel Lab para la Not-a-Boring Competition.

## Archivos

- `index.html`: página principal (hero, competencia, propuesta B.I.C.H.O, avances, socios, adelanto del equipo, únete, contacto).
- `equipo.html`: archivo del equipo con las 50 fichas de integrantes, filtrables por frente de trabajo.
- `styles.css`: variables de diseño y estilos de ambas páginas.
- `script.js`: cuenta regresiva, carrusel de fotos con lightbox y pestañas de avances (solo `index.html`).
- `equipo.js`: generación del roster y filtro por frente (solo `equipo.html`).
- `assets/`: logos (UDD, equipo, Chile, Sudamérica), favicons, imagen Open Graph, fotos del equipo en el taller y de los primeros prototipos.

## Qué reemplazar después

1. Completar el roster real en `equipo.js` (hoy solo Pablo Ortiz y Bruno Grozzi tienen datos reales; el resto son "Cupo por completar").
2. Reemplazar los placeholders `[ RENDER / CAD DE LA MÁQUINA ]`, `[ FOTO TALLER ]` y `[ DIAGRAMA CABEZAL ]` en la sección "Propuesta" por contenido real.
3. Agregar fotos reales en las fichas del equipo (`index.html` y `equipo.html`), hoy son placeholders `[ FOTO ]` / `[ RETRATO ]`.
4. Agregar fotos reales en la Bitácora (`#avances`, pestaña "Bitácora") — hecho para #002–#006, falta la foto de #001 · HITO.
5. Confirmar el email de contacto (`pablo.ortiz@udd.cl`) usado en el formulario, el CTA de "Únete" y el footer.
6. Revisar la fecha límite de la cuenta regresiva en `script.js` (`DEADLINE`) si cambia el cronograma de la competencia.
