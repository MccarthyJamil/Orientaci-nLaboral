const express = require('express');
const cors = require('cors');
const fs = require('fs'); // Módulo de Node.js para trabajar con archivos

const app = express();
const port = 3000;

app.use(cors());

// Define el archivo donde se guardará el contador
const COUNTER_FILE = 'contador.json';

// Si el archivo no existe, lo crea con un contador inicial de 0
if (!fs.existsSync(COUNTER_FILE)) {
    fs.writeFileSync(COUNTER_FILE, JSON.stringify({ count: 0 }));
}

// Función para leer el contador del archivo
function getCount() {
    const data = fs.readFileSync(COUNTER_FILE);
    return JSON.parse(data).count;
}

// Función para guardar el nuevo valor del contador en el archivo
function saveCount(count) {
    fs.writeFileSync(COUNTER_FILE, JSON.stringify({ count }));
}

// Punto de entrada para obtener el contador
app.get('/api/contador', (req, res) => {
    try {
        const count = getCount();
        res.json({ count });
    } catch (error) {
        console.error('Error al obtener el contador:', error);
        res.status(500).json({ error: 'Error al obtener el contador.' });
    }
});

// Punto de entrada para INCREMENTAR el contador
app.get('/api/incrementar', (req, res) => {
    try {
        const currentCount = getCount();
        const newCount = currentCount + 1;
        saveCount(newCount);
        res.status(200).json({ message: 'Contador incrementado.', count: newCount });
    } catch (error) {
        console.error('Error al incrementar el contador:', error);
        res.status(500).json({ error: 'Error al incrementar el contador.' });
    }
});

app.listen(port, () => {
    console.log(`API del contador corriendo en http://localhost:${port}`);
});