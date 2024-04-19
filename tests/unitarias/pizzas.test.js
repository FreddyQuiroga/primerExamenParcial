const express = require("express");
const request = require("supertest");
const mongoose = require("mongoose");
const Pizza = require("../../models/pizzaModel");
const app = express();

// Configurar express para JSON
app.use(express.json());

// Importar tus rutas y controladores
const pizzaRoutes = require("../../routes/pizzaRoutes");
const pizzaController = require("../../controllers/pizzaController");

// Agregar las rutas al servidor de express
app.use("/pizzas", pizzaRoutes);

// Antes de cada prueba, conectar a la base de datos y limpiar la colección de pizzas
beforeEach(async () => {
  await mongoose.connect("mongodb://localhost:27018/dbPizzeria");
  // await Pizza.deleteMany({});
});

// Después de todas las pruebas, desconectar de la base de datos
afterAll(async () => {
  await mongoose.connection.close();
});

// 1 RA CONSULTA
describe("Pruebas unitarias para las rutas de la Pizzas", () => {
  // 1ra Consulta
  test("Debería devolver la pizza más cara", async () => {
    // Crear algunas pizzas con diferentes precios
    // Crear algunas pizzas con diferentes precios
    await Pizza.create({
      nombre: "Pizza 1",
      precio: 10,
      tamaño: "Pequeña",
      fecha: "2024-04-22",
      descripcion: "Deliciosa pizza número 1",
    });
    await Pizza.create({
      nombre: "Pizza 2",
      precio: 20,
      tamaño: "Mediana",
      fecha: "2024-04-22",
      descripcion: "Increíble pizza número 2",
    });
    await Pizza.create({
      nombre: "Pizza 3",
      precio: 30,
      tamaño: "Grande",
      fecha: "2024-04-22",
      descripcion: "Fantástica pizza número 3",
    });

    // Realizar una solicitud GET a la ruta correspondiente
    const res = await request(app).get("/pizzas/advanced/mostExpensivePizza");

    // Verificar que la respuesta tenga el código de estado esperado
    expect(res.statusCode).toEqual(200);
    // Verificar que la respuesta contenga la pizza más cara
    expect(res.body.nombre).toEqual("Pizza 3");
    expect(res.body.precio).toEqual(30);
  });

  // 2 DA CONSULTA 
  test('Debería actualizar el precio de la pizza por su nombre', async () => {
    const nombrePizza = 'Pizza 1';
    const nuevoPrecio = 15;

    const res = await request(app)
        .put(`/pizzas/advanced/updatePizzaPriceByName`)
        .send({ nombre: nombrePizza, precio: nuevoPrecio });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ message: 'Precio actualizado correctamente' });
});
 // 3 RA CONSULTA
test('Debería actualizar la descripción de todas las pizzas', async () => {
  const nuevaDescripcion = 'Nueva descripción para todas las pizzas';

  const res = await request(app)
      .put(`/pizzas/advanced/updateAllPizzasDescription`)
      .send({ nuevaDescripcion: nuevaDescripcion });

  expect(res.statusCode).toEqual(200);
  expect(res.body).toEqual({ message: 'Descripciones actualizadas correctamente' });
});

 // 4 TA CONSULTA 
 test('Debería obtener todas las pizzas con tamaño que comience con una letra específica', async () => {
  const letra = 'M'; // Letra específica para filtrar las pizzas

  const res = await request(app)
      .put(`/pizzas/advanced/getPizzasByNameStartingWith`)
      .send({ letra: letra });

  expect(res.statusCode).toEqual(200);
  expect(res.body).toBeDefined(); 
});
// 5 TA CONSULTA
test('Debería obtener el precio promedio de todas las pizzas', async () => {
  const res = await request(app)
      .get(`/pizzas/advanced/getAveragePizzaPrice`);

  expect(res.statusCode).toEqual(200);
  expect(res.body).toBeDefined(); 
});
// 6 TO CONSULTA 
test('Debería obtener las pizzas por ingrediente y precio mínimo', async () => {
  // Caso 1: Un solo ingrediente
  const resSingleIngredient = await request(app)
      .put(`/pizzas/advanced/getPizzasByIngredientAndPrice`)
      .send({ ingredientes: ['pepperoni'], precioMinimo: 10 });

  expect(resSingleIngredient.statusCode).toEqual(200);
  expect(resSingleIngredient.body).toBeDefined(); // Verificar que se recibieron datos

  // Caso 2: Múltiples ingredientes
  const resMultipleIngredients = await request(app)
      .put(`/pizzas/advanced/getPizzasByIngredientAndPrice`)
      .send({ ingredientes: ['pepperoni', 'queso'], precioMinimo: 15 });

  expect(resMultipleIngredients.statusCode).toEqual(200);
  expect(resMultipleIngredients.body).toBeDefined(); // Verificar que se recibieron datos
});





});


