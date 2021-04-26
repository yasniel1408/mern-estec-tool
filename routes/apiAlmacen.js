const express = require('express');
const router = express.Router();
const { verificarToken, verificarADMIN, verificarDIRECTOR } = require("../util/auth");

//import controller
const almacenController = require('../controllers/AlmacenController');

router.get('/almacen', verificarDIRECTOR, almacenController.data );

module.exports = router;