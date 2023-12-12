var express = require('express');
var router = express.Router();
const {create_aluno, login, getallAlunos} = require('../controllers/controller.user');
const {create_book} = require('../controllers/controller.books');
const users = require('../model/user');
const { where } = require('sequelize');
const session = require('express-session');
const { raw } = require('mysql2');


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
/*POST routes */
router.post('/cadbook', create_book);

router.post('/new', create_aluno);

router.post('/loginuser',login);


router.post('/activate',async function(req,res){
	await users.update({isMatAct:true},{where:{
		matricula:req.body.matricula
	}});
	res.redirect('/showalunos');
});
module.exports = router;
