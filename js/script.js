document.addEventListener('DOMContentLoaded', () => {

    if (document.getElementById('contador-box')) {
        const contadorNumero = document.getElementById('contador-numero');
        const downloadButton = document.getElementById('download-button');
        
        // Esta es la URL de la API que usamos para obtener el contador
        const API_ENDPOINT_GET = 'https://api.countapi.xyz/get/guia_descargas';
        
        // Y esta es la URL para incrementar el contador.
        const API_ENDPOINT_HIT = 'https://api.countapi.xyz/hit/guia_descargas';

        // Funcion para obtener y mostrar el numero del contador
        async function getCount() {
            try {
                const response = await fetch(API_ENDPOINT_GET);
                const data = await response.json();
                contadorNumero.textContent = data.value;
            } catch (error) {
                console.error('Error al obtener el contador:', error);
                contadorNumero.textContent = '--';
            }
        }
        
        // Funcion para registrar la descarga y abrir la guia
        async function registerDownload(event) {
            event.preventDefault();

            try {
                // Hacemos una llamada para AUMENTAR el contador en uno
                await fetch(API_ENDPOINT_HIT);
                
                // Abre el archivo en una nueva pestaña
                window.open(downloadButton.href, '_blank');
                
                // Actualiza el numero del contador en la pagina
                getCount();
            } catch (error) {
                console.error('Error al registrar la descarga:', error);
            }
        }

        // Llamada inicial para que el contador se muestre al cargar la pagina
        getCount();

        // Escuchamos el clic en el boton de descarga
        downloadButton.addEventListener('click', registerDownload);
    }
});