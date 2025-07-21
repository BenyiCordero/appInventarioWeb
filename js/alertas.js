document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    cargarAlertas();
  }, 100); 
});

function cargarAlertas() {
  const cardsContainer = document.getElementById('cards-container');
  if (!cardsContainer) {
    console.error('⛔ cards-container no se encuentra en el DOM');
    return;
  }

  console.log('✅ cards-container encontrado, cargando alertas...');

  fetch('https://8c6e7e61855d.ngrok-free.app/productoDetails', {
    headers: {
      'ngrok-skip-browser-warning': 'true'
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log('📦 Productos recibidos:', data);
      data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');

        // Imagen
        const imagen = document.createElement('img');
        imagen.src = item.imagen?.url || 'https://via.placeholder.com/80';
        imagen.alt = 'Producto';
        imagen.classList.add('card-img');

        // Contenedor de información
        const infoContainer = document.createElement('div');
        infoContainer.classList.add('card-info');

        // Fila superior con descripción y gramaje
        const filaSuperior = document.createElement('div');
        filaSuperior.classList.add('card-info-top');

        const descripcion = document.createElement('h3');
        descripcion.textContent = item.producto.descripcion;
        descripcion.classList.add('card-descripcion');

        const gramaje = document.createElement('span');
        gramaje.textContent = item.producto.gramaje;
        gramaje.classList.add('card-gramaje');

        filaSuperior.appendChild(descripcion);
        filaSuperior.appendChild(gramaje);

        // Código abajo
        const codigo = document.createElement('p');
        codigo.textContent = `Código: ${item.producto.codigo}`;
        codigo.classList.add('card-codigo');

        // Ensamblar card
        infoContainer.appendChild(filaSuperior);
        infoContainer.appendChild(codigo);
        card.appendChild(imagen);
        card.appendChild(infoContainer);
        cardsContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.error('❌ Error al cargar productos:', error);
    });
}
