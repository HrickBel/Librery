const {Sequelize} = require('sequelize');
const config = require('./database.config');

const database = new Sequelize(
	'librery',
	'henry',
	'2005Henry@localhost',
	{
		host:'localhost',
		dialect:'mysql'
	});

database.authenticate().then(() =>{
	console.log("sucess")
}).catch((err) => {
	console.log('fail');
});
	
module.exports = database;
