const express = require('express');
const router = express.Router();
const { verificarToken, verificarADMIN } = require("../util/auth");

//import controller
const userController = require('../controllers/UserController');
const almacenController = require('../controllers/AlmacenController');


router.post('/login', userController.login );
router.post('/logout', verificarToken, userController.logout );
router.post('/verifie-token', verificarToken, userController.verificarToken );


router.get('/almacen', verificarToken, almacenController.data );


module.exports = router;