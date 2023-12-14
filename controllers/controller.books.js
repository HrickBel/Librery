const bodyParser = require('body-parser');
const books = require('../model/book');
const md5 = require('md5');
const {v4:uuid4} = require('uuid');
const { DatabaseError } = require('sequelize');
const database = require('../database/database');

const create_book = async(req,res) => {
	try {
		await books.create({
			idEscola:uuid4(),
			ISBN:req.body.ISBN,
			AnoLancamento:req.body.release,
			title:req.body.title,
			editora:req.body.editora,
			autor:req.body.autor,
			edicao:req.body.edicao,
			categoria:req.body.categoria,
			isAtLib:true
		});
	} catch (error) {
		if(error instanceof DatabaseError){
			console.error('Sequelize Database Error:', error.message);
		}else{
			console.error('error:', error.message);
		}
		
	}finally{
		await database.close();
	}


	res.redirect('/registerbook');
};


module.exports = {
	create_book
};