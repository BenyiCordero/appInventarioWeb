document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    cargarInventarios();
  }, 100); 

  const fab = document.getElementById('floating-btn');
  if (fab){
    fab.onclick = () => {
      window.location.href = 'inventarios_crear.html';
    };
  } else {
    console.warn('⚠️ No se encontró el botón flotante con id="floating-btn"')
  }
});

function cargarInventarios() {
  const cardsContainer = document.getElementById('cards-container');
  if (!cardsContainer) {
    console.error('⛔ cards-container no se encuentra en el DOM');
    return;
  }

  console.log('✅ cards-container encontrado, cargando inventarios...');

  fetch('https://c701c0cba898.ngrok-free.app/inventarios', {
    headers: {
      'ngrok-skip-browser-warning': 'true'
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log('📦 Inventarios recibidos:', data);
      data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');

        const button = document.createElement('button');
        button.classList.add('card-button');

        const title = document.createElement('h1');
        title.classList.add('card-title');
        title.textContent = item.titulo;

        const date = document.createElement('p');
        const fechaObj = new Date(item.fecha);
        const fechaFormateada = fechaObj.toLocaleDateString('es-MX', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
        date.textContent = fechaFormateada;

        button.onclick = () => {
          console.log('Click en el inventario ID ${item.id}');
          //window.location...
        }

        button.appendChild(title);
        button.appendChild(date);

        card.appendChild(button);
        cardsContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.error('❌ Error al cargar inventarios:', error);
    });
}
