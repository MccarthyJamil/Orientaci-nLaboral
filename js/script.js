// Espera a que el contenido de la pagina se cargue completamente
document.addEventListener('DOMContentLoaded', () => {

    // CÓDIGO PARA EL CONTADOR DE DESCARGAS
    if (document.getElementById('contador-box')) {
        const contadorNumero = document.getElementById('contador-numero');
        const downloadButton = document.getElementById('download-button');
        
        // Esta es la URL de la API que usamos para contar y obtener el valor.
        const API_ENDPOINT_HIT = 'https://api.countapi.xyz/hit/guia_descargas';
        const API_ENDPOINT_GET = 'https://api.countapi.xyz/get/guia_descargas';

        // Funcion para obtener y mostrar el numero del contador
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
        
        // Funcion para registrar el clic y abrir la guia
        async function registerClick(event) {
            event.preventDefault();

            try {
                // Hacemos una llamada GET para aumentar el contador en uno
                await fetch(API_ENDPOINT_HIT);
                
                // Abre el archivo en una nueva pestaña
                window.open(downloadButton.href, '_blank');
                
                // Vuelve a llamar a la funcion para mostrar el nuevo numero
                getCount();
            } catch (error) {
                console.error('Error al registrar el clic:', error);
            }
        }

        // Llamada inicial para que el contador se muestre al cargar la pagina
        getCount();

        // Escuchamos el clic en el boton de descarga
        downloadButton.addEventListener('click', registerClick);
    }
});