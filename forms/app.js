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
app.use(express.static(path.join(__dirname, 'public')));


// app.use('/users', usersRouter);

app.get('/', function (req, res) {
  res.sendFile(__dirname, 'index.html')
})






const usersRouter = express.Router();


usersRouter.use("/add", function (request, response) {
  response.send("Додавання користувача");
});

usersRouter.use("/:id", function (request, response) {
  response.send(`Користувач ${request.params.id}`);
  });

usersRouter.use("/", function (request, response) {
  response.send("Список користувачів");
});


app.use("/users", usersRouter);


const groupsRouter = express.Router();


groupsRouter.use("/add", function (request, response) {
  response.send("Додавання групи");
});

groupsRouter.use("/:id", function (request, response) {
  response.send(`Група ${request.params.id}`);
  });

groupsRouter.use("/", function (request, response) {
  response.send("Список груп");
});


app.use("/groups",groupsRouter);












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
