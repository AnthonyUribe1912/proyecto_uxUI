/*
   PAGOS Y RENOVACIONES — Lógica de la pantalla
   Lee los convenios aprobados en la pantalla de
   Convenios (guardados en localStorage) y los
   pinta en la tarjeta Convenios recien aprobados.
    */

document.addEventListener('DOMContentLoaded', () => {

  const contenedorTabla = document.getElementById('tablaConveniosAprobados');
  const mensajeVacio = document.getElementById('mensajeVacioAprobados');
  if (!contenedorTabla) return;

  const aprobados = JSON.parse(localStorage.getItem('convenios-aprobados') || '[]');

  if (aprobados.length === 0) {
    if (mensajeVacio) mensajeVacio.hidden = false;
    return;
  }

  // Más reciente primero
  aprobados.slice().reverse().forEach(item => {
    const fila = document.createElement('div');
    fila.className = 'table-row';

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
    spanTipo.className = tipoTexto === 'Verificación' ? 'tipo-badge tipo-verificacion' : 'tipo-badge tipo-cupon';

    const spanFecha = document.createElement('span');
    spanFecha.className = 'date-badge';
    spanFecha.textContent = fecha;

    fila.append(spanCompania, spanBeneficio, spanTipo, spanFecha);
    contenedorTabla.appendChild(fila);
  });

});