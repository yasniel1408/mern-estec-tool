const controller = {};
("use strict");

const config = require("../db/configSqls");
const ProductoModel = require("../models/Producto");
const Producto = new ProductoModel(config.connectionSQL);

controller.data = async (req, res) => {
   try {
    let response = await Producto.selectAll(req.query);
    res.json(response);
  } catch (error) {
    Producto.close();
    console.log(error);
  }
};

module.exports = controller;
