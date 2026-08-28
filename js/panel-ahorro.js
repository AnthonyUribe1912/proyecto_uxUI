document.addEventListener('DOMContentLoaded', () => {
  // 1. Gráfica Previa (Vista Resumida en Dona/Pie)
  const ctxPrevia = document.getElementById('graficaPreviaCanvas').getContext('2d');
  new Chart(ctxPrevia, {
    type: 'doughnut',
    data: {
      labels: ['Spotify', 'Canva', 'Otros'],
      datasets: [{
        data: [45, 35, 20],
        backgroundColor: ['#7C3AED', '#C3A5F8', '#F59E0B'],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false } // Oculto en la previa para limpieza
      }
    }
  });

  //  Logica del Modal y Grafica Completa (Vista Detallada en Barras)
  const modal = document.getElementById('modalGrafica');
  const btnAbrir = document.getElementById('btnVerGraficaCompleta');
  const btnCerrar = document.getElementById('btnCerrarModal');
  let chartCompletoInstance = null;

  btnAbrir.addEventListener('click', () => {
    modal.classList.add('show');
    
    // Generar la grafica detallada al abrir el modal (si no se ha creado aun)
    if (!chartCompletoInstance) {
      const ctxCompleta = document.getElementById('graficaCompletaCanvas').getContext('2d');
      chartCompletoInstance = new Chart(ctxCompleta, {
        type: 'bar',
        data: {
          labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Ahorro Spotify ($)',
              data: [8, 12, 12, 15, 15, 18],
              backgroundColor: '#7C3AED'
            },
            {
              label: 'Ahorro Canva ($)',
              data: [5, 10, 10, 12, 12, 15],
              backgroundColor: '#F59E0B'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'top' }
          },
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    }
  });

  // Cerrar Modal al hacer clic en 'X' o fuera del contenido
  btnCerrar.addEventListener('click', () => modal.classList.remove('show'));
  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('show');
  });
});

// Lógica para el botón Compartir
const btnCompartir = document.querySelector('.btn-compartir');

if (btnCompartir) {
  btnCompartir.addEventListener('click', async (e) => {
    // Si el navegador soporta compartir de forma nativa (Móviles/Chrome)
    if (navigator.share) {
      e.preventDefault();
      try {
        await navigator.share({
          title: 'U-Subscriptions - Mi Ahorro',
          text: '¡Mira cuánto he ahorrado en mis suscripciones universitarias!',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Compartir cancelado');
      }
    } 
    // Si no soporta share nativo, Bootstrap manejará el menú desplegable (.dropdown)
  });
}