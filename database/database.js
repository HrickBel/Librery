const {Sequelize} = require('sequelize');
<<<<<<< HEAD
const config = require('./database.config');
const database = new Sequelize(
	config.database,
	config.user,
	config.password,
	{
		host:config.HOST,
		dialect:'mysql'
=======
const database = new Sequelize(
	'database',
	'user',
	'password',{
		dialect:'mysql',
		host:''
>>>>>>> cbe12c719810348b9ea24a994fb64c24cbab87e0
	});

database.authenticate().then(() => {
	console.log('Banco de dados conectado');
<<<<<<< HEAD
}).catch((err) => {
	console.error('não conectado:\n');
});

module.exports = database;
=======

	module.exports = database;
}).catch((err) => {
	console.error('não conectado:');
});
>>>>>>> cbe12c719810348b9ea24a994fb64c24cbab87e0
