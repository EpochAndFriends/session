const indexController = {
    showIndex: (req, res) => {
        res.render('index', { title: 'Inicio' });
    }
};

module.exports = indexController;
