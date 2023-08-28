const { validationResult } = require('express-validator');
const User = require('../../data/Users');
const fs = require('fs');
const { writeJSON } = require('../../data');

module.exports = (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
        const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
        let newUser = User(req.body);

        users.push(newUser);

        fs.writeFileSync('path/to/users.json', JSON.stringify(users, null, 4), 'utf8');
        return res.redirect('/');
    } else {
        return res.render('register', {
            old: req.body,
            errors: errors.mapped()
        });
    }
};
