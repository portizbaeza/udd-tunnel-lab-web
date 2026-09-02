# UDD Tunnel Lab Web

Sitio estático de UDD Tunnel Lab para la Not-a-Boring Competition.

## Estructura del proyecto

- `index.html`: página principal (hero, competencia, propuesta B.I.C.H.O, avances, socios, adelanto del equipo, únete, contacto).
- `equipo.html`: página del equipo con las fichas de integrantes (roster completo), filtrables por frente de trabajo.
- `styles.css`: variables de diseño y estilos de ambas páginas.
- `script.js`: cuenta regresiva, carrusel de fotos con lightbox y pestañas de avances (solo `index.html`).
- `equipo.js`: datos del roster (`MIEMBROS_REALES`) y generación/filtro de las fichas del equipo (solo `equipo.html`).
- `nav-toggle.js`: menú de navegación en mobile.
- `assets/`: logos (UDD, equipo, Chile, Sudamérica), favicons, imagen Open Graph, fotos del taller y de los primeros prototipos.
- `assets/team/`: fotos de perfil de cada integrante. Convención de nombre de archivo: `nombre-apellido.ext` en minúsculas y sin tildes/ñ (ej. `constanza-villanueva.jpg`), tal como aparecen referenciadas en `equipo.js`.
- `data/miembrosList1.csv`: exportación del formulario de inscripción (no versionado, ver `.gitignore`). Es la fuente original de los datos que después se cargan a mano en `equipo.js`.

## Cómo editar el sitio

- **Textos de `index.html`** (hero, competencia, propuesta, avances, socios, "únete", contacto): se editan directamente en el HTML, buscando la sección por su `id` (`#competencia`, `#propuesta`, `#avances`, etc.).
- **Estilos**: en `styles.css`. Las variables de diseño (colores, tipografías, espaciados) están declaradas al inicio del archivo; preferir tocar esas variables antes que hardcodear valores nuevos.
- **Carrusel, cuenta regresiva y pestañas de avances**: en `script.js`. La fecha límite de la cuenta regresiva es la constante `DEADLINE`; hay que revisarla si cambia el cronograma de la competencia.
- **Fotos**: agregar el archivo a `assets/team/` (o `assets/` según corresponda) siguiendo la convención de nombres, y referenciar la ruta desde donde corresponda (ver sección siguiente para fotos de integrantes).

## Cómo actualizar el roster de estudiantes

Los integrantes reales se cargan a mano en el array `MIEMBROS_REALES` de `equipo.js`. El flujo cuando alguien nuevo envía su información por el formulario es:

1. Se agrega su fila a `data/miembrosList1.csv` (o se ubica si ya está ahí).
2. Se agrega (o edita) su objeto dentro de `MIEMBROS_REALES` en `equipo.js`, con estos campos:
   - `nombre`: nombre completo.
   - `carreras`: array de una o más carreras. Deben coincidir textualmente con alguna de las listadas en la constante `CARRERAS` (arriba del archivo).
   - `frase`: frase corta del integrante.
   - `frentes`: array de uno o más frentes de trabajo. Deben coincidir textualmente con alguno de los listados en la constante `FRENTES`.
   - `foto`: ruta a `assets/team/nombre-apellido.ext`, o `null` si todavía no hay foto.
   - `linkedin`: URL de LinkedIn, o `null` si no tiene.
   - `correo`: usar el **"Correo de Contacto"** del CSV (el que la persona escribió a mano), **no** la columna `Email` (esa es el login automático del formulario).
3. Si hay foto, subir el archivo a `assets/team/` con el nombre `nombre-apellido.ext` (minúsculas, sin tildes ni ñ).

Notas:
- El total de fichas del equipo es fijo (`TOTAL_EQUIPO` en `equipo.js`). Los cupos que todavía no tienen integrante real se autogeneran como "Cupo por completar"; al agregar a alguien a `MIEMBROS_REALES` esos cupos se reducen automáticamente, no hay que tocar nada más.
- Actualizar el roster (agregar, editar o corregir datos de un integrante) es un **cambio chico**: se puede commitear y subir directo a `main`, sin necesidad de crear una rama ni pedir aprobación (ver siguiente sección).

## Flujo de trabajo con Git

- **Cambios chicos** — contenido/copy, datos de estudiantes (`equipo.js`/CSV), fixes menores de texto o de estilos puntuales: commit y push directo a `main`.
- **Cambios grandes** — cambios de diseño o estructura (HTML/CSS: nuevas secciones, layout, navegación) o cambios de lógica en scripts (`script.js`, o `equipo.js` más allá de agregar/editar datos de integrantes): pasan por rama y Pull Request.
  1. Crear una rama desde `main`: `git checkout -b feature/nombre-breve` (o `fix/nombre-breve` si es una corrección).
  2. Hacer commit y `git push -u origin feature/nombre-breve`.
  3. Abrir un Pull Request en GitHub hacia `main`.
  4. Esperar a que otro integrante del equipo revise y apruebe el PR.
  5. Recién ahí, mergear a `main` (y borrar la rama).

## Qué reemplazar después

1. Completar el roster real en `equipo.js` (los cupos sin integrante real siguen apareciendo como "Cupo por completar").
2. Reemplazar los placeholders `[ RENDER / CAD DE LA MÁQUINA ]`, `[ FOTO TALLER ]` y `[ DIAGRAMA CABEZAL ]` en la sección "Propuesta" por contenido real.
3. Agregar fotos reales a las fichas del equipo que todavía muestran `[ FOTO ]` / `[ RETRATO ]` (`index.html` y `equipo.html`).
4. Agregar fotos reales en la Bitácora (`#avances`, pestaña "Bitácora") donde falten.
5. Confirmar el email de contacto usado en el formulario, el CTA de "Únete" y el footer.
6. Revisar la fecha límite de la cuenta regresiva en `script.js` (`DEADLINE`) si cambia el cronograma de la competencia.
