const express = require('express');
const router = express.Router();
const pizzaController = require('../controllers/pizzaController');
const auth = require('../middlewares/auth');
// Definición de las rutas relacionadas con las pizzas

router.get('/', pizzaController.getAllPizzas);
router.get('/:id', pizzaController.getPizzaById);
router.post('/', pizzaController.addPizza);
router.put('/:id', pizzaController.updatePizza);
router.delete('/:id', pizzaController.deletePizza);

router.get('/advanced/byDescripcion/:descripcion', pizzaController.getPizzasByDescription);
router.get('/advanced/sortedByPriceDesc', pizzaController.getPizzasSortedByPriceDesc);
router.get('/advanced/priceGreaterThan/:price', pizzaController.getPizzasPriceGreaterThan);




// 5 MAS CONSULTAS

// Obtener la pizza más cara
router.get('/advanced/mostExpensivePizza', pizzaController.getMostExpensivePizza);
// Actualizar precio por Nombre
router.put('/advanced/updatePizzaPriceByName', pizzaController.updatePizzaPriceByName);
// Actualizar todas las pizzas la descripcion
router.put('/advanced/updateAllPizzasDescription', pizzaController.updateAllPizzasDescription);
//  Obtener todas las pizzas que comience con una letra específica del atributo tamaño
router.put('/advanced/getPizzasByNameStartingWith', pizzaController.getPizzasByNameStartingWith);
//  Obtener el precio promedio de todas las pizzas
router.get('/advanced/getAveragePizzaPrice', pizzaController.getAveragePizzaPrice);
//  Obtener todas las pizzas que contengan un ingrediente específico y un precio mayor a cierto valor
router.put('/advanced/getPizzasByIngredientAndPrice', pizzaController.getPizzasByIngredientAndPrice);






// Búsqueda aleatoria de pizzas
router.get('/advanced/findRandom', pizzaController.getRandomPizzas);

module.exports = router;
