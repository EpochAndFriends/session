const { body } = require('express-validator');

const registerValidator = [
    body('username')
        .notEmpty().withMessage('El nombre de usuario es requerido')
        .isLength({ min: 5, max: 15 }).withMessage('El nombre de usuario debe tener entre 5 y 15 caracteres')
        .bail(),

    body('password')
        .notEmpty().withMessage('La contraseña es requerida')
        .matches(/^(?=.*[A-Z])(?=.*\d{4,}).*$/).withMessage('La contraseña debe tener al menos 4 números y una letra mayúscula')
        .bail(),

    body('email')
        .notEmpty().withMessage('El correo electrónico es requerido')
        .isEmail().withMessage('El correo electrónico no es válido')
        .bail(),

    body('age')
        .optional({ nullable: true })
        .isInt().withMessage('La edad debe ser un número entero')
        .bail(),

    body('color')
        .notEmpty().withMessage('Debes seleccionar un color')
];

module.exports = registerValidator;
