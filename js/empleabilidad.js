// =================================================================
// 1. LÓGICA DEL CONTADOR: Variables y Funciones Globales (SOLUCIÓN A LATENCIA)
// =================================================================

// Mover variables y funciones fuera de DOMContentLoaded para hacerlas globales
const downloadButton = document.getElementById('download-button');
const contadorNumero = document.getElementById('contador-numero');

// La URL es correcta: 'https://api-contador-zenr.onrender.com/api/contador'
const API_BASE_URL = 'https://api-contador-zenr.onrender.com/api/contador'; 


// FUNCIÓN PARA CARGAR EL CONTADOR (Definición Global, Manejo de Latencia/Timeout)
async function loadCounter() {
    if (!contadorNumero) return; 
    
    // Muestra 'Cargando...' inmediatamente
    contadorNumero.textContent = 'Puedes descargar :)'; 

    const controller = new AbortController();
    // Aumentamos el tiempo de espera a 20 segundos para darle tiempo a Render
    const timeoutId = setTimeout(() => controller.abort(), 20000); 

    try {
        const response = await fetch(`${API_BASE_URL}/get-count`, { 
            signal: controller.signal 
        });
        
        clearTimeout(timeoutId); 
        
        if (!response.ok) {
             throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.count !== undefined) {
            // Éxito: Muestra el número real
            contadorNumero.textContent = data.count;
        }
    } catch (error) {
        // Si falla por timeout (Render dormido) o error, mantenemos el mensaje de 'Cargando...'
        console.warn('⚠️ Falló la carga inicial (Probablemente Render estaba dormido).');
        contadorNumero.textContent = 'Puedes descargar :)'; 
        
        // El siguiente refresco o clic en el botón de descarga corregirá el valor.
    }
}


// =================================================================
// 2. LÓGICA PRINCIPAL: Ejecución en Eventos
// =================================================================

document.addEventListener('DOMContentLoaded', () => {
    // LÓGICA DE ANIMACIÓN (Tu código original)
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

    // LÓGICA DEL BOTÓN (Referencia a las variables y API_BASE_URL globales)
    if (downloadButton) {
        downloadButton.addEventListener('click', async () => {
            
            try {
                const response = await fetch(`${API_BASE_URL}/descargar`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
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

    // ================================================================
    // SOLUCIÓN CLAVE: Detectar el Clic en el Enlace de Navegación
    // ================================================================
    const linkEmpleabilidad = document.getElementById('link-empleabilidad');

    if (linkEmpleabilidad) {
        linkEmpleabilidad.addEventListener('click', () => {
            // Al hacer clic, forzamos la recarga del contador ANTES de navegar
            loadCounter();
        });
    }
    // ================================================================

    // Ejecución inicial: carga el contador cuando el DOM está listo
    loadCounter();
});


// =================================================================
// 3. EVENTO DE RESPALDO: Solución para Botón Atrás/Adelante
// =================================================================

// Este evento se dispara si el usuario usa los botones Atrás/Adelante del navegador
window.addEventListener('pageshow', (event) => {
    // Si la página fue recuperada del caché (al navegar), forzamos la recarga.
    if (event.persisted) {
        loadCounter();
    }
});