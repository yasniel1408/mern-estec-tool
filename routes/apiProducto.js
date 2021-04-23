const express = require('express');
const router = express.Router();
const { verificarToken, verificarADMIN } = require("../util/auth");

//import controller
const productoController = require('../controllers/ProductoController');
const existenciaLotesController = require('../controllers/ExistenciaLotesController');


router.get('/producto', verificarToken, productoController.data );
router.get('/existencia-producto', existenciaLotesController.selectById );


module.exports = router;