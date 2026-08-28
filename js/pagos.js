/* ==========================================================
   PAGOS Y RENOVACIONES — Lógica Completa e Interactiva
   ========================================================== */

// 1. Array de Datos de Prueba: Convenios Recién Aprobados (10 elementos)
let conveniosAprobadosData = [
  { id: 1, compania: "Spotify Student", beneficio: "50% Descuento", tipo: "verificacion", fecha: "2026-08-20", detalle: "Descuento del 50% en suscripción mensual con correo institucional." },
  { id: 2, compania: "Adobe Creative Cloud", beneficio: "Cupón 40%", tipo: "cupon", fecha: "2026-08-18", detalle: "Cupón aplicable al plan Suite Completa para estudiantes." },
  { id: 3, compania: "Notion Plus", beneficio: "Plan Gratis", tipo: "verificacion", fecha: "2026-08-15", detalle: "Acceso gratuito al plan Personal Pro con bloques ilimitados." },
  { id: 4, compania: "GitHub Education", beneficio: "Student Pack", tipo: "verificacion", fecha: "2026-08-10", detalle: "Incluye GitHub Copilot gratis y dominio .me por 1 año." },
  { id: 5, compania: "JetBrains", beneficio: "Licencia Anual Gratis", tipo: "verificacion", fecha: "2026-08-05", detalle: "Acceso a todo el suite de IDEs (IntelliJ, PyCharm, WebStorm)." },
  { id: 6, compania: "Uber Eats", beneficio: "Envío Gratis", tipo: "cupon", fecha: "2026-08-01", detalle: "Cupón de 5 pedidos con costo de envío $0." },
  { id: 7, compania: "Apple Music", beneficio: "Tarifa Estudiante", tipo: "verificacion", fecha: "2026-07-28", detalle: "Precio especial $3.49/mes con verificación de matrícula." },
  { id: 8, compania: "Canva Pro", beneficio: "Prueba 3 MESES", tipo: "cupon", fecha: "2026-07-22", detalle: "Acceso premium completo a herramientas de diseño por 90 días." },
  { id: 9, compania: "Amazon Prime", beneficio: "6 Meses Gratis", tipo: "cupon", fecha: "2026-07-15", detalle: "Prueba Prime Student con envíos rápidos y Prime Video." },
  { id: 10, compania: "YouTube Premium", beneficio: "Descuento Familiar", tipo: "verificacion", fecha: "2026-07-10", detalle: "Plan de hasta 5 integrantes universitarios." }
];

// 2. Array de Datos de Prueba: Suscripciones Activas (10 elementos)
let suscripcionesActivasData = [
  { id: 101, compania: "Netflix Premium", pago: "$15.99", fechaExp: "2026-09-01", estado: "Pendiente" },
  { id: 102, compania: "Spotify Duo", pago: "$6.99", fechaExp: "2026-09-05", estado: "Al día" },
  { id: 103, compania: "Amazon Web Services", pago: "$12.50", fechaExp: "2026-09-10", estado: "Pendiente" },
  { id: 104, compania: "GigaNet Fibra", pago: "$25.00", fechaExp: "2026-09-12", estado: "Al día" },
  { id: 105, compania: "ChatGPT Plus", pago: "$20.00", fechaExp: "2026-09-15", estado: "Pendiente" },
  { id: 106, compania: "iCloud 200GB", pago: "$2.99", fechaExp: "2026-09-18", estado: "Al día" },
  { id: 107, compania: "Duolingo Super", pago: "$7.99", fechaExp: "2026-09-20", estado: "Próximo a vencer" },
  { id: 108, compania: "PlayStation Plus", pago: "$11.99", fechaExp: "2026-09-22", estado: "Al día" },
  { id: 109, compania: "Coursera Plus", pago: "$39.00", fechaExp: "2026-09-25", estado: "Al día" },
  { id: 110, compania: "Fitness Pass", pago: "$30.00", fechaExp: "2026-09-30", estado: "Pendiente" }
];

let suscripcionSeleccionadaId = null;

document.addEventListener('DOMContentLoaded', () => {
  renderTablaAprobados();
  renderTablaActivas();
  initEventosPagos();
  crearModalDetalles();
});

/**
 * Renderiza la tabla de Convenios Recién Aprobados
 */
function renderTablaAprobados() {
  const contenedorTabla = document.getElementById('tablaConveniosAprobados');
  const mensajeVacio = document.getElementById('mensajeVacioAprobados');

  if (!contenedorTabla) return;

  const header = contenedorTabla.querySelector('.table-header');
  contenedorTabla.innerHTML = '';
  if (header) contenedorTabla.appendChild(header);

  if (conveniosAprobadosData.length === 0) {
    if (mensajeVacio) mensajeVacio.hidden = false;
    return;
  } else if (mensajeVacio) {
    mensajeVacio.hidden = true;
  }

  conveniosAprobadosData.forEach(item => {
    const fila = document.createElement('div');
    fila.className = 'table-row';
    fila.style.cursor = 'pointer';

    const fecha = new Date(item.fecha).toLocaleDateString('es-EC', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
    const tipoTexto = item.tipo === 'verificacion' ? 'Verificación' : 'Cupón';

    const spanCompania = document.createElement('span');
    spanCompania.textContent = item.compania;

    const spanBeneficio = document.createElement('span');
    spanBeneficio.textContent = item.beneficio;

    const spanTipo = document.createElement('span');
    spanTipo.textContent = tipoTexto;
    spanTipo.className = item.tipo === 'verificacion' ? 'tipo-badge tipo-verificacion' : 'tipo-badge tipo-cupon';

    const spanFecha = document.createElement('span');
    spanFecha.className = 'date-badge';
    spanFecha.textContent = fecha;

    fila.append(spanCompania, spanBeneficio, spanTipo, spanFecha);

    fila.addEventListener('click', () => abrirModalDetalleConvenio(item));

    contenedorTabla.appendChild(fila);
  });
}

/**
 * Renderiza la tabla de Suscripciones Activas
 */
function renderTablaActivas() {
  const contenedores = document.querySelectorAll('.sub-card .table-container');
  const contenedorTablaActivas = contenedores[1];

  if (!contenedorTablaActivas) return;

  const header = contenedorTablaActivas.querySelector('.table-header');
  contenedorTablaActivas.innerHTML = '';
  if (header) contenedorTablaActivas.appendChild(header);

  suscripcionesActivasData.forEach(item => {
    const fila = document.createElement('div');
    fila.className = 'table-row';

    if (item.id === suscripcionSeleccionadaId) {
      fila.style.backgroundColor = '#e0f2fe';
      fila.style.outline = '2px solid #0284c7';
    }

    const fecha = new Date(item.fechaExp).toLocaleDateString('es-EC', {
      day: '2-digit', month: 'short', year: 'numeric'
    });

    const spanCompania = document.createElement('span');
    spanCompania.textContent = item.compania;

    const spanPago = document.createElement('span');
    spanPago.textContent = item.pago;

    const spanFecha = document.createElement('span');
    spanFecha.className = 'date-badge';
    spanFecha.textContent = fecha;

    const spanEstado = document.createElement('span');
    spanEstado.textContent = item.estado;

    if (item.estado === 'Al día') {
      spanEstado.style.color = '#16a34a';
      spanEstado.style.fontWeight = '600';
    } else if (item.estado === 'Pendiente') {
      spanEstado.style.color = '#dc2626';
      spanEstado.style.fontWeight = '600';
    } else {
      spanEstado.style.color = '#d97706';
      spanEstado.style.fontWeight = '600';
    }

    fila.append(spanCompania, spanPago, spanFecha, spanEstado);

    fila.addEventListener('click', () => {
      suscripcionSeleccionadaId = item.id;
      renderTablaActivas();
    });

    contenedorTablaActivas.appendChild(fila);
  });
}

/**
 * Funcionalidad de Botones "Ver más" y "Pagar"
 */
function initEventosPagos() {
  const btnVerMas = document.querySelector('.btn-view-more');
  const btnPagar = document.querySelector('.btn-pay');
  const grid = document.querySelector('.subscriptions-grid');
  const cardAprobados = document.querySelectorAll('.sub-card')[0];
  const cardActivas = document.querySelectorAll('.sub-card')[1];

  // 1. "Ver más": Ocupa todo el grid
  if (btnVerMas && cardActivas && grid) {
    let expandido = false;
    btnVerMas.addEventListener('click', () => {
      expandido = !expandido;
      if (expandido) {
        grid.style.display = 'block';
        if (cardAprobados) cardAprobados.style.display = 'none';
        cardActivas.style.width = '100%';
        btnVerMas.textContent = 'Ver menos';
      } else {
        grid.style.display = 'grid';
        if (cardAprobados) cardAprobados.style.display = 'block';
        btnVerMas.textContent = 'Ver más';
      }
    });
  }

  // 2. "Pagar": Actualiza suscripción seleccionada a "Al día"
  if (btnPagar) {
    btnPagar.addEventListener('click', () => {
      if (!suscripcionSeleccionadaId) {
        alert('Por favor, haz clic en una fila de la tabla para seleccionar la suscripción a pagar.');
        return;
      }

      const item = suscripcionesActivasData.find(s => s.id === suscripcionSeleccionadaId);
      if (item) {
        if (item.estado === 'Al día') {
          alert(`La suscripción "${item.compania}" ya se encuentra Al día.`);
          return;
        }

        const confirmar = confirm(`¿Deseas procesar el pago de ${item.pago} para "${item.compania}"?`);
        if (confirmar) {
          item.estado = 'Al día';
          alert(`¡Pago realizado con éxito para ${item.compania}!`);
          renderTablaActivas();
        }
      }
    });
  }
}

/**
 * Ventana modal para ver más detalles de cada convenio
 */
function crearModalDetalles() {
  if (document.getElementById('modalDetalles')) return;

  const modalHtml = `
    <div id="modalDetalles" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:1000; align-items:center; justify-content:center;">
      <div style="background:#fff; padding:24px; border-radius:12px; max-width:400px; width:90%; box-shadow:0 4px 12px rgba(0,0,0,0.15);">
        <h3 id="modalTitulo" style="margin-top:0; font-size:18px; color:#1e293b;">Detalle</h3>
        <p id="modalContenido" style="color:#475569; font-size:14px; margin:16px 0;"></p>
        <div style="text-align:right;">
          <button id="btnCerrarModal" style="padding:8px 16px; background:#2563eb; color:#fff; border:none; border-radius:6px; cursor:pointer;">Cerrar</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);

  document.getElementById('btnCerrarModal').addEventListener('click', () => {
    document.getElementById('modalDetalles').style.display = 'none';
  });
}

function abrirModalDetalleConvenio(item) {
  const modal = document.getElementById('modalDetalles');
  const titulo = document.getElementById('modalTitulo');
  const contenido = document.getElementById('modalContenido');

  titulo.textContent = `${item.compania} — ${item.beneficio}`;
  contenido.innerHTML = `
    <strong>Tipo:</strong> ${item.tipo === 'verificacion' ? 'Verificación' : 'Cupón'}<br>
    <strong>Fecha:</strong> ${item.fecha}<br><br>
    <strong>Detalle del Beneficio:</strong><br>${item.detalle}
  `;
  modal.style.display = 'flex';
}