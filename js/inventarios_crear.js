document.addEventListener('DOMContentLoaded', () => {
    crearInventario();
});

const API_URL = 'https://c701c0cba898.ngrok-free.app';

function crearInventario(){
    const btn = document.getElementById('crear_inventario_btn');

    if (btn){
        btn.onclick = () => {
            const tituloTextArea = document.getElementById('tituloTxt');
            const titulo = tituloTextArea?.value.trim();

            if (!titulo){
                alert('Porfavor escriba un titulo');
                return;
            }

            const url = API_URL + '/inventarios';
            fetch(url , {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                },  
                body : JSON.stringify({
                    titulo: titulo,
                })
            })
            .then(response => {
                if(!response.ok) throw new Error('❌ Error al crear inventario');
            })
            .then(data => {
                console.log('✅ Inventario creado:', data);
                //window.location.href = `inventarios_detalle.html?id=${data.id}`;
            })
            .catch(error => {
                console.error('❌ Error en la petición POST:', error);
            });
        };
    } else {
        console.warn('⚠️ No se encontró el botón con id="crear_inventario_btn"');
    }
}