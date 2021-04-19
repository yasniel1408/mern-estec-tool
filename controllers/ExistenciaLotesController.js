const controller = {};
("use strict");

const config = require("../db/configSqls");
const ExistenciaLotes = require("../models/ExistenciaLotes");
const existenciaLotes = new ExistenciaLotes(config.connectionSQL);

controller.selectById = async (req, res) => {
  try {
    let response = await existenciaLotes.selectById(req.query.id);
    res.json(response);
  } catch (error) {
    existenciaLotes.close();
    console.log(error);
  }
};

module.exports = controller;
