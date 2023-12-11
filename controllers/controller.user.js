const bodyParser = require('body-parser');
const users = require('../model/user');
const md5 = require('md5');
const { where } = require('sequelize');
const { raw } = require('mysql2');

const create = async(req,res) => {
	await users.create({
		matricula:req.body.mat,
		idEscola:md5(req.body.mat),
		name:req.body.name,
		email:req.body.email,
		password:md5(req.body.password),
		isMatActive: true
	});

	res.redirect('AdmPanel');
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
	create,
	login
};