const { validationResult } = require('express-validator');
const usersController = {
    showLoginForm: (req, res) => {
        res.render('login', { title: 'Iniciar Sesión' });
    },
    processLoginForm: (req, res) => {
        // Lógica para verificar las credenciales
        // ...
    },
    showRegisterForm: (req, res) => {
        res.render('register', { title: 'Registrarse' });
    },
    processRegisterForm: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('register', {
                title: 'Registrarse',
                errors: errors.array()
            });
        }
    
        const { username, email, age, color, rememberColor } = req.body;
    
        if (rememberColor) {
            res.cookie('selectedColor', color, { maxAge: 7 * 24 * 60 * 60 * 1000 }); // Cookie expira en 7 días
        } else {
            res.clearCookie('selectedColor');
        }
    
        res.locals.bodyColor = color;
    
        res.render('register_success', {
            title: 'Registro Exitoso',
            username,
            email,
            age
        });
    }
};

module.exports = usersController;
