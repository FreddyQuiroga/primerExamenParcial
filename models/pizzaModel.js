const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  fecha: { type: String, required: true },
  precio: { type: Number, required: true },
});

const Pizza = mongoose.model('dbPizzeria', pizzaSchema, 'Pizza');

module.exports = Pizza;
