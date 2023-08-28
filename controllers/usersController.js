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
    
        const { username, email, age, color } = req.body;
    
        // Aplica el color de fondo seleccionado al body
        res.locals.bodyColor = color;
    
        // Redirige a la nueva vista que mostrará el mensaje
        res.render('register_success', {
            title: 'Registro Exitoso',
            username,
            email,
            age
        });
    }
};

module.exports = usersController;
