document.addEventListener('DOMContentLoaded', () => {
    crearProducto();
});

const API_URL = 'https://c701c0cba898.ngrok-free.app';

function crearProducto(){
    const btn = document.getElementById('crear_producto_btn');

    if (btn){
        btn.onclick = () => {
            const descripcionTextArea = document.getElementById('descripcionTxt');
            const descripcion = descripcionTextArea?.value.trim();
            const gramajeTextArea = document.getElementById('gramajeTxt');
            const gramaje = gramajeTextArea?.value.trim();
            const codigoTextArea = document.getElementById('codigoTxt');
            const codigo = codigoTextArea?.value.trim();

            if (!descripcion){
                alert('Porfavor ingrese una descripcion');
                return;
            }
            if (!gramaje){
                alert('Porfavor ingrese un gramaje');
                return;
            }
            if (!codigo){
                alert('Porfavor ingrese un código');
                return;
            }

            const url = API_URL + '/productos';
            fetch(url , {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                },  
                body : JSON.stringify({
                    descripcion: descripcion,
                    gramaje: gramaje,
                    codigo: codigo,
                })
            })
            .then(response => {
                if(!response.ok) throw new Error('❌ Error al crear producto');
            })
            .then(data => {
                console.log('✅ Producto creado:', data);
                //window.location.href = `inventarios_detalle.html?id=${data.id}`;
            })
            .catch(error => {
                console.error('❌ Error en la petición POST:', error);
            });
        };
    } else {
        console.warn('⚠️ No se encontró el botón con id="crear_producto_btn"');
    }
}