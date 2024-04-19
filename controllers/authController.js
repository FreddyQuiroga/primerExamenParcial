const UserModel = require('../models/usuarioModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// registrar usuarios 
exports.registroUser = async (req, res) => {
  try {
    // Obtener los datos del usuario desde el cuerpo de la solicitud
    const { nombreUsuario, correo, contraseña } = req.body;

    // Generar el hash de la contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10); // 10 es el número de rondas de hashing

    // Crear un nuevo usuario con la contraseña cifrada
    const usuario = new UserModel({
      nombreUsuario,
      correo,
      contraseña: hashedPassword
    });

    // Guardar el usuario en la base de datos
    await usuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(404).json({ mensaje: error.message });
  }
};


exports.loginUser = async (req, res) => {

  const user = await UserModel.findOne({ nombreUsuario: req.body.nombreUsuario });
    if (!user) return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });

    const validPassword = await bcrypt.compare(req.body.password, user.contraseña);
    if (!validPassword) return res.status(400).json({ message: 'Correo electrónico o contraseña incorrectos' });

// Generar un token JWT
const token = jwt.sign({ username:  req.body.nombreUsuario }, 'secret-key', { expiresIn: '30000m' });


// Almacenar el nombre de usuario en la sesión del usuario
req.session.username = req.body.nombreUsuario;
// Almacenar el token en la sesión del usuario
req.session.token = token;
    // const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    // res.header('auth-token22', token).json({ token });
    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
};

exports.logoutUser = async (req, res) => {

  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      res.status(200).json({ message: 'Sesión cerrada exitosamente' });
    }
  });
    // No se necesita hacer nada en este caso para cerrar sesión
};