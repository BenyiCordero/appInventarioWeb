document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    cargarProductos();
  }, 100); 
});

function cargarProductos() {
  const cardsContainer = document.getElementById('cards-container');
  if (!cardsContainer) {
    console.error('⛔ cards-container no se encuentra en el DOM');
    return;
  }

  console.log('✅ cards-container encontrado, cargando productos...');

  fetch('https://c701c0cba898.ngrok-free.app/productos', {
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

        const button = document.createElement('button');
        button.classList.add('card-button'); // Usa la misma clase que en inventarios

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
        descripcion.textContent = item.descripcion;
        descripcion.classList.add('card-descripcion');

        const gramaje = document.createElement('span');
        gramaje.textContent = item.gramaje;
        gramaje.classList.add('card-gramaje');

        filaSuperior.appendChild(descripcion);
        filaSuperior.appendChild(gramaje);

        // Código abajo
        const codigo = document.createElement('p');
        codigo.textContent = `Código: ${item.codigo}`;
        codigo.classList.add('card-codigo');

        infoContainer.appendChild(filaSuperior);
        infoContainer.appendChild(codigo);

        // Ensamblar todo dentro del botón
        button.appendChild(imagen);
        button.appendChild(infoContainer);

        // Asignar evento click
        button.onclick = () => {
          console.log(`🟢 Click en el producto ID ${item.id}`);
          // Puedes redirigir si quieres:
          // window.location.href = `producto_detalle.html?id=${item.id}`;
        };

        card.appendChild(button);
        cardsContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.error('❌ Error al cargar productos:', error);
    });
}
