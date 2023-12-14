const bodyParser = require('body-parser');
const books = require('../model/book');
const md5 = require('md5');
const {v4:uuid4} = require('uuid');
const { DatabaseError } = require('sequelize');
const database = require('../database/database');
const axios = require('axios');

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

const listbook_title = async (req,res) =>{
	await books.findAll({where:{title:req.query['title']}})
}

const listbook_category = async (req,res) =>{
	await books.findAll({where:{categoria:req.query['categoria']}})
}

const listbook_api = async (req,res) => {
	const url = 'https://openlibrary.org/search.json?title=';

	
	axios.get(url+req.query['title'].replace(/ /g,'+')).then((response) => {
		if (response.data.docs && response.data.docs.length > 0) {
			const docs = response.data.docs[0];
			const { title, author_name, isbn, first_publish_year, publisher } = docs;

			const bookData = {
				title: docs.title || 'N/A',
				author: docs.author_name ? docs.author_name[0] : 'N/A',
				isbn: docs.isbn ? docs.isbn : 'N/A',
				first_publish_year: docs.first_publish_year || 'N/A',
				publisher: docs.publisher ? docs.publisher : 'N/A',
			  };

			sessionStorage('book',bookData);
			
		  } else {
			console.log('No documents found.');
		  }
		}).catch(error => {
		  console.error('Error making the request:', error.message);
	});
}
module.exports = {
	create_book,
	listbook_category,
	listbook_title,
	listbook_api
};