// ===========================
// VALIDACIÓN DEL FORMULARIO
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    alert('Formulario enviado correctamente 🎉');
    form.reset();
    form.classList.remove('was-validated');
  });

  // ===========================
  // MAPA DINÁMICO - LEAFLET
  // ===========================
  function initMap() {
    const defaultCoords = [36.7121767,-4.4300924]; // MasterD Málaga

    const map = L.map('map').setView(defaultCoords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      maxZoom: 18
    }).addTo(map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userCoords = [pos.coords.latitude, pos.coords.longitude];
          map.setView(userCoords, 14);
          L.marker(userCoords).addTo(map).bindPopup("¡Estás aquí! 🌍").openPopup();
        },
        () => {
          // Usuario denegó acceso o error
          L.marker(defaultCoords).addTo(map).bindPopup("MasterD 📍").openPopup();
        }
      );
    } else {
      // Geolocalización no disponible
      L.marker(defaultCoords).addTo(map).bindPopup("MasterD 📍").openPopup();
    }
  }

  initMap(); 
});
