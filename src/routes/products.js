const express = require("express");
// const Contenedor = require("../managers/contenedorProductos");
//ahora el contenedor es la db
const ContenedorMySql = require("../managers/contenedorMysql");
const options = require("../config/dbConfig");

const router = express.Router();

// const productosApi = new Contenedor("productos.txt");
//el nuevo contenedor recibe como parametro las options y los productos a trabajar
const productosApi = new ContenedorMySql(options.mariadb, "products");

router.get("/", async (req, res) => {
  const productos = await productosApi.getAll();
  res.send(productos);
});

router.get("/:id", async (req, res) => {
  const productId = req.params.id;
  //aplicar parseint para pasar los string a enteros
  const product = await productosApi.getById(parseInt(productId));
  if (product) {
    return res.send(product);
  } else {
    return res.send({ error: "producto no encontrado" });
  }
});

router.post("/", async (req, res) => {
  const newProduct = req.body;
  const result = await productosApi.save(newProduct);
  res.send(result);
});

router.put("/:id", async (req, res) => {
  const cambioObj = req.body;
  const productId = req.params.id;
  const result = await productosApi.updateById(parseInt(productId), cambioObj);
  res.send(result);
});

router.delete("/:id", async (req, res) => {
  const productId = req.params.id;
  const result = await productosApi.deleteById(parseInt(productId));
  res.send(result);
});

module.exports = { productsRouter: router };
