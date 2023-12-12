var express = require('express');
var router = express.Router();
const {create_aluno, login, getallAlunos} = require('../controllers/controller.user');
const {create_book} = require('../controllers/controller.books');
const users = require('../model/user');
const { where } = require('sequelize');
const session = require('express-session');
const { raw } = require('mysql2');
const { user } = require('../database/database.config');

/* GET home page. */

router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});


router.get('/registeraluno', function(req, res, next) {
	res.render('registeraluno', { title: 'Express' });
});


router.get('/showbooks',function(req,res){
	res.render('showbooks');
});

router.get('/showalunos', async function(req, res, next) {
	let userLs = await users.findAll({attributes:[
		'id',
		'matricula',
		'name',
		'email',
		'password',
		'isMatActive'],
	raw:true});
	console.log(userLs);
	res.render('showalunos', { title: 'Meu nome e severino',users:userLs});
});


router.get('/registerbook', function(req, res, next) {
	res.render('registerbook', { title: 'Express' });
});


router.get('/login',function(req,res){
	res.render('login',{title:'login'});
});


router.get('/home',function(req, res){

	res.render('home');
});

/*POST routes */
router.post('/cadbook', create_book);

router.post('/new', create_aluno);

router.post('/loginuser',login);


router.put('/activate/:userId',async function(req,res){
	let user = await users.update({isMatAct:true});
	res.redirect('/login');
});
module.exports = router;
