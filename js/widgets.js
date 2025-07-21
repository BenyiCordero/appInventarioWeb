fetch('widgets.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('widgets-container').innerHTML = data;

        const nombrePagina = document.body.getAttribute('data-nombre-pagina');
        if (nombrePagina){
            document.getElementById('nombre-pagina').textContent = nombrePagina;
        }

    });