const { body } = require('express-validator');

const registerValidator = [
    body('username').notEmpty().withMessage('El nombre de usuario es requerido'),
    body('password').notEmpty().withMessage('La contraseña es requerida'),
    body('email').notEmpty().withMessage('El correo electrónico es requerido').isEmail().withMessage('El correo electrónico no es válido'),
    body('age').optional({ nullable: true }).isInt().withMessage('La edad debe ser un número entero')
];

module.exports = registerValidator;