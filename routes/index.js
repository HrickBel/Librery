var express = require('express');
var router = express.Router();
const {create} = require('../controllers/controller.user');
const users = require('../model/user');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/cad_aln', function(req, res, next) {
	res.render('cadaln', { title: 'Express' });
});

router.get('/books',function(req,res){
	res.render('books');
});

router.post('/new', create);

router.get('/AdmPanel', async function(req, res, next) {
	let userLs = await users.findAll({attributes:[
		'id',
		'matricula',
		'name',
		'email',
		'password',
		'isMatActive'],
	raw:true});
	console.log(userLs);
	res.render('AdmPanel', { title: 'Meu nome e severino',users:userLs});
});

router.get('/cad_book', function(req, res, next) {
	res.render('addBook', { title: 'Express' });
});

module.exports = router;
