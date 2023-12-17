var express = require('express');
var router = express.Router();

const axios = require('axios');
const session = require('express-session');

const {create_aluno, login} = require('../controllers/controller.user');
const {create_book, createbook_api} = require('../controllers/controller.books');
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

router.get('/registerbook',async function(req, res, next) {
	//adiciona livro a tabela
	res.render('registerbook', { title: 'Librery'});
});
router.get('/register',async function(req, res, next) {
	res.render('register', { title: 'Librery'});
});

router.get('/login',function(req,res){
	//login de usuário e administrador
	res.render('login',{title:'Login'});
});

router.get('/home',async function(req, res){
	//home para usuário
	res.render('home',{title:'Home',user:users.findByPk(req.session.idmat)});
});

router.get('/homeadm',async function(req,res){
	//home para administradotes
	res.render('homeAdm',{title:'home'});
});

router.get('/edit',async function(req,res){
	// página para editar dados de alunos
	let data = await await users.findAll({attributes:[
		'id',
		'matricula',
		'name',
		'email',
		'password',
		'isMatActive'],where:{matricula:req.query['uid']},raw:true});
	console.log(data)
	res.render('editAluno',{title:'editar aluno', user:data});
});

// router.get('/registerBook', async function(req,res){
// 	const url = 'https://openlibrary.org/search.json?title=';
// 	var bookData;
	
// 	axios.get(url+req.query['title'].replace(/ /g,'+')).then((response) => {
// 		if (response.data.docs && response.data.docs.length > 0) {
// 			const docs = response.data.docs[0];
// 			const { title, author_name, isbn, first_publish_year, publisher } = docs;

// 			bookData = {
// 				title: docs.title || 'N/A',
// 				author: docs.author_name ? docs.author_name[0] : 'N/A',
// 				isbn: docs.isbn ? docs.isbn : 'N/A',
// 				first_publish_year: docs.first_publish_year || 'N/A',
// 				publisher: docs.publisher ? docs.publisher : 'N/A',
// 			};
// 			console.log(bookData);
// 		} else {
// 			console.log('No documents found.');
// 		}
// 	}).catch(error => {
// 		console.error('Error making the request:', error.message);
// 	});
// 	axios.toFormData($('form').attr('action','/cadbook'));
// 	res.render('registerbook',{ title: 'Librery'});
// });

router.get('/logout',function(req,res){
	req.session.uid = '';
	res.redirect('/');
});

/*POST routes */
router.post('/cadbook', create_book);

router.post('/new', create_aluno);

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
});

router.get('/registerbookbyapi', createbook_api,function(req,res){
	res.redirect('registerbook');
});
module.exports = router;
