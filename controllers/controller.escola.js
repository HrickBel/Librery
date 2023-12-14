const bodyParser = require('body-parser');
const escola = require('../model/escola');
const md5 = require('md5');
const {v4: uuid4} = require('uuid');
const database = require('../database/database');

const create_escola = async(req,res) => {
	try{

		await escola.create({
			matricula:uuid4(),
			email:req.body.email,
			password:md5(req.body.password),
		});
		
		let mat;
		(await escola.findAll({attributes:['matricula'],where:{email:req.body.email},raw:true})).forEach(item => mat = item.matricula);
		
		req.session.matEscola = mat;
	}catch(err){
		console.log(err);
		throw err;
	}finally{
		await database.close();
	}
	
	res.redirect('/');
};

const loginAdm = async(req,res) => {
	try{
		let user = escola.findAll({where:{email:req.body.email}});
		if((user.email == req.body.email) && (user.password == md5(req.body.password))){
			res.redirect('homeAdm');
		}else{
		}
	}catch(err){
		console.log(err);
		throw err;
	}
	
	res.redirect('/login');
};

module.exports = {
	create_escola,
	loginAdm
};