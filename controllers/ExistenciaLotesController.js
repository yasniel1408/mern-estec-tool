const controller = {};
("use strict");

const config = require("../db/configSqls");
const ExistenciaLotes = require("../models/ExistenciaLotes");
const existenciaLotes = new ExistenciaLotes(config.connectionSQL);

controller.data = async (req, res) => {
  try {
    let response = await existenciaLotes.selectAll();
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
    existenciaLotes.close();
    console.log(error);
  }
};

module.exports = controller;
