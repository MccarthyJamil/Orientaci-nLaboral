// Espera a que el contenido de la pagina se cargue completamente
document.addEventListener('DOMContentLoaded', () => {

    // Se asegura de que el código solo se ejecute si los elementos del contador existen en la página
    if (document.getElementById('contador-box')) {
        const contadorNumero = document.getElementById('contador-numero');
        const downloadButton = document.getElementById('download-button');
        
        // URLs de la API para obtener el contador e incrementarlo
        const API_ENDPOINT_HIT = 'https://api.countapi.xyz/hit/guia_descargas';
        const API_ENDPOINT_GET = 'https://api.countapi.xyz/get/guia_descargas';

        // Funcion para obtener el numero actual del contador y mostrarlo en la pagina
        async function getCount() {
            try {
                // Hacemos una llamada GET para obtener el numero
                const response = await fetch(API_ENDPOINT_GET);
                const data = await response.json();
                contadorNumero.textContent = data.value;
            } catch (error) {
                console.error('Error al obtener el contador:', error);
                contadorNumero.textContent = '--';
            }
        }
        
        // Funcion que se ejecuta cuando el usuario hace clic en el boton de descarga
        async function registerClick(event) {
            // Evita que el navegador navegue a la URL del boton directamente
            event.preventDefault();

            try {
                // Hacemos una llamada para aumentar el contador en uno
                await fetch(API_ENDPOINT_HIT);
                
                // Abre el archivo en una nueva pestaña (o comienza la descarga)
                window.open(downloadButton.href, '_blank');
                
                // Llama a la funcion para mostrar el nuevo numero en la pantalla
                getCount();
            } catch (error) {
                console.error('Error al registrar el clic:', error);
            }
        }

        // Llamada inicial para que el contador se muestre al cargar la pagina
        getCount();

        // Escucha los clics en el boton de descarga y ejecuta la funcion `registerClick`
        downloadButton.addEventListener('click', registerClick);
    }
});