document.addEventListener('DOMContentLoaded', () => {

    if (document.getElementById('contador-numero')) {
        const contadorNumero = document.getElementById('contador-numero');
        const downloadButton = document.getElementById('download-button');
        
        const API_URL = 'https://api-contador-zenr.onrender.com'; // La URL base de tu API

        async function getCount() {
            try {
                // Llama a tu propia API para OBTENER el número
                const response = await fetch(`${API_URL}/api/contador`);
                const data = await response.json();
                contadorNumero.textContent = data.count;
            } catch (error) {
                console.error('Error al obtener el contador:', error);
                contadorNumero.textContent = '--';
            }
        }
        
        async function registerDownload(event) {
            // Previene que se abra la descarga de inmediato
            event.preventDefault();

            try {
                // Llama a tu propia API para INCREMENTAR el número
                await fetch(`${API_URL}/api/incrementar`);

                // Después de incrementar, abre el archivo
                window.open(downloadButton.href, '_blank');
                
                // Y actualiza el número en pantalla
                getCount();
            } catch (error) {
                console.error('Error al registrar la descarga:', error);
            }
        }

        // Llamada inicial para que el contador se muestre al cargar la pagina
        getCount();

        // Escucha los clics en el boton de descarga
        downloadButton.addEventListener('click', registerDownload);
    }
});