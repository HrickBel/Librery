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

database.authenticate().then(() => {
	console.log('Banco de dados conectado');
	module.exports = database;
}).catch((err) => {
	console.error('não conectado:', err);
});

