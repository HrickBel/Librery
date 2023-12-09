const bodyParser = require('body-parser');
const books = require('../model/bookmodel');
const md5 = require('md5');

const create = async(req,res) => {
	await books.create({
		ISBN:req.body.ISBN,
		autor:req.body.autor,
		title:req.body.title,
		editora:req.body
	});

	res.redirect('AdmPanel');
};



module.exports = {
	create
};