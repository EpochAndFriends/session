const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController'); // Cambio en la importación
const registerValidator = require('../validations/registerValidator');

/* Rutas para usuarios */
router
    .get('/login', usersController.showLoginForm) // Cambio en la llamada a los controladores
    .post('/login', usersController.processLoginForm) // Cambio en la llamada a los controladores
    .get('/register', usersController.showRegisterForm) // Cambio en la llamada a los controladores
    .post('/register', registerValidator, usersController.processRegisterForm); // Cambio en la llamada a los controladores

module.exports = router;
