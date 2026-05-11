/* ====================================
   Monica Martinez Art Gallery
   script.js — lógica del catálogo
   ====================================
   Para agregar/quitar cuadros: edita datos.json
   ================================== */

let todosLosCuadros = [];
let cuadrosFiltrados = [];
let indiceActual = 0;

/* ---- CARGA DE DATOS ---- */
async function cargarDatos() {
  try {
    const resp = await fetch('datos.json');
    const data = await resp.json();
    todosLosCuadros = data.cuadros;
    cuadrosFiltrados = [...todosLosCuadros];
    window._galeria = data.galeria;
    iniciar();
  } catch (e) {
    console.warn('No se pudo cargar datos.json. Usando datos de demostración.');
    usarDatosDemo();
  }
}

/* ---- DATOS DEMO (si no hay servidor local) ---- */
function usarDatosDemo() {
  todosLosCuadros = [
    {
      id: 1,
      titulo: "Corazonada",
      artista: "Emir Guerrero",
      tecnica: "Acrílico sobre tela",
      dimensiones: "140cm x 110cm",
      anio: 2026,
      precio: 58000,
      descripcion: "Un corazón representando el hogar de dos pajaritos que simbolizan los hijos, en un jardín de felicidad, colores vibrantes.",
      disponible: true,
      imagen: "",
      categoria: "Realismo mágico",
      nuevo: true,
      oferta: false
    },
    {
      id: 2,
      titulo: "La Reina",
      artista: "Rosa Rodriguez",
      tecnica: "Mixta sobre tela",
      dimensiones: "50cm x 50cm",
      anio: 2026,
      precio: 17000,
      descripcion: "Una mujer sosteniendo 3 colibríes que simbolizan sus hijos.",
      disponible: true,
      imagen: "",
      categoria: "Realismo mágico",
      nuevo: true,
      oferta: false
    },
    {
      id: 3,
      titulo: "Carrousel de la Molienda",
      artista: "Ettel Villareal",
      tecnica: "Óleo sobre tela",
      dimensiones: "60cm x 60cm",
      anio: 2026,
      precio: 23000,
      descripcion: "Un molino de café girado por un ratón pequeño, simulando un carrusel de feria, dentro de una cocina iluminada por quinqués.",
      disponible: true,
      imagen: "",
      categoria: "Realismo mágico",
      nuevo: false,
      oferta: false
    }
  ];
  cuadrosFiltrados = [...todosLosCuadros];
  iniciar();
}

/* ---- INICIALIZAR ---- */
function iniciar() {
  crearFiltrosArtistas();
  renderMiniaturas();
  mostrarCuadro(0);
  crearSeccionArtistas();
}

/* ---- FILTROS POR ARTISTA ---- */
function crearFiltrosArtistas() {
  const contenedor = document.getElementById('filtros-artistas');
  const orden_artistas = ["Rosa Rodriguez", "Sandra Torres", "Ethel Villareal", "Emir Guerrero", "Sandra Calderon", "Karla Reyes", "Flor Padilla", "Jose Luis Alfaro"];
  const artistas = [...new Set(todosLosCuadros.map(c => c.artista))].filter(a => orden_artistas.includes(a)).sort((a, b) => orden_artistas.indexOf(a) - orden_artistas.indexOf(b));
  artistas.forEach(artista => {
    const btn = document.createElement('button');
    btn.className = 'filtro-btn';
    btn.textContent = artista;
    btn.dataset.filtro = artista;
    btn.addEventListener('click', () => filtrar(artista, btn));
    contenedor.appendChild(btn);
  });
}

function filtrar(valor, btnClicado) {
  document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
  btnClicado.classList.add('active');

  if (valor === 'todos') {
    cuadrosFiltrados = [...todosLosCuadros];
  } else {
    cuadrosFiltrados = todosLosCuadros.filter(c => c.artista === valor);
  }
  indiceActual = 0;
  renderMiniaturas();
  mostrarCuadro(0);
}

document.querySelector('[data-filtro="todos"]').addEventListener('click', function() {
  cuadrosFiltrados = [...todosLosCuadros];
  indiceActual = 0;
  document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
  this.classList.add('active');
  renderMiniaturas();
  mostrarCuadro(0);
});

/* ---- MINIATURAS ---- */
function renderMiniaturas() {
  const cont = document.getElementById('miniaturas');
  cont.innerHTML = '';
  cuadrosFiltrados.forEach((cuadro, i) => {
    if (cuadro.imagen && cuadro.imagen !== '') {
      const img = document.createElement('img');
      img.className = 'miniatura' + (i === indiceActual ? ' active' : '');
      img.src = cuadro.imagen;
      img.alt = cuadro.titulo;
      img.addEventListener('click', () => irA(i));
      cont.appendChild(img);
    } else {
      const div = document.createElement('div');
      div.className = 'miniatura-placeholder' + (i === indiceActual ? ' active' : '');
      div.textContent = cuadro.titulo;
      div.addEventListener('click', () => irA(i));
      cont.appendChild(div);
    }
  });
}

function actualizarMiniaturas() {
  const items = document.querySelectorAll('.miniatura, .miniatura-placeholder');
  items.forEach((el, i) => {
    el.classList.toggle('active', i === indiceActual);
  });
}

/* ---- MOSTRAR CUADRO EN VIEWER ---- */
function mostrarCuadro(i) {
  const cuadro = cuadrosFiltrados[i];
  if (!cuadro) return;
  indiceActual = i;

  // Imagen con fade
  const img = document.getElementById('viewer-img');
  img.style.opacity = 0;
  setTimeout(() => {
    if (cuadro.imagen && cuadro.imagen !== '') {
      img.src = cuadro.imagen;
      img.alt = cuadro.titulo;
    } else {
      img.src = generarPlaceholder(cuadro.titulo);
      img.alt = cuadro.titulo;
    }
    img.style.opacity = 1;
  }, 200);

  // Textos
  document.getElementById('viewer-categoria').textContent = cuadro.categoria;
  document.getElementById('viewer-titulo').textContent = cuadro.titulo;
  document.getElementById('viewer-artista').textContent = 'Por ' + cuadro.artista;
  document.getElementById('viewer-tecnica').textContent = cuadro.tecnica;
  document.getElementById('viewer-dimensiones').textContent = cuadro.dimensiones;
  document.getElementById('viewer-anio').textContent = cuadro.anio;
  document.getElementById('viewer-precio').textContent = formatearPrecio(cuadro.precio);
  document.getElementById('viewer-descripcion').textContent = cuadro.descripcion;

  // Envío y marco
  const extras = [];
  if (cuadro.incluye_envio) extras.push('✓ Incluye envío nacional');
  if (cuadro.incluye_marco) extras.push('✓ Incluye marco');
  const extrasEl = document.getElementById('viewer-extras');
  if (extrasEl) extrasEl.textContent = extras.join('  ·  ');

  // Badges
  const badgesCont = document.getElementById('viewer-badges');
  badgesCont.innerHTML = '';
  if (!cuadro.disponible) {
    const b = document.createElement('span');
    b.className = 'badge badge-vendido';
    b.textContent = 'Vendido';
    badgesCont.appendChild(b);
  }
  if (cuadro.nuevo && cuadro.disponible) {
    const b = document.createElement('span');
    b.className = 'badge badge-nuevo';
    b.textContent = 'Nuevo';
    badgesCont.appendChild(b);
  }
  if (cuadro.oferta && cuadro.disponible) {
    const b = document.createElement('span');
    b.className = 'badge badge-oferta';
    b.textContent = 'Oferta especial';
    badgesCont.appendChild(b);
  }

  // Botones contacto
  const msgWA = `Hola, me interesa el cuadro "${cuadro.titulo}" de ${cuadro.artista}. ¿Está disponible?`;
  document.getElementById('btn-whatsapp').href = `https://wa.me/528717274655?text=${encodeURIComponent(msgWA)}`;
  document.getElementById('btn-email').href = `mailto:mtatay@me.com?subject=${encodeURIComponent('Consulta: ' + cuadro.titulo)}&body=${encodeURIComponent('Hola Mónica,\n\nMe interesa el cuadro "' + cuadro.titulo + '" de ' + cuadro.artista + '.\n\n¿Podría darme más información?\n\nGracias.')}`;

  // Si está vendido, deshabilitar botones
  const btnWA = document.getElementById('btn-whatsapp');
  const btnEmail = document.getElementById('btn-email');
  if (!cuadro.disponible) {
    btnWA.style.opacity = '0.4';
    btnWA.style.pointerEvents = 'none';
    btnEmail.style.opacity = '0.4';
    btnEmail.style.pointerEvents = 'none';
  } else {
    btnWA.style.opacity = '1';
    btnWA.style.pointerEvents = 'auto';
    btnEmail.style.opacity = '1';
    btnEmail.style.pointerEvents = 'auto';
  }

  actualizarMiniaturas();
}

/* ---- NAVEGACIÓN FLECHAS ---- */
function irA(i) {
  if (i < 0) i = cuadrosFiltrados.length - 1;
  if (i >= cuadrosFiltrados.length) i = 0;
  mostrarCuadro(i);
}

document.getElementById('btnPrev').addEventListener('click', () => irA(indiceActual - 1));
document.getElementById('btnNext').addEventListener('click', () => irA(indiceActual + 1));

// Teclado (flechas)
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') irA(indiceActual - 1);
  if (e.key === 'ArrowRight') irA(indiceActual + 1);
});

// Touch swipe para móvil
let touchStartX = 0;
document.getElementById('viewer-img').addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});
document.getElementById('viewer-img').addEventListener('touchend', (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) {
    if (diff > 0) irA(indiceActual + 1);
    else irA(indiceActual - 1);
  }
});

/* ---- SECCIÓN ARTISTAS ---- */
function crearSeccionArtistas() {
  const grid = document.getElementById('artistas-grid');
  const conteo = {};
  todosLosCuadros.forEach(c => {
    if (!conteo[c.artista]) conteo[c.artista] = 0;
    conteo[c.artista]++;
  });

  Object.entries(conteo).forEach(([nombre, obras]) => {
    const initials = nombre.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2);
    const card = document.createElement('div');
    card.className = 'artista-card';
    card.innerHTML = `
      <div class="artista-initials">${initials}</div>
      <p class="artista-nombre">${nombre}</p>
      <p class="artista-obras">${obras} ${obras === 1 ? 'obra' : 'obras'} en galería</p>
    `;
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      document.querySelector('#galeria').scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const btn = [...document.querySelectorAll('.filtro-btn')].find(b => b.dataset.filtro === nombre);
        if (btn) filtrar(nombre, btn);
      }, 600);
    });
    grid.appendChild(card);
  });
}

/* ---- HELPERS ---- */
function formatearPrecio(precio) {
  return '$' + precio.toLocaleString('es-MX') + ' MXN';
}

function generarPlaceholder(titulo) {
  // Crea un SVG en base64 como placeholder para cuadros sin imagen
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450">
    <rect width="600" height="450" fill="#E8E5DF"/>
    <rect x="40" y="40" width="520" height="370" fill="none" stroke="#D9D4C7" stroke-width="1"/>
    <text x="300" y="200" text-anchor="middle" font-family="serif" font-size="18" fill="#9E9B94" font-style="italic">${titulo}</text>
    <text x="300" y="230" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#C5C0B4" letter-spacing="3">Imagen próximamente</text>
  </svg>`;
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}

/* ---- MENÚ HAMBURGER ---- */
function closeMobile() {
  document.getElementById('navMobile').classList.remove('open');
}
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navMobile').classList.toggle('open');
});

/* ---- ARRANCAR ---- */
cargarDatos();
