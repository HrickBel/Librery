const bodyParser = require('body-parser');
const books = require('../model/book');
const md5 = require('md5');

const create_book = async(req,res) => {
	await books.create({
		idEscola:md5(req.body.ISBN),
		ISBN:req.body.ISBN,
		AnoLancamento:req.body.release,
		title:req.body.title,
		editora:req.body.editora,
		autor:req.body.autor,
		edicao:req.body.edicao,
		isAtLib:true
	});

	res.redirect('/showalunos');
};



module.exports = {
	create_book
};