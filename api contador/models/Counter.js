// api/models/Counter.js
const mongoose = require('mongoose');

// Este esquema es similar a lo que tenías en tu JSON, pero con validación de Mongoose
const CounterSchema = new mongoose.Schema({
    // Campo 'name' para identificar este registro como el contador de la guía
    name: { type: String, required: true, unique: true },
    // El campo real donde se guarda el número de descargas
    count: { type: Number, default: 0 }
});

module.exports = mongoose.model('Counter', CounterSchema);