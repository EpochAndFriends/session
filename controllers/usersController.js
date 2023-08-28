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
        // Lógica para procesar el formulario de registro
        // ...
    }
};

module.exports = usersController;
