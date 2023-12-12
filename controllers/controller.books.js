const bodyParser = require('body-parser');
const books = require('../model/book');
const md5 = require('md5');
const {v4:uuid4} = require('uuid')

const create_book = async(req,res) => {
	await books.create({
		idEscola:uuid4(),
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