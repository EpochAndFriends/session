const { body } = require('express-validator');

const registerValidator = [
    body('username')
        .notEmpty().withMessage('El nombre de usuario es requerido')
        .isLength({ min: 5, max: 15 }).withMessage('El nombre de usuario debe tener entre 5 y 15 caracteres')
        .bail(),

        body('password')
        .notEmpty().withMessage('La contraseña es requerida')
        .isLength({ min: 5 }).withMessage('La contraseña debe tener al menos 5 caracteres')
        .matches(/\d/).withMessage('La contraseña debe incluir al menos un número')
        .matches(/[A-Z]/).withMessage('La contraseña debe incluir al menos una letra mayúscula')
        .matches(/[$&+,:;=?@#|'<>.^*()%!-]/).withMessage('La contraseña debe incluir al menos un carácter especial')
        .custom((value, { req }) => {
            const digitSum = value.split('').reduce((sum, char) => {
                const digit = parseInt(char);
                if (!isNaN(digit)) {
                    return sum + digit;
                }
                return sum;
            }, 0);

            if (digitSum !== 25) {
                throw new Error('La suma de los dígitos debe ser 25');
            }
            return true;
        })
        .custom((value, { req }) => {
            const monthsOfYear = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
            const containsMonth = monthsOfYear.some(month => value.toLowerCase().includes(month));
            if (!containsMonth) {
                throw new Error('La contraseña debe incluir un mes del año');
            }
            return true;
        })
        .matches(/[IVXLCDM]+/i).withMessage('La contraseña debe incluir números romanos')
        .matches(/(😀|😎|🥰)/).withMessage('La contraseña debe incluir uno de los emojis 😀, 😎 o 🥰')
        .matches(/\b(29|30|31)\b/).withMessage('La contraseña debe incluir un día del mes (29, 30 o 31)')
        .matches(/(🔥|🌞|🌙)/).withMessage('La contraseña debe incluir uno de los emojis 🔥, 🌞 o 🌙')
        .matches(/\b(202[0-9]|2020)\b/).withMessage('La contraseña debe incluir el año 2020 o un año entre 20200 y 20299')
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
