const controller = {};
("use strict");

const config = require("../db/configSqls");
const Almacen = require("../models/Almacen");
const almacen = new Almacen(config.connectionSQL);

controller.data = async (req, res) => {
   try {
    let response = await almacen.selectAll(req.query);
    res.json(response);
  } catch (error) {
    almacen.close();
    console.log(error);
  }
};

module.exports = controller;
