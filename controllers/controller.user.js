const bodyParser = require('body-parser');
const users = require('../model/usermodel');
const md5 = require('md5');

const create = async(req,res) => {
	await users.create({
		matricula:req.body.mat,
		name:req.body.name,
		email:req.body.mail,
		password:md5(req.body.password),
		isMatActive: true
	});

	res.redirect('AdmPanel');
};


const login = (req, res) =>{
	if(req.header === 200){
		users.findAll({where:{
			password: md5(bodyParser.password)
		}}).then((user) => {
			return user;});
	}else if(req.header === 404){
		return null;
	}
};

module.exports = {
	create,
	login
};