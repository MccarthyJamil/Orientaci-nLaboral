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


// CÓDIGO PARA EL CONTADOR DE DESCARGAS (SE EJECUTARÁ EN LA PÁGINA DE EMPLEABILIDAD)
if (document.getElementById('download-button')) {
    const downloadButton = document.getElementById('download-button');
    const contadorElemento = document.createElement('p');
    contadorElemento.className = 'contador';
    downloadButton.parentNode.appendChild(contadorElemento);

    const API_ENDPOINT = 'https://api.countapi.xyz/hit/tu-guia-profesional/downloads';

    async function actualizarContador() {
        try {
            const response = await fetch(API_ENDPOINT);
            const data = await response.json();
            contadorElemento.textContent = `Descargas: ${data.value}`;
        } catch (error) {
            console.error('Error al obtener el contador:', error);
        }
    }

    async function manejarDescarga(event) {
        try {
            const response = await fetch(API_ENDPOINT + '/visits');
            await response.json();
        } catch (error) {
            console.error('Error al registrar la descarga:', error);
        }
    }

    actualizarContador();
    downloadButton.addEventListener('click', manejarDescarga);
}