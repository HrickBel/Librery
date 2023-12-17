const bodyParser = require('body-parser');
const users = require('../model/user');
const md5 = require('md5');
const {v4: uuid4} = require('uuid');
const { where } = require('sequelize');
const { raw } = require('mysql2');
const database = require('../database/database');

const create_aluno = async(req,res) => {
		await users.create({
			matricula:uuid4(),
			idEscola:uuid4(),
			name:req.body.name,
			email:req.body.email,
			password:md5(req.body.password),
			isMatActive: false
		});
	res.redirect('/showAlunos');
};

const login = async(req, res) =>{
	let user = (await users.findAll({attributes:['matricula'],where:{
		email:req.body.email,
		password:md5(req.body.password)
	},
	raw:true}));

	user.forEach(item => {req.session.idmat = item.matricula;});

	if(user){
		res.redirect('/home');
	}else{	
		res.redirect('/login');
	}
};

const getAlunoByID = async(req, res) => {
	let user = await users.findAll({where:req.session.UID});
	
};

module.exports = {
	create_aluno,
	login
};