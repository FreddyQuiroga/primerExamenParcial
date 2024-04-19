const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  fecha: { type: String, required: true },
  precio: { type: Number, required: true },
  ingredientes: { type: [String], required: true }, // Lista de ingredientes
  tamaño: { type: String, required: true }, // Tamaño de la pizza (ej. pequeña, mediana, grande)
},{ versionKey: false });

const Pizza = mongoose.model('Pizza', pizzaSchema);

module.exports = Pizza;
