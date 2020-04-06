var express = require('express');
var router = express.Router();



router.get('/', function (req, res, next) {
    res.render('menuRender', {
        shopTitle: 'Вуж',
        pizzas: [
            {
                id: 'milano',
                name: "Міланська",
                price: 124,
                amount: 600,
                ingredients: ['creamSauce', 'mozarella', 'salami', 'bacon', 'oregano']
            },
            {
                id: "country",
                name: "Селянська",
                amount: 600,
                price: 130,
                ingredients: ['creamSauce', 'mozarella', 'ham', 'feta', 'bacon', 'oregano']

            },
            {
                id: 'italy',
                name: "Італія",
                price: 153,
                ingredients: ['creamSauce', 'mozarella', 'ham', 'salami', 'bacon', 'oregano']

            },
            {
                id: 'exotic',
                name: "Екзотична",
                price: 103,
                ingredients: ['creamSauce', 'pineapple', 'mozarella', 'ham', 'salami', 'feta', 'bacon', 'oregano']

            },
            {
                id: 'pollo',
                name: "Поло",
                price: 100,
                ingredients: ['creamSauce', 'mozarella', 'ham', 'salami', 'bacon', 'oregano']

            },
            {
                id: 'capri',
                name: "Капрі",
                price: 120,
                ingredients: ['creamSauce', 'mozarella', 'ham', 'salami', 'feta', 'bacon', 'oregano']

            },
            {
                id: 'hawaii',
                name: "Гавайська",
                price: 140,
                ingredients: ['creamSauce', 'pineapple', 'mozarella', 'ham', 'salami', 'bacon', 'oregano']

            }
        ]
    })
})

module.exports =router;