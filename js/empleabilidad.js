document.addEventListener('DOMContentLoaded', () => {
    // ===========================================
    // 1. LÓGICA DE ANIMACIÓN (Tu código original)
    // ===========================================
    const elementosAnimar = document.querySelectorAll('.consejo-group');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('hidden');
            } else {
                entry.target.classList.add('hidden');
            }
        });
    }, {
        threshold: 0.5 
    });

    elementosAnimar.forEach(el => {
        el.classList.add('hidden');
        observer.observe(el);
    });

    // ===========================================
    // 2. LÓGICA DEL CONTADOR PERSISTENTE (NUEVA)
    // ===========================================
    const downloadButton = document.getElementById('download-button');
    const contadorNumero = document.getElementById('contador-numero');

    // !!! REEMPLAZA ESTA URL CON LA URL FINAL DE TU SERVICIO EN RENDER !!!
    const API_BASE_URL = 'https://api-contador-zenr.onrender.com'; 


    // FUNCIÓN PARA CARGAR EL CONTADOR AL INICIO
    async function loadCounter() {
        if (!contadorNumero) return; // Salir si el elemento no existe

        try {
            // Llama a la ruta GET para obtener el valor guardado en MongoDB
            const response = await fetch(`${API_BASE_URL}/get-count`);
            
            if (!response.ok) {
                 throw new Error(`Error HTTP: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.count !== undefined) {
                // Actualiza el número visible en la página
                contadorNumero.textContent = data.count;
            }
        } catch (error) {
            console.error('❌ Error al cargar el contador desde el API:', error);
            // Muestra un valor por defecto o un mensaje de error si falla
            contadorNumero.textContent = '---'; 
        }
    }


    // FUNCIÓN PARA INCREMENTAR EL CONTADOR AL CLIC
    if (downloadButton) {
        downloadButton.addEventListener('click', async (event) => {
            // Nota: Aquí no usamos event.preventDefault() para no detener la descarga de la guía
            
            try {
                // Llama a la ruta POST para incrementar el valor en MongoDB
                const response = await fetch(`${API_BASE_URL}/descargar`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    // Actualiza el número visible con el valor que devuelve la BD
                    contadorNumero.textContent = data.newCount; 
                } else {
                    console.error('El API devolvió un error al incrementar.');
                }
                
            } catch (error) {
                console.error('❌ Error de conexión al intentar incrementar:', error);
            }
            // Después del fetch, la descarga del archivo (si el botón tiene el atributo 'download') continúa
        });
    }

    // Ejecutar la función de carga al terminar el DOM
    loadCounter();
});