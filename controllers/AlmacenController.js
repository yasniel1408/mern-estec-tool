const controller = {};
("use strict");

const config = require("../db/configSqls");
const Almacen = require("../models/Almacen");
const almacen = new Almacen(config.connectionSQL);

controller.data = async (req, res) => {
  try {
    let response = await almacen.select("Producto");
    const seleccion = response.recordset;

    let results = {
      "Echo" : 1,
      "TotalRecords" : seleccion.length,
      "TotalDisplayRecords" : seleccion.length,
      "Data" : seleccion,
    };

    res.json({
      data: seleccion,
    });
    console.log(seleccion);
  } catch (error) {
    almacen.close();
    console.log(error);
  }
};

module.exports = controller;
