var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
//var cad_aln = require('./routes/cad.aln');
//var AddBook = require('./routes/cad.book');
//var AdmPanel = require('./routes/AdmPanel');

var app = express();

var database = require('./database/database');
const escola = require('./model/escola');
const book = require('./model/book');
const user = require('./model/user');
const pedido = require('./model/pedido');
const contatos = require('./model/contatos');

const userCtrl = require('./controllers/controller.user');


const { request } = require('http');


//setup libraries
app.use(express.static('node_modules/bootstrap/dist/css'));
app.use(express.static('node_modules/bootstrap/dist/js'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', usersRouter);
//app.use('/cad_aln', cad_aln);
//app.use('/AdmPanel',AdmPanel);
//app.use('/cad_book',AddBook);

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
