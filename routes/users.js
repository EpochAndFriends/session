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

const { body } = require('express-validator');

router.post(
    '/register',
    [
        body('username').notEmpty().withMessage('El nombre de usuario es requerido'),
        body('password').notEmpty().withMessage('La contraseña es requerida'),
        body('email').notEmpty().withMessage('El correo electrónico es requerido').isEmail().withMessage('El correo electrónico no es válido'),
        body('age').optional({ nullable: true }).isInt().withMessage('La edad debe ser un número entero')
    ],
    usersController.processRegisterForm
);


module.exports = router;
