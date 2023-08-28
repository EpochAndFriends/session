const express = require('express');
const router = express.Router();

const {
    showLoginForm,
    processLoginForm,
    showRegisterForm,
    processRegisterForm
} = require('../controllers/usersController');
const registerValidator = require('../validations/registerValidator');

/* Rutas para usuarios */
router
    .get('/login', showLoginForm)
    .post('/login', processLoginForm)
    .get('/register', showRegisterForm)
    .post('/register', registerValidator, processRegisterForm);

module.exports = router;
