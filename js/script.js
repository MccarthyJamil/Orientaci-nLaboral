document.addEventListener('DOMContentLoaded', () => {

    if (document.getElementById('contador-numero')) {
        const contadorNumero = document.getElementById('contador-numero');
        const downloadButton = document.getElementById('download-button');
        
        // Esta es la URL de TU API, que ahora está corriendo en tu computadora.
        const API_URL = 'http://localhost:3000/api/contador';

        // Funcion para obtener el numero actual del contador y mostrarlo en la pagina
        async function getCount() {
            try {
                // Hacemos una llamada GET a nuestra propia API
                const response = await fetch(API_URL);
                const data = await response.json();
                contadorNumero.textContent = data.count;
            } catch (error) {
                console.error('Error al obtener el contador:', error);
                contadorNumero.textContent = '--';
            }
        }
        
        // Funcion que se ejecuta cuando el usuario hace clic en el boton de descarga
        async function registerDownload() {
            try {
                // Hacemos una llamada para AUMENTAR el contador en uno
                await fetch('https://api.countapi.xyz/hit/guia_descargas');
                
                // Luego, actualizamos el numero del contador en la pantalla
                getCount();
            } catch (error) {
                console.error('Error al registrar la descarga:', error);
            }
        }

        // Llamada inicial para que el contador se muestre al cargar la pagina
        getCount();

        // Escucha los clics en el boton de descarga y ejecuta la funcion `registerDownload`
        downloadButton.addEventListener('click', registerDownload);
    }
});