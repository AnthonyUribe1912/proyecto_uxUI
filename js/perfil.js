/* ==========================================================
   PERFIL — Lógica Corregida con Delegación de Eventos
   ========================================================== */

// 1. Datos de prueba iniciales para Usuario Principal
let usuarioPrincipal = {
  nombre: "Carlos Eduardo Andrade",
  estado: "Matriculado",
  avatar: "../images/Generic avatar.png"
};

// 2. Datos de prueba: Otras Cuentas (10 elementos)
let otrasCuentasData = [
  { id: 1, nombre: "María José Luzuriaga", estado: "Matriculado", avatar: "../images/Generic avatar.png" },
  { id: 2, nombre: "Juan Pablo Torres", estado: "Matriculado", avatar: "../images/Generic avatar.png" },
  { id: 3, nombre: "Ana Lucía Benítez", estado: "Egresado", avatar: "../images/Generic avatar.png" },
  { id: 4, nombre: "David Fernando Silva", estado: "Matriculado", avatar: "../images/Generic avatar.png" },
  { id: 5, nombre: "Sofía Valentina Gómez", estado: "Matriculado", avatar: "../images/Generic avatar.png" },
  { id: 6, nombre: "Mateo Sebastián Ríos", estado: "Docente", avatar: "../images/Generic avatar.png" },
  { id: 7, nombre: "Camila Isabel Morales", estado: "Matriculado", avatar: "../images/Generic avatar.png" },
  { id: 8, nombre: "Lucas Emanuel Paredes", estado: "Matriculado", avatar: "../images/Generic avatar.png" },
  { id: 9, nombre: "Valeria Alexandra Cruz", estado: "Egresado", avatar: "../images/Generic avatar.png" },
  { id: 10, nombre: "Gabriel Alejandro Vega", estado: "Matriculado", avatar: "../images/Generic avatar.png" }
];

// 3. Datos de prueba: Métodos de Pago (10 elementos)
let metodosPagoData = [
  { id: 1, banco: "Banco Pichincha", logo: "../images/banco-pichincha-logo-0.webp" },
  { id: 2, banco: "Banco Guayaquil", logo: "../images/banco-pichincha-logo-0.webp" },
  { id: 3, banco: "Produbanco", logo: "../images/banco-pichincha-logo-0.webp" },
  { id: 4, banco: "Banco del Pacífico", logo: "../images/banco-pichincha-logo-0.webp" },
  { id: 5, banco: "Banco Internacional", logo: "../images/banco-pichincha-logo-0.webp" },
  { id: 6, banco: "Diners Club", logo: "../images/banco-pichincha-logo-0.webp" },
  { id: 7, banco: "Visa Principal", logo: "../images/banco-pichincha-logo-0.webp" },
  { id: 8, banco: "Mastercard Plus", logo: "../images/banco-pichincha-logo-0.webp" },
  { id: 9, banco: "Banco de Loja", logo: "../images/banco-pichincha-logo-0.webp" },
  { id: 10, banco: "Paypal Vinculado", logo: "../images/banco-pichincha-logo-0.webp" }
];

document.addEventListener('DOMContentLoaded', () => {
  renderPerfilPrincipal();
  renderOtrasCuentas();
  renderMetodosPago();
  initEventosGlobales();
});

/**
 * Renderiza los datos del usuario principal ("Tu")
 */
function renderPerfilPrincipal() {
  const cards = document.querySelectorAll('.perfil-card');
  if (!cards[0]) return;

  const nombreElem = cards[0].querySelector('.profile-info p');
  const estadoElem = cards[0].querySelector('.profile-status');
  const avatarElem = cards[0].querySelector('.profile-avatar img');

  if (nombreElem) nombreElem.textContent = usuarioPrincipal.nombre;
  if (estadoElem) estadoElem.textContent = usuarioPrincipal.estado;
  if (avatarElem) avatarElem.src = usuarioPrincipal.avatar;
}

/**
 * Renderiza el listado de otras cuentas
 */
function renderOtrasCuentas() {
  const cards = document.querySelectorAll('.perfil-card');
  const cardOtras = cards[1];
  if (!cardOtras) return;

  const profileCardContainer = cardOtras.querySelector('.profile-card');
  if (!profileCardContainer) return;

  // Limpia y regenera cuentas + botón de acción
  profileCardContainer.innerHTML = '';

  otrasCuentasData.slice(0, 3).forEach(cuenta => {
    const summary = document.createElement('div');
    summary.className = 'profile-summary';
    summary.style.marginBottom = '12px';

    summary.innerHTML = `
      <div class="profile-avatar">
          <img src="${cuenta.avatar}" alt="Icono de usuario">
      </div>
      <div class="profile-info">
          <p>${cuenta.nombre}</p>
      </div>
      <div class="profile-status">${cuenta.estado}</div>
    `;
    profileCardContainer.appendChild(summary);
  });

  const btnGroup = document.createElement('div');
  btnGroup.className = 'button-group';
  btnGroup.innerHTML = `<button class="button-primary" type="button">Editar</button>`;
  profileCardContainer.appendChild(btnGroup);
}

/**
 * Renderiza el grid de métodos de pago
 */
function renderMetodosPago() {
  const paymentGrid = document.querySelector('.payment-grid');
  if (!paymentGrid) return;

  paymentGrid.innerHTML = '';

  metodosPagoData.forEach(metodo => {
    const item = document.createElement('div');
    item.className = 'payment-item';
    item.innerHTML = `
      <img src="${metodo.logo}" alt="${metodo.banco}">
      <p>${metodo.banco}</p>
    `;
    paymentGrid.appendChild(item);
  });
}

/**
 * Captura todos los eventos 'click' de forma centralizada (Delegación de Eventos)
 */
function initEventosGlobales() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    const card = btn.closest('.perfil-card');
    if (!card) return;

    // Identificamos en qué sección/tarjeta se hizo clic mediante su <h2>
    const tituloSection = card.querySelector('h2')?.textContent.trim().toLowerCase() || '';

    // 1. Tarjeta "Tu" -> Editar Nombre de usuario principal
    if (tituloSection.includes('tu')) {
      const nuevoNombre = prompt("Ingresa el nuevo nombre de usuario:", usuarioPrincipal.nombre);
      if (nuevoNombre && nuevoNombre.trim() !== "") {
        usuarioPrincipal.nombre = nuevoNombre.trim();
        renderPerfilPrincipal();
        alert("¡Nombre de usuario actualizado con éxito!");
      }
    }

    // 2. Tarjeta "Otras cuentas" -> Editar cuentas asociadas
    else if (tituloSection.includes('otras')) {
      alert("Gestión de otras cuentas activada.");
    }

    // 3. Tarjeta "Métodos de pago" -> Botones "Configurar" y "Ver más"
    else if (tituloSection.includes('métodos') || tituloSection.includes('metodos')) {
      // Botón Configurar / Agregar Método de pago
      if (btn.classList.contains('button-primary')) {
        const nombreBanco = prompt("Ingrese el nombre del nuevo método de pago / banco:");
        if (nombreBanco && nombreBanco.trim() !== "") {
          const nuevoMetodo = {
            id: Date.now(),
            banco: nombreBanco.trim(),
            logo: "../images/banco-pichincha-logo-0.webp" // Reutiliza la misma imagen genérica
          };
          metodosPagoData.push(nuevoMetodo);
          renderMetodosPago();
          alert(`¡Método de pago "${nuevoMetodo.banco}" agregado con éxito!`);
        }
      } 
      // Botón "Ver más"
      else if (btn.classList.contains('button-secondary')) {
        alert(`Tienes actualmente ${metodosPagoData.length} métodos de pago registrados.`);
      }
    }
  });
}