var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Піцерія Вуж',
img: '/logo.png'
});
});

module.exports = router;
