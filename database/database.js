const {Sequelize} = require('sequelize');
const database = new Sequelize(
	'database',
	'user',
	'password',{
		dialect:'mysql',
		host:''
	});

database.authenticate().then(() => {
	console.log('Banco de dados conectado');

	module.exports = database;
}).catch((err) => {
	console.error('não conectado:');
});
