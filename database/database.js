const {Sequelize} = require('sequelize');
const config = require('./database.config');

const database = new Sequelize(
	config.database,
	config.user,
	config.password,
	{
		host:config.host,
		dialect:'mysql'
	});

database.authenticate().then(() =>{
	console.log("sucess")
}).catch((err) => {
	console.log('fail');
});
	
module.exports = database;
