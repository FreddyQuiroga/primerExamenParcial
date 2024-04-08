const express = require('express');
const router = express.Router();
const pizzaController = require('../controllers/pizzaController');

// Definición de las rutas relacionadas con las pizzas

router.get('/', pizzaController.getAllPizzas);
router.get('/:id', pizzaController.getPizzaById);
router.post('/', pizzaController.addPizza);
router.put('/:id', pizzaController.updatePizza);
router.delete('/:id', pizzaController.deletePizza);

router.get('/advanced/byDescripcion/:descripcion', pizzaController.getPizzasByDescription);
router.get('/advanced/sortedByPriceDesc', pizzaController.getPizzasSortedByPriceDesc);
router.get('/advanced/priceGreaterThan/:price', pizzaController.getPizzasPriceGreaterThan);

module.exports = router;
