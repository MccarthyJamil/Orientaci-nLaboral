document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.slide'));
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');

    const slideCount = slides.length;
    let currentSlide = 0;
    let autoSlideInterval;

    // Función principal para mostrar el slide
    const updateCarousel = () => {
        // Calcula cuánto desplazar el track: (índice actual * 100%)
        const offset = -currentSlide * 100;
        track.style.transform = 'translateX(' + offset + '%)';
    };

    // Función para pasar al siguiente slide
    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slideCount;
        updateCarousel();
    };

    // Función para pasar al slide anterior
    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateCarousel();
    };

    // ----------------------------------------------------
    // Funcionalidad de Auto-Slide (Cada 5 segundos)
    // ----------------------------------------------------
    const startAutoSlide = () => {
        // Limpia cualquier intervalo previo para evitar duplicados
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
        
        // Configura el nuevo intervalo de 5000ms (5 segundos)
        autoSlideInterval = setInterval(nextSlide, 5000);
    };

    // Manejadores de eventos manuales
    nextButton.addEventListener('click', () => {
        nextSlide();
        startAutoSlide(); // Reinicia el contador de 5s al hacer click
    });

    prevButton.addEventListener('click', () => {
        prevSlide();
        startAutoSlide(); // Reinicia el contador de 5s al hacer click
    });

    // Iniciar el carrusel y el pase automático
    updateCarousel();
    startAutoSlide();
});