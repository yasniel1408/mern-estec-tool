const express = require('express');
const router = express.Router();
const { verificarToken, verificarADMIN, verificarDIRECTOR } = require("../util/auth");

//import controller
const productoController = require('../controllers/ProductoController');
const existenciaLotesController = require('../controllers/ExistenciaLotesController');


router.get('/producto', verificarDIRECTOR, productoController.data );
router.get('/existencia-producto', verificarDIRECTOR, existenciaLotesController.selectById );


module.exports = router;