const bodyParser = require('body-parser');
const books = require('../model/escola');
const md5 = require('md5');
const {v4: uuid4} = require('uuid');

const create_escola = async(req,res) => {
	await escola.create({
		matricula:uuid4(),
		email:req.body.email,
		password:md5(req.body.password),
});

module.exports = {

}