document.addEventListener('DOMContentLoaded', () => {
    const elementosAnimar = document.querySelectorAll('.consejo-group');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si el elemento entra en la pantalla, remueve la clase "hidden" para animar
                entry.target.classList.remove('hidden');
            } else {
                // Si el elemento sale de la pantalla, agrega la clase "hidden" para reiniciarlo
                entry.target.classList.add('hidden');
            }
        });
    }, {
        threshold: 0.5 /* Puedes ajustar este valor si quieres que la animación se active antes o después */
    });

    // Añade la clase "hidden" a todos los elementos al cargar la página
    // Y comienza a observarlos
    elementosAnimar.forEach(el => {
        el.classList.add('hidden');
        observer.observe(el);
    });
});