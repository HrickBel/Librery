const bodyParser = require('body-parser');
const books = require('../model/book');
const md5 = require('md5');
const {v4:uuid4} = require('uuid');
const { DatabaseError } = require('sequelize');
const database = require('../database/database');
const axios = require('axios');

const create_book = async(req,res) => {

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

	res.redirect('/registerbook');
};

const listbook_title = async (req,res) =>{
	await books.findAll({where:{title:req.query['title']}})
}

const listbook_category = async (req,res) =>{
	await books.findAll({where:{categoria:req.query['categoria']}})
}

const createbook_api = async (req,res) => {
	const url = 'https://openlibrary.org/search.json?title=';

	
	axios.get(url+req.query['title'].replace(/ /g,'+')).then(async (response) => {
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

			  await books.create({
				idEscola:uuid4(),
				ISBN:docs.isbn[0],
				AnoLancamento:docs.first_publish_year[0],
				title:docs.title,
				editora:docs.publisher[0],
				autor:docs.author_name[0],
				edicao:'3 edicao',
				categoria:'',
				isAtLib:true
			});
			
		  } else {
			console.log('No documents found.');
		  }
		}).catch(error => {
		  console.error('Error making the request:', error.message);
	});
	res.send(200);
}
module.exports = {
	create_book,
	listbook_category,
	listbook_title,
	createbook_api
};