const bodyParser = require('body-parser');
const users = require('../model/user');
const md5 = require('md5');
const {v4: uuid4} = require('uuid');
const { where } = require('sequelize');
const { raw } = require('mysql2');
const database = require('../database/database');

const create_aluno = async(req,res) => {
	try{
		await users.create({
			matricula:uuid4(),
			idEscola:uuid4(),
			name:req.body.name,
			email:req.body.email,
			password:md5(req.body.password),
			isMatActive: false
		});
		
		let mat;
		(await users.findAll({attributes:['matricula'],where:{email:req.body.email},raw:true})).forEach(item => {mat = item.matricula;});		
		req.session.idmat = mat;
	}catch(err){
		console.log(err);
	}finally{
		database.close();
	}
	res.redirect('/showAlunos');
};

const login = async(req, res) =>{
	let user;
	(await users.findAll({attributes:['matricula'],where:{
		email:req.body.email,
		password:md5(req.body.password)
	},
	raw:true})).forEach(item => user = item.matricula);
	req.session.userid = user;
	if(user == null){
		res.redirect('/');
	}else{
		res.redirect('/home');
	}
};

const getAlunoByID = async(req, res) => {
	let user = await users.findAll({where:req.session.UID});
	
};

module.exports = {
	create_aluno,
	login
};