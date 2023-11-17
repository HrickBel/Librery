var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
<<<<<<< HEAD
require('dotenv').config();
console.log(process.env);
=======
>>>>>>> cbe12c719810348b9ea24a994fb64c24cbab87e0

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var database = require('./database/database');

//setup libraries
app.use('/css',express.static('./node_modules/bootstrap/dist/css'));
app.use('/js',express.static('./node_modules/bootstrap/dist/js'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
