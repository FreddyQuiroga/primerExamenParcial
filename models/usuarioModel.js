const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombreUsuario: { type: String, required: true },
  correo: { type: String, required: true },
  contraseña: { type: String, required: true },

},{ versionKey: false });

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
