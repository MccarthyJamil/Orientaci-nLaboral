document.addEventListener('DOMContentLoaded', () => {

    // CÓDIGO PARA EL CONTADOR DE DESCARGAS
    // Se ejecuta solo si el contador existe en la página
    if (document.getElementById('contador-box')) {
        const contadorNumero = document.getElementById('contador-numero');
        const downloadButton = document.getElementById('download-button');
        
        // Esta es la URL de la API que usaremos.
        const API_ENDPOINT = 'https://api.countapi.xyz/hit/guia_descargas';
        const API_INFO_ENDPOINT = 'https://api.countapi.xyz/info/guia_descargas';

        // Funcion para obtener y mostrar el numero del contador
        async function getCount() {
            try {
                // Hacemos una llamada GET para OBTENER el numero
                const response = await fetch(API_INFO_ENDPOINT);
                const data = await response.json();
                contadorNumero.textContent = data.value;
            } catch (error) {
                console.error('Error al obtener el contador:', error);
                contadorNumero.textContent = '--';
            }
        }
        
        // Funcion para registrar la descarga y abrir la guia
        async function registerDownload(event) {
            // Evita que el navegador navegue a la URL del boton
            event.preventDefault();

            try {
                // Llama a la API para AUMENTAR el contador en uno
                await fetch(API_ENDPOINT, {
                    method: 'POST' 
                });

                // Abre el archivo en una nueva pestaña
                window.open(downloadButton.href, '_blank');
                
                // Llama a la funcion para OBTENER y mostrar el nuevo numero
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