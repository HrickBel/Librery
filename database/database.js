const {Sequelize} = require('sequelize');
const config = require('./database.config');
const database = new Sequelize(
	config.database,
	config.user,
	config.password,
	{
		host:config.HOST,
		dialect:'mysql'
	});

database.authenticate().then(() => {
	console.log('Banco de dados conectado');
}).catch((err) => {
	console.error('não conectado:\n');
});

module.exports = database;
