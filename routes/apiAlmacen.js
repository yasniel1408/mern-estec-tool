const express = require('express');
const router = express.Router();
const { verificarToken, verificarADMIN } = require("../util/auth");

//import controller
const almacenController = require('../controllers/AlmacenController');

router.get('/almacen', verificarToken, almacenController.data );

module.exports = router;