var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');



router.get('/', function (req, res, next) {
  const data = require(req.dataDir + '/data.json')
  res.render('main', { title: 'Наша бібліотека', page: 'books-list', books: data.books });
});

router.get('/add', function (req, res, next) {
  res.render('main', { title: 'Додати книжку', page: 'add-form' });
});

router.get('/edit/:bookId', function (req, res, next) {
  const data = require(req.dataDir + '/data.json')
  res.render('main', { title: 'Редагувати книгу', page: 'edit-form', books: data.books, id: req.params.bookId });
});

router.get('/filter', function (req, res, next) {
  res.render('main', { title: 'Відфільтрований лист', page: 'books-list', books: data.books });
});



router.post('/add',
  [
    check('title').isLength({ min: 5 }).withMessage('Назва книги має бути довшою за 5'),
    check('year').isFloat({ min: 1000, max: 2020 }).withMessage('Рік між 1000 і 2020'),
    check('author').isLength({ min: 5 }).withMessage('Імя автора має бути довшим за 5'),
  ],
  function (req, res, next) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ success: false, err: { msg: errors.array().map(e => e.msg).join(', ') } })

      // res.status(422).json({ errors: errors.array() });
    }
    else {
      const data = require(req.dataDir + '/data.json')

      data.books.push({
        title: req.body.title,
        author: req.body.author,
        year: req.body.year
      })
      var fs = require('fs');
      fs.writeFile(req.dataDir + '/data.json', JSON.stringify(data), function (err) {
        if (err) res.json({ success: false, err: { msg: "Помилка при записі файлу" } });
        res.json({ success: true, msg: "Збережено" });
        console.log('Saved!');
      });
    }
  });

router.post('/edit',
  [
    check('title').isLength({ min: 5 }).withMessage('Назва книги має бути довшою за 5'),
    check('year').isFloat({ min: 100, max: 2020 }).withMessage('Рік між 100 і 2020'),
    check('author').isLength({ min: 5 }).withMessage('Імя автора має бути довшим за 5'),
    check('id').isLength({ min: 0 }).withMessage('не має бути пустою'),
  ],
  function (req, res, next) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ success: false, err: { msg: errors.array().map(e => e.msg).join(', ') } })

    }
    else {
      const data = require(req.dataDir + '/data.json')

      data.books[req.body.id].title = req.body.title,
        data.books[req.body.id].author = req.body.author,
        data.books[req.body.id].year = req.body.year


      var fs = require('fs');
      fs.writeFile(req.dataDir + '/data.json', JSON.stringify(data), function (err) {
        if (err) res.json({ success: false, err: { msg: "Помилка при записі файлу" } });
        res.json({ success: true, msg: "Збережено" });
        console.log('Saved!');
      });
    }
  });


router.post('/filter', [
  check('keyWord').isLength({ min: 3 }).withMessage('Введіть ключове слово'),
  // check('filterBy').isLength({ min: 1 }).withMessage('Введіть filterBy'),
],
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ success: false, err: { msg: errors.array().map(e => e.msg).join(', ') } })
    }
    else {
      const data = require(req.dataDir + '/data.json')
      const dataFilter = data.books.filter(book => book.year == req.body.keyWord);

      res.render('main', { title: 'Відфільровано', page: 'books-list', books: dataFilter });
    }
  });

module.exports = router;
