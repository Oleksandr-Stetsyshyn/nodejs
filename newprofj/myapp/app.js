var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));// Задача 2




//----- Обробка статичних маршрутів
app.get("/", function (req, res) {
  res.send("Hello");
});
app.get("/about", function (req, res) {
  res.send("Hi ");
});



app.get("/goals", function (req, res) {
  res.send("Поспали можно и поесть поели можно и поспать")
})


// Задача 2
app.use(express.static('public'));


//Задача 3
app.get("/info/:myLinks", function (req, res) {
  switch (req.params["myLinks"]) {
    case "sites": res.send("Гугел")
      break;
    case "cinema": res.send("www.youtube.com/");
      break;
    case "info": res.send("Саша я");
      break;
  }

})


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;