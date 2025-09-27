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


// CÓDIGO PARA EL CONTADOR DE DESCARGAS (ÚLTIMO INTENTO)
if (document.getElementById('contador-box')) {
    const contadorBox = document.getElementById('contador-box');
    const contadorNumero = document.getElementById('contador-numero');

    // ¡CAMBIO CLAVE! Usamos HTTP en lugar de HTTPS para evitar posibles problemas
    const API_ENDPOINT = 'http://api.countapi.xyz/get/tu-guia-profesional/descargas';
    const API_INCREMENT = 'http://api.countapi.xyz/hit/tu-guia-profesional/descargas';

    async function actualizarContador() {
        try {
            const response = await fetch(API_ENDPOINT);
            const data = await response.json();
            contadorNumero.textContent = data.value;
        } catch (error) {
            console.error('Error al obtener el contador:', error);
            contadorNumero.textContent = 'Error';
        }
    }

    async function contarDescarga() {
        try {
            await fetch(API_INCREMENT);
        } catch (error) {
            console.error('Error al registrar la descarga:', error);
        }
    }

    contarDescarga();
    actualizarContador();
}