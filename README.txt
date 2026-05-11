====================================================
  MONICA MARTINEZ ART GALLERY — GUÍA DE USO
====================================================

¿CÓMO ABRIR LA PÁGINA?
-----------------------
1. Abre la carpeta "catalogo-arte"
2. Haz doble clic en "index.html"
3. La página se abre en tu navegador

NOTA: Si las imágenes no cargan, necesitas abrir la
página con un servidor local (te explico más abajo).


====================================================
  CÓMO AGREGAR UN CUADRO NUEVO
====================================================

1. Abre el archivo "datos.json" con TextEdit (Mac)
   o Bloc de Notas (Windows)

2. Busca el último cuadro en la lista. Se ve así:

    {
      "id": 3,
      "titulo": "Carrousel de la Molienda",
      ...
    }

3. Después del corchete } que cierra ese cuadro,
   agrega una coma y luego el nuevo cuadro:

    {
      "id": 4,
      "titulo": "Nombre del cuadro",
      "artista": "Nombre del artista",
      "tecnica": "Óleo sobre tela",
      "dimensiones": "80cm x 60cm",
      "anio": 2026,
      "precio": 25000,
      "descripcion": "Descripción del cuadro.",
      "disponible": true,
      "imagen": "images/nombre_imagen.png",
      "categoria": "Realismo mágico",
      "nuevo": true,
      "oferta": false
    }

4. Guarda el archivo (Cmd+S en Mac, Ctrl+S en Windows)

5. Recarga la página en el navegador (F5 o Cmd+R)

6. ¡Listo! El cuadro aparece en la galería


====================================================
  CÓMO QUITAR UN CUADRO (VENDIDO)
====================================================

OPCIÓN A — Marcarlo como vendido (recomendada)
  Cambia "disponible": true → "disponible": false
  El cuadro seguirá visible pero marcado como "Vendido"

OPCIÓN B — Borrarlo completamente
  Borra todo el bloque { ... } del cuadro en datos.json
  Asegúrate de que la lista quede bien separada por comas

IMPORTANTE: Si borras el último cuadro de la lista,
el cuadro anterior NO debe tener coma al final.
Ejemplo correcto:
  { cuadro 1 },
  { cuadro 2 },
  { cuadro 3 }    ← sin coma al final


====================================================
  CÓMO AGREGAR IMÁGENES
====================================================

1. Toma la foto del cuadro (mínimo 600px de ancho)

2. Guarda la imagen en la carpeta "images/"
   dentro de la carpeta "catalogo-arte"

3. Nómbrala de forma clara, sin espacios ni acentos:
   ✓ corazonada.png
   ✓ la_reina.jpg
   ✗ La Reina 2024.png  (tiene espacios, no funciona)

4. En datos.json, en el campo "imagen", escribe:
   "imagen": "images/la_reina.png"


====================================================
  CÓMO MARCAR COMO "NUEVO" U "OFERTA"
====================================================

Para mostrar badge "NUEVO":
  "nuevo": true

Para quitar badge "NUEVO":
  "nuevo": false

Para mostrar "OFERTA ESPECIAL":
  "oferta": true

Para quitar "OFERTA ESPECIAL":
  "oferta": false


====================================================
  ARCHIVOS DEL PROYECTO
====================================================

index.html   → La página (no editar)
style.css    → Los estilos/diseño (no editar)
script.js    → La lógica (no editar)
datos.json   → ← TU ARCHIVO PRINCIPAL (editar aquí)
images/      → Carpeta con las imágenes


====================================================
  PROBLEMA: LAS IMÁGENES NO CARGAN
====================================================

Esto pasa cuando abres index.html directamente
en el navegador (sin servidor local). Solución:

OPCIÓN A — Usar VS Code (gratis):
  1. Descarga VS Code: https://code.visualstudio.com
  2. Instala extensión "Live Server"
  3. Abre la carpeta en VS Code
  4. Click derecho en index.html → "Open with Live Server"

OPCIÓN B — Usar Python (si lo tienes):
  1. Abre Terminal
  2. Navega a la carpeta: cd ~/Desktop/catalogo-arte
  3. Escribe: python3 -m http.server 8080
  4. Abre en navegador: http://localhost:8080

OPCIÓN C — Pedir ayuda
  Si nada funciona, mándame un mensaje y lo resolvemos.


====================================================
  CONTACTO PARA SOPORTE TÉCNICO
====================================================

Si algo no funciona o quieres agregar más funciones,
guarda este archivo y comunícate con quien te hizo
este catálogo.

====================================================
