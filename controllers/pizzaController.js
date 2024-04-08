// const { ObjectId } = require('mongodb');
// const client = require('./database'); // Importa el cliente de MongoDB
const Pizza = require('../models/pizzaModel');

// Lógica para trabajar con el modelo Pizza

// Obtener todas las pizzas
exports.getAllPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.json(pizzas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las pizzas' });
  }
};

// Obtener una pizza por su ID
exports.getPizzaById = async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) {
      return res.status(404).json({ error: 'Pizza no encontrada' });
    }
    res.json(pizza);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la pizza por su ID' });
  }
};

// Agregar una nueva pizza
exports.addPizza = async (req, res) => {
  try {
    const newPizza = new Pizza(req.body);
    await newPizza.save();
    res.status(201).json({ message: 'Pizza agregada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar la pizza' });
  }
};

// Actualizar una pizza
exports.updatePizza = async (req, res) => {
  try {
    const updatedPizza = await Pizza.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPizza) {
      return res.status(404).json({ error: 'Pizza no encontrada' });
    }
    res.json({ message: 'Pizza actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la pizza' });
  }
};

// Eliminar una pizza
exports.deletePizza = async (req, res) => {
  try {
    const deletedPizza = await Pizza.findByIdAndDelete(req.params.id);
    if (!deletedPizza) {
      return res.status(404).json({ error: 'Pizza no encontrada' });
    }
    res.json({ message: 'Pizza eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la pizza' });
  }
};

// Búsqueda por descripción
exports.getPizzasByDescription = async (req, res) => {
  try {
    const descripcion = req.params.descripcion;
    const pizzas = await Pizza.find({ descripcion: { $regex: descripcion, $options: 'i' } });
    res.json(pizzas);
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
