var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users/', function (req, res, next) {
    res.render('addUserRender', {
        pizzaName: 'Імя:',
        pizzaPrice: 'Вік:',
        ingredients: 'Введіть список фільмів:'
    }
    );
});

module.exports = router;
