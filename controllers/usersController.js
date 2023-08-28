const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');

const usersController = {
    showLoginForm: (req, res) => {
        res.render('login', { title: 'Iniciar Sesión' });
    },
    processLoginForm: (req, res) => {
        // Lógica para verificar las credenciales
        // ...
    },
    showRegisterForm: (req, res) => {
        res.render('register', {
            title: 'Registrarse',
            old: req.body,
            errors: errors.mapped()   
        });
    },
    
    
    processRegisterForm: async (req, res) => {
        const errors = validationResult(req);

        console.log('Errors:', errors.array());
        if (!errors.isEmpty()) {
            return res.render('register', {
                title: 'Registrarse',
                errors: errors.mapped(),
                old: req.body 
            });
        }

        const { username, email, age, color, rememberColor, password } = req.body;

        if (rememberColor) {
            res.cookie('selectedColor', color, { maxAge: 7 * 24 * 60 * 60 * 1000 }); // Cookie expira en 7 días
        } else {
            res.clearCookie('selectedColor');
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        res.locals.bodyColor = color;

        // Agregar la lógica para guardar el nuevo usuario en users.json
        const usersFilePath = path.join(__dirname, '../data/users.json'); // Ajusta la ruta aquí
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
        const newUser = {
            username,
            email,
            age,
            color,
            password: hashedPassword // Store the hashed password
        };
        users.push(newUser);

        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 4), 'utf8');

        res.render('register_success', {
            title: 'Registro Exitoso',
            username,
            email,
            age,
            color,
            userData: {
                username,
                color
            }
        });
    }
};

module.exports = usersController;
