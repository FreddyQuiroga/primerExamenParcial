// const { ObjectId } = require('mongodb');
// const client = require('./database'); // Importa el cliente de MongoDB
const Pizza = require('../models/pizzaModel');

// Lógica para trabajar con el modelo Pizza

// Obtener todas las pizzas
// exports.getAllPizzas = async (req, res) => {
//   try {
//      // Verificar si se ha enviado la cookie en la solicitud
//      const cookieHeader = req.headers.tokenuab;
//      if (!cookieHeader) {
//        return res.status(401).json({ error: 'No se proporcionó una cookie de sesión' });
//      }

//      console.log( cookieHeader )
 
//      // Verificar si el token es válido
//      jwt.verify(token, 'secret-key', async (err, decoded) => { // Marcar esta función como async
//        if (err) {
//          return res.status(401).json({ error: 'Token de sesión inválido' });
//        } else {
//          // Si el token es válido, extraer el nombre de usuario del token
//          const username = decoded.username;
 
//          // Verificar si el nombre de usuario es válido
//          if (username) {
//            // Si el nombre de usuario es válido, obtener todas las pizzas
//            const pizzas = await Pizza.find(); // Marcar esta línea con await dentro de la función async
//            res.json(pizzas);
//          } else {
//            res.status(401).json({ error: 'Token de sesión inválido' });
//          }
//        }
//      });

//     // Verificar si existe una sesión iniciada
//     // if (req.session.username) {
//     //   // Si hay una sesión iniciada, obtener todas las pizzas
//     //   const pizzas = await Pizza.find();
//     //   res.json(pizzas);
//     // } else {
//     //   // Si no hay sesión iniciada, enviar un mensaje de error
//     //   res.status(401).json({ error: 'Debes iniciar sesión para acceder a las pizzas' });
//     // }
//   } catch (error) {
//     res.status(500).json({ error: 'Error al obtener las pizzas' });
//   }
// };

exports.getAllPizzas = async (req, res) => {
  try {
    // Verificar si existe una sesión iniciada
    if (req.session.username) {
      // Si hay una sesión iniciada, obtener todas las pizzas
      const pizzas = await Pizza.find();
      res.json(pizzas);

    } else {
      // Si no hay sesión iniciada, enviar un mensaje de error
      res.status(401).json({ error: 'Debes iniciar sesión para acceder a las pizzas' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las pizzas' });
  }
};


// Obtener una pizza por su ID
exports.getPizzaById = async (req, res) => {
  try {
      // Verificar si existe una sesión iniciada
      if (req.session.username) {

    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) {
      return res.status(404).json({ error: 'Pizza no encontrada' });
    }
    res.json(pizza);
     }else {
      // Si no hay sesión iniciada, enviar un mensaje de error
      res.status(401).json({ error: 'Debes iniciar sesión para acceder a las pizza por id' });
    }

  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la pizza por su ID' });
  }
};

// Agregar una nueva pizza
exports.addPizza = async (req, res) => {
  try {
      // Verificar si existe una sesión iniciada
      if (req.session.username) {
    const newPizza = new Pizza(req.body);
    await newPizza.save();
    res.status(201).json({ message: 'Pizza agregada correctamente' });
  }else {
    // Si no hay sesión iniciada, enviar un mensaje de error
    res.status(401).json({ error: 'Debes iniciar sesión para acceder ' });
  }
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar la pizza' });
  }
};

// Actualizar una pizza
exports.updatePizza = async (req, res) => {

  try {
       // Verificar si existe una sesión iniciada
       if (req.session.username) {
    const updatedPizza = await Pizza.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPizza) {
      return res.status(404).json({ error: 'Pizza no encontrada' });
    }
    res.json({ message: 'Pizza actualizada correctamente' });
  }else {
    // Si no hay sesión iniciada, enviar un mensaje de error
    res.status(401).json({ error: 'Debes iniciar sesión para acceder ' });
  }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la pizza' });
  }
};

// Eliminar una pizza
exports.deletePizza = async (req, res) => {
  try {
       // Verificar si existe una sesión iniciada
       if (req.session.username) {
    const deletedPizza = await Pizza.findByIdAndDelete(req.params.id);
    if (!deletedPizza) {
      return res.status(404).json({ error: 'Pizza no encontrada' });
    }
    res.json({ message: 'Pizza eliminada correctamente' });
    } else {
      // Si no hay sesión iniciada, enviar un mensaje de error
      res.status(401).json({ error: 'Debes iniciar sesión para acceder ' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la pizza' });
  }
};

// Búsqueda por descripción
exports.getPizzasByDescription = async (req, res) => {
  try {
    if (req.session.username) {
    const descripcion = req.params.descripcion;
    const pizzas = await Pizza.find({ descripcion: { $regex: descripcion, $options: 'i' } });
    res.json(pizzas);

  } else {
    // Si no hay sesión iniciada, enviar un mensaje de error
    res.status(401).json({ error: 'Debes iniciar sesión para acceder ' });
  }

  } catch (error) {
    res.status(500).json({ error: 'Error al buscar pizzas por descripción' });
  }
};

// Ordenamiento por precio descendente
exports.getPizzasSortedByPriceDesc = async (req, res) => {
  try {
    const pizzas = await Pizza.find().sort({ precio: -1 });
    res.json(pizzas);
  } catch (error) {
    res.status(500).json({ error: 'Error al ordenar las pizzas por precio descendente' });
  }
};

// Filtrado por precio mayor a cierto valor
exports.getPizzasPriceGreaterThan = async (req, res) => {
  try {
    const pizzas = await Pizza.find({ precio: { $gt: parseFloat(req.params.price) } });
    res.json(pizzas);
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar pizzas por precio mayor a cierto valor' });
  }
};




// 5 mas avanzados

// Conteo de pizzas por tipo

// Consulta 1: Obtener la pizza más cara
exports.getMostExpensivePizza = async (req, res) => {
  try {
    const mostExpensivePizza = await Pizza.findOne().sort({ precio: -1 });
    res.json(mostExpensivePizza);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la pizza más cara' });
  }
};
// Consulta 2: Actualizar el precio de una pizza por su nombre
exports.updatePizzaPriceByName = async (req, res) => {
  try {
    const { nombre, precio } = req.body;
    await Pizza.updateOne({ nombre: nombre }, { precio: precio });
    res.json({ message: 'Precio actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el precio de la pizza' });
  }
};
// Consulta 3: Actualizar la descripción de todas las pizzas
exports.updateAllPizzasDescription = async (req, res) => {
  try {
    const { nuevaDescripcion } = req.body;
    await Pizza.updateMany({}, { descripcion: nuevaDescripcion });
    res.json({ message: 'Descripciones actualizadas correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar las descripciones de las pizzas' });
  }
};
// Consulta 4: Obtener todas las pizzas con tamaño que comience con una letra específica
exports.getPizzasByNameStartingWith = async (req, res) => {
  try {
    const { letra } = req.body;
    const pizzasStartingWith = await Pizza.find({ tamaño: { $regex: `^${letra}`, $options: 'i' } });
    res.json(pizzasStartingWith);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las pizzas por nombre' });
  }
};
// Consulta 5: Obtener el precio promedio de todas las pizzas
exports.getAveragePizzaPrice = async (req, res) => {
  try {
    const averagePrice = await Pizza.aggregate([{ $group: { _id: null, avgPrice: { $avg: '$precio' } } }]);
    res.json(averagePrice[0].avgPrice);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el precio promedio de las pizzas' });
  }
};
// Consulta 6: Obtener todas las pizzas que contengan un ingrediente específico y un precio mayor a cierto valor
exports.getPizzasByIngredientAndPrice = async (req, res) => {
  try {
    const { ingredientes, precioMinimo } = req.body;
    let query = { };

    if (ingredientes.length === 1) {
      query = { ingredientes: ingredientes[0] };
    } else {
      query = { ingredientes: { $in: ingredientes } };
    }

    const pizzas = await Pizza.find(query);
    res.json(pizzas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las pizzas por ingrediente y precio' });
  }
};





//  Actualización de precios por tipo de pizza

exports.updatePricesByType = async (req, res) => {
  try {
    const { tipo } = req.params;
    const { nuevoPrecio } = req.body;
    await Pizza.updateMany({ tipo }, { precio: nuevoPrecio });
    res.json({ message: 'Precios actualizados correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar precios por tipo' });
  }
};

// Búsqueda por precio dentro de un rango

exports.getPizzasByPriceRange = async (req, res) => {
  try {
    const { precioMin, precioMax } = req.query;
    const pizzas = await Pizza.find({
      precio: { $gte: precioMin, $lte: precioMax }
    });
    res.json(pizzas);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar pizzas por rango de precio' });
  }
};

// Busqueda aleatoria de pizzas 

exports.getRandomPizzas = async (req, res) => {
  try {
    const { cantidad } = req.query;
    const pizzas = await Pizza.aggregate([{ $sample: { size: parseInt(cantidad) } }]);
    res.json(pizzas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pizzas aleatorias' });
  }
};
