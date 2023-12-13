const bodyParser = require('body-parser');
const escola = require('../model/escola');
const md5 = require('md5');
const {v4: uuid4} = require('uuid');

const create_escola = async(req,res) => {

	await escola.create({
		matricula:uuid4(),
		email:req.body.email,
		password:md5(req.body.password),
	});

	let mat;
	(await escola.findAll({attributes:['matricula'],where:{email:req.body.email},raw:true})).forEach(item => mat = item.matricula);

	req.session.matEscola = mat;
	
	res.redirect('/');
};

const loginAdm = async(req,res) => {
	let user = escola.findAll({where:{email:req.body.email}});
	if((user.email == req.body.email) && (user.password == md5(req.body.password))){
		req.redirect('homeAdm');
	}else{
		req.redirect('/');
	}
};

module.exports = {
	create_escola,
};