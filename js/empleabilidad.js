// =================================================================
// 1. LÓGICA DEL CONTADOR: Variables y Funciones Globales
// =================================================================

// Mover variables y funciones fuera de DOMContentLoaded para hacerlas globales
const downloadButton = document.getElementById('download-button');
const contadorNumero = document.getElementById('contador-numero');
// La URL es correcta: 'https://api-contador-zenr.onrender.com/api/contador'
const API_BASE_URL = 'https://api-contador-zenr.onrender.com/api/contador'; 


// FUNCIÓN PARA CARGAR EL CONTADOR (Definición Global y con Timeout)
async function loadCounter() {
    if (!contadorNumero) return; 
    
    // Muestra 'Cargando...' inmediatamente
    contadorNumero.textContent = 'Cargando...'; 

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); 

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
        console.error('❌ Error al cargar el contador desde el API:', error);
        
        // Si falla por timeout o error de servidor, muestra 0
        contadorNumero.textContent = '0'; 
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

    // Ejecución inicial: carga el contador cuando la página se carga por primera vez
    loadCounter();
});


// =================================================================
// 3. EVENTO CLAVE: Solución al Problema de Navegación Interna
// =================================================================

// Este evento se dispara cada vez que la página de Empleabilidad se muestra,
// incluyendo cuando el usuario navega hacia atrás o adelante, lo que soluciona el problema del '0'.
window.addEventListener('pageshow', (event) => {
    // Si la página fue recuperada del caché (al navegar), forzamos la recarga del contador.
    if (event.persisted) {
        loadCounter();
    }
});