const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Nuevo: Módulo para MongoDB
const Counter = require('./models/Counter'); // Nuevo: Tu modelo de datos

const app = express();
// Configura el puerto para Render
const port = process.env.PORT || 3000; 

app.use(cors());
// Permite que Express lea JSON
app.use(express.json());

// **REEMPLAZA ESTA CADENA** con tu URI de Atlas
const MONGO_URI = 'mongodb+srv://mccarthy:Holagrupo17@descargas.d1wwjva.mongodb.net/?retryWrites=true&w=majority&appName=descargas'; 

// Conexión a la base de datos
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Conectado a MongoDB Atlas.'))
    .catch(err => {
        console.error('❌ Error de conexión a MongoDB:', err);
    });

// RUTA 1: OBTENER el contador (GET)
app.get('/api/contador/get-count', async (req, res) => {
    try {
        const counter = await Counter.findOne({ name: 'guia_descargas' });
        res.status(200).json({ count: counter ? counter.count : 0 }); 
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el contador.' });
    }
});

// RUTA 2: INCREMENTAR el contador (POST)
app.post('/api/contador/descargar', async (req, res) => {
    try {
        const updatedCounter = await Counter.findOneAndUpdate(
            { name: 'guia_descargas' },
            { $inc: { count: 1 } },
            { new: true, upsert: true } 
        );
        
        res.status(200).json({ 
            message: 'Contador incrementado y guardado en la BD.', 
            newCount: updatedCounter.count 
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al incrementar el contador.' });
    }
});

app.listen(port, () => {
    console.log(`API del contador corriendo en http://localhost:${port}`);
});