// CÓDIGO PARA LA PÁGINA DE EXPERIENCIAS (GALERÍA Y RESEÑAS)
// Este código solo se ejecutará si el elemento con el ID 'gallery-container' existe
if (document.getElementById('gallery-container')) {
    const lectores = [
        { nombre: 'Adrián A', flor: 'ADRIAN_A.png' },
        { nombre: 'Adrián M', flor: 'ADRIAN_M.png' },
        { nombre: 'Libi C', flor: 'LIBI_C.png' },
        { nombre: 'Jenni G', flor: 'JENNI_G.png' }
    ];

    const galleryContainer = document.getElementById('gallery-container');

    function crearElementoGaleria(lector) {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';

        const flowerImage = document.createElement('img');
        flowerImage.src = `images/${lector.flor}`;
        flowerImage.alt = `Flor para ${lector.nombre}`;

        const lectorName = document.createElement('p');
        lectorName.textContent = lector.nombre;

        galleryItem.appendChild(flowerImage);
        galleryItem.appendChild(lectorName);

        galleryContainer.appendChild(galleryItem);
    }

    lectores.forEach(lector => {
        crearElementoGaleria(lector);
    });
}
// Espera a que el contenido de la pagina se cargue completamente
document.addEventListener('DOMContentLoaded', () => {

// CÓDIGO PARA EL CONTADOR DE DESCARGAS
    // Se ejecuta solo si el contador existe en la página
    if (document.getElementById('contador-box')) {
        const contadorNumero = document.getElementById('contador-numero');
        const downloadButton = document.getElementById('download-button');
        
        // Esta es la URL de la API que usaremos.
        // Por favor, no la cambies
        const API_ENDPOINT = 'https://api.countapi.xyz/hit/guia_descargas';

        // Funcion para actualizar el numero del contador
        async function updateCount() {
            try {
                const response = await fetch(API_ENDPOINT);
                const data = await response.json();
                contadorNumero.textContent = data.value;
            } catch (error) {
                console.error('Error al obtener el contador:', error);
                contadorNumero.textContent = '--';
            }
        }

        // Llamada inicial para que el contador se muestre al cargar la pagina
        updateCount();

        // Escuchamos el clic en el boton de descarga para actualizar el contador
        downloadButton.addEventListener('click', () => {
            // Se puede volver a llamar la funcion para actualizar el numero inmediatamente
            updateCount();
        });
    }

});