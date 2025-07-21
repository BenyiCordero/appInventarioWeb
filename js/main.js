document.addEventListener('DOMContentLoaded', () => {
  const cargarWidgetsYCards = async () => {
    const container = document.getElementById('widgets-container');
    const response = await fetch('widgets.html');
    const html = await response.text();
    container.innerHTML = html;

    const cardsContainer = document.getElementById('cards-container');

    fetch('https://8c6e7e61855d.ngrok-free.app/inventarios')
      .then(response => response.json())
      .then(data => {
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

          button.appendChild(title);
          button.appendChild(date);

          card.appendChild(button);
          cardsContainer.appendChild(card);
        });
      })
      .catch(error => {
        console.error('error al cargar inventarios', error);
      });
  };

  cargarWidgetsYCards();
});
