const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Ruta para mostrar el formulario de inicio de sesión
router.get('/login', usersController.showLoginForm);

// Ruta para procesar el formulario de inicio de sesión (POST)
router.post('/login', usersController.processLoginForm);

// Ruta para mostrar el formulario de registro
router.get('/register', usersController.showRegisterForm);

// Ruta para procesar el formulario de registro (POST)
router.post('/register', usersController.processRegisterForm);

module.exports = router;
