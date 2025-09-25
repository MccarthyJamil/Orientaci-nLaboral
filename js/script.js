// CÓDIGO PARA LA PÁGINA DE INICIO (BOTÓN DE DESCARGA Y TÍTULO)
// -----------------------------------------------------------

// 1. Seleccionar el elemento HTML que queremos modificar
const tituloPrincipal = document.querySelector('h1');

// 2. Definir una función que cambie el color del texto
function cambiarColor() {
    tituloPrincipal.style.color = '#FF5733'; // Cambia el color a naranja
}

// 3. Añadir un "escuchador de eventos" al elemento
tituloPrincipal.addEventListener('click', cambiarColor);

// Código del contador de descargas
const downloadButton = document.getElementById('download-button');
const contadorElemento = document.createElement('p');
contadorElemento.className = 'contador';

// Si el botón de descarga existe en la página, añade el contador
if (downloadButton) {
    downloadButton.parentNode.appendChild(contadorElemento);

    // Función para actualizar el contador en la página
    function actualizarContador() {
        let contador = localStorage.getItem('descargas');
        contador = contador ? parseInt(contador) : 0;
        contadorElemento.textContent = `Descargas: ${contador}`;
    }

    // Función que se ejecuta cuando se hace clic en el botón de descarga
    function manejarDescarga(event) {
        let contador = localStorage.getItem('descargas');
        contador = contador ? parseInt(contador) + 1 : 1;
        localStorage.setItem('descargas', contador);
        actualizarContador();
    }

    // Inicializar el contador al cargar la página
    actualizarContador();

    // Añadir el "escuchador de eventos" al botón de descarga
    downloadButton.addEventListener('click', manejarDescarga);
}


// CÓDIGO PARA LA PÁGINA DE GALERÍA (LECTORES QUE FLORECEN)
// -----------------------------------------------------------

// Este código solo se ejecutará si el elemento con el ID 'gallery-container' existe en la página
if (document.getElementById('gallery-container')) {
    // Arreglo con la lista de personas y sus flores
    const lectores = [
        { nombre: 'Adrián A', flor: 'ADRIAN_A.png' },
        { nombre: 'Adrián M', flor: 'ADRIAN_M.png' },
        { nombre: 'Libi C', flor: 'LIBI_C.png' },
        { nombre: 'Jenni G', flor: 'JENNI_G.png' }
    ];

    // 1. Seleccionar el contenedor donde irá la galería
    const galleryContainer = document.getElementById('gallery-container');

    // 2. Función para crear y agregar un elemento a la galería
    function crearElementoGaleria(lector) {
        // Creamos un nuevo div para cada persona
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';

        // Creamos la imagen de la flor
        const flowerImage = document.createElement('img');
        flowerImage.src = `images/${lector.flor}`;
        flowerImage.alt = `Flor para ${lector.nombre}`;

        // Creamos el párrafo con el nombre
        const lectorName = document.createElement('p');
        lectorName.textContent = lector.nombre;

        // Agregamos la imagen y el nombre al div del item
        galleryItem.appendChild(flowerImage);
        galleryItem.appendChild(lectorName);

        // Agregamos el item completo al contenedor de la galería
        galleryContainer.appendChild(galleryItem);
    }

    // 3. Recorrer el arreglo y crear un elemento para cada lector
    lectores.forEach(lector => {
        crearElementoGaleria(lector);
    });
}