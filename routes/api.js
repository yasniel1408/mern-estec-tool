const express = require('express');
const router = express.Router();
const { verificarToken, verificarADMIN } = require("../util/auth");

//import controller
const userController = require('../controllers/UserController');
const productoController = require('../controllers/ProductoController');


router.post('/login', userController.login );
router.post('/logout', verificarToken, userController.logout );
router.post('/verifie-token', verificarToken, userController.verificarToken );


router.get('/producto', verificarToken, productoController.data );


module.exports = router;