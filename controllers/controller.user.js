const bodyParser = require('body-parser');
const users = require('../model/user');
const md5 = require('md5');
const {v4: uuid4} = require('uuid');
const { where } = require('sequelize');
const { raw } = require('mysql2');
const session = require('express-session');

const create_aluno = async(req,res) => {
	await users.create({
		matricula:uuid4(),
		idEscola:uuid4(),
		name:req.body.name,
		email:req.body.email,
		password:md5(req.body.password),
		isMatActive: false
	});
	res.redirect('/');
};

const getallAlunos = async(req,res) => {
	await users.findAll({attributes:[
		'id',
		'matricula',
		'name',
		'email',
		'password',
		'isMatActive'],
	raw:true});
};

const login = async(req, res) =>{
	let user = users.findAll({where:{
		email:req.body.email,
		password:md5(req.body.password)
	},
	raw:true});
	res.json(user);
};

module.exports = {
	create_aluno,
	login
};