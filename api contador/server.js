// Importa las librerías necesarias
const express = require('express');
const cors = require('cors');

// Crea una instancia de Express
const app = express();
const port = 3000;

// Configura CORS para que cualquier página web pueda acceder a tu API
app.use(cors());

// Define el punto de entrada de la API
app.get('/api/contador', async (req, res) => {
    try {
        // Llama a la API de countapi.xyz para obtener el numero
        const response = await fetch('https://api.countapi.xyz/get/guia_descargas');
        const data = await response.json();
        
        // Crea una respuesta en formato JSON
        res.json({ count: data.value });

    } catch (error) {
        console.error('Error al obtener el contador:', error);
        res.status(500).json({ error: 'No se pudo obtener el contador.' });
    }
});

// Arrancador: Inicia el servidor
app.listen(port, () => {
    console.log(`API del contador corriendo en http://localhost:${port}/api/contador`);
});