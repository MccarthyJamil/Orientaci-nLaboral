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
    // 2. LÓGICA DEL CONTADOR PERSISTENTE (Solución al "---")
    // ===========================================
    const downloadButton = document.getElementById('download-button');
    const contadorNumero = document.getElementById('contador-numero');

    // AJUSTE CLAVE: Asegúrate que la ruta sea '/api/contador' como en el server.js
    const API_BASE_URL = 'https://api-contador-zenr.onrender.com/api/contador'; 


    // FUNCIÓN PARA CARGAR EL CONTADOR AL INICIO
    async function loadCounter() {
        if (!contadorNumero) return; 

        // PASO CLAVE 1: Muestra un mensaje amigable inmediatamente
        contadorNumero.textContent = 'Cargando...'; 

        // Inicializa el controlador para el timeout
        const controller = new AbortController();
        // 15 segundos de timeout para manejar la latencia de Render
        const timeoutId = setTimeout(() => controller.abort(), 15000); 

        try {
            // Llama a la ruta GET
            const response = await fetch(`${API_BASE_URL}/get-count`, { 
                signal: controller.signal // Aplica el timeout a la petición
            });
            
            clearTimeout(timeoutId); // Limpia el timeout si llega la respuesta
            
            if (!response.ok) {
                 throw new Error(`Error HTTP: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.count !== undefined) {
                // Éxito: Muestra el número real
                contadorNumero.textContent = data.count;
            }
        } catch (error) {
            console.error('❌ Error al cargar el contador desde el API:', error);
            
            // PASO CLAVE 2: Si la carga falla por timeout o error, muestra 0 o sigue en "Cargando..."
            if (error.name === 'AbortError' || error.message.includes('timeout')) {
                 // Si falla por tiempo de espera de Render, mantenemos el mensaje de carga
                 // O mostramos el 0 inicial
                 contadorNumero.textContent = '0'; 
            } else {
                 // Si falla por otra razón (ej: URL errónea), muestra 0
                 contadorNumero.textContent = '0'; 
            }
        }
    }


    // FUNCIÓN PARA INCREMENTAR EL CONTADOR AL CLIC
    if (downloadButton) {
        downloadButton.addEventListener('click', async () => {
            
            try {
                // Llama a la ruta POST para incrementar (esta siempre funcionará si el servidor está activo)
                const response = await fetch(`${API_BASE_URL}/descargar`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    contadorNumero.textContent = data.newCount; 
                } else {
                    console.error('El API devolvió un error al incrementar.');
                }
                
            } catch (error) {
                console.error('❌ Error de conexión al intentar incrementar:', error);
            }
        });
    }

    // Ejecutar la función de carga al terminar el DOM
    loadCounter();
});