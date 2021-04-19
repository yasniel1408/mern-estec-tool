const controller = {};
("use strict");

const config = require("../db/configSqls");
const Producto = require("../models/Producto");
const producto = new Producto(config.connectionSQL);

controller.data = async (req, res) => {
   try {
    let response = await producto.selectAll(req.query);
    res.json(response);
  } catch (error) {
    producto.close();
    console.log(error);
  }
};

module.exports = controller;
