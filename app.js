const express = require('express');
const app = express();
const mongoose = require('mongoose');
const pizzaRoutes = require('./routes/pizzaRoutes');

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27018/dbPizzeria', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a la base de datos MongoDB'))
  .catch(err => console.error('Error al conectar a la base de datos:', err));

// Middleware para parsear JSON
app.use(express.json());

// Rutas de la aplicación
app.use('/pizzas', pizzaRoutes);

// Puerto en el que escucha el servidor
const port = 3000;
app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));
