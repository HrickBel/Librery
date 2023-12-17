const bodyParser = require('body-parser');
const escola = require('../model/escola');
const md5 = require('md5');
const {v4: uuid4} = require('uuid');
const database = require('../database/database');

const create_escola = async(req,res) => {
	await escola.create({
			nome:req.body.name,
			matricula:uuid4(),
			email:req.body.email,
			password:md5(req.body.password),
		});
	res.redirect('/');
};

const loginAdm = async(req,res) => {

	let user = escola.findAll({where:{email:req.body.email,password:md5(req.body.password)}});
	if(user){
		res.redirect('homeAdm');
	}else{
		res.redirect('/login');
	}
};

module.exports = {
	create_escola,
	loginAdm
};