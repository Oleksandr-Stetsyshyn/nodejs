var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('addPizzaRender', {
        pizzaName: 'Введіть назву піци:',
        pizzaPrice: 'Введіть ціну:',
        ingredients: 'Введіть інгредієнти:'
    }
    );
});

module.exports = router;
