var express = require('express');
var router = express.Router();

const axios = require('axios');
const session = require('express-session');

const {create_aluno, login} = require('../controllers/controller.user');
const {create_book} = require('../controllers/controller.books');
const {loginAdm, create_escola} = require('../controllers/controller.escola');

const escola = require('../model/escola');
const pedido = require('../model/pedido');
const users = require('../model/user');
const books = require('../model/book');
const md5 = require('md5');

/* GET home page. */

router.get('/', function(req, res, next) {
	//página inicial
	res.render('index', { title:'Librery'});
});


router.get('/registeraluno', function(req, res, next) {
	//cadastro de aluno
	res.render('registeraluno', { title: 'Librery' });
});


router.get('/showbooks',async function(req,res){
	//ver livros em lista
	let booksLs = await books.findAll({attributes:['title','ISBN','editora','autor','edicao','anoLancamento'],raw:true});
	res.render('showbooks',{title:'Librery',books:booksLs});
});

router.get('/showalunos', async function(req, res, next) {
	//ver alunos com matricula ativa
	let userLs= await users.findAll({attributes:[
		'id',
		'matricula',
		'name',
		'email',
		'password',
		'isMatActive'],
		where:{isMatActive:true},
	raw:true});
	res.render('showalunos', { title: 'Librery',users:userLs});
});

router.get('/showdisabledaluno', async function(req,res){
	//ver alunos com matriculas inativas/punidas
	let disableUsers = await users.findAll({attributes:[
		'id',
		'matricula',
		'name',
		'email',
		'password',
		'isMatActive'],
		where:{isMatActive:false},
	raw:true});

	res.render('showdisabledaluno',{users:disableUsers});
});

router.get('/registerbook', function(req, res, next) {
	//adiciona livro a tabela
	res.render('registerbook', { title: 'Librery' });
});


router.get('/login',function(req,res){
	//login de usuário e administrador
	res.render('login',{title:'Login'});
});

router.get('/home',async function(req, res){
	//home para usuário
	res.render('home',{title:'Home',user:await users.findAll({where:{matricula:req.session.uid}})});
});

router.get('/homeadm',function(req,res){
	//home para administradotes
	res.render('homeAdm',{title:'home'});
});

router.get('/edit',async function(req,res){
	// página para editar dados de alunos
	let data = await users.findAll({where:{matricula:req.query['uid']},raw:true});

	res.render('editAluno',{title:'editar aluno', user:data});
});

router.get('/buscarLivro', async function(req,res){
	res.render('registerbook',{ title: 'Librery'});
});

router.get('/logout',function(req,res){
	req.session.uid = '';
	res.redirect('index')
});

/*POST routes */
router.post('/cadbook', create_book);

router.post('/registeraluno', create_aluno);
router.post('/registerescola', create_escola);

router.post('/loginuser',login);

router.post('/loginEscola', loginAdm);

router.post('/activate', async function(req,res){
		await users.update({isMatActive:true},{where:{matricula:req.body.uid}});
		res.redirect('showdisabledaluno');
});

router.post('/disable', async function(req,res){
	await users.update({isMatActive:false},{where:{matricula:req.body.uid}});
	res.redirect('showdisabledaluno');
});

router.post('/updateAluno', async function(req,res){
	await users.update({isMatActive:false},{where:{matricula:req.body.uiddisable}});
	res.redirect('showAlunos');
})

module.exports = router;
